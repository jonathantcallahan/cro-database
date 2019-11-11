import React from 'react';
import styled from 'styled-components';

const StyledFilters = styled.div`
    width: 20vw;
    border-right: 1px solid #ccc;
`

export default class Filters extends React.Component {
    render() {
        return (
            <StyledFilters>
                🛠 Filters
            </StyledFilters>
        );
    }
}