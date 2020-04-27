import React from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
const StyledClientName = styled.div`
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
`
const StyledSpecialistName = styled.div`
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    align-self: flex-end;
`
const StyledTestName = styled.div`
    font-size: 20px;
    font-weight: 300;
    align-self: center;
    text-align: center;
    line-height: 1.5;
`
//Only this object needs to be updated for specialist/client transitions. 
//When connected to database, refactor to assign specialist name to data when imported?
const specialistsAndClients = {
    Matt: ["Advance Auto Parts", "Do My Own", "Jomashop", "Lumber Liquidators", "Steiner Tractor", "Hausera"],
    Jonathan: ["Advance Auto Parts", "The Pond Guy", "AED Superstore", "Coleman Furniture", "Heartsmart", "Peter Millar"],
    Riley: ["PUMA"],
    Danielle: []
};

export default class PostIts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateRangeStart: '', //temporary dateRange for testing
            dateRangeEnd: "1/30/2020"
        }
    }

    createNote(client, specialist, testName, key) {
        //specialist class CSS is defined in index.css
        return (
            <StyledNote className={specialist} key={key}>
                <StyledClientName>{client}</StyledClientName>
                <StyledTestName>{testName}</StyledTestName>
                <StyledSpecialistName>{specialist}</StyledSpecialistName>
            </StyledNote>
        )
    }

    //https://www.npmjs.com/package/react-datepicker
    //maybe try https://www.npmjs.com/package/react-date-range
    handleChange = date => {
        this.setState({
            dateRangeStart: date
        });
    };

    render() {
        let runningTests = [];
        let winningTests = [];
        let lossInconclusiveTests = [];
        let dataWithinDateRange = this.props.data.filter(test => {
            return (moment(test["date completed"]).isBetween(moment(this.state.dateRangeStart), moment(this.state.dateRangeEnd)) || (test["status"] === "running"));
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
                    winningTests.push(this.createNote(test['client'], specialist, test['test name'], specialist + key1.toString() + key2.toString()));
                });
                let clientsLossInconclusiveTests = clientsTests.filter(test => test.status === "loss" || test.status === "inconclusive");
                clientsLossInconclusiveTests.forEach((test, key2) => {
                    lossInconclusiveTests.push(this.createNote(test['client'], specialist, test['test name'], specialist + key1.toString() + key2.toString()));
                });
            })
        }

        return (
            <StyledPostIts>
                <DatePicker
                    selected={this.state.dateRangeStart}
                    onChange={this.handleChange}
                />
                <StyledHeading>Currently Running</StyledHeading>
                <StyledNoteContainer>{runningTests}</StyledNoteContainer>
                <StyledHeading>Winning Tests</StyledHeading>
                <StyledNoteContainer>{winningTests}</StyledNoteContainer>
                <StyledHeading>Loss/Inconclusive</StyledHeading>
                <StyledNoteContainer>{lossInconclusiveTests}</StyledNoteContainer>
            </StyledPostIts>
        )
    }
}