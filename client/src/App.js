"use client";
import { useContext, useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "./utils/constants";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { user, setUser } = useContext(UserContext);
  const { setJwt, jwt } = useContext(AuthContext);

  // useEffect(() => {

  //   async function loguser(userData) {
  //     try {
  //       await fetch(`${SERVER_ENDPOINT}/log`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(userData),
  //       });
  //     } catch (error) {}
  //   }
  //   async function fetchUser(dataString, telegramUsername) {
  //     try {
  //       const response = await fetch(`${SERVER_ENDPOINT}/v1/user/login`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify({
  //           dataString,
  //           telegramUsername,
  //           referralCode: searchParams.get("tgWebAppStartParam"),
  //         }),
  //       });

  //       const parsedResponse = await response.json();
  //       const { credits, energy, showReturnPopup, jwt, ...rest } =
  //         parsedResponse.data;
  //       setUser({ telegramUsername, ...rest });
  //       console.log(jwt);
  //       setJwt(jwt);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  // }, []);

  const handleGoogleLogin = () => {
    window.open("http://localhost:4000/api/v1/user/googleOAuth", "_self");
  };

  const handleGitHubLogin = () => {
    window.open("http://localhost:3000/auth/github", "_self");
  };

  return (
    <div>
      <h1>Welcome to the App</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <button onClick={handleGitHubLogin}>Login with GitHub</button>
      <a href="/reset-password">Forgot Password?</a>
    </div>
  );
}

export default App;
