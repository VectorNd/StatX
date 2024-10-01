import { Panel } from "rsuite";
import "../../styles/styles.css";
import GoogleImg from "../../../media/Google.png";
import GithubImg from "../../../media/Github.png";
import { useState } from "react";
import { SERVER_ENDPOINT } from "../../../utils/constants";
import MainPage from "./MainPage";

function Login() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const triggerAnimation = () => {
    setIsCollapsed(!isCollapsed);
    setTimeout(() => {
      setIsFlipped(!isFlipped);
      if (isFlipped) {
        setMessage("");
      }
    }, 500);
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(
        `${SERVER_ENDPOINT}/api/v1/user/forgotPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const parsedResponse = await response.json();
      setMessage(parsedResponse.data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleGoogleLogin = () => {
    window.open(`${SERVER_ENDPOINT}/api/v1/user/googleOAuth`, "_self");
  };

  const handleGitHubLogin = () => {
    window.open(`${SERVER_ENDPOINT}/api/v1/user/githubOAuth`, "_self");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="App">
      <MainPage />
      {!isFlipped ? (
        <>
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
                <Panel className="card-front">
                  <div
                    className="flex-column-container"
                    style={{
                      height: "100%",
                    }}
                  >
                    <div className="login-content-heading">Log In</div>
                    <div className="login-content-para">
                      This is a secure system and you will need to provide your
                      login details to access the site.
                    </div>
                    <div className="flex-column-container">
                      <div className="login-apps" onClick={handleGoogleLogin}>
                        <div className="login-app-div">
                          <div className="login-aap-image-container">
                            <img
                              src={GoogleImg}
                              alt="google"
                              height="19px"
                              width="20px"
                            />
                          </div>
                          <div className="login-app-content">
                            Continue with Google
                          </div>
                        </div>
                      </div>
                      <div className="login-apps" onClick={handleGitHubLogin}>
                        <div className="login-app-div">
                          <div className="login-aap-image-container">
                            <img
                              src={GithubImg}
                              alt="google"
                              height="19px"
                              width="20px"
                            />
                          </div>
                          <div className="login-app-content">
                            Continue with GitHub
                          </div>
                        </div>
                      </div>
                      <div className="flip-button" onClick={triggerAnimation}>
                        Forgot Password?
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>
            </Panel>
          </div>
        </>
      ) : (
        <>
          <div className="login-container">
            <div
              className={`background-icons ${!isCollapsed ? "collapsed" : ""}`}
            ></div>

            <Panel
              shaded
              bordered
              bodyFill
              className={`login-card ${!isCollapsed ? "zoomed" : ""} ${
                !isFlipped ? "flipped" : ""
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
                    <div className="login-content-heading">Forgot Password</div>
                    <div className="login-content-para">
                      Please enter your credentials first. Won't be shared
                      publicly, won't be spammed.
                    </div>
                    <div className="flex-column-container">
                      <input
                        type="email"
                        placeholder="Enter Your Email Address"
                        value={email}
                        onChange={handleEmailChange}
                        className="login-apps forgotPass-input"
                      />
                    </div>
                    <div className="flex-center-container">
                      {!message ? (
                        <>
                          <div
                            className="flex-center-container forgotPass-button"
                            onClick={handleForgotPassword}
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
                    <div className="flip-button" onClick={triggerAnimation}>
                      Back to log-in page
                    </div>
                  </div>
                </Panel>
              </div>
            </Panel>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
