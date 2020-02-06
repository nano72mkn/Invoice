import React from 'react'
import {render} from 'react-dom'
import ContentEditable from 'react-contenteditable'

import './scss/style.scss'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      "to-company": "丸々御中",
      "to-name": "相手の名前"
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    document.execCommand("DefaultParagraphSeparator", false, "br");
  }

  handleChange(e) {
    this.setState({ [e.currentTarget.className]: e.target.value })
  }

  render () {
    return (
      <div className="page">
        <div className="title">請求書</div>

        <ContentEditable className="to-company"
                         html={this.state["to-company"]}
                         onChange={this.handleChange}/>
        <ContentEditable className="to-name"
                         html={this.state["to-name"]}
                         onChange={this.handleChange}/>

        <div className="date" contenteditable="true">2010/10/10</div>

        <div className="from">
          <div className="zipcode" contenteditable="true">〒000-0000</div>
          <div className="address" contenteditable="true">丸々県丸々市丸々1-1-1</div>
          <div className="tel" contenteditable="true">000-0000-0000</div>
          <div className="from" contenteditable="true">自分の名前</div>
        </div>

        <div className="text">下記のとおりご請求申し上げます。</div>

        <div className="total-table table">
          <div className="head">小計</div>
          <div className="head">消費税</div>
          <div className="head">合計</div>
          <div>4,000円</div>
          <div>300円</div>
          <div>4,300円</div>
        </div>

        <div className="transfer-table table">
          <div className="head">振込期日</div>
          <div contenteditable="true">2020年10月10日</div>
          <div className="head">振込先</div>
          <div contenteditable="true">ここそこ</div>
        </div>

        <div className="detail-table table">
          <div className="head">詳細</div>
          <div className="head">数量</div>
          <div className="head">単価</div>
          <div className="head">金額</div>

          <div contenteditable="true">詳細が入ります</div>
          <div contenteditable="true">1</div>
          <div contenteditable="true">1,000円</div>
          <div contenteditable="true">1,000円</div>

          <div contenteditable="true">詳細が入ります</div>
          <div contenteditable="true">1</div>
          <div contenteditable="true">1,000円</div>
          <div contenteditable="true">1,000円</div>
        </div>

        <div className="remarks" contenteditable="true" />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
