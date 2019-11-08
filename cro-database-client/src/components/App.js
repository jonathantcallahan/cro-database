import React from 'react';
import DataTable from './DataTable';
import Filters from './Filters';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [{
        client: "Advance Auto Parts",
        testName: "Increase Value Proposition",
        result: "Win"
      },
      {
        client: "Advance Auto Parts",
        testName: "Chat-Style AAV",
        result: "Loss"
      },
      {
        client: "Puma",
        testName: "PDP Redesign",
        result: "Win"
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
