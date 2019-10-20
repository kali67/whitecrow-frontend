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
import { SpinnerFullCircle } from "../components/Animations/Spinner";

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "5%"
          }}
        >
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
        <Translate id="pre-test" />
      </p>
      <br />
      <b>
        <Translate id="pre-test-items" />
      </b>
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
            <Translate id="qualtric-pre-test" />
          </a>
        </li>
      </ul>
    </SectionMessage>
  );
};

const CompletedPreTest = props => {
  return (
    <SectionMessage appearance="confirmation">
      <h2>
        <Translate id="completed-pre-title" />
      </h2>
      <br />
      <p>
        <Translate id="completed-pre-body" />
      </p>
      <br />
      <b>
        <Translate id="next-steps-post" />
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
              <Translate id="qualtric-post-test" />
            </a>
          </span>
        </li>
        <li>
          <span style={props.finishedAtLeastOneGame ? null : DisabledLinkStyle}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={
                "http://canterbury.qualtrics.com/jfe/form/SV_bee5e5GDr6BYPcN"
              }
            >
              <Translate id="qualtric-survey" />
            </a>
          </span>
        </li>
      </ul>
    </SectionMessage>
  );
};
