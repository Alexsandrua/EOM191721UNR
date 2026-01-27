import React from 'react';
import Db from './Db';
import Resource from './Resource';

export default class Excel extends React.Component {
  constructor(props) {
    super(props);
    Db.setPpz(Resource.punchCard());
    this.state = { data: Db.getPpz(0), idCarentCard: 0 };
    let storData = {}
    this.symbolState = Resource.symbolState;
    this.ppzSelectId = Db.stateVariables.ppzSelectId;
  }


  stateEvents = () => {
    if (Db.stateVariables.ppzSelectId != this.ppzSelectId) {
      this.ppzSelectId = Db.stateVariables.ppzSelectId;
      this.setState({
        data: Db.getPpz(Db.stateVariables.ppzSelectId),
        idCarentCard: Db.ppzSelectId
      });
    }
    if (Db.stateVariables.newProject === 1) {
      Db.stateVariables.newProject = 0;
      Db.stateVariables.ppzSelectId = 0;
      this.ppzSelectId = 0;
      Db.deleteAllPpz();
      Db.setPpz(Resource.punchCard());
      Db.deleteAllOpMem();
      this.setState({
        data: Db.getPpz(Db.stateVariables.ppzSelectId),
        idCarentCard: Db.ppzSelectId,
      });
    }

    if (Db.stateVariables.cleanCard === 1) {
      Db.stateVariables.cleanCard = 0;
      Db.stateVariables.ppzSelectId = 0;
      this.ppzSelectId = 0;
      Db.deleteAllPpz();
      Db.setPpz(Resource.punchCard());
      this.setState({
        data: Db.getPpz(Db.stateVariables.ppzSelectId),
        idCarentCard: Db.ppzSelectId,
      });
    }

  }

  _renderTable = () => {
    return (
      <table className="table table-striped border-0" >
        <tbody>
          {

            this.state.data.map((row, idtr) => {
              return (
                <tr  key={idtr} >{
                  row.map((cell, idtb) => {
                    return <td  className='border-0 p-0 m-3' key={idtb} id={idtr + ',' + idtb}  >{this._insElement(this.symbolState, cell)} </td>
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

  _insElement(elem, v) {
    let ogroup = []
    let selectElArr = [];
    for (let key in elem) {
      selectElArr = [];
      for (let optn in elem[key]) {
        selectElArr.push(<option className='p-0 m-0' key={optn}>{elem[key][optn]}</option>);
      };
      ogroup.push(<optgroup className="p-0 m-0" label={key}>{[...selectElArr]}</optgroup>);
    };

    return (
      <form className=' border-0 rounded-4 bg-primary p-0 m-0'>
        <select className="border-0 rounded-3 bg-primary custom-select shadow-sm p-0 m-0"  defaultValue={v} >
          {[...ogroup]}
        </select>
      </form>
    );
  }

  render = () => {
    this.intervlLoadCard = setInterval(() => this.stateEvents(), 1000);
    return (<div className=" table-responsive w-avto" onChange={this._handleSelectEl}> {this._renderTable()} </div>)
  }
}

