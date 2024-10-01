import React from "react";
import styled, { keyframes, css } from "styled-components";
import "../../styles/styles.css";

function History({ history, onCompute }) {
  return (
    <AppContainer>
      <Wrapper>
        <Text>Wanna Visit Again ?</Text>
        <Note>
          Your search history is displayed below for your convenience!
        </Note>
        {history.length > 3 ? (
          <Marquee>
            <MarqueeGroup>
              {history?.map((el, index) => (
                <ImageGroup onClick={() => onCompute(el)}>
                  <Image>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>{el.name}</div>
                      <div>({el.companyCode})</div>
                    </div>
                  </Image>
                </ImageGroup>
              ))}
            </MarqueeGroup>
            <MarqueeGroup>
              {history?.map((el) => (
                <ImageGroup onClick={() => onCompute(el)}>
                  <Image>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>{el.name}</div>
                      <div>({el.companyCode})</div>
                    </div>
                  </Image>
                </ImageGroup>
              ))}
            </MarqueeGroup>
          </Marquee>
        ) : (
          <Marquee>
            <MarqueeGroup1>
              {history?.map((el, index) => (
                <ImageGroup onClick={() => onCompute(el)}>
                  <Image>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>{el.name}</div>
                      <div>({el.companyCode})</div>
                    </div>
                  </Image>
                </ImageGroup>
              ))}
            </MarqueeGroup1>
            <MarqueeGroup1>
              {history?.map((el) => (
                <ImageGroup onClick={() => onCompute(el)}>
                  <Image>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>{el.name}</div>
                      <div>({el.companyCode})</div>
                    </div>
                  </Image>
                </ImageGroup>
              ))}
            </MarqueeGroup1>
          </Marquee>
        )}
        {history.length > 5 && (
          <Marquee>
            <MarqueeGroup2>
              {history
                ?.slice()
                .reverse()
                .map((el) => (
                  <ImageGroup onClick={() => onCompute(el)}>
                    <Image>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div>{el.name}</div>
                        <div>({el.companyCode})</div>
                      </div>
                    </Image>
                  </ImageGroup>
                ))}
            </MarqueeGroup2>
            <MarqueeGroup2>
              {history
                ?.slice()
                .reverse()
                .map((el) => (
                  <ImageGroup onClick={() => onCompute(el)}>
                    <Image>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div>{el.name}</div>
                        <div>({el.companyCode})</div>
                      </div>
                    </Image>
                  </ImageGroup>
                ))}
            </MarqueeGroup2>
          </Marquee>
        )}
      </Wrapper>
    </AppContainer>
  );
}

export default History;

const AppContainer = styled.div`
  width: 100vw;
  color: #000000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
  z-index: 2;

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    margin: 10px 0px;
  }

  @media screen and (max-width: 767px) {
    margin: 5px 0px;
  }

  @media screen and (max-width: 540px) {
    margin: 0px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 767px) {
    padding: 0 15px;
  }

  @media screen and (max-width: 540px) {
    padding: 0 10px;
  }
`;

const Text = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #02203c;

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    font-size: 30px;
  }

  @media screen and (max-width: 767px) {
    font-size: 28px;
  }

  @media screen and (max-width: 540px) {
    font-size: 24px;
  }
`;

const Note = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 200;
  margin-bottom: 40px;
  color: #7c8e9a;

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 767px) {
    font-size: 15px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 540px) {
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

const Marquee = styled.div`
  display: flex;
  width: 600px;
  overflow: hidden;
  user-select: none;

  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    width: 500px;
  }

  @media screen and (max-width: 767px) {
    width: 400px;
  }

  @media screen and (max-width: 540px) {
    width: 300px;
  }
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  white-space: nowrap;
  width: 600px;
  animation: ${scrollX} 30s linear infinite;
  flex-wrap: nowrap;
  justify-content: space-evenly;

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    animation-duration: 25s;
  }

  @media screen and (max-width: 767px) {
    animation-duration: 20s;
  }

  @media screen and (max-width: 540px) {
    animation-duration: 15s;
  }
`;

const MarqueeGroup = styled.div`
  ${common}
`;

const MarqueeGroup1 = styled.div`
  ${common}
  width: 300px;
`;

const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;
`;

const ImageGroup = styled.div`
  display: flex;
  place-items: center;
  margin: 20px;
  flex-wrap: wrap;

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    margin: 15px;
  }

  @media screen and (max-width: 767px) {
    margin: 10px;
  }

  @media screen and (max-width: 540px) {
    margin: 5px;
  }
`;

const Image = styled.div`
  display: inline-block;
  cursor: pointer;
  border-radius: 25px;
  padding: 25px;
  box-shadow: inset 1px -1px 20px 0px #a0a0a0;
  width: 80%;

  @media screen and (max-width: 1024px) and (min-width: 768px) {
    padding: 20px;
    box-shadow: inset 1px -1px 15px 0px #a0a0a0;
  }

  @media screen and (max-width: 767px) {
    padding: 15px;
    box-shadow: inset 1px -1px 10px 0px #a0a0a0;
  }

  @media screen and (max-width: 540px) {
    padding: 10px;
    box-shadow: inset 1px -1px 8px 0px #a0a0a0;
  }
`;
