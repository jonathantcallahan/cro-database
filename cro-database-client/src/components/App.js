import React from 'react';
import styled from 'styled-components';

import Database from './Database';
import Insights from './Insights';
import Navigation from './Navigation';

import data from '../wiifmData';
import '../reset.css';

const StyledApp = styled.div`
  font-family: Lato;
`;

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navigation: 'database',
            //initialFilters are used to load the database with filters applied from the insights page
            initialFilters: []
        };
        this.updateNavigation = this.updateNavigation.bind(this);
        this.loadDatabaseWithFilters = this.loadDatabaseWithFilters.bind(this);
    }

    updateNavigation(option){
        this.setState({navigation: option});
    }

    loadDatabaseWithFilters(filters){
        this.setState({navigation: 'database', initialFilters: filters});
    }

    render() {
        let windowContents = this.state.navigation === 'database' ? 
            <Database data={data} filters={this.state.initialFilters} /> : 
            <Insights data={data} handleFilteredDatabaseLoad={this.loadDatabaseWithFilters} />;
            
        return (
            <StyledApp>
                <Navigation activeButton={this.state.navigation} onClick={this.updateNavigation} updateGlobalClientSelection={this.updateGlobalClientSelection} />
                {windowContents}
            </StyledApp>
        )
    }
}

export default App;