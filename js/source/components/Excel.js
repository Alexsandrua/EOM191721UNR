import React from 'react';
import Db from './Db';
import Resource from './Resource';

export default class Excel extends React.Component {
  constructor(props) {
    super(props);
     Db.setPpz(1, Resource.punchCard);
     this.state = {data: Resource.punchCard};
     let storData = {}
     this.symbolState = Resource.symbolState;
  }
  
  _punchCard () {
    let data = [];
    for(let i = 0;  i < 11; i++) {
      data[i] = [];
      for(let j = 0;  j < 12; j++) { // 79
        data[i].push('empty');
      }
    }
    this.data = data;
  }
  
  _renderTable = () => {

    return (
      <table style = {{ width: '100%' }} >
        <tbody>
           {
           
            this.state.data.map((row, idtr) => {
                return (    
                    <tr key={idtr} >{
                        row.map((cell, idtb) => {
                        
                            return <td key={idtb} id={idtr + ',' + idtb}  >{this._insElement(this.symbolState, cell)} </td>
                        })
                    }
                    </tr>
                    );
            })
        }
        </tbody>
      </table>
    );
  }
  
  _handleSelectEl = (event) => {
    let value = event.target.value;
    let p = event.target.offsetParent.id.split(',');
    this.state.data[parseInt(p[0])][parseInt(p[1])] = Resource.symbolRevers[value];
    Db.setPpz(1, this.state.data);
  }
  
  _insElement(elem, v){
        let ogroup = []
        let selectElArr = [];
        for(let key in elem){
          selectElArr = [];
          for(let optn in elem[key]) {
                selectElArr.push(<option key={optn} >{elem[key][optn]}</option>);
                };
                ogroup.push(<optgroup label={key}>{[...selectElArr]}</optgroup>);
            };
            
    return (
        <form>
        <select defaultValue={'\u2205'} >
            {[...ogroup]}
            </select>
        </form>
     );
  }
  
  render () {
    return (<div className="Excel" onChange={this._handleSelectEl}> { this._renderTable() } </div>)
  }
}

