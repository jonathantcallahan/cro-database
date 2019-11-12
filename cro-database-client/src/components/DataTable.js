import React from 'react';
import styled from 'styled-components';

//allows table to scroll
const StyledTableWrapper = styled.div`
  overflow: auto;
`

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`
const StyledTd = styled.td`
  border-bottom : 1px solid #ccc;
  padding: 20px;
  white-space: nowrap;
`
const StyledTr = styled.tr`
  &:hover{
      background #f7f7f7;
  }

  &:last-child td{
    border: none;
  }
`

const StyledTh = styled.th`
  padding: 10px 20px;
  cursor: s-resize;
`

const StyledThead = styled.thead`
  background: #eee;
`

export default class DataTable extends React.Component {

    render() {
        let columns = Object.keys(this.props.data[0]).map((field, key) => <StyledTh key={key} onClick={e => this.props.onColumnClick(e.target.innerText)}>{field}</StyledTh>);
        let trs = this.props.data.map(function (record, key) {
            var tds = Object.keys(record).map((field, key) => <StyledTd key={key}>{record[field]}</StyledTd>);
            return <StyledTr key={key}>{tds}</StyledTr>;
        });
        let table = <StyledTableWrapper><StyledTable><StyledThead><tr>{columns}</tr></StyledThead><tbody>{trs}</tbody></StyledTable></StyledTableWrapper>;

        return (
            table
        );
    }
}