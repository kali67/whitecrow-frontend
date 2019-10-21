import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "../pages/HomePage";
import SinglePlayerController from "../pages/SinglePlayerController";
import EndGameController from "./EndGame/EndGameController";
import LoginPage from "../pages/LoginPage";
import AuthenticationWrapper from "../components/RequiresAuthentication";
import Page from "../pages/Page";
import AccountInfoContainer from "./Account/AccountInfoContainer";

const SinglePlayerControllerAuth = AuthenticationWrapper(SinglePlayerController);
const HomePageAuth = AuthenticationWrapper(HomePage);
const AccountPageAuth = AuthenticationWrapper(AccountInfoContainer);

class MainRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/home"
            render={({ history }) => (
              <Page history={history}>
                <HomePageAuth history={history} />
              </Page>
            )}
          />
          <Route
            exact
            path="/game/:id"
            render={props => <SinglePlayerControllerAuth {...props} />}
          />
          <Route
            exact
            path="/game/:id/end"
            render={({ history, match }) => (
              <EndGameController history={history} match={match} {...this.props} />
            )}
          />
          <Route
            exact
            path="/login"
            render={({ history }) => <LoginPage history={history} {...this.props} />}
          />
          <Route
            exact
            path="/account"
            render={({ history }) => (
              <Page history={history}>
                <AccountPageAuth history={history} {...this.props} />
              </Page>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default MainRouter;
