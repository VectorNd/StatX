import "../../styles/styles.css";
import FrameImg from "../../../media/Frame.png";

function MainPage() {
  return (
    <div className="App">
      <div className="main-container">
        <div className="flex-column-container" style={{ alignItems: "center" }}>
          <div className="mainPage-image-container">
            <img
              style={{ height: "100%", width: "100%" }}
              src={FrameImg}
              alt="logo"
            />
          </div>
          <div
            className="flex-column-container mainPage-content-container"
          >
            <div className="mainPage-heading"
              
            >
              Welcome to Your Company Insights Hub!
            </div>
            <div className="mainPage-para">
              Dive into the world of financial data!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
