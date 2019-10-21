import React from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";

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
} from "../../static/TileObjects";
import { SpinnerFullCircle } from "../Animations/Spinner";
import BoardTile from "./BoardTile";

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTitle: "",
      gameDescrition: "",
      days: [],
      loading: true,
      players: []
    };
  }

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
      .get(`/board?lang=${this.props.activeLanguage}`, {
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

  /**
   * Builds every single tile component. Each 7 tiles is
   * wrapped in a wrapper which forces them to display
   * horizontally.
   * @returns all board tiles as view components.
   */
  buildTiles = () => {
    let week = [];
    let weeks = [];
    for (var j = 1; j <= 35; j++) {
      week.push(
        <BoardTile
          players={this.state.players}
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

  /**
   * removes dates from tiles that do not need them
   * i.e. last few tiles of the board.
   */
  stripTitles = data => {
    data["tiles"][34].date = null;
    data["tiles"][33].date = null;
  };

  /**
   * Maps images to tiles, i.e. mail, rest day etc.
   * These tiles are predefined from the game board.
   */
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
    if (this.state.loading) {
      return <SpinnerFullCircle />;
    }
    return (
      <Scrollable id="game">
        <BoardWrapper>
          <Padding />
          <Days days={this.state.days} />
          <Padding />
          {this.buildTiles()}
        </BoardWrapper>
      </Scrollable>
    );
  }
}

const mapStateToProps = state => ({
  activeLanguage: state.localize.languages.filter(value => {
    return value.active;
  })[0].code
});

export default connect(
  mapStateToProps,
  {}
)(GameBoard);

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
