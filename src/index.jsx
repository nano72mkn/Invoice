import React from 'react'
import {render} from 'react-dom'
import ContentEditable from 'react-contenteditable'

import DetailRow from './components/detailRow'

import './scss/style.scss'
import './scss/print.scss'

class App extends React.Component
{
  constructor() {
    super()
    this.state = {
      "to-company": "丸々御中",
      "to-name": "相手の名前",
      date: "2020/1/1",
      transfer: "振込先",
      zipcode: "〒000-0000",
      address: "アドレス",
      tel: "080-0000-0000",
      "from-name": "お届け名",
      deadline: "2020/1/1",
      subtotal: 0,
      tax: 0,
      total: 0,
      detail_row: [],
      total_data: [],
      remarks: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.displayedPrice = this.displayedPrice.bind(this)
    this.rowAdd = this.rowAdd.bind(this)
    this.rowDelete = this.rowDelete.bind(this)
    this.addTotalData = this.addTotalData.bind(this)
    this.sum = this.sum.bind(this)
  }

  componentDidMount() {
    document.execCommand("DefaultParagraphSeparator", false, "br");
  }

  handleChange(e) {
    this.setState({ [e.currentTarget.className]: e.target.value })
  }

  displayedPrice(price) {
    return `${price.toLocaleString()}円`
  }

  rowAdd() {
    let detail_row = this.state.detail_row
    detail_row.push(<DetailRow key={detail_row.length} index={detail_row.length} rowDelete={this.rowDelete} addTotalData={this.addTotalData}/>)

    this.setState({ detail_row })
  }

  rowDelete(index) {
    let detail_row = this.state.detail_row
    detail_row[index] = null;

    let total_data = this.state.total_data
    total_data[index] = 0

    this.setState({ detail_row, total_data })
  }

  addTotalData(index, total) {
    let total_data = this.state.total_data
    total_data[index] = total

    this.setState({ total_data }, this.sum);
  }

  sum() {
    const subtotal = this.state.total_data.reduce((prev, current, i, arr) => {
        return prev+current;
    })

    const tax = subtotal * 0.8
    const total = subtotal + tax

    this.setState({ subtotal, tax, total })
  }

  render () {
    const {
      date,
      zipcode,
      address,
      tel,
      subtotal,
      tax,
      total,
      detail_row,
    } = this.state

    return (
      <>
      <div className="page">
        <div className="title">請求書</div>

        <ContentEditable className="to-company"
                         html={this.state["to-company"]}
                         onChange={this.handleChange}/>
        <ContentEditable className="to-name"
                         html={this.state["to-name"]}
                         onChange={this.handleChange}/>

        <ContentEditable className="date"
                         html={date}
                         onChange={this.handleChange}/>

        <div className="from">
          <ContentEditable className="zipcode"
                           html={zipcode}
                           onChange={this.handleChange}/>
          <ContentEditable className="address"
                           html={address}
                           onChange={this.handleChange}/>
          <ContentEditable className="tel"
                           html={tel}
                           onChange={this.handleChange}/>
          <ContentEditable className="from-name"
                           html={this.state["from-name"]}
                           onChange={this.handleChange}/>
        </div>

        <div className="text">下記のとおりご請求申し上げます。</div>

        <div className="total-table table">
          <div className="head">小計</div>
          <div className="head">消費税</div>
          <div className="head">合計</div>
          <div>{ this.displayedPrice(subtotal) }</div>
          <div>{ this.displayedPrice(tax) }</div>
          <div>{ this.displayedPrice(total) }</div>
        </div>

        <div className="transfer-table table">
          <div className="head">振込期日</div>
          <ContentEditable className="deadline"
                           html={this.state["deadline"]}
                           onChange={this.handleChange}/>
          <div className="head">振込先</div>
          <ContentEditable className="transfer"
                           html={this.state["transfer"]}
                           onChange={this.handleChange}/>
        </div>

        <div className="detail-table table">
          <div className="head">詳細</div>
          <div className="head">数量</div>
          <div className="head">単価</div>
          <div className="head">金額</div>

          { detail_row.map((v) => v) }
        </div>

        <div>備考</div>
        <ContentEditable className="remarks"
                         html={this.state["remarks"]}
                         onChange={this.handleChange}/>
      </div>
      <div className="detail-add" onClick={this.rowAdd}>追加</div>
      </>
    )
  }
}

render(<App/>, document.getElementById('app'));
