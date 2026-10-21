import React from 'react';
import { Modal } from 'react-bootstrap';
import StatVar from '../resource/StateVariables';

export default class Modals extends React.Component {
    constructor(props) {
        super(props);
        this.data = '.';
        this.state = { data: '.', showModal: false, };
    }
    showModal = () => {
        StatVar.flagRefreshManualCard = 0;
        this.setState({
            showModal: true,
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

    modal = () => {
        return (<div>
            <button type="button" className="btn btn-embossed color-green" onClick={this.showModal}>{this.props.titleBtn}</button>
            <Modal
                show={this.state.showModal}
                onHide={this._onClikClose}
                data-keyboard="true"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.mTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=' shadow-lg  bg-dark' data-focus={true} data-show={true} onClick={() => {
                        console.log('1234', this.props.onToggle)
                            if(this.props.onToggle)
                            this.setState({
                                showModal: !this.props.onToggle,
                            })
                        }}>
                        {this.props.mData}
                        
                    </div>
                </Modal.Body>
            </Modal>
        </div>
        );
    }
    render() {
        return <this.modal />;
    }
}

