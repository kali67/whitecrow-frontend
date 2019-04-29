import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import styled from "styled-components";
import HomePage from "../pages/HomePage";
import GameController from "../pages/GameController";

import { WhitecrowBlack } from "../static/TileObjects";
import SinglePlayerController from "../pages/SinglePlayerController";

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
                <HomePage history={history} />
              </Page>
            )}
          />
          <Route exact path="/game/:id" component={SinglePlayerController} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  margin-right: 10%;
  margin-left: 10%;
  margin-top: 5%;
`;

const Page = props => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {WhitecrowBlack}
        <a className="navbar-brand">Whitecrow PM</a>
      </nav>

      <PageWrapper>{props.children}</PageWrapper>
    </React.Fragment>
  );
};
