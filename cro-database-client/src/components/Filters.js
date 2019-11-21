import React from 'react';
import styled from 'styled-components';

import DropdownFilter from './DropdownFilter';
import Search from './Search';

const StyledFilters = styled.div`
    width: 17vw;
    min-width: 17vw;
    border-right: 1px solid #ccc;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow-y: auto;
`

const StyledResetButton = styled.button`
    background: transparent;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 20px 20px;
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
    margin: 0 20px;
`

export default class Filters extends React.Component {
    render() {
        //array of unique page types. The "Set" thing de-dupes them.
        let pageTypeOptions = [...new Set(this.props.data.map(test => test.page))].filter(option => option !== ""); 
        let clientOptions = [...new Set(this.props.data.map(test => test.client))].filter(option => option !== "");
        let industryOptions = [...new Set(this.props.data.map(test => test.industry))].filter(option => option !== "");
        let statusOptions = [...new Set(this.props.data.map(test => test.status))].filter(option => option !== "");
        let hypothesisOptions = [...new Set(this.props.data.map(test => test.hypothesis))].filter(option => option !== "");
        //to add more DropdownFilters, add array of options as above, filterColumn should be the column name from data source, then add an entry to mapColumnsToFilterTitles in DropdownFilter component for more human-readable title
        return (
            <StyledFilters>
                <StyledFiltersTitle><span role="img" aria-label="filters">🧭</span> Filters</StyledFiltersTitle>
                <StyledResetButton onClick={this.props.resetFiltersFunction}>Reset</StyledResetButton>
                <DropdownFilter filterColumn="hypothesis" options={hypothesisOptions} onChange={this.props.filterFunction} />
                <DropdownFilter filterColumn="page" options={pageTypeOptions} onChange={this.props.filterFunction} />
                <DropdownFilter filterColumn="client" options={clientOptions} onChange={this.props.filterFunction} />
                <DropdownFilter filterColumn="industry" options={industryOptions} onChange={this.props.filterFunction} />
                <DropdownFilter filterColumn="status" options={statusOptions} onChange={this.props.filterFunction} />
                <Search onChange={this.props.searchFunction} />
            </StyledFilters>
        );
    }
}