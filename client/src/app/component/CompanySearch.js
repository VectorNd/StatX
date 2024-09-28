import React, { useContext, useState, useRef, useEffect, useCallback } from "react";
import { SERVER_ENDPOINT } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Popover, Whisper, Loader, Modal, Button } from "rsuite";
import SelectedImg from "../../media/Selected.png";
import SearchImg from "../../media/Search.png";
import Search2Img from "../../media/Search2.png";
import "./styles.css";
import CompanyMetrics from "./CompanyMetrics";
import History2 from "./History2";

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
    handleCompute(company._id);
    setOpenModal(true);
  };

  const handleHistoryClick = (company) => {
    handleCompute(company.metrics.id);
    setOpenModal(true);
  };

  const handleClose = () => {
    setMetrics(null);
    setOpenModal(false);
  }

  const handleCompute = async (id) => {
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
          body: JSON.stringify({ id }),
        }
      );

      const parsedResponse = await response.json();
      if (parsedResponse.status != "SUCCESS") {
        throw new Error("Network response was not ok");
      }
      setMetrics(parsedResponse.data.metrics);
      console.log(parsedResponse.data.metrics);
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
        maxHeight: "200px",
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
                  (item) =>
                    item.companyCode === company.code &&
                    item.name === company.name
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
  }, [openModal]);

  return (
    <div>
      <div>
        <div className="App">
          <div style={{position: "absolute"}}>

        <div
              className={`background-icons-full`}
            ></div>
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              zIndex: "2",
              position: "relative"
            }}
          >
            <div
              style={{
                width: "100%",
                minHeight: "500px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                    width: "250px",
                    margin: "50px",
                  }}
                >
                  <img
                    src={SearchImg}
                    alt="searched"
                    height="100%"
                    width="100%"
                  />
                </div>
              </div>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#292929",
                        fontSize: "30px",
                        fontFamily: "cursive",
                        width: "60%",
                        textAlign: "center",
                      }}
                    >
                      Welcome to Your Company Insights Hub!
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "30px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#292929",
                        fontSize: "18px",
                        fontFamily: "sans-serif",
                        width: "50%",
                        textAlign: "center",
                      }}
                    >
                      Get ready to explore a treasure trove of financial data and unveil the trends that shape your business landscape!
                    </div>
                  </div>
                </div>
                <div style={{ margin: "50px", marginTop: "10px" }}>
                  <Whisper
                    placement="bottom"
                    trigger="click"
                    controlId="control-id-bottom"
                    speaker={speaker}
                    className="flex-column-container"
                  >
                    <input
                      type="text"
                      placeholder="Enter Your Company Here"
                      value={input}
                      onChange={handleSearchChange}
                      className="login-apps"
                      style={{
                        width: "250px",
                        paddingLeft: "10px",
                        paddingRight: "5px",
                        margin: "0",
                      }}
                    />
                  </Whisper>
                </div>
              </div>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                    width: "250px",
                    margin: "50px",
                  }}
                >
                  <img
                    src={Search2Img}
                    alt="searched"
                    height="100%"
                    width="100%"
                  />
                </div>
              </div>
            </div>
            <div style={{ height: "300px" }}>
              {/* <button onClick={handleHistory}>History</button> */}
              <History2 history={history} onCompute={handleHistoryClick}/>
            </div>
          </div>

          <Modal size="lg" open={openModal} onClose={handleClose}>
            {loading && (
              <Modal.Header>
                <Modal.Title>
                  <Loader />
                </Modal.Title>
              </Modal.Header>
            )}

            {metrics && (
              <>
                <Modal.Header>
                  <Modal.Title>Dashboard</Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    minHeight: "600px",
                    backgroundColor: "#f6f6f6",
                  }}
                >
                  {/* <div>
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
                  </div> */}
                  <CompanyMetrics data={metrics}/>
                </Modal.Body>
                {/* <Modal.Footer>
                  <Button onClick={handleClose} appearance="subtle">
                    Cancel
                  </Button>
                  <Button onClick={handleClose} appearance="primary">
                    Ok
                  </Button>
                </Modal.Footer> */}
              </>
            )}

            {msg && handleClose(metrics)}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CompanySearch;
