import React, { Component, createRef } from 'react'
import {
  Card,
  Row,
  Col
} from 'antd'
import echarts from 'echarts'

import { getArticleAmount } from '../../requests'

import './dashboard.less'

export default class Dashboard extends Component {
  constructor(){
    super()
    this.articleAmount = createRef()
  }

  initArticleChart = () => {
    const myChart = echarts.init(this.articleAmount.current)
    getArticleAmount()
      .then(resp => {
        const option = {
            grid: {  
              left: '10',  
              right: '10',  
              bottom: '10',
              top: '10',
              containLabel: true  
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
                data: resp.amount.map(item => item.month)
            },
            yAxis: {
              type: 'value'
            },
            series: [{
                type: 'line',
                data: resp.amount.map(item => item.value),
                areaStyle: {}
            }]
        };
        myChart.setOption(option);
      })
    
  }

  componentDidMount(){
    this.initArticleChart()
  }

  render() {
    return (
      <>
        <Card
          title="概览"
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{backgroundColor: '#f00'}}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{backgroundColor: '#0f0'}}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{backgroundColor: '#00f'}}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="qf-gutter-box" style={{backgroundColor: '#029'}}>col-6</div>
            </Col>
          </Row>
        </Card>
        <Card>
          <div ref={this.articleAmount} style={{height: '400px'}}/>
        </Card>
      </>
    )
  }
}
