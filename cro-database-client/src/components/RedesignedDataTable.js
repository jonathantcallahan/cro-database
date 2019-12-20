import React from 'react';
import styled from 'styled-components';

const StyledRedesignedDataTable = styled.div`
  padding: 40px;
`
const StyledNoData = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 25px;
  background: none;
  color: #666;
  width: 100%;
`
const StyledTest = styled.div`
  margin-bottom: 30px;
`
const StyledTestName = styled.div`
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -.5px;
  margin: 10px 0;
`
const StyledTestResults = styled.div`
  color: #666;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const StyledTestDetails = styled.div`
  color: #666;
  font-size: 14px;
`

export default class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortDirections: {}
        };
    }

    render() {
        console.log(this.props.data);
        if (this.props.data.length === 0) {
            return <StyledNoData><span>no data <span role="img" aria-label="sadface">😥</span></span></StyledNoData>
        }
        let tests = this.props.data.map((test, key) => {
            return(
                <StyledTest key={key}>
                    <StyledTestResults>{test["status"]}&nbsp;{test["uplift"] !== "0.00%" ? '· ' + test["uplift"] : ''}&nbsp;{test["rev lift"] !== "$0.00" ? '· ' + test["rev lift"] : ''}</StyledTestResults>
                    <StyledTestName>{test["test name"]}</StyledTestName>
                    <StyledTestDetails>{test["client"]}&nbsp;·&nbsp;{test["page"]}&nbsp;·&nbsp;{test["increase/ decrease"]}&nbsp;·&nbsp;{test["hypothesis"]}</StyledTestDetails>
                </StyledTest>
            )
        })
        return <StyledRedesignedDataTable>{tests}</StyledRedesignedDataTable>;
    }
};