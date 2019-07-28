import React from "react";
import { withLocalize } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import MainRouter from "./MainRouter";
import { connect } from "react-redux";

import { setApplicationLanguage } from "../actions/localizationActions";
import globalTranslations from "../static/translations/global.json";

class Localization extends React.Component {
  constructor(props) {
    super(props);
    this.props.initialize({
      languages: this.props.languages,
      translation: globalTranslations,
      options: { renderToStaticMarkup }
    });
    this.props.setActiveLanguage(this.props.applicationLanguage);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.applicationLanguage != this.props.applicationLanguage) {
      this.props.setActiveLanguage(this.props.applicationLanguage);
    }
  }

  render() {
    return <MainRouter {...this.props} />;
  }
}

const mapStateToProps = state => ({
  languages: state.localization.languages,
  applicationLanguage: state.localization.activeLanguage
});

export default connect(
  mapStateToProps,
  { setApplicationLanguage }
)(withLocalize(Localization));
