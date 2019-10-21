import React from "react";
import { connect } from "react-redux";

export default function(ComposedComponent) {
  return function(...props) {
    return (
      <RequiresAuthentication {...props}>
        <ComposedComponent />
      </RequiresAuthentication>
    );
  };
}

class AuthenticationWrapper extends React.Component {
  componentDidMount() {
    this._checkAndRedirect();
  }

  componentDidUpdate() {
    this._checkAndRedirect();
  }

  _checkAndRedirect() {
    const { history } = this.props[0];
    if (!localStorage.getItem("jwt") || this.props.accessDenied) {
      history.push("/login");
    }
  }

  render() {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.children, { ...this.props[0] })}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  accessDenied: state.auth.accessDenied
});

const RequiresAuthentication = connect(mapStateToProps)(AuthenticationWrapper);
