import React from "react";
import axios from "axios";
import Spinner from "./Spinner";

export default class EndGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      gameData: null
    };
  }
  componentDidMount() {
    axios
      .post(
        `/game/${this.props.match.params.id}/end`,
        {},
        {
          auth: {
            username: "hta55",
            password: "welcome1"
          }
        }
      )
      .then(response => {
        this.setState({ loading: false, gameData: response["data"] });
      });
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return <h1>{`${this.state.gameData}`}</h1>;
  }
}
