import React from "react";
import styled from "styled-components";
import axios from "axios";

import BoardTile from "./BoardTile";
import {
  Days,
  MailImage,
  WhitecrowImage,
  PiggyBankImage,
  BriefCaseImage,
  SunImage,
  SleepImage,
  BeachImage,
  MoonImage
} from "../static/TileObjects";
import CardModal from "./CardModal";
import Spinner from "./Spinner";

const PageTitle = styled.h2`
  color: white;
  text-align: center;
`;

const PageDescription = styled.h6`
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
      weeks: [],
      gameTitle: "",
      gameDescrition: "",
      days: [],
      isShowingHand: false,
      loading: true
    };
  }

  showCardPicker = () => {
    this.setState({ isShowingHand: true });
  };

  onClose = () => {
    this.setState({ isShowingHand: false });
  };

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
              onClick={this.showCardPicker}
              key={j}
              color={response["tiles"][j - 1].color}
              title={response["tiles"][j - 1].title}
              description={response["tiles"][j - 1].description}
              action={response["tiles"][j - 1].action}
              date={response["tiles"][j - 1].date}
              dateColor={response["tiles"][j - 1].dateColor}
              dateTextColor={response["tiles"][j - 1].dateTextColor}
              descriptionColor={response["tiles"][j - 1].descriptionColor}
              image={response["tiles"][j - 1].image}
            />
          );
          if (j % 7 === 0) {
            weeks.push(<Wrapper>{week}</Wrapper>);
            week = [];
          }
        }
        this.setState({
          weeks: weeks,
          gameTitle: response["title"],
          gameDescrition: response["description"],
          days: response["days"],
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  stripTitles = data => {
    data["tiles"][34].date = null;
    data["tiles"][33].date = null;
  };

  mapImageToTile = data => {
    let mail = [1, 3, 5, 11, 16, 19, 24, 26];
    mail.forEach(index => {
      data["tiles"][index].image = MailImage;
    });

    data["tiles"][31].image = WhitecrowImage;
    data["tiles"][29].image = BriefCaseImage;

    //Rest Days
    data["tiles"][7].image = SunImage;
    data["tiles"][14].image = BeachImage;
    data["tiles"][21].image = SleepImage;
    data["tiles"][28].image = MoonImage;

    data["tiles"][34].image = PiggyBankImage;
    return data;
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Scrollable>
            <PageTitle>{this.state.gameTitle}</PageTitle>
            <PageDescription>{this.state.gameDescrition}</PageDescription>
            <BoardWrapper>
              <Padding />
              <Days days={this.state.days} />
              <Padding />
              {this.state.weeks}
            </BoardWrapper>
          </Scrollable>
        )}
        {this.state.isShowingHand ? <CardModal onClose={this.onClose} /> : null}
      </React.Fragment>
    );
  }
}
