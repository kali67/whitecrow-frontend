import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";

import { LoginSignUpView } from "../components/LoginWidget";
import whitecrow from "../static/image/whitecrowwhite.png";
import { showLogin, showSignUp, login } from "../actions/loginActions";
import { authenticate, denyAccess } from "../actions/authActions";
import { Translate } from "react-localize-redux";
import ConsentModal from "../components/ConsentModal";

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
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }
  componentDidMount() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("hasTakenTest");
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
        // if (error.response.status === 401) {
        //   denyAccess();
        // }
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
