import React from 'react'
import {render} from 'react-dom'
import ContentEditable from 'react-contenteditable'

export default class DetailRow extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      detail: "",
      count: 0,
      price: 0,
      total: 0,
    }

    this.displayedPrice = this.displayedPrice.bind(this)
  }

  calc() {
    const count = parseInt(this.state.count) || 0
    const price = parseInt(this.state.price) || 0
    const res = count * price
    this.props.addTotalData(this.props.index, res);
    this.setState({total: res});
  }

  displayedPrice(val) {
    const price = val? val.replace('円', '').replace(',', ''): 0;
    return `${price.toLocaleString()}円`
  }

  render() {
    const {detail, count, price, total} = this.state
    console.log(this.props);

    return <div className="row">
        <div className="delete-btn" onClick={() => this.props.rowDelete(this.props.index)}>削除</div>
        <ContentEditable html={detail}
                         onChange={e => this.setState({detail: e.target.value})}/>
        <ContentEditable html={count}
                         onChange={e => {
                           this.setState({count: e.target.value}, this.calc)
                         }}/>
        <ContentEditable html={this.displayedPrice(price)}
                         onChange={e => {
                           this.setState({price: e.target.value}, this.calc)
                         }}/>
        <div>{`${total.toLocaleString()}円`}</div>
      </div>
  }
}
