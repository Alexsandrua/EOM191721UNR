import React from 'react';
import Excel from './components/Excel';
import Display from './components/Display';
import PanelAction from './components/PanelAction';
import InfoHelp from './components/InfoHelp';
import ShowTextCard from './components/ShowTextCard';
import Resource from './resource/Resource';
import Db from './resource/Db';
import StateVar from './resource/StateVariables';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    StateVar.sessionId = props.sessionId;
    this.state = {
      actionPanel: false,
      // currentId:  Number(props.sessionId) || Date.now();
    };
  }

  componentDidMount() {
    this.initData(this.state.currentId);
  }

  // ◄ ВАЖЛИВО: Спрацьовує щоразу, коли користувач переходить на інший ID в URL
  componentDidUpdate(prevProps) {
    if (prevProps.sessionId !== this.props.sessionId) {
      const newId = Number(this.props.sessionId);
      if (newId && !isNaN(newId)) {
        this.setState({ currentId: newId });
        this.initData(newId);
      }
    }
  }

  initData(id) {
    Resource.configs.idCardServer = id;
  }

  setOnActChange = (value, id) => {
    this.setState({ actionPanel: false });
  };

  render() {
    return (
      <div className="container-fluid bg-dark text-white min-vh-100 p-4" data-bs-theme="dark">

        <div className="row mb-4">
          <div className="col-12 text-center text-md-start border-bottom border-secondary pb-1">
            <h3 className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 m-0">

              <span className="fs-1 text-secondary">EOM191721UNR</span>
            </h3>
          </div>
        </div>
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-8">
            <div className="p-3 bg-secondary bg-opacity-10 rounded border border-secondary h-100">
              <Display />
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-3 p-3 bg-secondary bg-opacity-10 rounded border border-secondary h-100">
              <div className="w-100">
                <PanelAction onActChange={this.setOnActChange} />
              </div>
              <InfoHelp />
              <ShowTextCard />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="p-3 bg-secondary bg-opacity-10 rounded border border-secondary">

              <div className="d-flex align-items-center justify-content-start gap-10 mb-0 border-bottom border-secondary pb-0">
                <span className="fw-bold text-white">-Перфокарта-</span>
              </div>

              <div className="overflow-x-auto">
                <Excel sessionId={StateVar.sessionId} />
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
