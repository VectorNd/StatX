const { UserService } = require("../services");
const { ServerConfig } = require("../config");
const { signJwt, verifyJwt } = require("../utils/jwt");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const googleOAuth = (req, res) => {
  const redirectUri = `${ServerConfig.SERVER_ENDPOINT}/api/v1/user/googleOAuth/callback`; // Redirect URI for your app
  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${ServerConfig.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=profile email`;

  // Redirect the user to Google’s OAuth consent page
  res.redirect(authUrl);
};

const githubOAuth = (req, res) => {
  const redirectUri = `${ServerConfig.SERVER_ENDPOINT}/api/v1/user/githubOAuth/callback`; // Redirect URI for your app
  const authUrl =
    `https://github.com/login/oauth/authorize?` +
    `client_id=${ServerConfig.GITHUB_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=user:email` +
    `&response_type=code` +
    `&prompt=consent`;

  // Redirect the user to GitHub’s OAuth consent page
  res.redirect(authUrl);
};

async function googleOAuthCallback(req, res) {
  try {
    const { code } = req.query;

    // Step 1: Exchange authorization code for access token

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: ServerConfig.GOOGLE_CLIENT_ID,
        client_secret: ServerConfig.GOOGLE_CLIENT_SECRET,
        redirect_uri: ServerConfig.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
    });

    const tokenData = await tokenResponse.json();
    const { access_token } = tokenData;

    // Step 2: Use the access token to get the user's profile

    const profileResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const profile = await profileResponse.json();

    // Step 3: Check if the user exists or create a new one

    if (profileResponse.ok) {
      let user = await UserService.findUserByGoogle(profile.id);

      if (!user) {
        user = await UserService.findUserByEmail(profile.email);
        if (!user) {
          user = await UserService.createUserByGoogleId(
            profile.name,
            profile.email,
            profile.id
          );
        } else {
          await UserService.updateGoogle(profile.email, profile.id);
        }
      }

      // Step 4: Generate JWT for session management

      const token = await signJwt({ userId: user._id });

      // Set cookie with user data
      await res.cookie("jwt", token, {
        httpOnly: false,
        secure: true,
        sameSite: "None",
      });

      // Step 5: Send JWT token to the frontend
      setTimeout(() => {
        res.redirect(`${ServerConfig.FRONTEND_URL}/enable2FA`);
      }, 1000);
    } else {
      console.error("Token request failed:", tokenData);
      res.status(400).send("Token request failed.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}

async function githubOAuthCallback(req, res) {
  try {
    const { code } = req.query;
    // Step 1: Exchange authorization code for access token

    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          code,
          client_id: ServerConfig.GITHUB_CLIENT_ID,
          client_secret: ServerConfig.GITHUB_CLIENT_SECRET,
          redirect_uri: ServerConfig.GITHUB_REDIRECT_URI,
        }).toString(),
      }
    );

    const tokenData = await tokenResponse.json();
    const { access_token } = tokenData;

    // Step 2: Use the access token to get the user's profile

    const profileResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const profile = await profileResponse.json();

    const emailResponse = await fetch("https://api.github.com/user/emails", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const emails = await emailResponse.json();

    // Find the primary email from the list of emails
    const primaryEmail = emails?.find((email) => email.primary).email;

    if (profileResponse.ok) {
      // Step 3: Check if the user exists or create a new one

      let user = await UserService.findUserByGitHub(profile.id);

      if (!user) {
        user = await UserService.findUserByEmail(primaryEmail); // Find by email to link accounts
        if (!user) {
          user = await UserService.createUserByGitHubId(
            profile.name,
            primaryEmail,
            profile.id
          );
        } else {
          await UserService.updateGitHub(primaryEmail, profile.id);
        }
      }

      // Step 4: Generate JWT for session management

      const token = await signJwt({ userId: user._id });


      // Set cookie with user data
      await res.cookie("jwt", token, {
        httpOnly: false,
        secure: true,
        sameSite: "None",
      });

      // Step 5: Send JWT token to the frontend
      setTimeout(() => {
        res.redirect(`${ServerConfig.FRONTEND_URL}/enable2FA`);
      }, 1000);
    } else {
      console.error("Token request failed:", tokenData);
      res.status(400).send("Token request failed.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}

async function enable2FA(req, res) {
  try {
    const user = await UserService.findUser(req.userId); // Make sure req.user is populated with authenticated user data

    if (!user) {
      return res.status(404).json({ status: "FAILED", data: "User not found" });
    }

    if (user.secret2FA) {
      return res.status(200).json({
        status: "SUCCESS",
        data: { secret: user.secret2FA, message: "Already Accessed" },
      });
    }

    // Generate a new secret for

    const secret = speakeasy.generateSecret({ name: "MyApp" });

    // Generate a QR code for the secret

    const qrCodeDataUrl = await qrcode.toDataURL(secret.otpauth_url);

    // Save the 2FA secret to the user

    await UserService.update2FA(req.userId, secret.base32);

    return res.status(200).json({
      status: "SUCCESS",
      data: { secret: secret, qrCode: qrCodeDataUrl },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}

async function verify2FA(req, res) {
  try {
    const { token } = req.body;

    const user = await UserService.findUser(req.userId); // Make sure req.user is populated with authenticated user data

    if (!user || !user.secret2FA) {
      return res.status(404).json({
        status: "FAILED",
        DataTransfer: "User not found or 2FA not enabled",
      });
    }

    // Verify the provided token

    const verified = speakeasy.totp.verify({
      secret: user.secret2FA,
      encoding: "base32",
      token: token,
    });

    if (verified) {
      return res
        .status(200)
        .json({ status: "SUCCESS", data: "2FA verified successfully" });
    } else {
      return res.status(400).json({ status: "FAILED", data: "Invalid token" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    const user = await UserService.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ status: "FAILED", data: "User not found" });
    }

    // Generate a reset token

    const resetToken = await signJwt({ userId: user._id });
    // Configure the transporter for sending emails
    
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your SMTP service
      auth: {
        user: ServerConfig.EMAIL_USER, // your email address
        pass: ServerConfig.EMAIL_PASS, // your email password
      },
    });
    
    const mailOptions = {
      from: ServerConfig.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      text: `Click here to reset your password: ${ServerConfig.FRONTEND_URL}/reset-password/${resetToken}`,
    };
    
    console.log(mailOptions)
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
        return res
          .status(500)
          .json({ status: "FAILED", data: "Email sending failed" });
      }
      return res
        .status(200)
        .json({ status: "SUCCESS", data: "Password reset email sent" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}

async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    
    // Verify the reset token
    
    const decoded = await verifyJwt(token);
    const user = await UserService.findUser(decoded.userId); // Make sure req.user is populated with authenticated user data

    if (!user) {
      return res.status(404).json({ status: "FAILED", data: "User not found" });
    }

    await UserService.updateUserPassword(
      decoded.userId,
      bcrypt.hashSync(newPassword, 10)
    );
    return res
      .status(200)
      .json({ status: "SUCCESS", data:{ message: "Password updated successfully" }});
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "FAILED" });
  }
}

module.exports = {
  googleOAuth,
  googleOAuthCallback,
  githubOAuth,
  githubOAuthCallback,
  enable2FA,
  verify2FA,
  forgotPassword,
  resetPassword,
};
