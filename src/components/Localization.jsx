import React from "react";
import { withLocalize } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import MainRouter from "./MainRouter";
import { connect } from "react-redux";
import axios from "axios";

import globalTranslations from "../static/translations/global.json";
import { SpinnerFullCircle } from "./Spinner";

class Localization extends React.Component {
  constructor(props) {
    super(props);
    this.props.initialize({
      languages: [{ name: "English", code: "EN" }, { name: "Español", code: "ES" }],
      translation: globalTranslations,
      options: { renderToStaticMarkup }
    });
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
    }
    return <MainRouter {...this.props} />;
  }
}

export default connect()(withLocalize(Localization));
