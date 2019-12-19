import React from 'react';
import styled from 'styled-components';

import DataTable from './DataTable';
import DataSummary from './DataSummary';
import MoreInfo from'./MoreInfo';

const StyledDataView = styled.div`
    width: 83vw;
    height: 95vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    @media (max-width: 1130px){
        width: 100vw;
    }
`
export default class DataView extends React.Component {

    render() {
        let numberOfTests = this.props.data.length;
        let numberOfWins = this.props.data.filter(test => test.status === "win").length;
        let numberOfCompletedTests = this.props.data.filter(test => (test.status ===  "win" | test.status ===  "loss" | test.status ===  "inconclusive")).length;

        return (
            <StyledDataView>
                <DataSummary numberOfTests={numberOfTests} winPercent={Math.round(numberOfWins * 100 / numberOfCompletedTests)} />
                <MoreInfo data={this.props.data} allPageTypes={this.props.allPageTypes} allTestStatuses={this.props.allTestStatuses} />
                <DataTable data={this.props.data} onColumnClick={this.props.onColumnClick} searchString={this.props.searchString} />
            </StyledDataView>
        )
    }
}