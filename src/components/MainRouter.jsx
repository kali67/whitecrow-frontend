import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "../pages/HomePage";
import SinglePlayerController from "../pages/SinglePlayerController";
import EndGameController from "./EndGameController";
import LoginPage from "../pages/LoginPage";
import requiresAuthentication from "../components/RequiresAuthentication";
import Page from "./Page";

const SinglePlayerControllerAuth = requiresAuthentication(SinglePlayerController);
const HomePageAuth = requiresAuthentication(HomePage);

export default class MainRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/home"
            render={({ history }) => (
              <Page>
                <HomePageAuth history={history} />
              </Page>
            )}
          />
          <Route
            exact
            path="/game/:id"
            render={props => <SinglePlayerControllerAuth {...props} />}
          />
          <Route exact path="/game/:id/end" render={props => <EndGameController {...props} />} />
          <Route exact path="/login" render={({ history }) => <LoginPage history={history} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}
