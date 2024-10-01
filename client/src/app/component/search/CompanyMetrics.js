import React from "react";
import "../../styles/styles.css";
import Graph from "../content/Graph";
import SameCountry from "../content/SameCountry";
import UnionOne from "../content/UnionOne";

const CompanyMetrics = ({ data }) => {

  return (
    <>
    <div className="metrics-container">
      <div className="metrics-left-div">
        <div className="same-country">
          <SameCountry data={data.totalCompaniesInCountry} type="same-country"/>
          <SameCountry data={data.greaterDiversity} type="diversity"/>
        </div>
        <Graph data={data.yearlyChanges}/>
      </div>
      <div className="metrics-right-div">
        <UnionOne data={data}/>
      </div>
    </div>
     
    </>
  );
};

export default CompanyMetrics;
