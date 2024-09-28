import React, { useState } from "react";
import "./styles.css";

const UnionOne = ({data}) => {
  const [domestic, setDomestic] = useState(false);
  const [rotateClass, setRotateClass] = useState("");
  const [scaleClass, setScaleClass] = useState("fade-in");

  const toggleDomestic = () => {
    setScaleClass("scale-out");
    setRotateClass("rotate");
    setTimeout(() => {
      setDomestic(!domestic);
      setScaleClass("scale-in");
      setRotateClass("rotate2");
    }, 500);
    
  };


  return (
    <>
      <div>
        <div
          style={{
            width: "250px",
            height: "350px",
            backgroundColor: "#e7e7e7",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              color: "#a1a1a1",
              fontSize: "18px",
              fontFamily: "sans-serif",
              marginTop: "25px",
            }}
          >
            <div>
              Companies With More{" "}
              <div style={{display: "inline-block", cursor: "pointer", borderRadius: "25px", padding: "5px", boxShadow: "inset 1px -1px 20px 0px #a0a0a0"}} onClick={() => {toggleDomestic();
                setDomestic(!domestic)} }>
                {" "}
                {domestic ? "Domestically" : "Globally"}{" "}
              </div>
            </div>
          </div>
          <div className={scaleClass}>

          {domestic ? (
            <div style={{ marginRight: "5px", height: "220px" }}>
              <div
                style={{
                  position: "relative",
                  top: "65px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#F6CDCC",
                  zIndex: "1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={rotateClass}
                >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "999",
                  }}
                  >
                  <div
                    style={{
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#292929",
                      fontSize: "17px",
                      fontFamily: "cursive",
                    }}
                    >
                    {data.stockPriceComparison.domestic}
                  </div>
                  <div
                    style={{
                      height: "22px",
                      display: "flex",
                      alignItems: "center",
                      color: "#292929",
                      fontSize: "14px",
                      fontFamily: "sans-serif",
                    }}
                    >
                    Stock Price
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  left: "-30px",
                  top: "25px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#EA8E8C",
                  zIndex: "2",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={rotateClass}
                >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "999",
                  }}
                  >
                  <div
                    style={{
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#292929",
                      fontSize: "15px",
                      fontFamily: "cursive",
                    }}
                  >
                    {data.marketShareComparison.domestic}
                  </div>
                  <div
                    style={{
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#292929",
                      fontSize: "10px",
                      fontFamily: "sans-serif",
                    }}
                    >
                    Market Share
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  left: "35px",
                  top: "-35px",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#A0A0A0",
                  zIndex: "3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={rotateClass}
                >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "999",
                  }}
                  >
                  <div
                    style={{
                      height: "10px",
                      display: "flex",
                      alignItems: "center",
                      color: "#F5F5F5",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {data.expenseComparison.domestic}
                  </div>
                  <div
                    style={{
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#F5F5F5",
                      fontSize: "9px",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Expense
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  left: "60px",
                  top: "-235px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#6f6e6e",
                  zIndex: "2",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={rotateClass}
                >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "999",
                  }}
                  >
                  <div
                    style={{
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#F5F5F5",
                      fontSize: "15px",
                      fontFamily: "cursive",
                    }}
                    >
                    {data.revenueComparison.domestic}
                  </div>
                  <div
                    style={{
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#F5F5F5",
                      fontSize: "10px",
                      fontFamily: "sans-serif",
                    }}
                    >
                    Revenue
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ marginLeft: "20px", height: "220px" }}>
              <div
                style={{
                  position: "relative",
                  top: "65px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#F6CDCC",
                  zIndex: "1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={rotateClass}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "999",
                  }}
                  >
                  <div
                    style={{
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#292929",
                      fontSize: "17px",
                      fontFamily: "cursive",
                    }}
                  >
                    {data.stockPriceComparison.global}
                  </div>
                  <div
                    style={{
                      height: "22px",
                      display: "flex",
                      alignItems: "center",
                      color: "#292929",
                      fontSize: "14px",
                      fontFamily: "sans-serif",
                    }}
                    >
                    Stock Price
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  left: "69px",
                  top: "25px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#EA8E8C",
                  zIndex: "2",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={rotateClass}
                >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "999",
                  }}
                  >
                  <div
                    style={{
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#292929",
                      fontSize: "15px",
                      fontFamily: "cursive",
                    }}
                    >
                    {data.marketShareComparison.global}
                  </div>
                  <div
                    style={{
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#292929",
                      fontSize: "10px",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Market Share
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  left: "60px",
                  top: "-165px",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#A0A0A0",
                  zIndex: "3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={rotateClass}
                >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "999",
                  }}
                  >
                  <div
                    style={{
                      height: "10px",
                      display: "flex",
                      alignItems: "center",
                      color: "#F5F5F5",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {data.expenseComparison.global}
                  </div>
                  <div
                    style={{
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#F5F5F5",
                      fontSize: "9px",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Expense
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  left: "-60px",
                  top: "-165px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#6f6e6e",
                  zIndex: "2",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={rotateClass}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "999",
                  }}
                >
                  <div
                    style={{
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#F5F5F5",
                      fontSize: "15px",
                      fontFamily: "cursive",
                    }}
                    >
                    {data.revenueComparison.global}
                  </div>
                  <div
                    style={{
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#F5F5F5",
                      fontSize: "10px",
                      fontFamily: "sans-serif",
                    }}
                    >
                    Revenue
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UnionOne;
