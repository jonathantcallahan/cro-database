import React from 'react';
import styled from 'styled-components';

const StyledDropdownFilter = styled.div`
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border-radius: 5px;
`
const filterPadding = "20px";

const StyledFilterTitle = styled.span`
    font-weight: bold;
    background: #ccc;
    padding: ${filterPadding} ${filterPadding} 5px ${filterPadding};
    font-weight: 300;
    font-size: 18px;
    letter-spacing: 1px;
`

const StyledSelect = styled.select`
    font-weight: bold;
    margin: ${filterPadding} ${filterPadding} ${filterPadding} ${filterPadding};
`

export default class DropdownFilter extends React.Component {
    render() {
        let options = this.props.options.map((option, key) => <option key={key}>{option}</option>);
        //need to handle crash when user selects this option
        options.unshift(<option>-</option>);
        //more human-readable titles for filters. May want to pull this out and use for column names at some point too
        let mapColumnsToFilterTitles = {
            page: "Page Type",
            client: "Client"
        }

        return (
            <StyledDropdownFilter>
                <StyledFilterTitle>{mapColumnsToFilterTitles[this.props.filterColumn] ? mapColumnsToFilterTitles[this.props.filterColumn] : this.props.filterColumn}</StyledFilterTitle>
                <StyledSelect onChange={e => this.props.onChange(this.props.filterColumn, e.target.value)}>{options}</StyledSelect>
            </StyledDropdownFilter>
        );
    }
}