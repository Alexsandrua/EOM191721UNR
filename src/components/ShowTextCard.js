import React from 'react';
//import Modals from './Modals';
import { Modal } from 'react-bootstrap';
import Db from '../resource/Db';
import StatVar from '../resource/StateVariables';

export default class ShowTextCard extends React.Component {
  constructor(props) {
    super(props);
    this.buff = '';
    this.state = {
      textPerfocard: '1',
      data: '.',
      showModal: false,
    };
    this.data = '.';
  }

  showModal = () => {
    StatVar.flagRefreshManualCard = 0;
    this.setState({
      showModal: true,
      textPerfocard: JSON.stringify({ ...Db.getPpzAll() }),
    })
  }

  setData(data) {
    this.data = data;
    this.setState({
      showModal: false,
    })
  }

  _onClikClose = () => {
    this.setState({
      showModal: false,
    })
  }

  saveChange = () => {
    const cardArr = [];
    const cardObj = JSON.parse(this.state.textPerfocard);
    for (let i in cardObj)
      cardArr.push(cardObj[i]);
    Db.ppz = cardArr;
    StatVar.updateManualCard = 1;
    this.toggleModal = true;
    this.props.onActChange('manualChange', StatVar.selectCardId);
    this.setState({
      showModal: false,
    })
  }

  handleTextChange = (e) => {
    this.setState({
      textPerfocard: e.target.value,
    });
  }

  card = () => {
    return (
      <div className="card bg-dark text-white border-secondary h-100">
        <div className="card-body d-flex flex-column gap-3">
          <h5 className="card-title m-0">Перфокартка</h5>

          <div>
            <textarea
              className="form-control bg-dark text-white border-secondary"
              rows="5"
              value={this.state.textPerfocard}
              onChange={this.handleTextChange}
              placeholder="Введіть дані..."
            />
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-info px-4 fw-bold"
              onClick={this.saveChange}
            >
              Зберегти зміни
            </button>
          </div>
        </div>
      </div>

    );
  }

  render() {
    return <div className='container-fluid text-center p-4 text-white'>
      <div>
        <button type="button" className="btn  btn-embossed" onClick={this.showModal}>Редагувати картку вручну</button>
        <Modal
          show={this.state.showModal}
          onHide={this._onClikClose}
          data-keyboard="true"
        >
          <Modal.Header closeButton>
            <Modal.Title>'Содержиме перфокартки'</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className=' shadow-lg  bg-dark' data-focus={true} data-show={true}>
              <this.card />

            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>;
  }
}





