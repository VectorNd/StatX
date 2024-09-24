import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
import CompanySearch from "./app/component/CompanySearch";
import CompanyMetrics from "./app/component/CompanyMetrics";
import Enable2FA from "./app/component/Enable2FA";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App key="page1" />,
  },
  {
    path: "/companySearch",
    element: <CompanySearch key="page2" />,
  },
  {
    path: "/companyMetrics",
    element: <CompanyMetrics key="page3" />,
  },
  {
    path: "/enable2FA",
    element: <Enable2FA key="page4" />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <UserContextProvider>
        <AuthContextProvider>
          <Toaster />
          <RouterProvider router={router} />
        </AuthContextProvider>
      </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
