"use client";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  const { setJwt, jwt } = useContext(AuthContext);

  useEffect(() => {
    const jwtVal = Cookies.get("jwt");
    if (jwtVal) {
      setJwt(jwtVal);
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (jwt) {
      navigate('/companySearch');
    } 
  }, [jwt]);

  return (
    <div>
      <h1>Welcome to the App</h1>
    </div>
  );
}

export default App;
