import React from 'react'
import Db from './Db';
import axios from 'axios';


export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayValue: '_' };
    this.typeInput = 'binare';
  }

  componentDidMount() {
    this.intervlLoadDisplay = setInterval(() => this.loadDisp(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervlLoadDisplay);
  }

  loadDisp = () => {
    this.setState({
      displayValue: this.prepareToOutput()//JSON.stringify(Db.getAllOpMem())
    });
  }

  handleChange = (e) => {
    axios.get('http://127.0.0.1:3012/test')
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        console.log(e);
      })
      .finally(() => {
        console.log('Finally');
      })
    const { name, value } = e.target;
    this.typeInput = value;
    this.setState({
      [name]: value,
      displayValue: value
    });
  }

  convertBinToDec(bin) {
    let dec = 0;
    let pw = 0;
    for (let i = bin.length - 1; i >= 0; i--) {
      if (bin[i] === '_1') {
        dec += Math.pow(2, pw);
      }
      pw++;
    }
    return dec;
  }

  prepareToOutput() {
    let texAr = [], tline = '';
    let op = Db.getAllOpMem();
    for (let i in op) {
      if (this.typeInput === 'binare') {
        tline = op[i].toString().replaceAll(',', '');
        tline = tline.replaceAll('_1', 1);
        tline = tline.replaceAll('_0', 0);
        texAr.push(tline);
      } else if (this.typeInput === 'decimal') {
        texAr.push(this.convertBinToDec(op[i]));
      }
    }
    return texAr;
  }

  render() {
    return (
      <div>
        <p><label>Монітор:</label></p>
        <textarea
        className="p-3 mb-2 bg-success-subtle text-success-emphasis"
          name="displayOutput"
          id="displayOutputId"
          rows={5} cols={40}
          readOnly
          value={this.state.displayValue}
        />

        <form >
          <label>Binare:
            <input type="radio"
            className="form-check-input form-check-inline"
              name="typeShou"
              onChange={this.handleChange}
              value="binare"
            />
          </label>
          <label>Decimal:
            <input type="radio"
            className="form-check-input form-check-inline"
              name="typeShou"
              onChange={this.handleChange}
              value="decimal"
            />
          </label>
        </form>
      </div>
    )
  }
}
