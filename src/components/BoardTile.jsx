import React from "react";
import styled from "styled-components";
import img from "./starting_flag.png";

const Date = styled.div`
  //   position: absolute;
  // top: 10px;
  // right: 5px;

  font-size: 0.85em;

  border: 1px solid #e3603d;
  border-radius: 100%;
  text-align: center;
  width: 20px;
  padding-top: 3px;
  height: 20px;
  font-family: "Gochi Hand", cursive;
  background-color: #e3603d;
`;

const Title = styled.div`
  //   position: absolute;
  //   top: 10px;
  //   left: 40px;
  flex-grow: 100;
  text-align: center;

  font-size: 1.25em;
  color: white;
`;

const TileWrapper = styled.div`
  position: relative;
  display: flex
  flex-direction: row
  flex-wrap: wrap;

  
  background: ${props => props.inputColor};
  height: 125px;
  width: 150px;
  padding: 1px;
  &:hover {
    border-style: solid;
    border-width: 1px;
    border-color: red;
    padding: 0px;
  }
`;

const Description = styled.div`
  //   //   position: absolute;
  //   //   bottom: 35px;

  //   margin: 10px;
  //   text-align: center;

  //   flex-basis: 0;
  flex-grow: 1;
  text-align: center;
  font-size: 0.85em;
  color: white;
`;

const Action = styled.div`
  flex-grow: 1;
  text-align: center;
  color: white;
`;

const Image = styled.div`
  background-image: url(${img});
  height: 50px;
  background-color: red;
  flex-grow: 1;
  width: 100px;
`;

export default class BoardTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TileWrapper inputColor={this.props.color}>
        <Title>{this.props.title}</Title>
        {this.props.date ? <Date>{this.props.date}</Date> : null}
        {/* <Image /> */}
        <Description>{this.props.description}</Description>
        <Action>{this.props.action}</Action>
      </TileWrapper>
    );
  }
}
