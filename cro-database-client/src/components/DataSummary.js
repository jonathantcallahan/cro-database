import React from 'react';
import styled from 'styled-components';

const StyledDataSummary = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 30px 80px;
    border-bottom: 1px solid #ccc;
`
const StyledSummaryDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const StyledSummaryLabel = styled.label`
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 3px;
    font-size: 16px;
    color: #b5b5b5;
`
const StyledSummaryValue = styled.span`
    font-size: 42px;
    font-weight: 300;
    color: #797979;
    margin-bottom: 5px;
`


export default class DataSummary extends React.Component {

    render() {
        return (
            <StyledDataSummary>
                <StyledSummaryDiv>
                    <StyledSummaryValue>{this.props.numberOfTests}</StyledSummaryValue>
                    <StyledSummaryLabel>Tests</StyledSummaryLabel>
                </StyledSummaryDiv>
                <StyledSummaryDiv>
                    <StyledSummaryValue>{this.props.winPercent}%</StyledSummaryValue>
                    <StyledSummaryLabel>Wins</StyledSummaryLabel>
                </StyledSummaryDiv>
            </StyledDataSummary>
        )
    }
}