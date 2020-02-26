import React from 'react';
import styled from 'styled-components';

import Insight from './Insight';

const StyledOpportunities = styled.div`
    background: #efefef;
    min-height: 95vh;
    padding: 40px 60px;
`

function getOpportunities(data) {
    //NOTE: all insight scores here are 50, unsure what they should be
    //by client x page type
    let allPageTypes = ['pdp', 'cart', 'homepage', 'global', 'plp', 'search', 'checkout', 'category'];
    let allClients = [...new Set(data.map(test => test.client))].filter(option => option !== "");
    let inactiveClients = ['Jomashop', 'Lumber Liquidators'];
    let result = [];
    allClients.filter(client => !inactiveClients.includes(client)).forEach(function (client) {
        const thatClientsTests = data.filter(test => test.client === client);
        allPageTypes.forEach(function (pageType) {
            const clientTestsOnThatPageType = thatClientsTests.filter(test => test.page === pageType);
            if (!clientTestsOnThatPageType.length) {
                result.push({ insight: "opportunity", pageType, client });
            }
        })
    })
    return result;
}

export default class Insights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: this.props.data
        }
    }

    render() {
        const insights = getOpportunities(this.state.allData).map((insight, key) => <Insight insight={insight} key={key} handleFilteredDatabaseLoad={this.props.handleFilteredDatabaseLoad} />);
        return <StyledOpportunities>{insights}</StyledOpportunities>
    }
}