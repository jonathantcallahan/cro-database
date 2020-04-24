import React from 'react';
import styled from 'styled-components';
import accounting from 'accounting';

import Database from './Database';
import Insights from './Insights';
import Navigation from './Navigation';
import Opportunities from './Opportunities';
import PostIts from './PostIts';

//everything was built originally with "wwifmData", just need to update so it looks the same with actual API
import sampleData from '../wiifmData';
import '../reset.css';

const StyledApp = styled.div`
  font-family: Lato;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: 'database',
            //initialFilters are used to load the database with filters applied from the insights page
            initialFilters: [],
            data: [],
            key: 0 //key is changed by the fetch request in componentDidMount(), which triggers all components to rerender when data comes in
        };
        this.updateNavigation = this.updateNavigation.bind(this);
        this.loadDatabaseWithFilters = this.loadDatabaseWithFilters.bind(this);
    }

    //fetch data from API
    componentDidMount() {
        //toggle this to switch between API data and sample data
        const useAPIData = false;
        if (useAPIData) {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch("https://cro-interface.herokuapp.com/api/all-tests", requestOptions)
                .then(response => response.json())
                .then(result => {
                    const columnOrder = ["Test Name", "Status", "Uplift", "Proj. Monthly Rev Lift", "Proj. Monthly Lift in Transactions", "Page", "Client", "Increase/ Decrease", "Hypothesis", "Device", "Primary Metric", "Suggested", "Start Date", "Date Completed", "Industry", "Priority", "Priority Score", "Report", "Notes", "Completed", "High Traffic", "Highly Visible", "Reduces Friction", "Increases Motivation", "Simple Test Build", "GA", "User Testing", "Heuristic Analysis"];

                    const formattedData = result.map(test => {
                        let formattedTest = {};
                        columnOrder.forEach(column => {
                            if (column === "Proj. Monthly Rev Lift") {
                                formattedTest["rev lift"] = test[column];
                                return;
                            }
                            if (column === "Proj. Monthly Lift in Transactions") {
                                formattedTest["transaction lift"] = test[column];
                                return;
                            }
                            formattedTest[column.toLowerCase()] = test[column];
                        });
                        return formattedTest;
                    });

                    function sortByColumn(data, columnName, direction) {
                        console.log(`sorting by column ${columnName} in direction ${direction}`);
                        columnName = columnName.toLowerCase();
                        let sortedData = data.sort(
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
                                else return 0
                            })
                        sortedData = direction === "up" ? sortedData : sortedData.reverse();
                        return sortedData;
                    }
                    let importedData = sortByColumn(formattedData, "Date Completed", "down");
                    console.log(importedData);
                    this.setState({ data: importedData, key: Math.random() });
                })
                .catch(error => console.log('error', error));
        }
        else{
            this.setState({ data: sampleData, key: Math.random() });
        }
    }

    updateNavigation(option) {
        this.setState({ navigation: option });
    }

    loadDatabaseWithFilters(filters) {
        this.setState({ navigation: 'database', initialFilters: filters });
    }

    render() {
        let windowContents;

        switch (this.state.navigation) {
            case 'database':
                windowContents = <Database data={this.state.data} filters={this.state.initialFilters} key={this.state.key}/>;
                break;
            case 'insights':
                windowContents = <Insights data={this.state.data} handleFilteredDatabaseLoad={this.loadDatabaseWithFilters} key={this.state.key}/>;
                break;
            case 'opportunities':
                windowContents = <Opportunities data={this.state.data} handleFilteredDatabaseLoad={this.loadDatabaseWithFilters} key={this.state.key}/>;
                break;
            case 'postIts':
                windowContents = <PostIts data={this.state.data} key={this.state.key}/>;
                break;
            default:
                windowContents = <Database data={this.state.data} filters={this.state.initialFilters} key={this.state.key}/>;
                break;
        }

        return (
            <StyledApp>
                <Navigation activeButton={this.state.navigation} onClick={this.updateNavigation} updateGlobalClientSelection={this.updateGlobalClientSelection} />
                {windowContents}
            </StyledApp>
        )
    }
}

export default App;