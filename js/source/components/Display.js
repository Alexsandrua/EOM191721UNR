import React from 'react'
import Db from './Db';

export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {displayValue: '_'};
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
    
    this.setState({
      [name]: value,
      displayValue: value
    });
  }
  
  prepareToOutput () {
    let texAr = [], tline = ''; 
    let op = Db.getAllOpMem();
    for(let i in op) {
      tline = op[i].toString().replaceAll(',', '');
      tline = tline.replaceAll('_1', 1);
      tline = tline.replaceAll('_0', 0);
      texAr.push(tline);
    }
    return texAr;
  }
  
  render() {
    return (
    <div>
    <p><label>Display:</label></p>
    <textarea 
    name="displayOutput" 
    id="displayOutputId" 
    rows={5} cols={40}
    readOnly
    value={this.state.displayValue}
    />
    
      <form>
       <label>Binare:
       <input type="radio" 
          name="typeShou" 
          onChange={this.handleChange} 
          value="binare" 
          />
       </label>
       <label>Decimal:
       <input type="radio" 
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
