// src/components/TwoFactor.js
import React, { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SERVER_ENDPOINT } from "../../utils/constants";

const TwoFactor = () => {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { jwt } = useContext(AuthContext);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER_ENDPOINT}/api/v1/user/verify2FA`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
            body: JSON.stringify({ token: code }),
        });
        const parsedResponse = await response.json();

      if (parsedResponse.status != "SUCCESS") {
        throw new Error("Verification failed. Please check your code.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Two-Factor Authentication</h2>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your 2FA code"
          required
        />
        <button type="submit">Verify</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default TwoFactor;
