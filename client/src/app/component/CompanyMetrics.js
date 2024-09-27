import React, { useContext, useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { Progress } from "rsuite";
import "./styles.css";
import Graph from "./Graph";
import SameCountry from "./SameCountry";
import UnionOne from "./UnionOne";
import UnionTwo from "./UnionTwo";

const CompanyMetrics = ({ data }) => {
  const { jwt } = useContext(AuthContext);

  return (
    <>
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "600px", width: "1000px"}}>
      <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%", alignItems: "center"}}>
        <div style={{display: "flex", alignItems: "center"}}>
          <SameCountry />
          <SameCountry />
        </div>
        <Graph />
      </div>
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%"}}>
        <UnionTwo/>
      </div>
    </div>

    <div style={{display: "flex", flexDirection: "column",  width: "1000px"}}>
      <div style={{display: "flex", justifyContent: "space-around",}}>
      <Graph />
      <Graph />
      </div>
      <div style={{display: "flex", justifyContent: "space-around"}}>
      <Graph />
      </div>
    </div>
     
    </>
  );
};

export default CompanyMetrics;
