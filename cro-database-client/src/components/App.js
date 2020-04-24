import React from 'react';
import styled from 'styled-components';

import Database from './Database';
import Insights from './Insights';
import Navigation from './Navigation';
import Opportunities from './Opportunities';
import PostIts from './PostIts';

//everything was built originally with "wwifmData", just need to update so it looks the same with exampleDataFromAPI (and later, with actual API)
//import data from '../wiifmData';
import data from '../exampleDataFromAPI';
import '../reset.css';

const StyledApp = styled.div`
  font-family: Lato;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: 'postIts',
            //initialFilters are used to load the database with filters applied from the insights page
            initialFilters: []
        };
        this.updateNavigation = this.updateNavigation.bind(this);
        this.loadDatabaseWithFilters = this.loadDatabaseWithFilters.bind(this);
    }
    
    // fetch data from API
    // componentDidMount() {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };

    //     fetch("https://cro-interface.herokuapp.com/api/all-tests", requestOptions)
    //         .then(response => console.log(response))
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));
    // }

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
                windowContents = <Database data={data} filters={this.state.initialFilters} />;
                break;
            case 'insights':
                windowContents = <Insights data={data} handleFilteredDatabaseLoad={this.loadDatabaseWithFilters} />;
                break;
            case 'opportunities':
                windowContents = <Opportunities data={data} handleFilteredDatabaseLoad={this.loadDatabaseWithFilters} />;
                break;
            case 'postIts':
                windowContents = <PostIts data={data} />;
                break;
            default:
                windowContents = <Database data={data} filters={this.state.initialFilters} />;
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