import React from 'react';
import styled from 'styled-components';

import DataTable from './DataTable';
import Filters from './Filters';

import data from '../wiifmData';
import '../reset.css';

const StyledApp = styled.div`
  font-family: Lato;
  display: flex;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    //state contains allData - an array of test objects, and appliedFilters, an array of objects like {column: x, condition: y}, to apply to allData
    this.state = {
      appliedFilters: [],
      allData: data,
      // allData: [{
      //   completed: 1,
      //   suggested: "10/13/2019",
      //   startDate: "10/20/2019",
      //   dateCompleted: "11/3/2019",
      //   priority: 3,
      //   priorityScore: 20,
      //   page: "global",
      //   testName: "1Increase Value Proposition",
      //   device: "all",
      //   increaseDecrease: "increase",
      //   Hypothesis: "value proposition",
      //   primaryMetric: "Conversion Rate",
      //   status: "win",
      //   uplift: "4%",
      //   revenueLift: "$15000",
      //   transactionsLift: "150",
      //   client: "Advance Auto Parts",
      //   industry: "automotive"
      // },
      searchString: ''
    };
    this.sortByColumn = this.sortByColumn.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.getFilteredData = this.getFilteredData.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  sortByColumn(columnName) {
    //column sort not working due to case conflict
    console.log(`sorting by column ${columnName}`);
    //TODO: add secondary click to reverse sort
    //TODO: handle sorting by dates
    columnName = columnName.toLowerCase();
    this.setState({
      allData: this.state.allData.sort(
        function (testA, testB) {
          //if strings, sort alphabetically
          if ((typeof testA[columnName] === "string") && (typeof testB[columnName] === "string")) {
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
        })
    });
  }

  resetFilters() {
    this.setState({ appliedFilters: [], searchString: '' });
    let selects = document.getElementsByTagName('select');
    for (let select of selects) {
      select.selectedIndex = 0;
    }
    let inputs = document.getElementsByTagName('input');
    for (let input of inputs) {
      input.value = '';
    }
  }

  applyFilter(data, columnName, condition) {
    console.log(`applying filter of ${condition} on ${columnName} to data ${data}`);
    return data.filter(test => test[columnName] === condition);
  }

  addFilter(filter) {
    //this looks confusing because it has to check if filter is already in state.appliedFilters, then either replace it or add it
    let previousList = this.state.appliedFilters;
    let wasPreviousFilterFound = false;
    let newList = previousList.map(previousFilter => {
      if (previousFilter.column === filter.column) {
        wasPreviousFilterFound = true;
        return filter;
      }
      return previousFilter;
    })

    if (wasPreviousFilterFound) {
      //the newList.filter here clears out the appliedFilter if user selected the top (default) dropdown option
      this.setState(state => state.appliedFilters = newList.filter(newFilter => newFilter.condition !== "-"));
      return;
    }
    //don't add filter if it's set to top default dropdown option
    if (filter.condition !== "-") {
      this.setState(state => state.appliedFilters.push(filter));
      return
    }
  }

  getFilteredData() {
    let searchedData = this.state.allData.filter(test => {
      for (let column in test) {
        if (test[column].toString().toLowerCase().includes(this.state.searchString)) {
          return true;
        }
      }
      return false;
    })

    //applies all filters in appliedFilters array to the searchedData (already filtered by search box)
    return this.state.appliedFilters.reduce((a, b) => this.applyFilter(a, b.column, b.condition), searchedData);
  }

  updateSearch(string) {
    this.setState({ searchString: string.toLowerCase() });
  }

  render() {
    return (
      <StyledApp className="App">
        <Filters data={this.state.allData} filterFunction={this.addFilter} resetFiltersFunction={this.resetFilters} searchFunction={this.updateSearch} />
        <DataTable data={this.getFilteredData()} onColumnClick={this.sortByColumn} searchString={this.state.searchString} />
      </StyledApp>
    );
  }
}

export default App;
