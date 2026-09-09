import React, { useState } from 'react';
import Db from '../resource/Db';
import Resource from '../resource/Resource';
import { Button, Modal } from 'react-bootstrap';
import RoutersCast from '../routes/RoutersCast';


export default class Excel extends React.Component {
  constructor(props) {
    super(props);

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

    if (Db.stateVariables.updateManualCard === 1) {
      Db.stateVariables.updateManualCard = 0;
      this.setState({
        data: Db.getPpz(Db.stateVariables.ppzSelectId),
        idCarentCard: Db.ppzSelectId,
      });
    }
  }

  _renderTable = () => {
    return (
      <table className="table table-striped border-0 text-white text-center fit-table h6  p-0 m-0 " >
        <tbody>
          {

            this.state.data.map((row, idtr) => {
              return (
                <tr key={`row-${idtr}`} >{
                  row.map((cell, idtb) => {
                    return <td
                      className='p-1 fit-cell'
                      key={idtr + ',' + idtb}
                      data-row={idtr}
                      data-col={idtb}
                      onClick={this._sequentialChoiceClick}>
                      {this.symbolRevers[cell]}
                    </td>
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

  _sequentialChoiceClick = (e) => {
    const irow = parseInt(e.currentTarget.dataset.row, 10);
    const icol = parseInt(e.currentTarget.dataset.col, 10);
    this.positioCell = { irow, icol }
    let selecId = Db.stateVariables.ppzSelectId;

    if (Db.getPpz(selecId)[irow][icol] == '0') {
      this.indexCount = 1;
    } else if (Db.getPpz(selecId)[irow][icol] == '1') {
      this.indexCount = 2;
    } else this.indexCount = 0;


    if (this.indexCount == 0) {
      this.indexCount++;
      Db.getPpz(selecId)[irow][icol] = '0';
    }
    else if (this.indexCount == 1) {
      this.indexCount++;
      Db.getPpz(selecId)[irow][icol] = '1';
    } else {
      this.indexCount = 0;
      Db.getPpz(selecId)[irow][icol] = ".";
      this.setState({
        showModal: !this.state.showModal
      });
      return 0;
    }

    RoutersCast.postData(Db.getPpzAll(), Resource.configs.idCardServer);

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
    let selecId = Db.stateVariables.ppzSelectId;
    const { irow, icol } = this.positioCell;
    if (event) {
      let value = event.target.value;
      Db.getPpz(selecId)[irow][icol] = value;
    } else {
      Db.getPpz(selecId)[irow][icol] = '\u2205';
    }

    RoutersCast.postData(Db.getPpzAll(), Resource.configs.idCardServer);

    this.setState({
      data: Db.getPpz(selecId),
      showModal: !this.state.showModal,
    });
  }

  _insElement(elem) {
    let ogroup = []
    let selectElArr = [];
    for (let key in elem) {
      selectElArr = [];
      for (let optn in elem[key]) {
        selectElArr.push(<Button
          className="m-1 btn-dark btn-outline-secondary h6 text-capitalize "
          value={optn}
          key={`el-${elem[key][optn]}-${optn}`}
          onClick={this._onClickSelectEl}>{elem[key][optn]}
        </Button>);
      };
      selectElArr.unshift(<label className="p-3  text-white bg-dark " key={key} >{key}</label>);
      ogroup.push(<div
        className="p-0  shadow-lg position-sticky bg-dark text-capitalize container  p-0 rounded shadow"
        key={`el-${key}`}
      >{[...selectElArr]}</div>);
    };

    return <div className="p-0 modal-content  shadow-lg position-sticky bg-dark container  p-0 rounded shadow" >{[...ogroup]}</div>;
  }

  render = () => {
    this.intervlLoadCard = setInterval(() => this.stateEvents(), 1000);
    return (<div> {this.poaplok()} <div className=" table-responsive w-avto container  p-4 rounded shadow" > {this._renderTable()}  </div></div>)
  }
}

