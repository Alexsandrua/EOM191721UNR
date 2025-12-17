import React from 'react';
import Db from './Db';
import Resource from './Resource';

export default class Excel extends React.Component {
  constructor(props) {
    super(props);
     Db.setPpz(Resource.punchCard());
     this.state = {data: Db.getPpz(0), idCarentCard: 0 };
     let storData = {}
     this.symbolState = Resource.symbolState;
     this.ppzSelectId = Db.ppzSelectId
  }
  
  
  carrentCard = () => { 
    if(Db.ppzSelectId != this.ppzSelectId){
       this.ppzSelectId = Db.ppzSelectId;
       this.setState({
         data: Db.getPpz(Db.ppzSelectId),
         idCarentCard: Db.ppzSelectId
       });
     }
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
    Db.getPpz(Db.ppzSelectId)
    Db.getPpz(Db.ppzSelectId)[parseInt(p[0])][parseInt(p[1])] = value; 
    //Resource.symbolRevers[value];
   this.setState({
         data: Db.getPpz(Db.ppzSelectId),
         idCarentCard: Db.ppzSelectId
       });
  }
  
  _insElement(elem, v){
        let ogroup = []
        let selectElArr = [];
        for(let key in elem){
          selectElArr = [];
          for(let optn in elem[key]) {
                selectElArr.push(<option key={optn}>{elem[key][optn]}</option>);
                };
                ogroup.push(<optgroup label={key}>{[...selectElArr]}</optgroup>);
            };
            
    return (
        <form>
        <select value={v} >
            {[...ogroup]}
            </select>
        </form>
     );
  }
  
  render = () => {
   this.intervlLoadCard = setInterval(() => this.carrentCard(), 1000);
    return (<div className="Excel" onChange={this._handleSelectEl}> { this._renderTable() } </div>)
  }
}

