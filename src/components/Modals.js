import React from 'react';
import { Modal } from 'react-bootstrap';

export default class Modals extends React.Component {
    constructor(props) {
        super(props);
        this.data = '.';
        this.state = { data: '.', showModal: false, };
    }
    showModal = () => {
        this.setState({
            showModal: true,
        })
    }

    setData(data) {
        this.data = data;
    }

    _onClikClose = () => {
        this.setState({
            showModal: false,
        })
    }

    modal = () => {
        return (<div>
            <button type="button" className="btn btn-info" onClick={this.showModal}>{this.props.titleBtn}</button>
            <Modal
                show={this.state.showModal}
                onHide={this._onClikClose}
                data-keyboard="true"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.mTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=' shadow-lg  bg-dark' data-focus={true} data-show={true}>
                        {this.props.mData}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
        );
    }
    render() {
        return this.modal();
    }
}

