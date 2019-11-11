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
    this.state = {
      allData: [{
        completed: 1,
        suggested: "10/14/2019",
        startDate: "10/20/2019",
        dateCompleted: "11/3/2019",
        priority: 3,
        priorityScore: 17,
        page: "global",
        testName: "Increase Value Proposition",
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
        priorityScore: 17,
        page: "global",
        testName: "Increase Value Proposition",
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
<<<<<<< HEAD
        completed: 1,
=======
        completed: "11/3/2019",
        suggested: "10/14/2019",
        priorityScore: 17,
        page: "global",
        testName: "Increase Value Proposition",
        device: "all",
        increaseDecrease: "increase",
        Hypothesis: "value proposition",
        primaryMetric: "Conversion Rate",
<<<<<<< HEAD
        status: "win",
=======
        status: "completed",
>>>>>>> d78e1168693fce30c5141da352dd3892cc9c62ba
        uplift: "4%",
        revenueLift: "$15000",
        transactionsLift: "150",
        client: "Advance Auto Parts",
        industry: "automotive"
      }],
    };
    this.makeAllDataSmileys = this.makeAllDataSmileys.bind(this);
  }

  //function to test manipulating parent state by passing to children
  makeAllDataSmileys(){
    this.setState({allData: [{client: '😀', lift: '😀'}]});
  }

  render() {
    return (
      <StyledApp className="App">
        <Filters />
        <DataTable data={this.state.allData} onColumnClick={this.makeAllDataSmileys} />
      </StyledApp>
    );
  }
}

export default App;
