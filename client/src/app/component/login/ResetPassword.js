import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Panel } from "rsuite";
import "../../styles/styles.css";
import MainPage from "./MainPage";
import { SERVER_ENDPOINT } from "../../../utils/constants";
import { AuthContext } from "../../../context/AuthContext";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setJwt } = useContext(AuthContext);
  const navigate = useNavigate();

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
        <div className="login-first">
          <MainPage />
          <div className="login-container">
            <div className={`background-icons`}></div>

            <Panel shaded bordered bodyFill className={`login-card`}>
              <div className="card-content">
                <Panel className="card-back">
                  <div
                    className="flex-column-container"
                    style={{
                      height: "100%",
                    }}
                  >
                    <div className="login-content-heading">Reset Password</div>
                    <div className="login-content-para">
                      Please enter your new Password.
                    </div>
                    <div className="flex-column-container">
                      <input
                        type="password"
                        placeholder="Enter Your Password Here"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        className="login-apps forgotPass-input"
                      />
                    </div>
                    <div className="flex-center-container">
                      {!message ? (
                        <>
                          <div
                            className="flex-center-container forgotPass-button"
                            onClick={handleResetPassword}
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
    </div>
  );
};

export default ResetPassword;
