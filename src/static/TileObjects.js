import React from "react";
import styled from "styled-components";

import img from "./image/sunwhite.png";
import piggyBank from "./image/piggybankwhite.png";
import moon from "./image/moonwhite.png";
import sleep from "./image/sleepwhite.png";
import beach from "./image/beachwhite.png";
import mail from "./image/mailwhite.png";
import briefCase from "./image/briefcase.png";
import whitecrow from "./image/whitecrowwhite.png";
import whitecrowBlack from "./image/whitecrow.png";
import hamburger from "./image/hamburger.png";
import logout from "./image/logout.png";

const Day = styled.div`
  background: #3e2a70;
  height: 45px;
  width: 137px;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  color: white;
`;

const LargeImage = styled.div`
  background-image: url(${props => props.image});
  height: 65px;
  width: 65px;
  background-size: cover;
`;

const MediumImage = styled.div`
  background-image: url(${props => props.image});
  height: 40px;
  width: 40px;
  background-size: cover;
`;

const SmallImage = styled.div`
  background-image: url(${props => props.image});
  height: 20px;
  width: 23px;
  background-size: cover;
`;

export const MailImage = <MediumImage image={mail} />;
export const BeachImage = <LargeImage image={beach} />;
export const SunImage = <LargeImage image={img} />;
export const SleepImage = <LargeImage image={sleep} />;
export const MoonImage = <LargeImage image={moon} />;
export const BriefCaseImage = <MediumImage image={briefCase} />;
export const WhitecrowImage = <MediumImage image={whitecrow} />;
export const WhitecrowBlack = <MediumImage image={whitecrowBlack} />;
export const HamburgerImage = <MediumImage image={hamburger} />;
export const PiggyBankImage = <LargeImage image={piggyBank} />;
export const LogoutImage = <SmallImage image={logout} />;

const DayFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Days = props => {
  return (
    <DayFlex>
      <Day>{props.days[0]}</Day>
      <Day>{props.days[1]}</Day>
      <Day>{props.days[2]}</Day>
      <Day>{props.days[3]}</Day>
      <Day>{props.days[4]}</Day>
      <Day>{props.days[5]}</Day>
      <Day>{props.days[6]}</Day>
    </DayFlex>
  );
};
