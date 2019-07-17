import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import DropdownMenu, { DropdownItemGroup, DropdownItem } from "@atlaskit/dropdown-menu";

import { WhitecrowBlack } from "../static/TileObjects";
import { LogoutImage } from "../static/TileObjects";

const Page = props => {
  return (
    <React.Fragment>
      <Navbar>
        <Brand>
          <BrandIcon>{WhitecrowBlack}</BrandIcon>
          <BrandText>
            <h3>Whitecrow PM</h3>
          </BrandText>
        </Brand>
        <AccountInfo>
          <DropdownMenu appearance="tall" position="bottom right" trigger={<Avatar />}>
            <DropdownItemGroup>
              <DropdownItem>My Account</DropdownItem>
              <DropdownItem description="test">History</DropdownItem>
              <DropdownItem title="test" href="/login" elemAfter={LogoutImage}>
                Log Out
              </DropdownItem>
            </DropdownItemGroup>
          </DropdownMenu>
        </AccountInfo>
      </Navbar>
      <PageWrapper>{props.children}</PageWrapper>
    </React.Fragment>
  );
};

export default Page;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  margin-right: 10%;
  margin-left: 10%;
  margin-top: 5%;
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
`;

const BrandText = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandIcon = styled.div``;
const AccountInfo = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-end;
  margin-right: 1%;
`;
