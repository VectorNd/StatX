import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER_ENDPOINT } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Panel } from "rsuite";
import "./styles.css";
import MainPage from "./MainPage";

const ResetPassword = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setJwt, jwt } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const triggerAnimation = () => {
    setIsCollapsed(!isCollapsed);
    setTimeout(() => {
      setIsFlipped(!isFlipped);
      if (isFlipped) {
        setMessage("");
      }
    }, 500);
  };

  const handleResetPassword = async () => {
    try {
        const response = await fetch(
            `${SERVER_ENDPOINT}/api/v1/user/resetPassword/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );
  
      const parsedResponse = await response.json();
      const data = parsedResponse.data;
      setMessage(data.message);
      setJwt(token);
      navigate("/enable2FA");
    } catch (error) {
        setMessage(error.message);
      }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  return (
    <div>
      <div className="App">
        <MainPage/>
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
                  <div style={{ fontSize: "31px" }}>Reset Password</div>
                  <div style={{ fontSize: "15px" }}>
                    Please enter your new Password.
                  </div>
                  <div className="flex-column-container">
                    <input
                      type="password"
                      placeholder="Enter Your Password Here"
                      value={newPassword}
                      onChange={handlePasswordChange}
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
                          onClick={handleResetPassword}
                          style={{
                            flexWrap: "wrap",
                            width: "150px",
                            height: "40px",
                            backgroundColor: "#DC3D3A",
                            color: "#F4F4F4",
                          }}
                        >
                          <strong>Send Reset Link</strong>
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

export default ResetPassword;
