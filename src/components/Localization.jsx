import React from "react";
import { withLocalize } from "react-localize-redux";

import MainRouter from "./MainRouter";
import axios from "axios";

import { SpinnerFullCircle } from "./Spinner";

class Localization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
        this.setState({ loading: false }, () => {
          this.props.setActiveLanguage(response.data["languageCode"]);
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading || this.props.languages.length === 0) {
      return <SpinnerFullCircle />;
    } else {
      return <MainRouter {...this.props} />;
    }
  }
}

export default withLocalize(Localization);
