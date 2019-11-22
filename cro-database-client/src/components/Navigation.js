import React from 'react';
import styled from 'styled-components';

const StyledNavigation = styled.nav`
    height: 5vh; /* this plus height of DataView and Insights needs to be 100vh */
    border-bottom: 1px solid #6d6d6d;
`
const StyledNavButton = styled.button`
    background: none;
    height: 100%;
    padding: 0 30px;
    border: none;
    cursor: pointer;
    font-family: Lato;
    position: relative;
    transition: background .2s;
    &:hover{
        background: #efefef;
    }
`

export default class Navigation extends React.Component {

    render() {
        let betaStyles = {
            textTransform: "uppercase",
            fontSize: "10px",
            position: "absolute",
            top: "6px",
            right: "3px"
        }

        let activeButtonStyles = {
            borderBottom: "3px solid rgb(0, 76, 154)"
        }

        let databaseButton = <StyledNavButton onClick={e => this.props.onClick("database")} style={this.props.activeButton === "database" ? activeButtonStyles : {}}>Database</StyledNavButton>;
        let insightsButton = <StyledNavButton onClick={e => this.props.onClick("insights")} style={this.props.activeButton === "insights" ? activeButtonStyles : {}}>Insights <span style={betaStyles}>beta</span></StyledNavButton>

        return (
        <StyledNavigation>
            {databaseButton}
            {insightsButton}
        </StyledNavigation>
        )
    }
}