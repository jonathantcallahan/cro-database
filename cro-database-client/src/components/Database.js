import React from 'react';
import styled from 'styled-components';
import accounting from 'accounting';

import DataView from './DataView';
import Filters from './Filters';

const StyledDatabase = styled.div`
  display: flex;
`;

class Database extends React.Component {
  //Database is a high-level component which holds data, and contains a Filters component and DataView (which itself has the data table, summary at the top, and "More Info" area)
  constructor(props) {
    super(props);
    //state contains allData - an array of test objects, and appliedFilters, an array of objects like {column: x, condition: y}, to apply to allData
    this.state = {
      appliedFilters: this.props.filters || [],
      allData: this.props.data,
      searchString: ''
    };
    this.sortByColumn = this.sortByColumn.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.getFilteredData = this.getFilteredData.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  sortByColumn(columnName, direction) {
    console.log(`sorting by column ${columnName} in direction ${direction}`);
    columnName = columnName.toLowerCase();
    let sortedData = this.state.allData.sort(
      function (testA, testB) {
        if (testA[columnName] === '') {
          return -1;
        }
        if (testB[columnName] === '') {
          return 1;
        }
        //numerical sorting
        if (columnName === "rev lift" || columnName === "uplift" || columnName === "transaction lift") {
          let numA = accounting.unformat(testA[columnName]);
          let numB = accounting.unformat(testB[columnName]);
          return numA - numB;
        }
        //date sorting
        else if (columnName === "suggested" || columnName === "start date" || columnName === "date completed") {
          let arrA = testA[columnName].split('/');
          let arrB = testB[columnName].split('/');
          let yearA = arrA[2];
          let monthA = arrA[0];
          let dayA = arrA[1];
          let yearB = arrB[2];
          let monthB = arrB[0];
          let dayB = arrB[1];
          if (yearA !== yearB) {
            return yearA - yearB;
          }
          else if (monthA !== monthB) {
            return monthA - monthB;
          }
          else {
            return dayA - dayB;
          }
        }
        //else, sort alphabetically
        else if ((typeof testA[columnName] === "string") && (typeof testB[columnName] === "string")) {
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
        else return 0;
      })
    sortedData = direction === "up" ? sortedData : sortedData.reverse();
    this.setState({
      allData: sortedData
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
    console.log(`applying filter of ${condition} on ${columnName}`);
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
        if (test[column]) {
          if (test[column].toString().toLowerCase().includes(this.state.searchString)) {
            return true;
          }
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
      <StyledDatabase>
        <Filters data={this.state.allData} filterFunction={this.addFilter} resetFiltersFunction={this.resetFilters} searchFunction={this.updateSearch} />
        <DataView
          data={this.getFilteredData()}
          onColumnClick={this.sortByColumn}
          searchString={this.state.searchString}
          allPageTypes={[...new Set(this.state.allData.map(test => test.page))].filter(option => option !== "")}
          allTestStatuses={[...new Set(this.state.allData.map(test => test.status))].filter(option => option !== "")}
        />
      </StyledDatabase>
    );
  }
}

export default Database;
