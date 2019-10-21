import React from "react";
import styled from "styled-components";
import Avatar from "../components/Login/Avatar";

import { WhitecrowBlack } from "../static/TileObjects";
import { LogoutImage } from "../static/TileObjects";
import { Translate } from "react-localize-redux";

/**
 * View component of a page with a navbar like
 * that on the home page. This also wraps full components
 * and displays them in the center of the page.
 */
const Page = props => {
  return (
    <React.Fragment>
      <Navbar>
        <Brand onClick={() => props.history.push("/home")}>
          <BrandIcon>{WhitecrowBlack}</BrandIcon>
          <BrandText>
            <h3>
              <Translate id="logo" />
            </h3>
          </BrandText>
        </Brand>
        <AccountInfo>
          <AccountBtn onClick={() => props.history.push("/account")}>
            <TextWrapperBtn>
              <h6>
                <Translate id="account" />
              </h6>
            </TextWrapperBtn>
            <Avatar />
          </AccountBtn>
          <AccountBtn onClick={() => props.history.push("/login")}>
            <TextWrapperBtn>
              <h6>
                <Translate id="logout" />
              </h6>
            </TextWrapperBtn>
            <div style={{ cursor: "pointer" }}>{LogoutImage}</div>
          </AccountBtn>
        </AccountInfo>
      </Navbar>
      <PageWrapper>{props.children}</PageWrapper>
    </React.Fragment>
  );
};

export default Page;

const TextWrapperBtn = styled.div`
  display: flex;
  cursor: pointer;
  margin-right: 5px;
`;

const AccountBtn = styled.div`
  display: flex;
  width: auto;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 30px;
  margin-left: 20px;
  cursor: pointer;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  margin-right: 10%;
  margin-left: 10%;
  margin-top: 5%;
  height: 85vh;
`;

const Navbar = styled.nav`
  background: #f8f9fa;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Brand = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  padding: 0.5%;
  padding-left: 2%;
  cursor: pointer;
`;

const BrandText = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 5%;
  white-space: nowrap;
  cursor: pointer;
`;

const BrandIcon = styled.div``;
const AccountInfo = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  justify-content: flex-end;
  margin-right: 1%;
  white-space: nowrap;
`;
