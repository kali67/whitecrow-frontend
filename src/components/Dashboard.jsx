import React from "react";
import styled from "styled-components";

import hamburger from "../static/image/hamburger.png";
import Slider from "react-slide-out";
import { PlayerContext } from "../pages/SinglePlayerController";
import PlayerControls, { CardHolder } from "./PlayerControls";
import HelpModal from "./HelpModal";

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

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoadingRoll: false,
      playerTurn: 0,
      userPlayer: null,
      helpModalIsOpen: false
    };
  }

  componentDidMount() {
    this.setState({ userPlayer: this.props.userPlayer });
  }

  updatePlayerDrawer = data => {
    this.setState({ userPlayer: data });
  };

  closeDrawer = () => {
    this.setState({ isOpen: false });
  };

  showHelpModal = () => {
    this.setState({ helpModalIsOpen: true });
    this.closeDrawer();
  };

  closeHelpModal = () => {
    this.setState({ helpModalIsOpen: false, isOpen: true });
  };

  rollDie = () => {
    this.setState({ isOpen: false });
    this.props.rollDie();
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
                    rollDie={this.rollDie}
                    closeDrawer={this.closeDrawer}
                    helpModalIsOpen={this.state.helpModalIsOpen}
                    showHelpModal={this.showHelpModal}
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
        <HelpModal
          isOpen={this.state.helpModalIsOpen}
          closeHelpModal={this.closeHelpModal}
        />
      </React.Fragment>
    );
  }
}
