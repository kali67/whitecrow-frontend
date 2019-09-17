import React from "react";
import axios from "axios";

import SectionMessage from "@atlaskit/section-message";
import CreateGameForm from "../components/CreateGameForm";
import { Translate } from "react-localize-redux";
import { connect } from "react-redux";

import {
  updateHasTakenPreTest,
  setAccountDetails
} from "../actions/userActions";
import { SpinnerFullCircle } from "../components/Spinner";

const DisabledLinkStyle = { opacity: ".4", pointerEvents: "none" };

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finishedAtLeastOneGame: false,
      loading: true
    };
  }

  componentDidMount() {
    axios
      .get("/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
      .then(response => {
        this.props.setAccountDetails(response.data);
        axios
          .get("/games/finished", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt")
            }
          })
          .then(response => {
            if (response.data.length > 0) {
              this.setState({ finishedAtLeastOneGame: true });
            }
            this.setState({ loading: false });
          })
          .catch(error => {
            console.log(error);
            this.setState({ loading: false });
          });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  completePreTest = () => {
    setTimeout(() => {
      this.props.updateHasTakenPreTest(this.props.id);
    }, 10000);
  };

  render() {
    if (this.state.loading) {
      return <SpinnerFullCircle />;
    }
    return (
      <React.Fragment>
        <div style={{ display: "flex", flexDirection: "column", paddingBottom: "5%" }}>
          {this.props.hasCompletedPreTest ? (
            <CompletedPreTest
              finishedAtLeastOneGame={this.state.finishedAtLeastOneGame}
            />
          ) : (
            <PreTest completePreTest={this.completePreTest} />
          )}
        </div>
        <CreateGameForm
          {...this.props}
          hasTakenTest={this.props.hasCompletedPreTest}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  hasCompletedPreTest: state.user.hasCompletedPreTest,
  id: state.user.id
});

export default connect(
  mapStateToProps,
  { updateHasTakenPreTest, setAccountDetails }
)(HomePage);
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
            target="_blank"
            rel="noopener noreferrer"
            onContextMenu={() => props.completePreTest()}
            onClick={() => props.completePreTest()}
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
              target="_blank"
              rel="noopener noreferrer"
              href={
                "https://canterbury.qualtrics.com/jfe/form/SV_e3Y2QzGnmNxR7CZ"
              }
            >
              Qualtrics Post Test
            </a>
          </span>
        </li>
        <li>
          <span style={props.finishedAtLeastOneGame ? null : DisabledLinkStyle}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={
                "https://canterbury.qualtrics.com/jfe/form/SV_e3Y2QzGnmNxR7CZ"
              }
            >
              Qualtrics Survey
            </a>
          </span>
        </li>
      </ul>
    </SectionMessage>
  );
};
