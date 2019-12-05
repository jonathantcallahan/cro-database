import React from 'react';
import styled from 'styled-components';

const StyledInsight = styled.div`
    background: white;
    padding: 40px;
    margin: 20px 60px;;
`

export default class Insights extends React.Component {
    render() {
        let recommendation = '';
        switch (this.props.insight.type) {
            case 'hypothesis':
                recommendation = `Tests targeting hypothesis ${this.props.insight.hypothesis} have a high winrate.`;
                break;
            case 'pageType':
                recommendation = `Tests targeting page type ${this.props.insight.pageType} have a high winrate.`;
                break;
            case 'hypothesisXPageType':
                recommendation = `Tests targeting page type ${this.props.insight.pageType} with hypothesis ${this.props.insight.hypothesis} have a high winrate.`;
                break;
            default:
                recommendation = 'Recommendation not found';
        }

        return (
            <StyledInsight>
                insight score: {Math.round(this.props.insight.insightScore)}
                {recommendation}
                {Math.round(this.props.insight.winRate * 100)}% winrate
                {this.props.insight.completedTests} tests completed
            </StyledInsight>
        )
    }
}