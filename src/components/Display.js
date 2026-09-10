import React from 'react'
import Db from '../resource/Db';


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
      if (bin[i] === '1') {
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
        tline = tline.replaceAll('1', 1);
        tline = tline.replaceAll('0', 0);
        texAr.push(tline);
      } else if (this.typeInput === 'decimal') {
        texAr.push(this.convertBinToDec(op[i]));
      }
    }
    return texAr;
  }

  render() {
    return (
      <div className="p-3 bg-dark text-white rounded border border-secondary">
  {/* Блок монітора */}
  <div className="mb-3">
    <label htmlFor="displayOutputId" className="form-label fw-bold text-success-emphasis">
      Монітор:
    </label>
    <textarea
      className="form-control p-3 bg-success-subtle text-success-emphasis border-success fw-mono"
      name="displayOutput"
      id="displayOutputId"
      rows={5}
      readOnly
      value={this.state.displayValue}
      style={{ resize: 'none' }} // Забороняє користувачу розтягувати вікно монітора
    />
  </div>

  {/* Блок перемикачів (Radio) */}
 {/* gap-5 робить величезну відстань між елементами форми */}
<form className="d-flex gap-5 align-items-center mt-4 p-2 w-100">
  <span className="fw-bold text-info fs-5">Формат:</span>

  {/* Radio 1: Binary */}
  <div className="form-check m-2 fs-5 fw-semibold text-warning">
    <input
      type="radio"
      className="form-check-input"
      name="typeShou"
      id="radioBinary"
      onChange={this.handleChange}
      value="binare"
      checked={this.state.typeShou === 'binare'}
      style={{ transform: 'scale(1.2)', marginRight: '10px' }} // Збільшує сам кружечок
    />
    <label className="form-check-label" htmlFor="radioBinary">
      Binary
    </label>
  </div>

  {/* Radio 2: Decimal */}
  <div className="form-check m-2 fs-5 fw-semibold text-warning">
    <input
      type="radio"
      className="form-check-input"
      name="typeShou"
      id="radioDecimal"
      onChange={this.handleChange}
      value="decimal"
      checked={this.state.typeShou === 'decimal'}
      style={{ transform: 'scale(1.2)', marginRight: '10px' }}
    />
    <label className="form-check-label" htmlFor="radioDecimal">
      Decimal
    </label>
  </div>
</form>

</div>

    )
  }
}
