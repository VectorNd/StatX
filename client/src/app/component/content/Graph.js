import React, { useState, useEffect, useRef } from "react";
import { Progress } from "rsuite";
import CornerImg from "../../../media/Corner.png";
import "../../styles/styles.css";


const Graph = ({data}) => {
  const boxRefs = useRef([]);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState("");
  const [progressValues, setProgressValues] = useState([]);


  useEffect(() => {
    if (selectedGraph === "stock") {
      setProgressValues(data.stockPriceChange);
    }
    else if (selectedGraph === "market") {
      setProgressValues(data.marketShareChange);
    }
    else if (selectedGraph === "revenue") {
      setProgressValues(data.revenueChange);
    }
    else if (selectedGraph === "expense") {
      setProgressValues(data.expenseChange);
    }
  }, [selectedGraph])

  useEffect(() => {
    setSelectedGraph("stock");
    setProgressValues(data.stockPriceChange);
  }, [])

  useEffect(() => {
    // Define a cleanup function to add and remove event listeners
    const addMouseEvents = (index) => {
      const ref = boxRefs.current[index];
      if (ref) {
        const innerPart = ref.querySelector(".rs-progress-line-bg");
        console.log(innerPart)

        // Check if the ref is valid
        if (innerPart) {
          // Define event handlers
          const handleMouseEnter = () => setHoveredElement(index);
          const handleMouseLeave = () => setHoveredElement(null);

          // Add event listeners
          innerPart.addEventListener("mouseenter", handleMouseEnter);
          innerPart.addEventListener("mouseleave", handleMouseLeave);

          // Return a cleanup function
          return () => {
            innerPart.removeEventListener("mouseenter", handleMouseEnter);
            innerPart.removeEventListener("mouseleave", handleMouseLeave);
          };
        }
      }
    };

    // Add event listeners for each box and store cleanup functions
    const cleanupFns = progressValues.map((_, index) => addMouseEvents(index));

    // Cleanup all event listeners when component unmounts
    return () => cleanupFns.forEach((fn) => fn && fn());
  }, [progressValues]);

  return (
    <div
    className="graph-container"
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <div
          className="graph-buttons-container"
          >
            <div
            className={selectedGraph === "stock" ? "graph-button1" : "graph-button2"}
              onClick={() => setSelectedGraph("stock")}
            >
              {" "}
              Stock Price
            </div>
            <div
            className={selectedGraph === "market" ? "graph-button1" : "graph-button2"}
              onClick={() => setSelectedGraph("market")}
            >
              {" "}
              Market Share
            </div>
            <div
            className={selectedGraph === "revenue" ? "graph-button1" : "graph-button2"}
              onClick={() => setSelectedGraph("revenue")}
            >
              {" "}
              Revenue
            </div>
            <div
            className={selectedGraph === "expense" ? "graph-button1" : "graph-button2"}
              onClick={() => setSelectedGraph("expense")}
            >
              {" "}
              Expense
            </div>
          </div>
        </div>
        <div
        className="graphBar-container"
        >
          {progressValues.map((item, index) => (
            <>
              <div key={index} style={{ position: "relative" }}>
                <Progress.Line
                  ref={(el) => (boxRefs.current[index] = el)}
                  vertical
                  className="graphBar-single"
                  style={{
                    display: item.change === -1 ? "table-footer-group" : "flex"
                  }}
                  percent={(item.change).toFixed(3)}
                  status="active"
                />
                <div
                  className="rs-progress-info-status graphBar-content"
                >
                  {index + 2015}
                </div>
                <div
                  className="percentage-viewer"
                  style={{
                    left: "-20px",
                    bottom: `${
                      2 * item.change +
                      (item.change < 60 ? 25 : item.change < 90 ? 18 : 15)
                    }px`,
                    zIndex: "5",
                    position: "absolute",
                    display: hoveredElement === index ? "flex" : "none",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                  className="graphBar-hover-container"
                  >
                    <div
                    className="graphBar-hover-content" F
                    >
                      {(item.change).toFixed(2)}%
                    </div>
                  </div>
                  <div style={{ width: "5px", height: "5px", display: "flex" }}>
                    <img
                      src={CornerImg}
                      alt="corner"
                      height="100%"
                      width="100%"
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Graph;
