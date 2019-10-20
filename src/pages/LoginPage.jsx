import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";

import { LoginSignUpView } from "../components/Login/LoginWidget";
import whitecrow from "../static/image/whitecrowwhite.png";
import { showLogin, showSignUp, login } from "../actions/loginActions";
import { authenticate } from "../actions/authActions";
import { Translate } from "react-localize-redux";
import ConsentModal from "../components/Login/ConsentModal";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const LoginWidgetWrapper = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const SplashArea = styled.div`
  width: 30%;
  height: 100%;
  background: #1c2321;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Whitecrow = styled.div`
  background-image: url(${props => props.image});
  width: 50%;
  height: 30%;
  background-size: cover;
`;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      lang: "ES"
    };
  }
  componentDidMount() {
    localStorage.removeItem("jwt");
  }

  authenticate = (username, password) => {
    return axios
      .post("/authenticate", {
        userName: username,
        password: password
      })
      .then(response => {
        this.props.authenticate(response.data["jwtToken"]);
        axios
          .put(
            "/user",
            {
              username: username,
              languageCode: this.props.activeLanguage.code
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
              }
            }
          )
          .then(() => {
            this.props.history.push("/home");
          });
      })
      .catch(() => {
        return {
          username: "error",
          password: "error"
        };
      });
  };

  showLogin = () => {
    this.props.showLogin();
  };

  showSignUp = () => {
    this.props.showSignUp();
  };

  login = (username, password) => {
    this.props.login(username, password);
  };

  showConsent = () => {
    this.setState({ modalIsOpen: true });
  };

  closeConsent = () => {
    this.setState({ modalIsOpen: false });
  };

  handleLanguageChange = newValue => {
    this.props.setActiveLanguage(newValue.value);
    localStorage.setItem("lang", newValue.value);
  };

  render() {
    return (
      <LoginWrapper>
        <SplashArea>
          <h1 style={{ color: "#ffffff" }}>
            <Translate id={"welcome"} />
          </h1>
          <Whitecrow image={whitecrow} />
        </SplashArea>
        <LoginWidgetWrapper>
          <LoginSignUpView
            isShowingLogin={this.props.showLoginView}
            showLogin={this.showLogin}
            showSignUp={this.showSignUp}
            login={this.login}
            authenticate={this.authenticate}
            showConsent={this.showConsent}
            languages={this.props.languages}
            handleLanguageChange={this.handleLanguageChange}
            activeLanguage={this.props.activeLanguage}
          />
        </LoginWidgetWrapper>
        <ConsentModal
          isOpen={this.state.modalIsOpen}
          closeConsent={this.closeConsent}
        />
      </LoginWrapper>
    );
  }
}

const mapStateToProps = ({ login, localize }) => ({
  showLoginView: login.showLogin,
  languages: localize.languages,
  activeLanguage: localize.languages.filter(value => {
    return value.active;
  })[0]
});

export default connect(
  mapStateToProps,
  {
    showLogin,
    showSignUp,
    login,
    authenticate
  }
)(LoginPage);
