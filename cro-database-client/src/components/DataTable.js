import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`
const StyledTd = styled.td`
  border-bottom : 1px solid #ccc;
`
const StyledTr = styled.tr`
  
`

export default class DataTable extends React.Component {

    render() {
        let trs = this.props.data.map(function (record, key) {
            var tds = Object.keys(record).map((field, key) => <StyledTd key={key}>{record[field]}</StyledTd>);
            return <StyledTr key={key}>{tds}</StyledTr>;
        });
        let table = <StyledTable><tbody>{trs}</tbody></StyledTable>;

        return (
            table
        );
    }
}