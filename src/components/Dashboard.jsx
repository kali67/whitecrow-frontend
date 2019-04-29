import React from "react";
import styled from "styled-components";
import axios from "axios";

import hamburger from "../static/image/hamburger.png";
import Button from "@atlaskit/button";
import Slider from "react-slide-out";
import Tabs from "@atlaskit/tabs";
import CardHistroy from "./CardHistroy";
import InvestmentHistory from "./InvestmentHistory";
import PlayerTurnTracker from "./PlayerTurnTracker";
import { PlayerContext } from "../pages/SinglePlayerController";
import CardController from "./CardController";

const Hamburger = styled.div`
  background-image: url(${props => props.image});
  height: 40px;
  width: 40px;
  margin-left: -5px;
  background-size: contain;
  background-color: white;
  border-radius: 5%;
`;

const ClosedDrawer = styled.div`
  margin-top: 5%;
`;

const DrawerContainer = styled.div`
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 1%;
  overflow-y: scroll;
`;

const Div = styled.div`
  display: flex;
  min-width: 10%;
  padding-right: 2%;
  flex-direction: column;
  text-align: center;
`;

const PlayerControlContainer = styled.div`
  min-height: 375px;
  display: flex;
  flex-direction: row;
  padding: 2%;
  border-radius: 1%;
  background-color: #f7f7f7;
  border: 2px solid #e1e1e1;
`;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 2%;
  border-left: 1px dashed #e1e1e1;
`;

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoadingRoll: false,
      playerTurn: 0,
      isShowingHand: false,
      userPlayer: null
    };
  }

  componentDidMount() {
    this.setState({ userPlayer: this.props.userPlayer });
  }

  showCardPicker = isMail => {
    this.setState({ isShowingHand: true, isMail: isMail, isOpen: false });
  };

  onClose = () => {
    this.setState({ isShowingHand: false, isOpen: true });
  };

  updatePlayerDrawer = data => {
    this.setState({ userPlayer: data });
  };

  render() {
    return (
      <React.Fragment>
        <Slider
          foldWidth="60px"
          isOpen={this.state.isOpen}
          leftToRight={true}
          onOutsideClick={() => this.setState({ isOpen: false })}>
          <DrawerContainer>
            <PlayerContext.Consumer>
              {({ players, playerTurnIndex, isSinglePlayersTurn }) => {
                return (
                  <PlayerControls
                    isSinglePlayersTurn={isSinglePlayersTurn}
                    playerTurn={playerTurnIndex}
                    players={players}
                    userPlayer={this.props.userPlayer}
                    isLoadingRoll={this.state.isLoadingRoll}
                    rollDie={this.props.rollDie}
                    showCardPicker={this.showCardPicker}
                  />
                );
              }}
            </PlayerContext.Consumer>
            <CardHolder {...this.props} />
          </DrawerContainer>
        </Slider>
        <ClosedDrawer>
          <Hamburger
            image={hamburger}
            onClick={e => this.setState({ isOpen: !this.state.isOpen })}
          />
        </ClosedDrawer>
        {this.state.isShowingHand ? (
          <CardController
            userPlayer={this.state.userPlayer}
            updatePlayerDrawer={this.updatePlayerDrawer}
            isMail={this.state.isMail}
            gameId={this.props.gameId}
            onClose={this.onClose}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const PlayerControls = props => {
  let isDisable = true;
  if (props.isSinglePlayersTurn) {
    isDisable = false;
  }
  return (
    <PlayerControlContainer>
      <Div>
        <b style={{ marginBottom: "15%", textDecoration: "underline" }}>
          Player Order
        </b>
        <PlayerTurnTracker
          userPlayerId={props.userPlayer.id}
          players={props.players}
          playerTurn={props.playerTurn}
        />
      </Div>
      <PlayerInfoContainer>
        <p className="lead">Username: {props.userPlayer.username}</p>
        <p>Money Left: ${props.userPlayer.money}</p>
        <p>Day: {props.userPlayer.day}</p>
        <div style={{ width: "100px" }}>
          <Button
            onClick={e => props.rollDie()}
            appearance="primary"
            isDisabled={isDisable}
            isLoading={props.isLoadingRoll}>
            Roll Dice
          </Button>
        </div>
      </PlayerInfoContainer>
    </PlayerControlContainer>
  );
};

const tabs = props => {
  return [
    { label: "Mail Cards", content: <CardHistroy {...props} isMail={true} /> },
    {
      label: "Oppourtunities Taken",
      content: <CardHistroy {...props} isMail={false} />
    },
    { label: "Cashflows", content: <InvestmentHistory {...props} /> }
  ];
};

const CardHolder = props => {
  return (
    <Tabs
      tabs={tabs(props)}
      onSelect={(tab, index) => console.log("Selected Tab", index + 1)}
    />
  );
};
