import React from 'react';
import Db from './Db';

export default class Excel extends React.Component {
  constructor(props) {
    super(props);
     this.data = [];
     this._punchCard();
     Db.setPpz(this.data);
     this.state = {data: this.data};
     let storData = {}
     this.symbolState = symbolState;
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
    this.state.data[parseInt(p[0])][parseInt(p[1])] = symbolRevers[value];
    Db.setPpz(this.state.data);
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



let className = {
      swichManual:{
      eSwichMAll:'eSwichMAll',
      eSwichMLeftDown:'eSwichMLeftDown',
      eSwichMLeftTop:'eSwichMLeftTop',
      eSwichMLeftRight:'eSwichMLeftRight',
      eSwichMRightTop:'eSwichMRightTop',
      eSwichMRightDown:'eSwichMRightDown',
      eSwichMTopDown:'eSwichMTopDown',
      },
      transistor:{
      eTransistorRightTopDown:'eTransistorRightTopDown',
      eTransistorRightLeftDown:'eTransistorRightLeftDown',
      eTransistorRightDownTop:'eTransistorRightDownTop',
      eTransistorRightLeftTop:'eTransistorRightLeftTop',
      eTransistorLeftTopDown:'eTransistorLeftTopDown',
      eTransistorLeftRightDown:'eTransistorLeftRightDown',
      eTransistorLeftDownTop:'eTransistorLeftDownTop',
      eTransistorLeftRightTop:'eTransistorLeftRightTop',
      eTransistorRightTopLeft:'eTransistorRightTopLeft',
      eTransistorRightDownLeft:'eTransistorRightDownLeft',
      eTransistorTopRightDown:'eTransistorTopRightDown',
      eTransistorTopLeftDown:'eTransistorTopLeftDown',
      },
      conductor:{
      eConductorAll:'eConductorAll',
      eConductorLeftDown:'eConductorLeftDown',
      eConductorLeftTop:'eConductorLeftUp',
      eConductorLeftRight:'eConductorLeftRight',
      eConductorRightTop:'eConductorRightUp',
      eConductorRightDown:'eConductorRightDown',
      eConductorTopDown:'eConductorUpDown',
      }
    };

        const old_symbolState = {
               'empty':'\u2205',
               '_&o':'_&o', 
               '_&s': '&s',
               '_|END|': '|END|',
               '_0': 0,
               '_1': 1,
               'not': 'НІ',
               'and': 'I',
               'or': 'АБО',
               'xor': 'І-НІ',
               'nor': 'АБО-НІ',
               'subtraction':'-', 
               'addition':'+', 
               'multiplication':'*', 
               'division':'/',
        };
        
        const symbolState = {
             'operation':{
               'empty':'\u2205',
               '&i':'&i', 
               '&o': '&o',
               'END': 'END',
             },
             'binary':{
               '_0': 0,
               '_1': 1,
             },
             'logical':{
               'not': 'НІ',
               'and': 'I',
               'or': 'АБО',
               'xor': 'І-НІ',
               'nor': 'АБО-НІ',
             },
             'arithmetic':{
               'sub':'-', 
               'add':'+', 
               'mul':'*', 
               'div':'/',
             },
        };
        
        const symbolRevers = {
               '\u2205':'empty',
               '&i':'&i', 
               '&o': '&o',
               'END': 'END',
                0:'_0',
                1:'_1',
                'НІ':'not',
                'I':'and',
                'АБО':'or',
                'І-НІ': 'xor',
                'АБО-НІ': 'nor',
                '-': 'sub', 
                '+': 'add', 
                '*': 'mul', 
                '/': 'div',
        };
