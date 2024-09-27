import React, { useState, useEffect, useContext } from "react";
import { SERVER_ENDPOINT } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";
import { Progress } from "rsuite";
import "./styles.css";

const UnionOne = () => {
  return (
    <>
      <div>
        <div
          style={{
            width: "250px",
            height: "350px",
            backgroundColor: "#FFFFFF",
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
            Companies With More Domestically
          </div>
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
                  13
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
                  6
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
                  9
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
                  18
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
        </div>
      </div>
    </>
  );
};

export default UnionOne;
