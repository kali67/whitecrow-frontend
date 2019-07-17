import React from "react";
import styled from "styled-components";
import axios from "axios";

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
import Spinner from "./Spinner";
import BoardTile from "./BoardTile";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const BoardWrapper = styled.div`
  background-color: #c1bdbd;
  width: 980px;
  height: 690px;
  margin-top: 10px;
  border-radius: 20px;
  display: flex; /* establish flex container */
  flex-direction: column; /* make main axis vertical */
  justify-content: center; /* center items vertically, in this case */
  align-items: center; /* center items horizontally, in this case */
  margin: auto;
`;

const Padding = styled.div`
  height: 12.5px;
`;

const Scrollable = styled.div`
  overflow-y: scroll;
  height: 100vh;
  width: 100%;
  display: flex;
`;

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTitle: "",
      gameDescrition: "",
      days: [],
      isShowingHand: false,
      loading: true,
      players: []
    };
  }

  showCardPicker = () => {
    this.setState({ isShowingHand: true });
  };

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.players !== props.players) {
      return {
        players: props.players
      };
    }
    return null;
  }

  componentDidMount() {
    axios
      .get("/board?lang=en", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
      .then(response => {
        response = this.mapImageToTile(response.data);
        this.stripTitles(response);
        this.setState({
          response: response,
          players: this.state.players,
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

  buildTiles = () => {
    let week = [];
    let weeks = [];
    for (var j = 1; j <= 35; j++) {
      week.push(
        <BoardTile
          players={this.state.players}
          onClick={this.showCardPicker}
          key={j}
          color={this.state.response["tiles"][j - 1].color}
          title={this.state.response["tiles"][j - 1].title}
          description={this.state.response["tiles"][j - 1].description}
          action={this.state.response["tiles"][j - 1].action}
          date={this.state.response["tiles"][j - 1].date}
          dateColor={this.state.response["tiles"][j - 1].dateColor}
          dateTextColor={this.state.response["tiles"][j - 1].dateTextColor}
          descriptionColor={this.state.response["tiles"][j - 1].descriptionColor}
          image={this.state.response["tiles"][j - 1].image}
        />
      );
      if (j % 7 === 0) {
        weeks.push(<Wrapper key={j}>{week}</Wrapper>);
        week = [];
      }
    }
    return weeks;
  };

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
          <Scrollable id="game">
            <BoardWrapper>
              <Padding />
              <Days days={this.state.days} />
              <Padding />
              {this.buildTiles()}
            </BoardWrapper>
          </Scrollable>
        )}
      </React.Fragment>
    );
  }
}
