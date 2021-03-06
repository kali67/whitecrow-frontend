import React from "react";
import styled from "styled-components";
import Spinner from "@atlaskit/spinner";

import Loading from "../../static/image/test.gif";

/**
 * Spinner container a semi circle. Pure
 * UI component that uses GIF as animation.
 */
const SpinnerSemiCircle = () => {
  return (
    <LoadingGifContainer>
      <div>
        <img alt="spinner" src={Loading} width="75px" height="75px" />
        <WhiteText>Loading ...</WhiteText>
      </div>
    </LoadingGifContainer>
  );
};

/**
 * Full circle spinner, this uses the atlaskit
 * spinner for page loading.
 */
export const SpinnerFullCircle = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
    }}>
    <Spinner size="large" />
  </div>
);

export default SpinnerSemiCircle;

const LoadingGifContainer = styled.div`
  z-index: 1;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const WhiteText = styled.h6`
    margin-top: 50px
  color: white;
`;