import React from "react";
import styled from "styled-components";

import BoardTile from "./BoardTile";
import { days, tileInformation } from "../static/TileObjects";

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
  width: 1090px;
  height: 725px;
  margin-top: 10px;
  border-radius: 20px;
  position: relative;
  margin-left: 150px;
`;

const DayFlex = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

const Padding = styled.div`
  height: 12.5px;
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
    for (var j = 1; j <= 35; j++) {
      week.push(
        <BoardTile
          key={j}
          color={tileInformation[j - 1].color}
          title={tileInformation[j - 1].title}
          description={tileInformation[j - 1].description}
          action={tileInformation[j - 1].action}
          date={tileInformation[j - 1].date}
          dateColor={tileInformation[j - 1].dateColor}
          dateTextColor={tileInformation[j - 1].dateTextColor}
          descriptionColor={tileInformation[j - 1].descriptionColor}
          image={tileInformation[j - 1].image}
        />
      );
      if (j % 7 === 0) {
        weeks.push(<Wrapper>{week}</Wrapper>);
        week = [];
      }
    }
    this.setState({ weeks: weeks });
  }

  render() {
    return (
      <React.Fragment>
        <PageTitle>What Could Go Wrong in a Software Project?</PageTitle>
        <BoardWrapper>
          <Padding />
          <DayFlex>{days}</DayFlex>
          <Padding />
          {this.state.weeks}
        </BoardWrapper>
      </React.Fragment>
    );
  }
}
