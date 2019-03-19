import React from "react";
import styled from "styled-components";
import axios from "axios";

import BoardTile from "./BoardTile";
import {
  days,
  MailImage,
  WhitecrowImage,
  PiggyBankImage,
  BriefCaseImage,
  SunImage,
  SleepImage,
  BeachImage,
  MoonImage
} from "../static/TileObjects";
import Navbar from "./Navbar";

const PageTitle = styled.h1`
  color: white;
  text-align: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

const BoardWrapper = styled.div`
  background-color: #c1bdbd;
  width: 980px;
  height: 682px;
  margin-top: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const DayFlex = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

const Padding = styled.div`
  height: 12.5px;
`;

const Scrollable = styled.div`
  overflow-y: scroll;
  height: 92vh;
`;

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: []
    };
  }

  componentDidMount() {
    let week = [];
    let weeks = [];

    axios
      .get("/board?lang=en")
      .then(response => {
        response = this.mapImageToTile(response.data);
        this.stripTitles(response);
        for (var j = 1; j <= 35; j++) {
          week.push(
            <BoardTile
              key={j}
              color={response[j - 1].color}
              title={response[j - 1].title}
              description={response[j - 1].description}
              action={response[j - 1].action}
              date={response[j - 1].date}
              dateColor={response[j - 1].dateColor}
              dateTextColor={response[j - 1].dateTextColor}
              descriptionColor={response[j - 1].descriptionColor}
              image={response[j - 1].image}
            />
          );
          if (j % 7 === 0) {
            weeks.push(<Wrapper>{week}</Wrapper>);
            week = [];
          }
        }
        this.setState({ weeks: weeks });
      })
      .catch(error => {
        console.log(error);
      });
  }

  stripTitles = data => {
    data[34].date = null;
    data[33].date = null;
  };

  mapImageToTile = data => {
    let mail = [1, 3, 5, 11, 16, 19, 24, 26];
    mail.forEach(index => {
      data[index].image = MailImage;
    });

    data[31].image = WhitecrowImage;
    data[29].image = BriefCaseImage;

    //Rest Days
    data[7].image = SunImage;
    data[14].image = BeachImage;
    data[21].image = SleepImage;
    data[28].image = MoonImage;

    data[34].image = PiggyBankImage;
    return data;
  };

  render() {
    return (
      <React.Fragment>
        <Scrollable>
          <PageTitle>Hello world?</PageTitle>
          <BoardWrapper>
            <Padding />
            <DayFlex>{days}</DayFlex>
            <Padding />
            {this.state.weeks}
          </BoardWrapper>
        </Scrollable>

        {/* <Navbar /> */}
      </React.Fragment>
    );
  }
}
