import React from "react";

export default function(ComposedComponent) {
  return class AuthenticationWrapper extends React.Component {
    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { history } = this.props;
      if (!localStorage.getItem("jwt")) {
        history.push("/login");
      }
    }

    render() {
      return <React.Fragment>{<ComposedComponent {...this.props} />}</React.Fragment>;
    }
  };
}
