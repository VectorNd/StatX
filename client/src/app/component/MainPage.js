import { Panel } from "rsuite";
import "./styles.css";
import FrameImg from "../../media/Frame.png";
import GithubImg from "../../media/Github.png";
import { useState } from "react";
import { SERVER_ENDPOINT } from "../../utils/constants";

function MainPage() {
  return (
    <div className="App">
      <div
        style={{
          position: "absolute",
          height: "500px",
          top: "25%",
          left: "25%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="flex-column-container" style={{ alignItems: "center" }}>
          <div style={{ width: "120px", height: "120px" }}>
            <img
              style={{ height: "100%", width: "100%" }}
              src={FrameImg}
              alt="logo"
            />
          </div>
        <div className="flex-column-container" style={{ alignItems: "center", height: "180px" }}>
            <div style={{ fontSize: "30px", width: "200px", fontWeight: "bolder" }}>
            Welcome to Your Company Insights Hub!
            </div>
            <div style={{ fontSize: "15px", width: "200px" }}>
            Dive into the world of financial data!
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
