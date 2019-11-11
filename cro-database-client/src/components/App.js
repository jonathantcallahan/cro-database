import React from 'react';
import DataTable from './DataTable';
import Filters from './Filters';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [{
        completed: "11/3/2019",
        suggested: "10/14/2019",
        startDate: "10/20/2019",
        dateCompleted: "11/3/2019",
        priority: 1,
        priorityScore: 17,
        page: "global",
        testName: "Increase Value Proposition",
        device: "all",
        increaseDecrease: "increase",
        Hypothesis: "value proposition",
        primaryMetric: "Conversion Rate",
        status: "completed",
        uplift: "4%",
        revenueLift: "$15000",
        transactionsLift: "150",
        client: "Advance Auto Parts",
        industry: "automotive"
      },
      {
        completed: "11/3/2019",
        suggested: "10/14/2019",
        startDate: "10/20/2019",
        dateCompleted: "11/3/2019",
        priority: 1,
        priorityScore: 17,
        page: "global",
        testName: "Increase Value Proposition",
        device: "all",
        increaseDecrease: "increase",
        Hypothesis: "value proposition",
        primaryMetric: "Conversion Rate",
        status: "completed",
        uplift: "4%",
        revenueLift: "$15000",
        transactionsLift: "150",
        client: "Advance Auto Parts",
        industry: "automotive"
      }, {
        completed: "11/3/2019",
        suggested: "10/14/2019",
        startDate: "10/20/2019",
        dateCompleted: "11/3/2019",
        priority: 1,
        priorityScore: 17,
        page: "global",
        testName: "Increase Value Proposition",
        device: "all",
        increaseDecrease: "increase",
        Hypothesis: "value proposition",
        primaryMetric: "Conversion Rate",
        status: "completed",
        uplift: "4%",
        revenueLift: "$15000",
        transactionsLift: "150",
        client: "Advance Auto Parts",
        industry: "automotive"
      }],
    };
  }

  render() {
    return (
      <div className="App">
        <Filters />
        <DataTable data={this.state.allData} />
      </div>
    );
  }
}

export default App;
