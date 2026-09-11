import React from 'react';
import Db from '../resource/Db'
import StatVar from '../resource/StateVariables';
import LogikHanding from '../controllers/LogikHanding';
import Resource from '../resource/Resource';
import { Button } from 'react-bootstrap';
import RoutersCast from '../routes/RoutersCast';
import ConfirmAct from './ConfirmAct'


export default class PanelAction extends React.Component {
  constructor(props) {
    super(props);
    this.optionElArr = [];
    this.indexCard = Db.getPpzAll().length;
    this.insertElemet();
    this.activeCards = Db.getPpzAll().length > 2 ? true : false;
    this.state = { activeCards: false };
  }

  actionToDo = (e) => {
    const name = e.currentTarget.name;
    if (name == 'changeIdCard') {
      StatVar.selectCardId = parseInt(e.target.value);
    }

    if (name == 'cleancard') {
      StatVar.aktCleanCard = 1;
    }

    if (name == 'newproject') {
      StatVar.newProject = 1;
    }

    this.props.onActChange(name, StatVar.selectCardId);

  }


  addPerfoocard = (r) => {
    Db.addPpz(Resource.punchCard());
    this.indexCard = Db.getPpzAll().length;
    this.insertElemet();
    this.activeCards = true;
    this.setState({ activeCards: true });
  }

  buttonAction = () => {
    return (

      <div className="d-flex flex-wrap gap-2 w-100 justify-content-center justify-content-sm-start" role="group" aria-label="Basic example">

        <ConfirmAct
          messageConfirm='Данні з карт завдання та помʼяті буде стерто'
          titleConfirm='Нова задача'
          onClickConfirm={this.actionToDo}
          name="newproject"
        />

        <Button type="button" className="btn btn-success flex-grow-1 flex-sm-grow-0" onClick={this.addPerfoocard}>
          Додати карту
        </Button>

        <ConfirmAct
          messageConfirm='Данні з карт завдання та помʼяті буде стерто'
          titleConfirm='Очистити'
          onClickConfirm={this.actionToDo}
          name="cleancard"
        />


        <Button type="button" className="btn btn-danger flex-grow-1 flex-sm-grow-0" onClick={() => new LogikHanding()}>
          Виконати
        </Button>

      </div>

    );
  }

  insertElemet = () => {
    this.optionElArr = [];
    for (let key = 0; key < this.indexCard; key++) {
      this.optionElArr.push(<option key={key} value={key} >{'Carta :' + key}</option>);
    };
  }

  selectCards() {
    return (
      <form value="" name="changeIdCard" onChange={this.actionToDo}>
        <select>
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
        {this.activeCards ? this.selectCards() : null}
      </div>
    )
  }
}
