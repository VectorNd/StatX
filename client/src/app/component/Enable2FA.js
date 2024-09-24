// src/components/Enable2FA.js
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SERVER_ENDPOINT } from "../../utils/constants";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Enable2FA = () => {
  const [secret, setSecret] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setJwt, jwt } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEnable2FA = async () => {
    try {
        console.log(jwt)
      const response = await fetch(`${SERVER_ENDPOINT}/api/v1/user/enable2FA`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      const parsedResponse = await response.json();
      if (parsedResponse.status != "SUCCESS") {
        throw new Error("Failed to enable 2FA. Please try again.");
      }

      const data = parsedResponse.data;
      console.log(data)
      setSecret(data.secret.base32);
      setQrCodeUrl(data.qrCode);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  const handleVerify2FA = async (token) => {
    try {
      const response = await fetch(`${SERVER_ENDPOINT}/api/v1/user/verify2FA`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ token }),
      });

      const parsedResponse = await response.json();

      if (parsedResponse.status != "SUCCESS") {
        throw new Error("Verification failed. Please check your code.");
      }

      setSuccessMessage("2FA enabled successfully!");
      setErrorMessage("");
      navigate("/companySearch");

    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    const jwtVal = Cookies.get("jwt");
    console.log(jwtVal)
    if (jwtVal) {
      setJwt(jwtVal);
    } else {
      console.log("invalid credentials");
    }
  }, []);

  useEffect(() => {
    if (jwt) {
      handleEnable2FA();
    }
  }, [jwt]);

  return (
    <div>
      <h2>Enable Two-Factor Authentication</h2>
      {qrCodeUrl && (
        <div>
          <h3>Scan the QR Code with your authenticator app</h3>
          <img src={qrCodeUrl} alt="QR Code" />
          {/* <p>Secret: {secret}</p> */}
          <input
            type="text"
            placeholder="Enter your 2FA code"
            onBlur={(e) => handleVerify2FA(e.target.value)}
          />
        </div>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default Enable2FA;
