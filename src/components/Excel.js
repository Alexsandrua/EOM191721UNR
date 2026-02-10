import React, { useState } from 'react';
import Db from './Db';
import Resource from './Resource';
import { Button, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
//import Modal from 'react-modal';
//Modal.setAppElement('#app');
export default class Excel extends React.Component {
  constructor(props) {
    super(props);
    Db.setPpz(Resource.punchCard());
    this.state = { data: Db.getPpz(0), idCarentCard: 0, valueKomirk: '0', showModal: false, show: false };
    this.symbolState = Resource.symbolState;
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
      <table className="table table-striped border-0" >
        <tbody>
          {

            this.state.data.map((row, idtr) => {
              return (
                <tr className='p-0 m-0 w-25' key={idtr} >{
                  row.map((cell, idtb) => {
                    return <td className='border-1 p-0 m-3 mx-auto' key={idtb} id={idtr + ',' + idtb} onClick={this._sequentialChoiceClick}  >{cell}</td>//{this._insElement(this.symbolState, cell)} </td>
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
  _handleSelectEl = (event) => {
    let value = event.target.value;
    let p = event.target.offsetParent.id.split(',');
    this.positioCell = p;
    console.log('h', p);
    Db.getPpz(Db.ppzSelectId)
    Db.getPpz(Db.ppzSelectId)[parseInt(p[0])][parseInt(p[1])] = value;
    this.setState({
      data: Db.getPpz(Db.ppzSelectId),
      idCarentCard: Db.ppzSelectId
    });
  }

  _onClickSelectEl = (event) => {
    let value = event.target.value;
    let p = this.positioCell;
    Db.getPpz(Db.ppzSelectId)
    Db.getPpz(Db.ppzSelectId)[parseInt(p[0])][parseInt(p[1])] = value;
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
        selectElArr.push(<Button className="m-1 btn-dark btn-outline-secondary" value={elem[key][optn]} onClick={this._onClickSelectEl}>{elem[key][optn]}</Button>);
      };
      selectElArr.unshift(<label className="p-3    text-white bg-dark " >{key}</label>);
      ogroup.push(<div className="p-0  shadow-lg position-sticky bg-dark " >{[...selectElArr]}</div>);
    };

    return <div className="p-0 modal-content  shadow-lg position-sticky bg-dark" >{[...ogroup]}</div>;
  }

  render = () => {
    this.intervlLoadCard = setInterval(() => this.stateEvents(), 1000);
    return (<div> {this.poaplok()} <div className=" table-responsive w-avto" onChange={this._handleSelectEl}> {this._renderTable()}  </div></div>)//onChange={this._handleSelectEl}> {this._renderTable()} </div>)
  }
}

