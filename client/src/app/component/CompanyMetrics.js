import React, { useContext, useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const CompanyMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const { jwt } = useContext(AuthContext);
  const location = useLocation();
  const { companyCode } = location.state || {};

  useEffect(() => {
    async function handleCompute() {
        setLoading(true);
        try {
          const response = await fetch(
            `${SERVER_ENDPOINT}/api/v1/company/compute`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({ companyCode }),
            }
          );
    
          const parsedResponse = await response.json();
          if (parsedResponse.status != "SUCCESS") {
            throw new Error("Network response was not ok");
          }
          setMetrics(parsedResponse.data.metrics);
        } catch (error) {
          console.error("Error fetching metrics:", error);
        } finally {
          setLoading(false);
        }
      };

      handleCompute();
  }, []);

  return (
    <div>
      {loading && <p>Loading, please wait...</p>}

      {metrics && (
        <div>
          <h2>Metrics:</h2>
          <p>Total Companies in Country: {metrics.totalCompaniesInCountry}</p>
          <p>Greater Diversity: {metrics.greaterDiversity}</p>
          <p>
            Stock Price Comparison (Domestic):{" "}
            {metrics.stockPriceComparison.domestic}
          </p>
          <p>
            Market Share Prediction: {metrics.predictions.predictedMarketShare}
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyMetrics;
