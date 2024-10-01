import React from "react";
import JordanImg from "../..../media/Jordan.png";
import "../../styles/styles.css";

const SameCountry = ({ data, type }) => {
  return (
    <div>
      <div className="sameCountry-container">
        <div className="sameCountry-image-container">
          <img src={JordanImg} alt="jordan" height="19px" width="20px" />
        </div>
        <div className="sameCountry-content-container">
          <div className="sameCountry-content">
            Companies{" "}
            {type === "diversity"
              ? "With Greater Diversity"
              : "In The Same Country"}
          </div>
          <div className="sameCountry-content-answer">{data}</div>
        </div>
      </div>
    </div>
  );
};

export default SameCountry;
