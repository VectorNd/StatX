import React, { useState, useEffect, useContext } from "react";
import { SERVER_ENDPOINT } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";

const History = () => {
  const [history, setHistory] = useState([]);
  const { jwt } = useContext(AuthContext);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `${SERVER_ENDPOINT}/api/v1/company/historyCompute`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const parsedResponse = await response.json();
        if (parsedResponse.status != "SUCCESS") {
          throw new Error("Network response was not ok");
        }
        setHistory(parsedResponse.data.metrics);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  console.log(history)
  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <div>
              <h2>Company Code: {entry.companyCode} </h2>
              <h2>Metrics:</h2>
              <p>
                Total Companies in Country:{" "}
                {entry.metrics.totalCompaniesInCountry}
              </p>
              <p>Greater Diversity: {entry.metrics.greaterDiversity}</p>
              <p>
                Stock Price Comparison (Domestic):{" "}
                {entry.metrics.stockPriceComparison.domestic}
              </p>
              <p>
                Market Share Prediction:{" "}
                {entry.metrics.predictions.predictedMarketShare}
              </p>
            </div>
            <strong>Searched At:</strong>{" "}
            {entry.searchedAt} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
