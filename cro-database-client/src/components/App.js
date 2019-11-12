import React from 'react';
import styled from 'styled-components';

import DataTable from './DataTable';
import Filters from './Filters';

import '../reset.css';

const StyledApp = styled.div`
  font-family: Lato;
  display: flex;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    //state contains 2 arrays: allData, which should not be modified, and filteredData, which can be sorted and filtered. Will add a reset button that, when pressed, 
    //copies allData into filteredData. Also copy allData into filteredData on load. This does not allow for removing filters after adding - save that for v2
    this.state = {
      allData: [{
        completed: 1,
        suggested: "10/13/2019",
        startDate: "10/20/2019",
        dateCompleted: "11/3/2019",
        priority: 3,
        priorityScore: 20,
        page: "global",
        testName: "1Increase Value Proposition",
        device: "all",
        increaseDecrease: "increase",
        Hypothesis: "value proposition",
        primaryMetric: "Conversion Rate",
        status: "win",
        uplift: "4%",
        revenueLift: "$15000",
        transactionsLift: "150",
        client: "Advance Auto Parts",
        industry: "automotive"
      },
      {
        completed: 1,
        suggested: "10/14/2019",
        startDate: "10/20/2019",
        dateCompleted: "11/3/2019",
        priority: 2,
        priorityScore: 13,
        page: "global",
        testName: "2Increase Value Proposition",
        device: "all",
        increaseDecrease: "increase",
        Hypothesis: "value proposition",
        primaryMetric: "Conversion Rate",
        status: "win",
        uplift: "4%",
        revenueLift: "$15000",
        transactionsLift: "150",
        client: "Advance Auto Parts",
        industry: "automotive"
      }, {
        completed: 1,
        suggested: "10/15/2019",
        startDate: "10/20/2019",
        dateCompleted: "11/3/2019",
        priority: 1,
        priorityScore: 17,
        page: "pdp",
        testName: "3Increase Value Proposition",
        device: "all",
        increaseDecrease: "increase",
        Hypothesis: "value proposition",
        primaryMetric: "Conversion Rate",
        status: "win",
        uplift: "4%",
        revenueLift: "$15000",
        transactionsLift: "150",
        client: "Advance Auto Parts",
        industry: "automotive"
      }],
      filteredData: [{
        completed: 1,
        suggested: "10/13/2019",
        startDate: "10/20/2019",
        dateCompleted: "11/3/2019",
        priority: 3,
        priorityScore: 20,
        page: "global",
        testName: "1Increase Value Proposition",
        device: "all",
        increaseDecrease: "increase",
        Hypothesis: "value proposition",
        primaryMetric: "Conversion Rate",
        status: "win",
        uplift: "4%",
        revenueLift: "$15000",
        transactionsLift: "150",
        client: "Advance Auto Parts",
        industry: "automotive"
      },
      {
        completed: 1,
        suggested: "10/14/2019",
        startDate: "10/20/2019",
        dateCompleted: "11/3/2019",
        priority: 2,
        priorityScore: 13,
        page: "global",
        testName: "2Increase Value Proposition",
        device: "all",
        increaseDecrease: "increase",
        Hypothesis: "value proposition",
        primaryMetric: "Conversion Rate",
        status: "win",
        uplift: "4%",
        revenueLift: "$15000",
        transactionsLift: "150",
        client: "Advance Auto Parts",
        industry: "automotive"
      }, {
        completed: 1,
        suggested: "10/15/2019",
        startDate: "10/20/2019",
        dateCompleted: "11/3/2019",
        priority: 1,
        priorityScore: 17,
        page: "pdp",
        testName: "3Increase Value Proposition",
        device: "all",
        increaseDecrease: "increase",
        Hypothesis: "value proposition",
        primaryMetric: "Conversion Rate",
        status: "win",
        uplift: "4%",
        revenueLift: "$15000",
        transactionsLift: "150",
        client: "Advance Auto Parts",
        industry: "automotive"
      }],
    };
    this.sortByColumn = this.sortByColumn.bind(this);
  }

  sortByColumn(columnName){
    this.setState(state => state.filteredData.sort(
      function(testA, testB){
        //if strings, sort alphabetically
        if((typeof testA[columnName] === "string") && (typeof testB[columnName] === "string")){
          var textA = testA[columnName].toUpperCase();
          var textB = testB[columnName].toUpperCase();
          if (textA < textB) {
            return -1;
          }
          if (textA > textB) {
            return 1;
          }
          return 0;
        }
        //else sort numerically
        return testA[columnName] - testB[columnName]
      }));
  }

  render() {
    return (
      <StyledApp className="App">
        <Filters />
        <DataTable data={this.state.filteredData} onColumnClick={this.sortByColumn} />
      </StyledApp>
    );
  }
}

export default App;
