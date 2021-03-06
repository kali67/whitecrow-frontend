import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { openDashboard, closeDashboard } from "../../actions/dashboardActions";

import hamburger from "../../static/image/hamburger.png";
import Slider from "react-slide-out";
import PlayerControls, { CardHolder } from "./PlayerControls";

/**
 * This component handles the display of the dashboard
 * and delegates smaller UI elements to separate
 * components. The animations and view of the drawer sliding
 * in and out is also implemented here.
 */
class Dashboard extends React.Component {
  componentDidMount() {
    this.setState({ userPlayer: this.props.userPlayer });
  }

  render() {
    return (
      <React.Fragment>
        <Slider
          foldWidth="60px"
          isOpen={this.props.isOpen}
          leftToRight={true}
          onOutsideClick={() => this.props.closeDashboard()}>
          <DrawerContainer>
            <PlayerControls
              usersPlayerUpdated={this.props.userPlayerUpdated}
              isSinglePlayersTurn={this.props.isSinglePlayersTurn}
              playerTurn={this.props.playerTurnIndex}
              players={this.props.players}
              userPlayer={this.props.userPlayer}
              isLoadingRoll={this.props.isLoadingQueryPlayerTurns}
              rollDie={() => this.props.rollDie()}
              closeDrawer={() => this.props.closeDashboard()}
            />

            <CardHolder
              mail={this.props.userPlayer.mail}
              opportunity={this.props.userPlayer.opportunity}
            />
          </DrawerContainer>
        </Slider>
        <ClosedDrawer>
          <Hamburger image={hamburger} onClick={() => this.props.openDashboard()} />
        </ClosedDrawer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.dashboard.isOpen,
  players: state.game.players,
  playerTurnIndex: state.game.playerTurnIndex,
  isSinglePlayersTurn:
    state.game.players[state.game.playerTurnIndex]["id"] === state.user.player["id"],
  userPlayerUpdated: state.game.userTurnResult,
  userPlayer: state.user.player,
  isLoadingQueryPlayerTurns: state.game.isLoadingQueryPlayerTurns
});

export default connect(
  mapStateToProps,
  { openDashboard, closeDashboard }
)(Dashboard);

const Hamburger = styled.div`
  background-image: url(${props => props.image});
  height: 40px;
  width: 40px;
  margin-left: -5px;
  background-size: contain;
  background-color: white;
  border-radius: 5%;
  position: fixed
  z-index: 100;
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
