import React from 'react';
import styled from 'styled-components';

import Insight from './Insight';

const StyledInsights = styled.div`
    background: #efefef;
    min-height: 95vh;
    padding: 40px 60px;
`

function getInsights(data) {
    //assembles array of insight objects using different criteria to be passed to Insight.js which builds them
    return getHighWinrates(data).concat(getLowWinrates(data));
}

function getHighWinrates(data) {
    //by hypothesis
    let allHypotheses = [...new Set(data.map(test => test.hypothesis))].filter(option => option !== "");
    //for each hypothesis
    let hypothesisWinRates = allHypotheses.map(hypothesis => {
        let testsWithThatHypothesis = data.filter(test => test.hypothesis === hypothesis);
        let winningTests = testsWithThatHypothesis.filter(test => test.status === "win").length;
        let completedTests = testsWithThatHypothesis.filter(test => test.status === "win" || test.status === "loss" || test.status === "inconclusive").length;
        let winRate = winningTests / completedTests;
        return { type: "hypothesis", hypothesis, winRate, completedTests, insightScore: getInsightScore(winRate, completedTests) };
    })

    //by page type
    let allPageTypes = [...new Set(data.map(test => test.page))].filter(option => option !== "");
    //for each page type
    let pageTypeWinRates = allPageTypes.map(pageType => {
        let testsWithThatPageType = data.filter(test => test.page === pageType);
        let winningTests = testsWithThatPageType.filter(test => test.status === "win").length;
        let completedTests = testsWithThatPageType.filter(test => test.status === "win" || test.status === "loss" || test.status === "inconclusive").length;
        let winRate = winningTests / completedTests;
        return { type: "pageType", pageType, winRate, completedTests, insightScore: getInsightScore(winRate, completedTests) }
    })

    //by hypothesis x page type
    //for each hypothesis
    let hypothesisXPageTypeWinRates = [];
    allHypotheses.forEach(hypothesis => {
        //for each page type
        allPageTypes.forEach(pageType => {
            let testsWithThatCombination = data.filter(test => (test.page === pageType && test.hypothesis === hypothesis));
            let winningTests = testsWithThatCombination.filter(test => test.status === "win").length;
            let completedTests = testsWithThatCombination.filter(test => test.status === "win" || test.status === "loss" || test.status === "inconclusive").length;
            let winRate = winningTests / completedTests;
            hypothesisXPageTypeWinRates.push({ type: "hypothesisXPageType", pageType, hypothesis, winRate, completedTests });
        })
    })
    hypothesisXPageTypeWinRates = hypothesisXPageTypeWinRates.map(observation => Object.assign(observation, { insightScore: getInsightScore(observation.winRate, observation.completedTests) }));

    let result = [];
    return result.concat(hypothesisWinRates, pageTypeWinRates, hypothesisXPageTypeWinRates).filter(observation => observation.insightScore !== 0 && observation.winRate > .5).map(observation => Object.assign(observation, { insight: "highWinrate" }));
}

function getLowWinrates(data) {
    //NOTE: insight scores in this function are divided by 2 because they seem less useful
    //by hypothesis
    let allHypotheses = [...new Set(data.map(test => test.hypothesis))].filter(option => option !== "");
    //for each hypothesis
    let hypothesisWinRates = allHypotheses.map(hypothesis => {
        let testsWithThatHypothesis = data.filter(test => test.hypothesis === hypothesis);
        let winningTests = testsWithThatHypothesis.filter(test => test.status === "win").length;
        let completedTests = testsWithThatHypothesis.filter(test => test.status === "win" || test.status === "loss" || test.status === "inconclusive").length;
        let winRate = winningTests / completedTests;
        return { type: "hypothesis", hypothesis, winRate, completedTests, insightScore: getInsightScore(1 - winRate, completedTests) / 2 };
    })

    //by page type
    let allPageTypes = [...new Set(data.map(test => test.page))].filter(option => option !== "");
    //for each page type
    let pageTypeWinRates = allPageTypes.map(pageType => {
        let testsWithThatPageType = data.filter(test => test.page === pageType);
        let winningTests = testsWithThatPageType.filter(test => test.status === "win").length;
        let completedTests = testsWithThatPageType.filter(test => test.status === "win" || test.status === "loss" || test.status === "inconclusive").length;
        let winRate = winningTests / completedTests;
        return { type: "pageType", pageType, winRate, completedTests, insightScore: getInsightScore(1 - winRate, completedTests) / 2 }
    })

    //by hypothesis x page type
    //for each hypothesis
    let hypothesisXPageTypeWinRates = [];
    allHypotheses.forEach(hypothesis => {
        //for each page type
        allPageTypes.forEach(pageType => {
            let testsWithThatCombination = data.filter(test => (test.page === pageType && test.hypothesis === hypothesis));
            let winningTests = testsWithThatCombination.filter(test => test.status === "win").length;
            let completedTests = testsWithThatCombination.filter(test => test.status === "win" || test.status === "loss" || test.status === "inconclusive").length;
            let winRate = winningTests / completedTests;
            hypothesisXPageTypeWinRates.push({ type: "hypothesisXPageType", pageType, hypothesis, winRate, completedTests });
        })
    })
    hypothesisXPageTypeWinRates = hypothesisXPageTypeWinRates.map(observation => Object.assign(observation, { insightScore: getInsightScore(1 - observation.winRate, observation.completedTests) / 2 }));

    let result = [];
    return result.concat(hypothesisWinRates, pageTypeWinRates, hypothesisXPageTypeWinRates).filter(observation => observation.insightScore !== 0).map(observation => Object.assign(observation, { insight: "lowWinrate" }));
}

function getInsightScore(winRate, completedTests) {
    //insight score ranges from 0 to 100
    //function of completed tests and winrate
    //it multiplies winrate by (1-1/(1+2^completedTests/10)). this function goes quickly from near zero <5 tests to near 1 at >10 tests
    //so above 10 tests, insight score is almost equal to winrate
    if (completedTests === 0) {
        return 0;
    }
    return winRate * (1 - 1 / (1 + Math.pow(2, completedTests) / 10)) * 100;
}

export default class Insights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: this.props.data
        }
    }

    render() {
        const insights = getInsights(this.state.allData).sort((a, b) => b.insightScore - a.insightScore).map((insight, key) => <Insight insight={insight} key={key} handleFilteredDatabaseLoad={this.props.handleFilteredDatabaseLoad} />);
        return <StyledInsights>{insights}</StyledInsights>
    }
}