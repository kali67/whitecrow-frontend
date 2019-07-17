import React, { Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";

import { LoginSignUpView } from "../components/LoginWidget";
import whitecrow from "../static/image/whitecrowwhite.png";
import { showLogin, showSignUp, login } from "../actions/loginActions";
import { authenticate } from "../actions/authActions";

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
  justify-content: center;
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
  showLogin = () => {
    this.props.showLogin();
  };

  showSignUp = () => {
    this.props.showSignUp();
  };

  login = (username, password) => {
    this.props.login(username, password);
  };

  render() {
    return (
      <LoginWrapper>
        <SplashArea>
          <h1 style={{ color: "#ffffff" }}>Welcome to WhiteCrow!</h1>
          <Whitecrow image={whitecrow} />
        </SplashArea>
        <LoginWidgetWrapper>
          <LoginSignUpView
            history={this.props.history}
            isShowingLogin={this.props.showLoginView}
            showLogin={this.showLogin}
            showSignUp={this.showSignUp}
            login={this.login}
            authenticate={this.props.authenticate}
          />
        </LoginWidgetWrapper>
      </LoginWrapper>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  showLoginView: login.showLogin
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
