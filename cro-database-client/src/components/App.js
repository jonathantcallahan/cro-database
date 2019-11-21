import React from 'react';
import styled from 'styled-components';

import Database from './Database';

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
    }

    render() {
        let windowContents = this.state.navigation === 'database' ? <Database data={data} /> : 'tba';
        return (
            <StyledApp>
                {windowContents}
            </StyledApp>
        )
    }
}

export default App;