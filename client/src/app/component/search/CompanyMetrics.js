import React from "react";
import "../../styles/styles.css";
import Graph from "../content/Graph";
import SameCountry from "../content/SameCountry";
import UnionOne from "../content/UnionOne";
import Prediction from "../content/Prediction";

const CompanyMetrics = ({ data }) => {
  return (
    <>
      <div className="metrics-main-container">
        <div className="metrics-container">
          <div className="metrics-left-div">
            <div className="same-country">
              <SameCountry
                data={data.totalCompaniesInCountry}
                type="same-country"
              />
              <SameCountry data={data.greaterDiversity} type="diversity" />
            </div>
            <Graph data={data.yearlyChanges} />
          </div>
          <div className="metrics-right-div">
            <UnionOne data={data} />
          </div>
        </div>
        <div style={{fontSize: "23px", width: "200px", fontWeight: "bold", marginLeft: "20px"}}>Prediction:</div>
        <div className="metrics-container" style={{ flexDirection: "column" }}>
          <div className="same-prediction">
            <Prediction data={data.predictions.stockPricePrediction} companyName={data.name} country={data.country} type="stock" />
            <Prediction data={data.predictions.marketSharePrediction} companyName={data.name} country={data.country} type="market" />
          </div>
          <div className="same-prediction">
            <Prediction data={data.predictions.revenuePrediction} companyName={data.name} country={data.country} type="revenue" />
            <Prediction data={data.predictions.expensePrediction} companyName={data.name} country={data.country} type="expense" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyMetrics;
