import React from "react";
import styled from "styled-components";

const Date = styled.div`
  font-size: 0.85em;
  color: ${props => props.dateTextColor}
  border: 1px solid ${props => props.dateColor};
  border-radius: 100%;
  text-align: center;
  width: 20px;
  height: 20px;
  font-family: "Patrick Hand", cursive;
  background-color: ${props => props.dateColor};
//   break-after: always !important; /* New syntax */
`;

const Title = styled.div`
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
  height: 115px;
  width: 140px;
  padding: 6px;
  &:hover {
    border-style: solid;
    border-width: 1px;
    border-color: red;
    padding: 5px;
  }
`;

const Description = styled.div`
  flex-grow: 1;
  text-align: center;
  font-size: 0.85em;
  width: 100%;
  color: ${props => props.descriptionColor || "#FFFFFF"};
`;

const Action = styled.div`
  flex-grow: 1;
  text-align: center;
  color: white;
`;

const Image = styled.div`
  background-image: url(${props => props.image});
  height: 68px;
  width: 115px;
  left: 16px;
  top: 35px;
  position: absolute;
  background-size: cover;
`;

const HR = styled.div`
  width: 100%;
  height: 0px;
`;

export default class BoardTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TileWrapper inputColor={this.props.color}>
        <Title>{this.props.title}</Title>
        {this.props.date ? (
          <Date
            dateColor={this.props.dateColor}
            dateTextColor={this.props.dateTextColor}
          >
            {this.props.date}
          </Date>
        ) : null}
        <HR />
        {/* {this.props.image ? <Image image={this.props.image} /> : null} */}
        {/* <HR /> */}
        <Description descriptionColor={this.props.descriptionColor}>
          {this.props.description}
        </Description>
        <Action>{this.props.action}</Action>
      </TileWrapper>
    );
  }
}
