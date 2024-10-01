import React, { useContext, useState, useRef, useEffect } from "react";
import { SERVER_ENDPOINT } from "../../../utils/constants";
import { AuthContext } from "../../../context/AuthContext";
import { Popover, Whisper, Loader, Modal } from "rsuite";
import SelectedImg from "../../../media/Selected.png";
import SearchImg from "../../../media/Search.png";
import Search2Img from "../../../media/Search2.png";
import "../../styles/styles.css";
import CompanyMetrics from "./CompanyMetrics";
import History from "../content/History";
import { useNavigate } from "react-router";

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

      if (parsedResponse.status !== "SUCCESS") {
        throw new Error("Network response was not ok");
      }
      setCompanies(parsedResponse.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
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
  };

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
      if (parsedResponse.status !== "SUCCESS") {
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
      className="search-popover"
      style={{
        display: input ? "block" : "none",
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
                  <div className="history-tick-image-container">
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
    if (!jwt) {
      navigate('/login');
    }
  }, [jwt, navigate]);

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
        if (parsedResponse.status !== "SUCCESS") {
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
          <div style={{ position: "absolute" }}>
            <div className={`background-icons-full`}></div>
          </div>
          <div className="search-container">
            <div className="search-upper-div">
              <div className="search-images-div">
                <div className="search-image">
                  <img
                    src={SearchImg}
                    alt="searched"
                    height="100%"
                    width="100%"
                  />
                </div>
              </div>
              <div className="search-upper-mid-div">
                <div>
                  <div className="search-company-content-div-heading">
                    <div className="search-company-content-div-heading-content">
                      Welcome to Your Company Insights Hub!
                    </div>
                  </div>
                  <div className="search-company-content-div-para">
                    <div className="search-company-content-div-para-heading">
                      Get ready to explore a treasure trove of financial data
                      and unveil the trends that shape your business landscape!
                    </div>
                  </div>
                </div>
                <div className="search-page-search-box">
                  <Whisper
                    placement="bottom"
                    trigger="click"
                    controlId="control-id-bottom"
                    speaker={speaker}
                    className="search-modal flex-column-container"
                  >
                    <input
                      type="text"
                      placeholder="Enter Your Company Here"
                      value={input}
                      onChange={handleSearchChange}
                      className="login-apps search-page-input"
                    />
                  </Whisper>
                </div>
              </div>
              <div className="search-images-div search-images-div1">
                <div className="search-image">
                  <img
                    src={Search2Img}
                    alt="searched"
                    height="100%"
                    width="100%"
                  />
                </div>
              </div>
            </div>
            <div className="search-history-container">
              <History history={history} onCompute={handleHistoryClick} />
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
                <Modal.Body className="search-modal-body">
                  <CompanyMetrics data={metrics} />
                </Modal.Body>
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
