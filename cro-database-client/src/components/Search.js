import React from 'react';
import styled from 'styled-components';

const searchPadding = "20px";

const StyledSearchTitle = styled.span`
    font-weight: bold;
    background: #ddd;
    padding: ${searchPadding} ${searchPadding} ${searchPadding} ${searchPadding};
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #444;
    border-radius: 10px 10px 0px 0px;
`

const StyledSearch = styled.div`
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 12px -2px rgba(0, 0, 0, 0.18), 0 3px 3px -2px rgba(0, 0, 0, 0.24);
`

const StyledSearchInput = styled.input`
    font-weight: bold;
    margin: ${searchPadding} ${searchPadding} ${searchPadding} ${searchPadding};
    font-size: 16px;
    font-family: Lato;
    padding: 6px;
`

export default class Search extends React.Component {
    render() {
        return (
            <StyledSearch>
                <StyledSearchTitle><span role="img" aria-label="search">🔍</span> Search</StyledSearchTitle>
                <StyledSearchInput onChange={e => this.props.onChange(e.target.value)} />
            </StyledSearch>
            )
    }
}