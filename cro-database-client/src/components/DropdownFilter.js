import React from 'react';
import styled from 'styled-components';

const StyledDropdownFilter = styled.div`
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border-radius: 10px;
    border-bottom-width: 3px;
    border-bottom-color: #bbb;
`
const filterPadding = "20px";

const StyledFilterTitle = styled.span`
    font-weight: bold;
    background: #ddd;
    padding: ${filterPadding} ${filterPadding} ${filterPadding} ${filterPadding};
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #444;
    border-radius: 10px 10px 0px 0px;
`

const StyledSelect = styled.select`
    font-weight: bold;
    margin: ${filterPadding} ${filterPadding} ${filterPadding} ${filterPadding};
    font-size: 16px;
    font-family: Lato;
    padding: 6px;
`

const StyledOption = styled.option`
    font-family: Lato;
`

export default class DropdownFilter extends React.Component {
    render() {
        let options = this.props.options.map((option, key) => <StyledOption key={key}>{option}</StyledOption>);
        options.unshift(<option key="default">-</option>);
        //more human-readable titles for filters. May want to pull this out and use for column names at some point too
        let mapColumnsToFilterTitles = {
            page: "Page Type",
            client: "Client",
            industry: "Industry"
        }
        
        return (
            <StyledDropdownFilter>
                <StyledFilterTitle>{mapColumnsToFilterTitles[this.props.filterColumn] ? mapColumnsToFilterTitles[this.props.filterColumn] : this.props.filterColumn}</StyledFilterTitle>
                <StyledSelect onChange={e => this.props.onChange({column: this.props.filterColumn, condition:e.target.value})}>{options}</StyledSelect>
            </StyledDropdownFilter>
        );
    }
}