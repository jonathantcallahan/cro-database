import React from 'react';
import styled from 'styled-components';

import DropdownFilter from './DropdownFilter';

const StyledFilters = styled.div`
    width: 20vw;
    min-width: 20vw;
    border-right: 1px solid #ccc;
`

export default class Filters extends React.Component {
    render() {
        let pageTypeOptions = [...new Set(this.props.data.map(test => test.page))]; //array of unique page types. The "Set" thing de-dupes them. Will need to modify "test.page" when we get actual csv column names
        let clientOptions = [...new Set(this.props.data.map(test => test.client))];
        //to add more DropdownFilters, add array of options as above, filterColumn should be the column name from data source, then add an entry to mapColumnsToFilterTitles in DropdownFilter component for more human-readable title
        return (
            <StyledFilters>
                🛠 Filters
                <button onClick={this.props.resetSortandFiltersFunction}>Reset</button>
                <DropdownFilter filterColumn="page" options={pageTypeOptions} onChange={this.props.filterFunction} />
                <DropdownFilter filterColumn="client" options={clientOptions} onChange={this.props.filterFunction} />
            </StyledFilters>
        );
    }
}