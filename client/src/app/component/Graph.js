import React, { useState, useEffect, useContext } from "react";
import { SERVER_ENDPOINT } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";
import { Progress } from "rsuite";
import "./styles.css";

const Graph = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div >
        <div
          style={{
            width: "400px",
            height: "230px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Progress.Line
            vertical
            style={{ width: "40px", height: "200px", borderRadius: "10px" }}
            percent={30}
            status="active"
          />
          <Progress.Line
            vertical
            style={{ width: "40px", height: "200px", borderRadius: "10px" }}
            percent={40}
            status="active"
          />
          <Progress.Line
            vertical
            style={{ width: "40px", height: "200px", borderRadius: "10px" }}
            percent={10}
            status="active"
          />
          <Progress.Line
            vertical
            style={{ width: "40px", height: "200px", borderRadius: "10px" }}
            percent={70}
            status="active"
          />
          <Progress.Line
            vertical
            style={{ width: "40px", height: "200px", borderRadius: "10px" }}
            percent={30}
            status="active"
          />
          <Progress.Line
            vertical
            style={{ width: "40px", height: "200px", borderRadius: "10px" }}
            percent={80}
            status="active"
          />
          <Progress.Line
            vertical
            style={{ width: "40px", height: "200px", borderRadius: "10px" }}
            percent={90}
            status="active"
          />
          <Progress.Line
            vertical
            style={{ width: "40px", height: "200px", borderRadius: "10px" }}
            percent={10}
            status="active"
          />
          <Progress.Line
            vertical
            style={{ width: "40px", height: "200px", borderRadius: "10px" }}
            percent={50}
            status="active"
          />
          <Progress.Line
            vertical
            style={{ width: "40px", height: "200px", borderRadius: "10px" }}
            percent={20}
            status="active"
          />
        </div>
      </div>
    </div>
  );
};

export default Graph;
