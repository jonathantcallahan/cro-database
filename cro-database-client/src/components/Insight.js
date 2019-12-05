import React from 'react';
import styled from 'styled-components';

const StyledInsight = styled.div`
    background: white;
    padding: 25px 40px;
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: min-content 1fr max-content;
    align-items: center;
    max-width: 900px;
`
const StyledInsightScore = styled.div`
    font-size: 36px;
    border: 6px solid #d6d6d6;
    color: #6f6f6f;
    border-radius: 50%;
    padding: 23px 20px;
`
const StyledInsightDetails = styled.div`
    padding: 10px 20px;;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    align-self: stretch;
`
const StyledInsightRecommendation = styled.div`
    font-size: 20px;
    line-height: 1.3;
`
const StyledInsightSupportingDetails = styled.div`
    font-size: 14px;
`
const StyledShowTestsButton = styled.button`
    background: white;
    border: 1px solid black;
    font-size: 10px;
    text-transform: uppercase;
    padding: 10px 20px;
    height: min-content;
    cursor: pointer;
    transition: background .3s;
    &:hover{
        background: #f7f7f7;
    }
`

export default class Insights extends React.Component {
    render() {
        let recommendation = '';
        let button = '';
        switch (this.props.insight.type) {
            case 'hypothesis':
                recommendation = `Tests with hypothesis "${this.props.insight.hypothesis}" have a high winrate.`;
                button = <StyledShowTestsButton onClick={e => this.props.handleFilteredDatabaseLoad([{column: 'hypothesis', condition: this.props.insight.hypothesis}])}>View Tests</ StyledShowTestsButton>
                break;
            case 'pageType':
                recommendation = `Tests targeting page type "${this.props.insight.pageType}" have a high winrate.`;
                button = <StyledShowTestsButton onClick={e => this.props.handleFilteredDatabaseLoad([{column: 'page', condition: this.props.insight.pageType}])}>View Tests</ StyledShowTestsButton>
                break;
            case 'hypothesisXPageType':
                recommendation = `Tests targeting page type "${this.props.insight.pageType}" with hypothesis "${this.props.insight.hypothesis}" have a high winrate.`;
                button = <StyledShowTestsButton onClick={e => this.props.handleFilteredDatabaseLoad([{column: 'hypothesis', condition: this.props.insight.hypothesis}, {column: 'page', condition: this.props.insight.pageType}])}>View Tests</ StyledShowTestsButton>
                break;
            default:
                recommendation = 'Recommendation not found';
        }

        return (
            <StyledInsight>
                <StyledInsightScore>{Math.round(this.props.insight.insightScore)}</StyledInsightScore>
                <StyledInsightDetails>
                    <StyledInsightRecommendation>{recommendation}</StyledInsightRecommendation>
                    <StyledInsightSupportingDetails>
                        {Math.round(this.props.insight.winRate * 100)}% winrate ·&nbsp;
                        {this.props.insight.completedTests} tests completed
                </StyledInsightSupportingDetails>
                </StyledInsightDetails>
                {button}
            </StyledInsight>
        )
    }
}