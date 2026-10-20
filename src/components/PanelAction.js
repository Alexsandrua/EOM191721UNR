import React from 'react';
import Db from '../resource/Db'
import StatVar from '../resource/StateVariables';
import LogikHanding from '../controllers/LogikHanding';
import Resource from '../resource/Resource';
import { Button } from 'react-bootstrap';
import ConfirmAct from './ConfirmAct'


export default class PanelAction extends React.Component {
  constructor(props) {
    super(props);
    this.optionElArr = [];
    this.indexCard = Db.getPpzAll().length;
    this.insertElemet();
    this.activeCards =
      this.state = {
        activeCards: Db.getPpzAll().length > 2 ? true : false,
        selectCardId: 0,
      };
  }

  actionToDo = (name) => {
    if (name == 'cleancard') {
      StatVar.aktCleanCard = 1;
    }

    if (name == 'newproject') {

      StatVar.newProject = 1;
      StatVar.selectCardId = 0;
      this.activeCards = false;
    }
    this.props.onActChange(name, StatVar.selectCardId);
    this.setState({
      selectCardId: StatVar.selectCardId,
      activeCards: this.activeCards,
    });
  }


  addPerfoocard = (r) => {
    Db.addPpz(Resource.punchCard());
    this.indexCard = Db.getPpzAll().length;
    StatVar.selectCardId = this.indexCard - 1;
    this.insertElemet();
    this.activeCards = true;
    StatVar.flagRefreshManualCard = 1;
    this.props.onActChange('addPerfoocard', StatVar.selectCardId);
    this.setState({
      selectCardId: StatVar.selectCardId,
      activeCards: true,
    });
  }

  buttonAction = () => {
    return (

      <div className="d-flex flex-wrap gap-2 w-100 justify-content-center justify-content-sm-start " role="group" aria-label="Basic example">
        <ConfirmAct
          messageConfirm='Данні з карт завдання та помʼяті буде стерто'
          titleConfirm='Нова задача'
          onClickConfirm={() => { this.actionToDo('newproject') }}
          name="newproject"
        />

        <Button type="button" className="btn color-grin flex-grow-1 flex-sm-grow-0 btn-embossed" onClick={this.addPerfoocard}>
          Додати карту
        </Button>

        <ConfirmAct
          messageConfirm='Данні з поточної перфокарти буде стерто'
          titleConfirm='Очистити'
          onClickConfirm={() =>  this.actionToDo('cleancard') }
          name="cleancard"
        />


        <Button type="button" className="btn color-red flex-grow-1 flex-sm-grow-0 btn-embossed" onClick={() => new LogikHanding()}>
          Виконати
        </Button>

      </div>

    );
  }

  insertElemet = () => {
    this.optionElArr = [];
    for (let key = 0; key < this.indexCard; key++) {
      this.optionElArr.push(
        <option key={key} value={key} >
          {'Carta :' + key}
        </option>
      );
    };
  }

  selectCards() {
    return (
      <form   >
        <select value={this.state.selectCardId} name="changeIdCard" onChange={(e) => {
          StatVar.selectCardId = parseInt(e.target.value);
          this.actionToDo('changeIdCard');
        }} >
          {[...this.optionElArr]}
        </select>
      </form>
    );
  }

  render() {
    return (
      <div>
        <p>Панель команд</p>
        {this.buttonAction()}
        {this.state.activeCards ? this.selectCards() : null}
      </div>
    )
  }
}
