import React from "react";
import axios from "axios";

import GameBrowserTable from "../components/GameBrowserTable";
import SectionMessage from "@atlaskit/section-message";
import CreateGameForm from "../components/CreateGameForm";
import Button from "@atlaskit/button";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finishedAtLeastOneGame: false
    };
  }

  componentDidMount() {
    console.log(localStorage.getItem("jwt"));
    axios
      .get("/user/finished_games", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
      .then(response => {
        if (response.data.length > 0) {
          this.setState({ finishedAtLeastOneGame: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ height: "250px" }}>
          <PrePostTests />
        </div>
        <CreateGameForm {...this.props} />
        {/*<GameBrowserTable {...this.props} />*/}
      </React.Fragment>
    );
  }
}

const PrePostTests = () => {
  return (
    <SectionMessage appearance="warning">
      <h2>Welcome to WhiteCrow!</h2>
      <p>
        Before you play the game, we ask you to take a test so that we can
        assess your level of knowledge before you play! Please use the id you
        used to create an account. Once you have finished, play a few rounds of
        the game and you will be presented with another test and a survey.
      </p>
      <br />
      <b>The following items need to be completed before playing the game:</b>
      <ul>
        <li>
          <a
            href={"http://canterbury.qualtrics.com/jfe/form/SV_bee5e5GDr6BYPcN"}
          >
            Qualtrics Test
          </a>
        </li>
      </ul>
    </SectionMessage>
  );
};
