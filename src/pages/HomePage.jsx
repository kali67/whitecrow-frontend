import React from "react";
import axios from "axios";

import SectionMessage from "@atlaskit/section-message";
import CreateGameForm from "../components/CreateGameForm";
import { Translate } from "react-localize-redux";

const DisabledLinkStyle = { opacity: ".4", pointerEvents: "none" };

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finishedAtLeastOneGame: false,
      hasTakenTest: localStorage.getItem("hasTakenTest") !== null
    };
  }

  componentDidMount() {
    axios
      .get("/games/finished", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
      .then(response => {
        console.log(response);
        if (response.data.length > 0) {
          this.setState({ finishedAtLeastOneGame: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  hasTakenTest = () => {
    localStorage.setItem("hasTakenTest", "true");
    setTimeout(() => {
      this.setState({ hasTakenTest: true });
    }, 1000);
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ height: "250px" }}>
          {this.state.hasTakenTest ? (
            <CompletedPreTest
              finishedAtLeastOneGame={this.state.finishedAtLeastOneGame}
            />
          ) : (
            <PreTest hasTakenTest={this.hasTakenTest} />
          )}
        </div>
        <CreateGameForm
          {...this.props}
          hasTakenTest={this.state.hasTakenTest}
        />
      </React.Fragment>
    );
  }
}

const PreTest = props => {
  return (
    <SectionMessage appearance="warning">
      <h4 style={{ color: "red" }}>
        <Translate id={"read-carefully"} />
      </h4>
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
            href={
              "https://canterbury.qualtrics.com/jfe/form/SV_e3Y2QzGnmNxR7CZ"
            }
            onContextMenu={props.hasTakenTest}
            onClick={() => props.hasTakenTest()}
          >
            Qualtrics Prerequisite Test
          </a>
        </li>
      </ul>
    </SectionMessage>
  );
};

const CompletedPreTest = props => {
  return (
    <SectionMessage appearance="info">
      <h2>Thank you for completing the prerequisite test!</h2>
      <p>
        Now that you have completed the test, you can play as many games as you
        want. You need to complete at least one game before being able to take
        the next test and survey. Once you have played at least one (feel free
        to play as many until you feel comfortable) you may complete the final
        tests.
      </p>
      <br />
      <b>
        The following items need to be completed and will become available after
        finishing one game:
      </b>
      <ul>
        <li>
          <span style={props.finishedAtLeastOneGame ? null : DisabledLinkStyle}>
            <a
              href={
                "https://canterbury.qualtrics.com/jfe/form/SV_e3Y2QzGnmNxR7CZ"
              }
              onContextMenu={props.hasTakenTest}
              onClick={props.hasTakenTest}
            >
              Qualtrics Post Test
            </a>
          </span>
        </li>
        <li>
          <span style={props.finishedAtLeastOneGame ? null : DisabledLinkStyle}>
            <a
              href={
                "https://canterbury.qualtrics.com/jfe/form/SV_e3Y2QzGnmNxR7CZ"
              }
              onClick={props.hasTakenTest}
            >
              Qualtrics Survey
            </a>
          </span>
        </li>
      </ul>
    </SectionMessage>
  );
};
