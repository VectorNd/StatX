import { Panel } from "rsuite";
import "./styles.css";
import GoogleImg from "../../media/Google.png";
import GithubImg from "../../media/Github.png";
import { useState } from "react";
import { SERVER_ENDPOINT } from "../../utils/constants";

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
      console.log(error.message);
      setMessage(error.message);
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:4000/api/v1/user/googleOAuth", "_self");
  };

  const handleGitHubLogin = () => {
    window.open("http://localhost:4000/api/v1/user/githubOAuth", "_self");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="App">
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
                    <div style={{ fontSize: "31px" }}>Log In</div>
                    <div style={{ fontSize: "15px" }}>
                      This is a secure system and you will need to provide your
                      login details to access the site.
                    </div>
                    <div className="flex-column-container">
                      <div className="login-apps" onClick={handleGoogleLogin}>
                        <div className="login-app-div">
                          <div style={{ margin: "0 10px 0 10px", flex: "0" }}>
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
                          <div style={{ margin: "0 10px 0 10px", flex: "0" }}>
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
                    <div style={{ fontSize: "31px" }}>Forgot Password</div>
                    <div style={{ fontSize: "15px" }}>
                      Please enter your credentials first. Won't be shared
                      publicly, won't be spammed.
                    </div>
                    <div className="flex-column-container">
                      <input
                        type="email"
                        placeholder="Enter Your Email Address"
                        value={email}
                        onChange={handleEmailChange}
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
                            onClick={handleForgotPassword}
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
                    <div
                      className="flip-button"
                      onClick={triggerAnimation}
                    >
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
