import React from "react";
import styled, { keyframes, css } from "styled-components";

function History2({ history, onCompute }) {
  return (
    <AppContainer>
      <Wrapper>
        <Text>Wanna Visit Again ?</Text>
        <Note>
          Your search history is displayed below for your convenience!
        </Note>
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
                    <div>
                      ({el.companyCode})
                    </div>
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
                    <div>
                      ({el.companyCode})
                    </div>
                  </div>
                </Image>
              </ImageGroup>
            ))}
          </MarqueeGroup>
        </Marquee>
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
                      <div>
                        ({el.companyCode})
                      </div>
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
                      <div>
                        ({el.companyCode})
                      </div>
                    </div>
                  </Image>
                </ImageGroup>
              ))}
          </MarqueeGroup2>
        </Marquee>
      </Wrapper>
    </AppContainer>
  );
}

export default History2;

const AppContainer = styled.div`
  width: 100vw;
  //   height: 100vh;
  color: #000000;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px;
  z-index: 2;
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #02203c;
`;

const Note = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 40px;
  color: #7c8e9a;
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
  width: 100%;
  animation: ${scrollX} 30s linear infinite;
`;

const MarqueeGroup = styled.div`
  ${common}
`;
const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;
`;

const ImageGroup = styled.div`
  display: flex;
  place-items: center;
  //   width: clamp(2rem, 1rem + 20vmin, 10rem);
  //   padding: calc(clamp(2rem, 1rem + 20vmin, 20rem) / 10);
  margin: 20px;
`;

const Image = styled.div`
  //   object-fit: contain;
  //   width: 100%;
  //   height: 100%;
  //   /* border: 1px solid black; */
  //   border-radius: 0.5rem;
  //   aspect-ratio: 16/9;
  //   padding: 5px 20px;
  //   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: inline-block;
  cursor: pointer;
  border-radius: 25px;
  padding: 25px;
  box-shadow: inset 1px -1px 20px 0px #a0a0a0;
`;
