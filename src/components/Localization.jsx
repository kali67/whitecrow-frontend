import React from "react";
import { withLocalize } from "react-localize-redux";

import MainRouter from "./MainRouter";
import { connect } from "react-redux";

import { SpinnerFullCircle } from "./Animations/Spinner";

class Localization extends React.Component {
  render() {
    if (!this.props.activeLanguage) {
      return <SpinnerFullCircle />;
    } else {
      return <MainRouter {...this.props} />;
    }
  }
}

const mapStateToProps = state => ({
  activeLanguage: state.localize.languages.filter(value => {
    return value.active;
  })[0]
});

export default connect(mapStateToProps)(withLocalize(Localization));
