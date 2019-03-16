import React from "react";
import styled from "styled-components";

import img from "./image/starting_flags.png";

const Day = styled.div`
  background: #3e2a70;
  height: 50px;
  width: 152px;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  color: white;
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
  { color: "#181517", title: "Start", image: img },
  {
    date: 1,
    color: "#549A8B",
    dateColor: "#E3613A",
    title: "Mail",
    description: "Take a mail card."
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
    description: "Recieved mail, take a mail card."
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
    description: "Take a mail card."
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
  { date: 7, color: "#69A0CB", dateColor: "#E3613A", title: "Rest Day" },
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
    description: "Take a mail card."
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
  { date: 14, color: "#69A0CB", dateColor: "#F2F1E7", title: "Rest Day" },
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
    description: "Take a mail card."
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
    description: "Take a mail card."
  },
  {
    date: 20,
    color: "#D63D82",
    dateColor: "#F2EB67",
    title: "Change",
    description: "Everyone go back a day"
  },
  {
    date: 21,
    color: "#69A0CB",
    dateColor: "#32356F",
    dateTextColor: "#FFFFFF",
    title: "Rest Day"
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
    description: "Recieved mail, take a mail card."
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
    description: "Take a mail card."
  },
  {
    date: 27,
    color: "#96B94F",
    dateColor: "#8E325B",
    dateTextColor: "#FFFFFF",
    title: "Opportunity",
    description: "Opportunity for improvement. Take it of leave it."
  },
  { date: 28, color: "#69A0CB", dateColor: "#F2F1E7", title: "Rest Day" },
  {
    date: 29,
    color: "#F8DA56",
    dateColor: "#5D3172",
    dateTextColor: "#FFFFFF",
    title: "",
    description: "For the next 2 weeks, your expenses are reduced by 50%.",
    descriptionColor: "#000000"
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
    action: "Recieve $325"
  },
  { color: "#c1bdbd", title: "" },
  { color: "#A53B37", title: "" },
  { color: "#A53B37", title: "" }
];
