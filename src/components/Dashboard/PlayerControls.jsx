import React from "react";
import styled from "styled-components";
import { Translate } from "react-localize-redux";

import Button from "@atlaskit/button";
import Tabs from "@atlaskit/tabs";
import CardHistroy from "../Card/CardHistroy";
import PlayerTurnTracker from "../PlayerTurn/PlayerTurnTracker";
import coin from "../../static/image/coin.png";
import calendar from "../../static/image/calendar.png";

/**
 * UI component to handle view logic of player controls,
 * these are player turn trackers, die rolling delegation etc.
 *
 * @param {userplayer, players, playerTurn} props userplayer object
 * that details the user and also a list of players along which whose turn
 * it is.
 */
const PlayerControls = props => {
  return (
    <PlayerControlContainer>
      <PlayerOrderWrapper>
        <b
          style={{
            marginBottom: "8%",
            textDecoration: "underline",
            textAlign: "center"
          }}>
          <Translate id="play-order" />
        </b>
        <PlayerTurnTracker
          userPlayerId={props.userPlayer.id}
          players={props.players}
          playerTurn={props.playerTurn}
        />
      </PlayerOrderWrapper>
      <PlayerInfoView
        username={props.userPlayer["username"]}
        money={props.userPlayer["money"]}
        day={props.userPlayer["day"]}
        rollDie={props.rollDie}
        rolledDisabled={!props.isSinglePlayersTurn}
        isLoadingRoll={props.isLoadingRoll}
      />
    </PlayerControlContainer>
  );
};

export default PlayerControls;

/**
 * Handles UI logic for money, days and
 * the die button layout
 */
const PlayerInfoView = ({ money, day, rollDie, rolledDisabled, isLoadingRoll }) => {
  return (
    <PlayerInfoContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "5%"
        }}>
        <TextWrapper>
          <LargeIcon image={coin} />
          <IconText color={getMoneyTextColor(money)}>
            <h4>${money}</h4>
          </IconText>
        </TextWrapper>
        <TextWrapper>
          <LargeIcon image={calendar} />
          <IconText color="black">
            <Translate>{({ translate }) => <h4>{translate("day", { day: day })}</h4>}</Translate>
          </IconText>
        </TextWrapper>
      </div>

      <RollDiceBtnWrapper>
        <Button
          style={rolledDisabled ? DisabledRollButtonStyle : ActiveRollButtonStyle}
          onClick={e => rollDie()}
          appearance="primary"
          isDisabled={rolledDisabled}
          isLoading={isLoadingRoll}>
          <Translate id="roll-die" />
        </Button>
      </RollDiceBtnWrapper>
    </PlayerInfoContainer>
  );
};

const tabs = props => {
  return [
    {
      label: <Translate id="mail-tab" />,
      content: <CardHistroy {...props} isMail={true} />
    },
    {
      label: <Translate id="oppourtunity-tab" />,
      content: <CardHistroy {...props} isMail={false} />
    }
  ];
};
export class CardHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: this.props.mail,
      opportunity: this.props.opportunity
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.mail.length !== this.props.mail.length ||
      nextProps.opportunity.length !== this.props.opportunity.length
    );
  }

  render() {
    return <Tabs tabs={tabs(this.state)} />;
  }
}

const RollDiceBtnWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconText = styled.div`
  color: ${props => props.color};
  margin-top: 8px;
`;

const ActiveRollButtonStyle = {
  height: "22%",
  width: "100%",
  justifyContent: "center",
  background: "#36B37E"
};
const DisabledRollButtonStyle = {
  height: "22%",
  width: "100%",
  justifyContent: "center"
};

const PlayerOrderWrapper = styled.div`
  display: flex;
  min-width: 10%;
  padding-right: 2%;
  flex-direction: column;
`;

const LargeIcon = styled.div`
  background-image: url(${props => props.image});
  height: 40px;
  width: 35px;
  margin-right: 10px;
  background-size: cover;
`;

const PlayerControlContainer = styled.div`
  min-height: 50%;
  display: flex;
  flex-direction: row;
  padding: 2%;
  margin-bottom: 3%;
  border-radius: 1%;
  border: 2px solid #e1e1e1;
`;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 2%;
  min-width: 50%;
  border-left: 1px dashed #e1e1e1;
`;

const getMoneyTextColor = money => {
  if (money > 800) {
    return "#36B37E";
  } else if (money < 200) {
    return "#BF2600";
  }
  return "#FF8B00";
};
