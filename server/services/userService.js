const { UserDb } = require("../db");


async function createUserByGoogleId ( username, email, googleId ) {
    try {
      const user = await UserDb.createUserByGoogle(username, email, googleId);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function createUserByGitHubId ( username, email, githubId ) {
    try {
      const user = await UserDb.createUserByGitHub(username, email, githubId);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }


  async function findUser(id) {
    try {
      const user = await UserDb.findUser(id);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
async function findUserByGoogle(googleId) {
  try {
    const user = await UserDb.findUserByGoogle(googleId);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function findUserByGitHub(githubId) {
    try {
      const user = await UserDb.findUserByGitHub(githubId);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

async function findUserByEmail(email) {
    try {
      const user = await UserDb.findUserByEmail(email);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function updateGoogle(email, googleId) {
    try {
      const user = await UserDb.findUserByEmail(email);
      user.googleId = googleId;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  
  async function updateGitHub(email, githubId) {
    try {
      const user = await UserDb.findUserByEmail(email);
      user.githubId = githubId;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function update2FA(id, secret) {
    try {
      const user = await UserDb.findUser(id);
      user.secret2FA = secret;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function updateUserPassword(id, password) {
    try {
      const user = await UserDb.findUser(id);
      user.password = password;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }




module.exports = {
  createUserByGoogleId,
  createUserByGitHubId,
  findUser,
  findUserByGoogle,
  findUserByEmail,
  findUserByGitHub,
  updateGoogle,
  updateGitHub,
  update2FA,
  updateUserPassword,
};
