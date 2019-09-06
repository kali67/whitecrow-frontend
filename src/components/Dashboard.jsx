import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import {
  openDashboard,
  closeDashboard,
  showHelpModal,
  closeHelpModal
} from "../actions/dashboardActions";

import hamburger from "../static/image/hamburger.png";
import Slider from "react-slide-out";
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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingRoll: false
    };
  }

  componentDidMount() {
    this.setState({ userPlayer: this.props.userPlayer });
  }

  rollDie = () => {
    this.props.closeDashboard();
    this.props.rollDie();
  };

  render() {
    return (
      <React.Fragment>
        <Slider
          foldWidth="60px"
          isOpen={this.props.isOpen}
          leftToRight={true}
          onOutsideClick={() => this.props.closeDashboard()}
        >
          <DrawerContainer>
            <PlayerControls
              usersPlayerUpdated={this.props.userPlayerUpdated}
              isSinglePlayersTurn={this.props.isSinglePlayersTurn}
              playerTurn={this.props.playerTurnIndex}
              players={this.props.players}
              userPlayer={this.props.userPlayer}
              isLoadingRoll={this.state.isLoadingRoll}
              rollDie={this.rollDie}
              closeDrawer={() => this.props.closeDashboard()}
              helpModalIsOpen={this.props.helpModalIsOpen}
              showHelpModal={() => this.props.showHelpModal()}
            />

            <CardHolder mail={this.props.userPlayer.mail} opportunity={this.props.userPlayer.opportunity}/>
          </DrawerContainer>
        </Slider>
        <ClosedDrawer>
          <Hamburger
            image={hamburger}
            onClick={() => this.props.openDashboard()}
          />
        </ClosedDrawer>
        <HelpModal
          isOpen={this.props.helpModalIsOpen}
          closeHelpModal={() => this.props.closeHelpModal()}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.dashboard.isOpen,
  helpModalIsOpen: state.dashboard.helpModalIsOpen,
  players: state.game.players,
  playerTurnIndex: state.game.playerTurnIndex,
  isSinglePlayersTurn:
    state.game.players[state.game.playerTurnIndex]["id"] ===
    state.user.player["id"],
  userPlayerUpdated: state.game.userTurnResult,
  userPlayer: state.user.player
});

export default connect(
  mapStateToProps,
  { openDashboard, closeDashboard, showHelpModal, closeHelpModal }
)(Dashboard);
