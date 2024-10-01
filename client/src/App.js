"use client";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const navigate = useNavigate();
  const { jwt } = useContext(AuthContext);

  useEffect(() => {
    if (!jwt) {
      navigate('/login');
    }
  }, [jwt, navigate]);

  useEffect(() => {
    if (jwt) {
      navigate('/companySearch');
    } 
  }, [jwt, navigate]);

  return (
    <div>
      <h1>Welcome to the App</h1>
    </div>
  );
}

export default App;
