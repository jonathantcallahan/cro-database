import React from 'react';
import styled from 'styled-components';

const StyledInsights = styled.div`
    background: #efefef;
    min-height: 95vh;
`

function getInsights(data){
    return getHighWinrates(data);
}

function getHighWinrates(data){
    //by hypothesis
    let allHypotheses = [...new Set(data.map(test => test.hypothesis))].filter(option => option !== "");
        //for each hypothesis
    let hypothesisWinRates = allHypotheses.map(hypothesis => {
        //get the data related to that hypothesis
        let testsWithThatHypothesis = data.filter(test => test.hypothesis === hypothesis);
        let winningTests = testsWithThatHypothesis.filter(test => test.status === "win").length;
        let completedTests = testsWithThatHypothesis.filter(test => test.status === "win" || test.status === "loss" || test.status === "inconclusive").length;
        let winRate = winningTests / completedTests;
        let observation = {type: "hypothesis", hypothesis, winRate, completedTests};
        return Object.assign(observation, {insightScore: getInsightScore(observation)});
    })

    //by page type
    let allPageTypes = [...new Set(data.map(test => test.page))].filter(option => option !== "");
        //for each page type
    let pageTypeWinRates = allPageTypes.map(pageType => {
        //get the data related to that page type
        let testsWithThatPageType = data.filter(test => test.page === pageType);
        let winningTests = testsWithThatPageType.filter(test => test.status === "win").length;
        let completedTests = testsWithThatPageType.filter(test => test.status === "win" || test.status === "loss" || test.status === "inconclusive").length;
        let winRate = winningTests / completedTests;
        let observation = {type: "pageType", pageType, winRate, completedTests};
        return Object.assign(observation, {insightScore: getInsightScore(observation)});
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
            hypothesisXPageTypeWinRates.push({type: "hypothesisXPageType", pageType, hypothesis, winRate, completedTests});
        })
    })
    hypothesisXPageTypeWinRates = hypothesisXPageTypeWinRates.map(observation => Object.assign(observation, {insightScore: getInsightScore(observation)}));
    
    let result = [];
    return result.concat(hypothesisWinRates, pageTypeWinRates, hypothesisXPageTypeWinRates).filter(observation => observation.insightScore !== 0);
}

function getInsightScore(observation){
    //insight score ranges from 0 to 100
    //function of completed tests and winrate
    //it multiplies winrate by (1-1/(1+2^completedTests/10)). this function goes quickly from near zero <5 tests to near 1 at >10 tests
    //so above 10 tests, insight score is almost equal to winrate
    if (observation.completedTests === 0){
        return 0;
    }
    return observation.winRate * (1 - 1/(1 + Math.pow(2, observation.completedTests)/10)) * 100;
}

export default class Insights extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allData: this.props.data
        }
    }

    render(){
        console.log(getInsights(this.state.allData).sort((a,b) => b.insightScore - a.insightScore));
        return <StyledInsights>Insights</StyledInsights>
    }
}