import React from 'react';

import { Modal, Button } from 'react-bootstrap';
import StatVar from '../resource/StateVariables';

export default class ConfirmAct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirm: false,     // Стан видимості модалки
      confirmMessage: '',     // Текст питання
      onConfirmAction: null   // Функція, яка виконається при згоді
    };
    this.showConfirm = 1;
  }


  // Користувач натиснув "Скасувати" або хрестик
  handleClose = () => {
    this.setState({ showConfirm: false, onConfirmAction: null });
  };


  handleConfirm = () => {
    if (this.state.onConfirmAction) {
      this.state.onConfirmAction();
    }
    this.handleClose();
  };

  handleCleanClick = (e) => {
    if (this.showConfirm) {
      this.showConfirm = 0;
      this.setState({
        showConfirm: true,
      });
    }
    if (e.target.name = "cleancard") StatVar.aktCleanCard = 1;

    if (e.currentTarget.dataset.name == 'confirm') {
      this.showConfirm = 1;
      this.handleClose();
      this.props.onClickConfirm(e);

    }
  };

  render() {
    return (
      <div className="p-0 bg-dark text-white" data-bs-theme="dark">
        <button type="button" name={this.props.name} data-value={this.props.value} className="btn btn-success  flex-grow-1 flex-sm-grow-0" onClick={this.handleCleanClick}>
          {this.props.titleConfirm}
        </button>
        <Modal
          show={this.state.showConfirm}
          onHide={this.handleClose}
          centered
          contentClassName="bg-dark text-white border-secondary shadow"
        >
          <Modal.Header closeButton className="border-secondary">
            <Modal.Title className="fs-5 fw-bold text-warning">Підтвердіть дію</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.props.messageConfirm}
          </Modal.Body>

          <Modal.Footer className="border-secondary">
            <Button variant="secondary" onClick={this.handleClose} className="fw-semibold">
              Скасувати
            </Button>
            <Button variant="info" key='1' data-name="confirm" onClick={this.handleCleanClick} className="fw-bold px-4">
              Виконати
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
