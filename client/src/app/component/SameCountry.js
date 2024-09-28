import React from "react";
import JordanImg from "../../media/Jordan.png";
import "./styles.css";


const SameCountry = ({data, type}) => {
  return (
      <div>
        <div
          style={{
            width: "200px",
            height: "180px",
            backgroundColor: "#e7e7e7",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "13px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              marginLeft: "25px",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#F5F7F9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          ><img
          src={JordanImg}
          alt="jordan"
          height="19px"
          width="20px"
        /></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                marginLeft: "25px",
                width: "150px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                color: "#a1a1a1",
                fontSize: "14px",
                fontFamily: "sans-serif",
              }}
            >
              Companies {type === "diversity" ? "With Greater Diversity" : "In The Same Country"}
            </div>
            <div
              style={{
                marginLeft: "25px",
                width: "100px",
                height: "45px",
                display: "flex",
                alignItems: "center",
                color: "#292929",
                fontSize: "32px",
                fontFamily: "cursive",
              }}
            >
              {data}
            </div>
          </div>
        </div>
      </div>
  );
};

export default SameCountry;
