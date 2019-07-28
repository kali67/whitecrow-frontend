import React, { Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { SpinnerFullCircle } from "../Spinner";
import AccountLanguageForm from "./AccountLanguageForm";
import AccountPasswordForm from "./AccountPasswordForm";
import AccountProfileForm from "./AccountProfileForm";

import { Divider } from "./AccountInfoStyles";

class AccountInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userDetails: null
    };
  }

  componentDidMount() {
    axios
      .get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      .then(response => {
        this.setState({ userDetails: response.data, loading: false });
      });
  }

  saveLanguage = languageCode => {
    axios
      .put(
        "/user",
        { username: this.state.userDetails["username"], languageCode: languageCode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        }
      )
      .then(() => {
        this.props.setActiveLanguage(languageCode);
        this.setState({ ...this.state.userDetails, languageCode: languageCode });
      });
  };

  updateProfile = username => {
    axios
      .put(
        "/user",
        {
          username: username,
          languageCode: this.state.userDetails["languageCode"]
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        }
      )
      .then(() => {
        this.setState(prevState => ({
          userDetails: { ...prevState.userDetails, username: username }
        }));
      });
  };

  render() {
    if (this.state.loading) {
      return <SpinnerFullCircle />;
    }
    return (
      <React.Fragment>
        <Divider />
        <AccountProfileForm
          updateProfile={this.updateProfile}
          username={this.state.userDetails["username"]}
        />
        <Divider />
        <AccountPasswordForm />
        <Divider />
        <AccountLanguageForm
          currentLanguage={
            this.props.languages.filter(value => {
              return value.code == this.state.userDetails["languageCode"];
            })[0]
          }
          saveLanguage={this.saveLanguage}
          languages={this.props.languages}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  languages: state.localize.languages
});

export default connect(
  mapStateToProps,
  {}
)(AccountInfoContainer);
