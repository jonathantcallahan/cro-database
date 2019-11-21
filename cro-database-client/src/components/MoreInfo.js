import React from 'react';
import styled from 'styled-components';

const StyledMoreInfoButton = styled.button`
    background: none;
    border: none;
    font-family: "Lato";
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 2px;
    color: #8a8a8a;
    cursor: pointer;
    padding: 7px 20px;
    text-align: center;
    width: 100%;
    &:focus{
        outline: none;
    }
    transition: background .2s;
    &:hover{
        background: #f9f9f9;
    }
`
const StyledMoreInfo = styled.div`
    width: 100%;
    text-align: center;
`
const StyledExpandedInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    padding: 20px 400px;
`
const StyledTable = styled.table`
    border: 1px solid #efefef;
`
const StyledTD = styled.td`
    text-transform: uppercase;
    font-size: 14px;
    color: #444;
    padding: 10px 10px;
`
const StyledTR = styled.tr`
    &:nth-child(even){
        background: #f8f8f8;
    }
`

export default class MoreInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expanded: false };
    }

    render() {
        function getPageTypeStats(data, allPageTypes) {
            let countOfPageTypes = allPageTypes.map(pageType => {
                let obj = {};
                obj[pageType] = data.filter(test => test.page === pageType).length > 0 ? data.filter(test => test.page === pageType).length : 0;
                return obj;
            });
            let trs = countOfPageTypes.map((pageType, key) => <StyledTR key={key}><StyledTD>{Object.keys(pageType)[0]}</StyledTD><StyledTD>{pageType[Object.keys(pageType)[0]]}</StyledTD></StyledTR>);
            return <StyledTable><tbody>{trs}</tbody></StyledTable>;
        }

        function getTestStatusStats(data, allTestStatuses) {
            let countOfTestStatuses = allTestStatuses.map(testStatus => {
                let obj = {};
                obj[testStatus] = data.filter(test => test.status === testStatus).length > 0 ? data.filter(test => test.status === testStatus).length : 0;
                return obj;
            });
            let trs = countOfTestStatuses.map((testStatus, key) => <StyledTR key={key}><StyledTD>{Object.keys(testStatus)[0]}</StyledTD><StyledTD>{testStatus[Object.keys(testStatus)[0]]}</StyledTD></StyledTR>);
            return <StyledTable><tbody>{trs}</tbody></StyledTable>;
        }

        let expandedInfo;
        if (this.state.expanded) {
            expandedInfo = (
                <StyledExpandedInfo>
                    {getPageTypeStats(this.props.data, this.props.allPageTypes)}
                    {getTestStatusStats(this.props.data, this.props.allTestStatuses)}
                </StyledExpandedInfo>
            );
        }

        let lessInfo = <span>Less Info <span style={{color: '#a2a2a2'}}>▲</span></span>;
        let moreInfo = <span>More Info <span style={{color: '#a2a2a2'}}>▼</span></span>;

        return (
            <StyledMoreInfo className={this.state.expanded ? "expanded" : "collapsed"}>
                <StyledMoreInfoButton onClick={e => this.setState(state => state.expanded = !state.expanded)}>
                    {this.state.expanded ? lessInfo : moreInfo}
                </StyledMoreInfoButton>
                {expandedInfo}
            </StyledMoreInfo>
        )
    }
}