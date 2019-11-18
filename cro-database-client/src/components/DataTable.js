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

const StyledNoData = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 25px;
  background: none;
  color: #666;
  width: 100%;
`

const StyledSearchMatch = styled.span`
  background: #ffeb00;
  color: black;
`

export default class DataTable extends React.Component {

  render() {
    if (this.props.data.length === 0) {
      return <StyledNoData>no data <span role="img" aria-label="sadface">😥</span></StyledNoData>
    }

    let columns = Object.keys(this.props.data[0]).map((field, key) => <StyledTh key={key} onClick={e => this.props.onColumnClick(e.target.innerText)}>{field}</StyledTh>);
    let searchText = this.props.searchString;
    let trs = this.props.data.map(function (record, key) {
      var tds = Object.keys(record).map((field, key) => {
        //all this stuff handles highlighting the search text
        let text = record[field].toString().toLowerCase();
        let index = text.indexOf(searchText);
        if (index !== -1){
          return <StyledTd key={key}>{text.substring(0, index)}<StyledSearchMatch>{text.substr(index, searchText.length)}</StyledSearchMatch>{text.substring(index + searchText.length)}</StyledTd>
        }
        return <StyledTd key={key}>{record[field]}</StyledTd>
      });
      return <StyledTr key={key}>{tds}</StyledTr>;
    });
    let table = <StyledTableWrapper><StyledTable><StyledThead><tr>{columns}</tr></StyledThead><tbody>{trs}</tbody></StyledTable></StyledTableWrapper>;

    return (
      table
    );
  }
}