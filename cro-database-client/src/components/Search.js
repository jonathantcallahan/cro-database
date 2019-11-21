import React from 'react';
import styled from 'styled-components';

const searchPadding = "20px";

const StyledSearch = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #bbb;
    &:hover{
        border-bottom-color: #888;
    }
    transition: border-bottom-color .2s;
`

const StyledSearchTitle = styled.span`
    font-weight: bold;
    padding: ${searchPadding} ${searchPadding} 0 ${searchPadding};
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #444;
`

const StyledSearchInput = styled.input`
    font-weight: bold;
    margin: ${searchPadding} ${searchPadding} ${searchPadding} ${searchPadding};
    font-size: 16px;
    font-family: Lato;
    padding: 6px;
    &::placeholder{
        color: #aaa;
        font-weight: 500;
        letter-spacing: 0.5px;
    }
`

export default class Search extends React.Component {
    render() {
        return (
            <StyledSearch>
                <StyledSearchTitle><span role="img" aria-label="search">🔍</span> Search</StyledSearchTitle>
                <StyledSearchInput onChange={e => this.props.onChange(e.target.value)} placeholder="Search..."/>
            </StyledSearch>
            )
    }
}