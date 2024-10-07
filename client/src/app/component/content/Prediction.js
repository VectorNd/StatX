import React, { useState } from "react";
import IdImg from "../../../media/Id.png";
import PieChartImg from "../../../media/PieChart.png";
import CandleStickImg from "../../../media/CandleStick.png";
import CalculateImg from "../../../media/Calculate.png";
import "../../styles/styles.css";
import { Modal } from "rsuite";
import PredictionChart from "./PredictionChart";

const Prediction = ({ data, companyName, country, type }) => {
  const [openModal, setOpenModal] = useState(false);

  const years = [
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
  ];

  const values = data.map((item) => item.value);

  const formatValue = (val) => {
    if (val >= 1e9) {
      return `$${(val / 1e9).toFixed(2)}B`; // Convert to billions
    } else if (val >= 1e6) {
      return `$${(val / 1e6).toFixed(2)}M`; // Convert to millions
    } else {
      return `$${val.toFixed(2)}`; // Keep as is for smaller values
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
    setOpenModal(true);
  };
  return (
    <>
      <div className="top-container">
        <div className="sameCountry-container" onClick={handleOpen}>
          <div className="slide-background" />
          <div className="sameCountry-image-container">
            <img
              src={
                type === "stock"
                  ? PieChartImg
                  : type === "market"
                  ? CandleStickImg
                  : type === "revenue"
                  ? CalculateImg
                  : IdImg
              }
              alt="jordan"
              height="19px"
              width="20px"
            />
          </div>
          <div className="sameCountry-content-container">
            <div className="sameCountry-content">
              Company Prediction Of{" "}
              {type === "stock"
                ? "Stock Price"
                : type === "market"
                ? "Market Share"
                : type === "revenue"
                ? "Revenue"
                : "Expense"}{" "}
              For 2025
            </div>
            <div className="sameCountry-content-answer">{type !== "market" ? formatValue(values[values.length - 1]) : values[values.length - 1].toFixed(2)}</div>
          </div>
        </div>
      </div>
      <Modal
        size="md"
        open={openModal}
        onClose={handleClose}
        style={{ top: "40px" }}
      >
        <Modal.Body>
          <PredictionChart
            years={years}
            values={values}
            companyName={companyName}
            country={country}
            type={type}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Prediction;
