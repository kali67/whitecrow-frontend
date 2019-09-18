import React from "react";
import { Translate } from "react-localize-redux";

import Button from "@atlaskit/button";
import styled from "styled-components";
import Select from "react-select";
import axios from "axios";
import { denyAccess } from "../actions/authActions";

class CreateGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameType: null,
      numberPlayers: null,
      loadingCreateGame: false,
      numberRounds: null
    };
  }

  createGame = () => {
    if (
      this.state.gameType != null &&
      this.state.numberPlayers != null &&
      this.state.numberRounds != null
    ) {
      this.setState({ loadingCreateGame: true }, () =>
        axios({
          method: "post",
          url: "game/create/single_player",
          data: {
            type: this.state.gameType.value,
            numberRounds: this.state.numberRounds.value,
            maxPlayers: this.state.numberPlayers.value
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
        })
          .then(response => {
            this.setState({ loadingCreateGame: false }, () =>
              this.props.history.push(`/game/${response.data["id"]}`)
            );
          })
          .catch(error => {
            console.log(error);
            if (error.response.status === 401) {
              denyAccess();
            }
          })
      );
    }
  };

  onTypeChange = option => {
    this.setState({ gameType: option });
  };

  onPlayerCountChange = option => {
    this.setState({ numberPlayers: option });
  };

  onRoundChange = option => {
    this.setState({ numberRounds: option });
  };

  render() {
    return (
      <CreateForm
        joinGame={this.createGame}
        onTypeChange={this.onTypeChange}
        onPlayerCountChange={this.onPlayerCountChange}
        onRoundChange={this.onRoundChange}
        loadingCreateGame={this.state.loadingCreateGame}
        hasTakenTest={this.props.hasTakenTest}
      />
    );
  }
}

export default CreateGameForm;

const gameTypeOptions = [
  { value: "SINGLEPLAYER", label: "Single Player" }
];

const numberOfPlayers = [
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" }
];

const numberOfRounds = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" }
];

const CreateForm = props => {
  return (
    <CreateFormWrapper>
      <form>
        <div className="row">
          <div className="col">
            <h6>
              <Translate id="gameType" />
            </h6>
            <Select
              placeholder={<Translate id="select" />}
              options={gameTypeOptions}
              onChange={props.onTypeChange}
            />
          </div>
          <div className="col">
            <h6>
              <Translate id="numPlayers" />
            </h6>
            <Select
              options={numberOfPlayers}
              onChange={props.onPlayerCountChange}
              placeholder={<Translate id="select" />}
            />
          </div>
          <div className="col">
            <h6>
              <Translate id="numRounds" />
            </h6>
            <Select
              options={numberOfRounds}
              onChange={props.onRoundChange}
              placeholder={<Translate id="select" />}
            />
          </div>
        </div>
      </form>
      <ButtonWrapper>
        <Button
          isLoading={props.loadingCreateGame}
          appearance="primary"
          onClick={e => props.joinGame(e)}
          role="button"
          isDisabled={!props.hasTakenTest}
        >
          <Translate id="create" />
        </Button>
      </ButtonWrapper>
    </CreateFormWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
`;

const CreateFormWrapper = styled.div`
  margin-bottom: 20px;
`;
