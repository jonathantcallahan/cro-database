import React from 'react';
import styled from 'styled-components';
import { concatAST } from '../../../node_modules/graphql';

const StyledInsights = styled.div`
    background: #efefef;
    min-height: 95vh;
`

function getInsights(data){
    return getHighWinrates(data);
}

function getHighWinrates(data){
    let result = [];

    //by hypothesis
    let allHypotheses = [...new Set(data.map(test => test.hypothesis))].filter(option => option !== "");
        //for each hypothesis
    let hypothesisWinRates = allHypotheses.map(hypothesis => {
        //get the data related to that hypothesis
        let testsWithThatHypothesis = data.filter(test => test.hypothesis === hypothesis);
        let winningTests = testsWithThatHypothesis.filter(test => test.status === "win").length;
        let allCompletedTests = testsWithThatHypothesis.filter(test => test.status === "win" || test.status === "loss" || test.status === "inconclusive").length;
        let winRate = winningTests / allCompletedTests;
        return {hypothesis, winRate};
    })

    //by page type
    let allPageTypes = [...new Set(data.map(test => test.page))].filter(option => option !== "");
        //for each page type
    let pageTypeWinRates = allPageTypes.map(pageType => {
        //get the data related to that page type
        let testsWithThatPageType = data.filter(test => test.page === pageType);
        let winningTests = testsWithThatPageType.filter(test => test.status === "win").length;
        let allCompletedTests = testsWithThatPageType.filter(test => test.status === "win" || test.status === "loss" || test.status === "inconclusive").length;
        let winRate = winningTests / allCompletedTests;
        return {pageType, winRate};
    })

    //by hypothesis x page type
    return result.concat(hypothesisWinRates, pageTypeWinRates);
}

export default class Insights extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allData: this.props.data
        }
    }

    render(){
        console.log(getInsights(this.state.allData));
        return <StyledInsights>Insights</StyledInsights>
    }
}