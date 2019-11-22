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
            navigation: 'insights'
        };
        this.updateNavigation = this.updateNavigation.bind(this);
    }

    updateNavigation(option){
        this.setState({navigation: option});
    }

    render() {
        let windowContents = this.state.navigation === 'database' ? 
            <Database data={data} /> : 
            <Insights data={data} />;
            
        return (
            <StyledApp>
                <Navigation activeButton={this.state.navigation} onClick={this.updateNavigation} />
                {windowContents}
            </StyledApp>
        )
    }
}

export default App;