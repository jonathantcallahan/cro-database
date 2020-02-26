import React from 'react';
import styled from 'styled-components';

const StyledInsight = styled.div`
    background: white;
    padding: 25px 40px;
    margin: 0 auto 40px auto;
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
    padding: 10px 20px;
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
    border: 1px solid #999;
    color: #666;
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
    constructor(props){
        super(props);
        this.buildHighWinrateInsight = this.buildHighWinrateInsight.bind(this);
    }

    buildHighWinrateInsight(insight) {
        let recommendation = '';
        let button = '';
        switch (insight.type) {
            case 'hypothesis':
                recommendation = `Tests with hypothesis "${insight.hypothesis}" have a high winrate.`;
                button = <StyledShowTestsButton onClick={e => this.props.handleFilteredDatabaseLoad([{ column: 'hypothesis', condition: insight.hypothesis }])}>View Tests</ StyledShowTestsButton>
                break;
            case 'pageType':
                recommendation = `Tests targeting page type "${insight.pageType}" have a high winrate.`;
                button = <StyledShowTestsButton onClick={e => this.props.handleFilteredDatabaseLoad([{ column: 'page', condition: insight.pageType }])}>View Tests</ StyledShowTestsButton>
                break;
            case 'hypothesisXPageType':
                recommendation = `Tests targeting page type "${insight.pageType}" with hypothesis "${insight.hypothesis}" have a high winrate.`;
                button = <StyledShowTestsButton onClick={e => this.props.handleFilteredDatabaseLoad([{ column: 'hypothesis', condition: insight.hypothesis }, { column: 'page', condition: insight.pageType }])}>View Tests</ StyledShowTestsButton>
                break;
            default:
                recommendation = 'Recommendation not found';
        }
        return (
            <StyledInsight>
                <StyledInsightScore>{Math.round(insight.insightScore)}</StyledInsightScore>
                <StyledInsightDetails>
                    <StyledInsightRecommendation>{recommendation}</StyledInsightRecommendation>
                    <StyledInsightSupportingDetails>
                        {Math.round(insight.winRate * 100)}% winrate ·&nbsp;
                        {insight.completedTests} tests completed
                    </StyledInsightSupportingDetails>
                </StyledInsightDetails>
                {button}
            </StyledInsight>
        )
    }

    buildLowWinrateInsight(insight) {
        let recommendation = '';
        let button = '';
        switch (insight.type) {
            case 'hypothesis':
                recommendation = `Tests with hypothesis "${insight.hypothesis}" have a low winrate.`;
                button = <StyledShowTestsButton onClick={e => this.props.handleFilteredDatabaseLoad([{ column: 'hypothesis', condition: insight.hypothesis }])}>View Tests</ StyledShowTestsButton>
                break;
            case 'pageType':
                recommendation = `Tests targeting page type "${insight.pageType}" have a low winrate.`;
                button = <StyledShowTestsButton onClick={e => this.props.handleFilteredDatabaseLoad([{ column: 'page', condition: insight.pageType }])}>View Tests</ StyledShowTestsButton>
                break;
            case 'hypothesisXPageType':
                recommendation = `Tests targeting page type "${insight.pageType}" with hypothesis "${insight.hypothesis}" have a low winrate.`;
                button = <StyledShowTestsButton onClick={e => this.props.handleFilteredDatabaseLoad([{ column: 'hypothesis', condition: insight.hypothesis }, { column: 'page', condition: insight.pageType }])}>View Tests</ StyledShowTestsButton>
                break;
            default:
                recommendation = 'Recommendation not found';
        }
        return (
            <StyledInsight>
                <StyledInsightScore>{Math.round(insight.insightScore)}</StyledInsightScore>
                <StyledInsightDetails>
                    <StyledInsightRecommendation>{recommendation}</StyledInsightRecommendation>
                    <StyledInsightSupportingDetails>
                        {Math.round(insight.winRate * 100)}% winrate ·&nbsp;
                        {insight.completedTests} tests completed
                    </StyledInsightSupportingDetails>
                </StyledInsightDetails>
                {button}
            </StyledInsight>
        )
    }

    buildOpportunityInsight(insight){
        return(
            <StyledInsight style={{gridTemplateColumns: "1fr max-content"}}>
                <StyledInsightDetails>
                    <StyledInsightRecommendation>Client "{insight.client}" has had no tests on page type "{insight.pageType}".</StyledInsightRecommendation>
                </StyledInsightDetails>
                <StyledShowTestsButton onClick={e => this.props.handleFilteredDatabaseLoad([{column: 'client', condition: this.props.insight.client}])}>View Client</ StyledShowTestsButton>
            </StyledInsight>
        )
    }

    render() {
        let insight = '';
        //calls appropriate build method depending on the insight type
        switch (this.props.insight.insight){
            case 'highWinrate':
                insight = this.buildHighWinrateInsight(this.props.insight);
                break;
            case 'opportunity':
                insight = this.buildOpportunityInsight(this.props.insight);
                break;
            case 'lowWinrate':
                insight = this.buildLowWinrateInsight(this.props.insight);
                break;
            default:
                break;
        }

        return (
            insight
        )
    }
}