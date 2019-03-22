import React from "react";
import styled from "styled-components";

import Loading from "../static/image/test.gif";

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

const Spinner = () => {
  return (
    <LoadingGifContainer>
      <div>
        <img src={Loading} width="75px" height="75px" />
        <WhiteText>Loading ...</WhiteText>
      </div>
    </LoadingGifContainer>
  );
};

export default Spinner;
