import React from 'react';
import styled from 'styled-components';

import DropdownFilter from './DropdownFilter';
import Search from './Search';

const StyledFilters = styled.div`
    width: 20vw;
    min-width: 20vw;
    border-right: 1px solid #ccc;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
`

const StyledResetButton = styled.button`
    background: transparent;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 20px 0px;
    padding: 12px;
    border-bottom-width: 3px;
    border-bottom-color: #bbb;
    font-family: "Lato";
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #666;
    cursor: pointer;
    &:hover{
        border-bottom-color: #9d9d9d;
    }
    transition: border-bottom-color .2s;
`
const StyledFiltersTitle = styled.span`
    font-size: 24px;
    color: #444;
`

export default class Filters extends React.Component {
    render() {
        let pageTypeOptions = [...new Set(this.props.data.map(test => test.Page))]; //array of unique page types. The "Set" thing de-dupes them. Will need to modify "test.page" when we get actual csv column names
        let clientOptions = [...new Set(this.props.data.map(test => test.Client))];
        let industryOptions = [...new Set(this.props.data.map(test => test.Industry))];
        //to add more DropdownFilters, add array of options as above, filterColumn should be the column name from data source, then add an entry to mapColumnsToFilterTitles in DropdownFilter component for more human-readable title
        return (
            <StyledFilters>
                <StyledFiltersTitle><span role="img" aria-label="filters">🧭</span> Filters</StyledFiltersTitle>
                <StyledResetButton onClick={this.props.resetFiltersFunction}>Reset</StyledResetButton>
                <DropdownFilter filterColumn="Page" options={pageTypeOptions} onChange={this.props.filterFunction} />
                <DropdownFilter filterColumn="Client" options={clientOptions} onChange={this.props.filterFunction} />
                <DropdownFilter filterColumn="Industry" options={industryOptions} onChange={this.props.filterFunction} />
                <Search onChange={this.props.searchFunction} />
            </StyledFilters>
        );
    }
}