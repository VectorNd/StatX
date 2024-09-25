import "./styles.css";
import FrameImg from "../../media/Frame.png";

function MainPage() {
  return (
    <div className="App">
      <div className="main-container">
        <div className="flex-column-container" style={{ alignItems: "center" }}>
          <div style={{ width: "120px", height: "120px" }}>
            <img
              style={{ height: "100%", width: "100%" }}
              src={FrameImg}
              alt="logo"
            />
          </div>
          <div
            className="flex-column-container"
            style={{ alignItems: "center", height: "180px" }}
          >
            <div
              style={{ fontSize: "30px", width: "200px", fontWeight: "bolder" }}
            >
              Welcome to Your Company Insights Hub!
            </div>
            <div style={{ fontSize: "15px", width: "200px" }}>
              Dive into the world of financial data!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
