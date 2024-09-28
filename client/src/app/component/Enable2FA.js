// src/components/Enable2FA.js
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SERVER_ENDPOINT } from "../../utils/constants";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Panel } from "rsuite";
import "./styles.css";
import MainPage from "./MainPage";

const Enable2FA = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [message, setMessage] = useState("");
  const { setJwt, jwt } = useContext(AuthContext);
  const navigate = useNavigate();

  // const triggerAnimation = () => {
  //   setIsCollapsed(!isCollapsed);
  //   setTimeout(() => {
  //     setIsFlipped(!isFlipped);
  //     if (isFlipped) {
  //       setMessage("");
  //     }
  //   }, 500);
  // };

  const handleEnable2FA = async () => {
    try {
      console.log(jwt);
      const response = await fetch(`${SERVER_ENDPOINT}/api/v1/user/enable2FA`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      const parsedResponse = await response.json();
      if (parsedResponse.status !== "SUCCESS") {
        throw new Error(`Failed to enable 2FA. Please try again. ${parsedResponse.data}`);
      }

      if (parsedResponse.data.message) {
        setQrCodeUrl("");
      }
      else {
        const data = parsedResponse.data;
        setQrCodeUrl(data.qrCode);
      }

      setMessage("");
    } catch (error) {
      setMessage(error.message);
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
        body: JSON.stringify({ token: authCode }),
      });

      const parsedResponse = await response.json();

      if (parsedResponse.status !== "SUCCESS") {
        throw new Error("Verification failed. Please check your code.");
      }

      setMessage("2FA enabled successfully!");
      navigate("/companySearch");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleAuthCodeChange = (e) => {
    setAuthCode(e.target.value);
  };

  useEffect(() => {
    const jwtVal = Cookies.get("jwt");
    console.log(Cookies.get(), Cookies, jwtVal, document.cookie);
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
      <div className="App">
        <MainPage />
        <div className="login-container">
          <div
            className={`background-icons ${isCollapsed ? "collapsed" : ""}`}
          ></div>

          <Panel
            shaded
            bordered
            bodyFill
            className={`login-card ${isCollapsed ? "zoomed" : ""} ${
              isFlipped ? "flipped" : ""
            }`}
          >
            <div className="card-content">
              <Panel className="card-back">
                <div
                  className="flex-column-container"
                  style={{
                    height: "100%",
                  }}
                >
                  <div style={{ fontSize: "15px" }}>
                    <strong>Enable Two-Factor Authentication</strong>
                  </div>
                  <div style={{display: qrCodeUrl == "" ? "none" : "block"}}>
                    <div style={{ fontSize: "15px" }}>
                      Scan the QR Code with your authenticator app
                    </div>

                  <div
                    className="flex-column-container"
                    style={{ alignItems: "center" }}
                    >
                    <div style={{ width: "120px", height: "120px" }}>
                      {qrCodeUrl && (
                        <img
                        style={{ height: "100%", width: "100%" }}
                        src={qrCodeUrl}
                        alt="QR Code"
                        />
                      )}
                    </div>
                  </div>
                      </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Your 2FA Code Here"
                      value={authCode}
                      onChange={handleAuthCodeChange}
                      className="login-apps"
                      style={{
                        width: "250px",
                        paddingLeft: "10px",
                        paddingRight: "5px",
                        margin: "0",
                      }}
                    />
                  </div>
                  <div className="flex-center-container">
                    {!message ? (
                      <>
                        <div
                          className="flex-center-container"
                          onClick={handleVerify2FA}
                          style={{
                            flexWrap: "wrap",
                            width: "150px",
                            height: "40px",
                            backgroundColor: "#DC3D3A",
                            color: "#F4F4F4",
                          }}
                        >
                          <strong>Verify Code</strong>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="flex-center-container"
                          style={{
                            color: "#EA8E8C",
                          }}
                        >
                          {message}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Panel>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default Enable2FA;
