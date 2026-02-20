import React, { useState } from 'react';
import Db from './Db';
import Resource from './Resource';
import { Button, Modal } from 'react-bootstrap';
export default class Excel extends React.Component {
  constructor(props) {
    super(props);
    Db.setPpz(Resource.punchCard());
    this.state = { data: Db.getPpz(0), idCarentCard: 0, valueKomirk: '0', showModal: false, show: false };
    this.symbolState = Resource.symbolState;
    this.symbolRevers = Resource.symbolStateList;
    this.ppzSelectId = Db.stateVariables.ppzSelectId;
    this.indexCount = 0;
    this.positioCell = 0;
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
      <table className="table table-striped border-0 text-white " >
        <tbody>
          {

            this.state.data.map((row, idtr) => {
              return (
                <tr className='p-0 m-0 w-25' key={idtr} >{
                  row.map((cell, idtb) => {
                    return <td className='border-1 p-0 m-0 text-center  h6 ml-auto' key={idtr + ',' + idtb} id={idtr + ',' + idtb} onClick={this._sequentialChoiceClick}  >{this.symbolRevers[cell]}</td>//{this._insElement(this.symbolState, cell)} </td>
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

  _sequentialChoiceClick = (event) => {
    let v = event.target.id.split(',');
    if (this.positioCell[0] != v[0] || this.positioCell[1] != v[1]) {
      if (Db.getPpz(Db.ppzSelectId)[parseInt(v[0])][parseInt(v[1])] == '0') {
        this.indexCount = 1;
      } else if (Db.getPpz(Db.ppzSelectId)[parseInt(v[0])][parseInt(v[1])] == '1') {
        this.indexCount = 2;
      } else this.indexCount = 0;
    }
    this.positioCell = v;
    if (v.length < 2) v = [0, 0];
    if (this.indexCount == 0) {
      this.indexCount++;
      Db.getPpz(Db.ppzSelectId)[parseInt(v[0])][parseInt(v[1])] = '0';
    }
    else if (this.indexCount == 1) {
      this.indexCount++;
      Db.getPpz(Db.ppzSelectId)[parseInt(v[0])][parseInt(v[1])] = '1';
    } else {
      this.indexCount = 0;
      Db.getPpz(Db.ppzSelectId)[parseInt(v[0])][parseInt(v[1])] = ".";
      this.setState({
        showModal: !this.state.showModal
      });
      return 0;
    }

    this.setState({
      showModal: this.state.showModal,
    });
  }
  poaplok = () => {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this._onClickSelectEl}
        data-keyboard="true"
      >
        <Modal.Header closeButton>
          <Modal.Title>This is modal title a</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=' shadow-lg  bg-dark' data-focus={true} data-show={true}>
            {this._insElement(this.symbolState)}
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  _onClickSelectEl = (event) => {
    let p = this.positioCell;
    if (event) {
      let value = event.target.value;
      Db.getPpz(Db.ppzSelectId)
      Db.getPpz(Db.ppzSelectId)[parseInt(p[0])][parseInt(p[1])] = value;
    } else {
      Db.getPpz(Db.ppzSelectId)[parseInt(p[0])][parseInt(p[1])] = '\u2205';
    }
    this.setState({
      data: Db.getPpz(Db.ppzSelectId),
      showModal: !this.state.showModal,
    });
  }

  _insElement(elem) {
    let ogroup = []
    let selectElArr = [];
    for (let key in elem) {
      selectElArr = [];
      for (let optn in elem[key]) {
        selectElArr.push(<Button className="m-1 btn-dark btn-outline-secondary h6 text-capitalize " value={optn} onClick={this._onClickSelectEl}>{elem[key][optn]}</Button>);
      };
      selectElArr.unshift(<label className="p-3    text-white bg-dark " >{key}</label>);
      ogroup.push(<div className="p-0  shadow-lg position-sticky bg-dark text-capitalize" >{[...selectElArr]}</div>);
    };

    return <div className="p-0 modal-content  shadow-lg position-sticky bg-dark" >{[...ogroup]}</div>;
  }

  render = () => {
    this.intervlLoadCard = setInterval(() => this.stateEvents(), 1000);
    return (<div> {this.poaplok()} <div className=" table-responsive w-avto" > {this._renderTable()}  </div></div>)
  }
}

