import React from "react";

import styled from "styled-components";

import TableTree, {
  Headers,
  Header,
  Rows,
  Row,
  Cell
} from "@atlaskit/table-tree";

const TableWrapper = styled.div`
  margin: 2%;
`;

export default class InvestmentHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [
        {
          id: 1,
          type: "Loan",
          amount: "$10.50",
          payback_rate: "11.5%"
        },
        {
          id: 2,
          type: "Investment",
          amount: "$200.00",
          payback_rate: "11.5%"
        },
        {
          id: 3,
          type: "Deposit",
          amount: "$1000.00",
          payback_rate: "11.5%"
        },
        {
          id: 4,
          type: "Deposit",
          amount: "$700,000,000.00",
          payback_rate: "11.5%"
        }
      ]
    };
  }

  render() {
    return (
      <TableWrapper>
        <TableTree>
          <Headers>
            <Header width={250}>Type</Header>
            <Header width={250}>Amount</Header>
            <Header width={150}>Payback Rate</Header>
          </Headers>
          <Rows
            items={this.state.tableData}
            render={({ id, type, amount, payback_rate }) => (
              <Row itemId={id}>
                <Cell>{type}</Cell>
                <Cell>{amount}</Cell>
                <Cell>{payback_rate}</Cell>
              </Row>
            )}
          />
        </TableTree>
      </TableWrapper>
    );
  }
}
