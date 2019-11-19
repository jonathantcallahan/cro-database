import React from 'react';
import styled from 'styled-components';

import DataTable from './DataTable';
import DataSummary from './DataSummary';

const StyledDataView = styled.div`
    width: 80vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

export default class DataView extends React.Component {

    render() {
        let numberOfTests = this.props.data.length;
        let numberOfWins = this.props.data.filter(test => test.status === "win").length;
        let numberOfCompletedTests = this.props.data.filter(test => test.status !== "running").length;

        return (
            <StyledDataView>
                <DataSummary numberOfTests={numberOfTests} winPercent={Math.round(numberOfWins * 100 / numberOfCompletedTests)} />
                <DataTable data={this.props.data} onColumnClick={this.props.onColumnClick} searchString={this.props.searchString} />
            </StyledDataView>
        )
    }
}