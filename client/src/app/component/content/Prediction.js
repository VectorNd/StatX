import React, { useState } from "react";
import IdImg from "../../../media/Id.png";
import PieChartImg from "../../../media/PieChart.png";
import CandleStickImg from "../../../media/CandleStick.png";
import CalculateImg from "../../../media/Calculate.png";
import "../../styles/styles.css";
import { Modal } from "rsuite";

const Prediction = ({ data, type }) => {
  const [openModal, setOpenModal] = useState(false);
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
            <div className="sameCountry-content-answer">{data}</div>
          </div>
        </div>
      </div>
      <Modal size="md" open={openModal} onClose={handleClose} style={{top: "60px"}}>
          <Modal.Header>
            <Modal.Title>
              "HII"
            </Modal.Title>
          </Modal.Header> 
            <Modal.Body>
              "agdhafhkdsjhjksdhjksdh"
            </Modal.Body>
      </Modal>
    </>
  );
};

export default Prediction;
