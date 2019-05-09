import React from "react";
import styled from "styled-components";

import Button from "@atlaskit/button";
import Tabs from "@atlaskit/tabs";
import CardHistroy from "./CardHistroy";
import InvestmentHistory from "./InvestmentHistory";
import PlayerTurnTracker from "./PlayerTurnTracker";
import HelpModal from "./HelpModal";

const PlayerOrderWrapper = styled.div`
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

export default class PlayerControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rolledDisabled: !this.props.isSinglePlayersTurn
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSinglePlayersTurn != this.props.isSinglePlayersTurn) {
      this.setState({ rolledDisabled: prevProps.isSinglePlayersTurn });
    }
  }

  render() {
    return (
      <PlayerControlContainer>
        <PlayerOrderWrapper>
          <b style={{ marginBottom: "15%", textDecoration: "underline" }}>Player Order</b>
          <PlayerTurnTracker
            userPlayerId={this.props.userPlayer.id}
            players={this.props.players}
            playerTurn={this.props.playerTurn}
          />
        </PlayerOrderWrapper>
        <PlayerInfoView
          username={this.props.userPlayer["username"]}
          money={this.props.userPlayer.money}
          day={this.props.userPlayer.day}
          rollDie={this.props.rollDie}
          rolledDisabled={this.state.rolledDisabled}
          isLoadingRoll={this.props.isLoadingRoll}
          showHelpModal={this.props.showHelpModal}
        />
      </PlayerControlContainer>
    );
  }
}

const HelpIcon = styled.div`
  text-decoration: bold;
  background: #108ee9;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid #108ee9;
  width: 25px;
  height: 25px;
  &:hover {
    border: 1px solid #0847a6;
    cursor: grab;
  }
`;

const HelpIconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const PlayerInfoView = ({
  username,
  money,
  day,
  rollDie,
  rolledDisabled,
  isLoadingRoll,
  showHelpModal
}) => {
  return (
    <PlayerInfoContainer>
      <HelpIconWrapper>
        <HelpIcon
          onClick={e => {
            showHelpModal();
          }}>
          ?
        </HelpIcon>
      </HelpIconWrapper>
      <p className="lead">Username: {username}</p>
      <p>Money Left: ${money}</p>
      <p>Day: {day}</p>
      <div style={{ width: "100px" }}>
        <Button
          onClick={e => rollDie()}
          appearance="primary"
          isDisabled={rolledDisabled}
          isLoading={isLoadingRoll}>
          Roll Dice
        </Button>
      </div>
    </PlayerInfoContainer>
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

export const CardHolder = props => {
  return <Tabs tabs={tabs(props)} />;
};
