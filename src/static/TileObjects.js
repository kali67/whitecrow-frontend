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

const Day = styled.div`
  background: #3e2a70;
  height: 50px;
  width: 152px;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  color: white;
`;

const LargeImage = styled.div`
  background-image: url(${props => props.image});
  height: 70px;
  width: 70px;
  background-size: cover;
`;

const MediumImage = styled.div`
  background-image: url(${props => props.image});
  height: 50px;
  width: 50px;
  background-size: cover;
`;

export const days = [
  <Day>Sun</Day>,
  <Day>Mon</Day>,
  <Day>Tue</Day>,
  <Day>Wed</Day>,
  <Day>Thu</Day>,
  <Day>Fri</Day>,
  <Day>Sat</Day>
];

export const tileInformation = [
  { color: "#181517", title: "Start" },
  {
    date: 1,
    color: "#549A8B",
    dateColor: "#E3613A",
    title: "Mail",
    action: "Take a mail card.",
    image: <MediumImage image={mail} />
  },
  {
    date: 2,
    color: "#612E73",
    dateColor: "#F2EB67",
    title: "Bonus",
    description: "Good News! Got paid for last project.",
    action: "Recieve $500"
  },
  {
    date: 3,
    color: "#549A8B",
    dateColor: "#D14873",
    title: "Mail",
    action: "Take a mail card.",
    image: <MediumImage image={mail} />
  },
  {
    date: 4,
    color: "#96B94F",
    dateColor: "#632C7F",
    dateTextColor: "#FFFFFF",
    title: "Opportunity",
    description: "Opportunity for improvement. Take it of leave it."
  },
  {
    date: 5,
    color: "#549A8B",
    dateColor: "#DC402E",
    title: "Mail",
    action: "Take a mail card.",
    image: <MediumImage image={mail} />
  },
  {
    date: 6,
    color: "#E69043",
    dateColor: "#32356F",
    dateTextColor: "#FFFFFF",
    title: "Expense",
    description:
      "A natural disaster occurred. This action applies to everyone.",
    action: "Pay $100"
  },
  {
    date: 7,
    color: "#69A0CB",
    dateColor: "#E3613A",
    title: "Rest Day",
    image: <LargeImage image={img} />
  },
  {
    date: 8,
    color: "#612E73",
    dateColor: "#F2EB67",
    title: "Bonus",
    description: "You won the SQL query contest!",
    action: "Recieve $250"
  },
  {
    date: 9,
    color: "#96B94F",
    dateColor: "#D14873",
    title: "Opportunity",
    description: "Opportunity for improvement. Take it of leave it."
  },
  {
    date: 10,
    color: "#D63D82",
    dateColor: "#632C7F",
    dateTextColor: "#FFFFFF",
    title: "Gamble",
    description:
      "Each player contributes money, highest number on the die takes all!",
    action: "Pay $100"
  },
  {
    date: 11,
    color: "#549A8B",
    dateColor: "#DC402E",
    title: "Mail",
    action: "Take a mail card.",
    image: <MediumImage image={mail} />
  },
  {
    date: 12,
    color: "#96B94F",
    dateColor: "#32356F",
    dateTextColor: "#FFFFFF",
    title: "Opportunity",
    description: "Opportunity for improvement. Take it of leave it."
  },
  {
    date: 13,
    color: "#E69043",
    dateColor: "#8E325B",
    dateTextColor: "#FFFFFF",
    title: "Expense",
    description: "The server hosting bill arrives.",
    action: "Pay $75"
  },
  {
    date: 14,
    color: "#69A0CB",
    dateColor: "#F2F1E7",
    title: "Rest Day",
    image: <LargeImage image={beach} />
  },
  {
    date: 15,
    color: "#612E73",
    dateColor: "#99BB52",
    title: "Bonus",
    description: "Productivity bonus",
    action: "Recieve $150"
  },
  {
    date: 16,
    color: "#549A8B",
    dateColor: "#F2F1E7",
    title: "Mail",
    action: "Take a mail card.",
    image: <MediumImage image={mail} />
  },
  {
    date: 17,
    color: "#96B94F",
    dateColor: "#632C7F",
    dateTextColor: "#FFFFFF",
    title: "Opportunity",
    description: "Opportunity for improvement. Take it of leave it."
  },
  {
    date: 18,
    color: "#E69043",
    dateColor: "#DC402E",
    title: "Expense",
    description: "The phone and internet bill arrives.",
    action: "Pay $75"
  },
  {
    date: 19,
    color: "#549A8B",
    dateColor: "#5D3172",
    dateTextColor: "#FFFFFF",
    title: "Mail",
    action: "Take a mail card.",
    image: <MediumImage image={mail} />
  },
  {
    date: 20,
    color: "#D63D82",
    dateColor: "#F2EB67",
    title: "Change",
    description: "Last minute chagen, everyone go back a day."
  },
  {
    date: 21,
    color: "#69A0CB",
    dateColor: "#32356F",
    dateTextColor: "#FFFFFF",
    title: "Rest Day",
    image: <LargeImage image={sleep} />
  },
  {
    date: 22,
    color: "#E69043",
    dateColor: "#F2EB67",
    title: "Expense",
    description: "The electricity bill arrives.",
    action: "Pay $75"
  },
  {
    date: 23,
    color: "#96B94F",
    dateColor: "#D14873",
    title: "Opportunity",
    description: "Opportunity for improvement. Take it of leave it."
  },
  {
    date: 24,
    color: "#549A8B",
    dateColor: "#977F6B",
    title: "Mail",
    action: "Take a mail card.",
    image: <MediumImage image={mail} />
  },
  {
    date: 25,
    color: "#D63D82",
    dateColor: "#F0A45A",
    title: "New CEO",
    description: "Everyone contribute",
    action: "Pay $50"
  },
  {
    date: 26,
    color: "#549A8B",
    dateColor: "#DC402E",
    dateTextColor: "#FFFFFF",
    title: "Mail",
    action: "Take a mail card.",
    image: <MediumImage image={mail} />
  },
  {
    date: 27,
    color: "#96B94F",
    dateColor: "#8E325B",
    dateTextColor: "#FFFFFF",
    title: "Opportunity",
    description: "Opportunity for improvement. Take it of leave it."
  },
  {
    date: 28,
    color: "#69A0CB",
    dateColor: "#F2F1E7",
    title: "Rest Day",
    image: <LargeImage image={moon} />
  },
  {
    date: 29,
    color: "#F8DA56",
    dateColor: "#5D3172",
    dateTextColor: "#FFFFFF",
    title: "",
    description: "For the next 2 weeks, your expenses are reduced by 50%.",
    descriptionColor: "#000000",
    image: <MediumImage image={briefCase} />
  },
  {
    date: 30,
    color: "#96B94F",
    dateColor: "#E6933E",
    title: "Opportunity",
    description: "Opportunity for improvement. Take it of leave it."
  },
  {
    date: 31,
    description: "DAY OF THE WHITE CROW",
    color: "#181517",
    dateColor: "#632C7F",
    dateTextColor: "#FFFFFF",
    action: "Recieve $325",
    image: <MediumImage image={whitecrow} />
  },
  { color: "#c1bdbd", title: "" },
  {
    color: "#A53B37",
    title: "",
    description:
      "Here is the $$$ that was collected duing the election of the new CEO of the company.",
    action: "First player to roll a 6 takes all."
  },
  { color: "#A53B37", title: "", image: <LargeImage image={piggyBank} /> }
];
