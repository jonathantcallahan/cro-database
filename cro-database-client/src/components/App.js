import React from 'react';
import styled from 'styled-components';

import Database from './Database';
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
            navigation: 'database'
        };
        this.updateNavigation = this.updateNavigation.bind(this);
    }

    updateNavigation(option){
        this.setState({navigation: option});
    }

    render() {
        let windowContents = this.state.navigation === 'database' ? <Database data={data} /> : 'Coming Soon';
        return (
            <StyledApp>
                <Navigation activeButton={this.state.navigation} onClick={this.updateNavigation} />
                {windowContents}
            </StyledApp>
        )
    }
}

export default App;