import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";

import { LoginSignUpView } from "../components/LoginWidget";
import whitecrow from "../static/image/whitecrowwhite.png";
import { showLogin, showSignUp, login } from "../actions/loginActions";
import { authenticate, denyAccess } from "../actions/authActions";

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
          .get("/user", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt")
            }
          })
          .then(response => {
            this.setState({ loading: false }, () => {
              this.props.setActiveLanguage(response.data["languageCode"]);
              this.props.history.push("/home");
            });
          })
          .catch(() => {
            this.setState({ loading: false });
          });
      })
      .catch(error => {
        if (error.response.status === 401) {
          denyAccess();
        }
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

  render() {
    return (
      <LoginWrapper>
        <SplashArea>
          <h1 style={{ color: "#ffffff" }}>Welcome to WhiteCrow!</h1>
          <Whitecrow image={whitecrow} />
        </SplashArea>
        <LoginWidgetWrapper>
          <LoginSignUpView
            isShowingLogin={this.props.showLoginView}
            showLogin={this.showLogin}
            showSignUp={this.showSignUp}
            login={this.login}
            authenticate={this.authenticate}
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
