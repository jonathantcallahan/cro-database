import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
moment.suppressDeprecationWarnings = true;

const StyledPostIts = styled.div`
    background: #fff;
    min-height: 95vh;
    padding: 40px 60px;
`
const StyledHeading = styled.div`
    font-size: 26px;
    font-weight: 800;
    letter-spacing: 6px;
    text-transform: uppercase;
    margin-bottom: 10px;
`
const StyledNoteContainer = styled.div`
    min-height: 250px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 60px;
    ${props => {
        if (props.listView) {
            return `
                flex-direction: column;
                min-height: 70px;
                align-items: flex-start;
            `
        }
    }}
`
const StyledNote = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 300px;
    min-height: 250px;
    width: min-content;
    margin: 20px;
    padding: 15px;
    box-shadow: 0px 5px 20px 2px rgba(0, 0, 0, 0.05), 0 0 5px 1px rgba(0,0,0,0.12156862745098039);
`
const StyledListItem = styled.div`
    padding: 15px 10px;
    display: inline-block;
    > span.test{
        font-weight: 800;
    }
    > span.specialist{
        font-weight: 600;
    }
`
const StyledClientName = styled.div`
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
`
const StyledUplift = styled.div`
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    align-self: flex-end;
`
const StyledSpecialistName = styled.div`
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    align-self: flex-end;
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const StyledTestName = styled.div`
    font-size: 20px;
    font-weight: 300;
    align-self: center;
    text-align: center;
    line-height: 1.5;
`
const StyledOptions = styled.div`
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const StyledDateButton = styled.button`
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 800;
    background: none;
    border: 2px solid #555;
    color: #555;
    margin-right: 10px;
    padding: 5px 20px;
    cursor: pointer;
    ${props => {
        if (props.active) {
            return `
                background: #555;
                color: white;
            `
        }
    }}
`
const StyledViewButton = styled.button`
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 800;
    background: none;
    border: 2px solid #555;
    color: #555;
    margin-left: 10px;
    padding: 5px 20px;
    cursor: pointer;
    ${props => {
        if (props.active) {
            return `
                background: #555;
                color: white;
            `
        }
    }}
`

//Only this object needs to be updated for specialist/client transitions. 
//When connected to database, refactor to assign specialist name to data when imported?
const specialistsAndClients = {
    Matt: ["Advance Auto Parts", "Do My Own", "Jomashop", "Lumber Liquidators", "Steiner Tractor", "Hausera"],
    Jonathan: ["Advance Auto Parts", "The Pond Guy", "AED Superstore", "Coleman Furniture", "Heartsmart", "Peter Millar"],
    Riley: ["PUMA"]
};

export default class PostIts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateRangeStart: moment().startOf('month'),
            dateRangeEnd: moment(),
            timeRange: 'this-month', //"this-month" or "last-month"
            display: 'grid' //"grid" or "list"
        }
        this.updateDate = this.updateDate.bind(this);
    }

    createNote(client, specialist, testName, key, uplift) {
        //specialist class CSS is defined in index.css
        if (this.state.display === "grid") {
            return (
                <StyledNote className={specialist} key={key}>
                    <StyledClientName>{client}</StyledClientName>
                    <StyledTestName>{testName}</StyledTestName>
                    <StyledSpecialistName><StyledUplift>{uplift ? '+' + uplift : ''}</StyledUplift>{specialist}</StyledSpecialistName>
                </StyledNote>
            )
        }
        else {
            return (
                <StyledListItem className={specialist} key={key}>
                    <span className="test">{testName}</span> - <span className="client">{client}</span> - <span className="specialist">{specialist}</span> {uplift ? '+' + uplift : ''}
                </StyledListItem>
            )
        }
    }

    updateDate(string) {
        if (string === "last-month") {
            this.setState({ timeRange: 'last-month', dateRangeStart: moment().subtract(1, 'months').startOf('month'), dateRangeEnd: moment().subtract(1, 'months').endOf('month') });
        }
        if (string === "this-month") {
            this.setState({ timeRange: 'this-month', dateRangeStart: moment().startOf('month'), dateRangeEnd: moment() })
        }
    }

    handleViewChange(string) {
        this.setState({ display: string });
    }

    render() {
        let runningTests = [];
        let winningTests = [];
        let lossInconclusiveTests = [];
        let dataWithinDateRange = this.props.data.filter(test => {
            return (moment(test["date completed"]).isBetween(moment(this.state.dateRangeStart), moment(this.state.dateRangeEnd), null, '[]') || (test["status"] === "running"));
        });

        //For each specialist...
        for (let specialist in specialistsAndClients) {
            //For each client...
            specialistsAndClients[specialist].forEach((client, key1) => {
                let clientsTests = dataWithinDateRange.filter(test => test.client === client);
                let clientsRunningTests = clientsTests.filter(test => test.status === "running");
                clientsRunningTests.forEach((test, key2) => {
                    runningTests.push(this.createNote(test['client'], specialist, test['test name'], specialist + key1.toString() + key2.toString()));
                });
                let clientsWinningTests = clientsTests.filter(test => test.status === "win");
                clientsWinningTests.forEach((test, key2) => {
                    winningTests.push(this.createNote(test['client'], specialist, test['test name'], specialist + key1.toString() + key2.toString(), test['uplift']));
                });
                let clientsLossInconclusiveTests = clientsTests.filter(test => test.status === "loss" || test.status === "inconclusive");
                clientsLossInconclusiveTests.forEach((test, key2) => {
                    lossInconclusiveTests.push(this.createNote(test['client'], specialist, test['test name'], specialist + key1.toString() + key2.toString()));
                });
            })
        }

        return (
            <StyledPostIts>
                <StyledOptions>
                    <div>
                        <StyledDateButton active={this.state.timeRange === "this-month" ? true : false} onClick={e => this.updateDate('this-month')}>This Month</StyledDateButton>
                        <StyledDateButton active={this.state.timeRange === "last-month" ? true : false} onClick={e => this.updateDate('last-month')}>Last Month</StyledDateButton>
                        {this.state.dateRangeStart.format('MMMM Do, YYYY')} - {this.state.dateRangeEnd.format('MMMM Do, YYYY')}
                    </div>
                    <div>
                        <StyledViewButton active={this.state.display === "grid" ? true : false} onClick={e => this.handleViewChange('grid')}>Grid</StyledViewButton>
                        <StyledViewButton active={this.state.display === "list" ? true : false} onClick={e => this.handleViewChange('list')}>List</StyledViewButton>
                    </div>
                </StyledOptions>
                <StyledHeading>Currently Running</StyledHeading>
                <StyledNoteContainer listView={this.state.display === "list" ? true : false}>{runningTests}</StyledNoteContainer>
                <StyledHeading>Winning Tests</StyledHeading>
                <StyledNoteContainer listView={this.state.display === "list" ? true : false}>{winningTests}</StyledNoteContainer>
                <StyledHeading>Loss/Inconclusive</StyledHeading>
                <StyledNoteContainer listView={this.state.display === "list" ? true : false}>{lossInconclusiveTests}</StyledNoteContainer>
            </StyledPostIts>
        )
    }
}