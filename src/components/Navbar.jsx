import React from "react";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <nav class="navbar fixed-bottom navbar-light bg-light">
          <a class="navbar-brand">WHITECROW</a>
        </nav>
      </React.Fragment>
    );
  }
}
