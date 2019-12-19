import React from 'react';
import styled from 'styled-components';

const StyledNoData = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 25px;
  background: none;
  color: #666;
  width: 100%;
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
                <div key={key}>
                    <div>{test["status"]}&nbsp;{test["uplift"]}&nbsp;{test["rev lift"]}</div>
                    <div>{test["test name"]}</div>
                    <div>{test["client"]}&nbsp;{test["page"]}&nbsp;{test["increase/ decrease"]}&nbsp;{test["hypothesis"]}</div>
                </div>
            )
        })
        return tests;
    }
};