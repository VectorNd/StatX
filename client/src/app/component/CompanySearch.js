import React, { useContext, useState, useRef, useEffect } from "react";
import { SERVER_ENDPOINT } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Popover, Whisper, Loader, Modal, Button } from "rsuite";
import SelectedImg from "../../media/Selected.png";
import "./styles.css";

const CompanySearch = () => {
  const [input, setInput] = useState("");
  const [companies, setCompanies] = useState([]);
  const { jwt } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${SERVER_ENDPOINT}/api/v1/company/searchCompanies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ input }),
        }
      );
      const parsedResponse = await response.json();

      if (parsedResponse.status != "SUCCESS") {
        throw new Error("Network response was not ok");
      }
      setCompanies(parsedResponse.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const selectCompany = (company) => {
    console.log("Selected company:", company);
    navigate(`/companyMetrics`, { state: { companyCode: company.code } });
  };

  const handleHistory = () => {
    navigate("/history");
  };

  const handleSearchChange = (e) => {
    setInput(e.target.value);
    handleSearch();
    handleChange();
  };
  const handleChange = (value) => {
    if (value) {
      setOpen(true);
    } else {
      setOpen(false);
      setCompanies([]);
    }
  };

  const handleOpen = (company) => {
    setOpen(false);
    setCompanies([]);
    setInput("");
    handleCompute(company.code);
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);

  const handleCompute = async (companyCode) => {
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
      setMsg(error.message);
      console.error("Error fetching metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const speaker = (
    <Popover
      style={{
        display: input ? "block" : "none",
        width: "250px",
        maxHeight: "350px",
        overflow: "auto",
      }}
    >
      <div>
        {companies.length > 0 ? (
          <div className="search-content-container">
            {companies.map((company) => (
              <div
                className="search-content"
                key={company._id}
                onClick={() => handleOpen(company)}
              >
                {company.name} ({company.code})
                {history.some(
                  (company) =>
                    company.companyCode === company.code &&
                    company.name === company.name
                ) ? (
                  <div style={{ margin: "0 20px 0 0", flex: "0" }}>
                    <img
                      src={SelectedImg}
                      alt="searched"
                      height="15px"
                      width="15px"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Loader className="flex-center-container" />
        )}
      </div>
    </Popover>
  );

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

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

  return (
    <div>
      <div>
        <div className="App">
          <Whisper
            placement="bottom"
            trigger="click"
            controlId="control-id-bottom"
            speaker={speaker}
            className="flex-column-container"
          >
            <input
              type="text"
              placeholder="Enter Your Password Here"
              value={input}
              onChange={handleSearchChange}
              className="login-apps"
              style={{
                width: "250px",
                paddingLeft: "10px",
                paddingRight: "5px",
                margin: "0",
                position: "absolute",
                left: "30%",
                top: "40%",
              }}
            />
          </Whisper>

          <Modal size="md" open={openModal} onClose={handleClose}>
            {loading && (<Modal.Header>
                  <Modal.Title><Loader/></Modal.Title>
                </Modal.Header>)}

            {metrics && (
              <>
                <Modal.Header>
                  <Modal.Title>Metrics:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <p>
                      Total Companies in Country:{" "}
                      {metrics.totalCompaniesInCountry}
                    </p>
                    <p>Greater Diversity: {metrics.greaterDiversity}</p>
                    <p>
                      Stock Price Comparison (Domestic):{" "}
                      {metrics.stockPriceComparison.domestic}
                    </p>
                    <p>
                      Market Share Prediction:{" "}
                      {metrics.predictions.predictedMarketShare}
                    </p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleClose} appearance="subtle">
                    Cancel
                  </Button>
                  <Button onClick={handleClose} appearance="primary">
                    Ok
                  </Button>
                </Modal.Footer>
              </>
            )}

            {msg && handleClose()}
          </Modal>

          <button onClick={handleHistory}>History</button>
        </div>
      </div>
    </div>
  );
};

export default CompanySearch;
