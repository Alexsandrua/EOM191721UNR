import React from 'react';
import Db from './Db'
import LogikHanding from './LogikHanding';
//import Button from './Button';
import Resource from './Resource';
import { Button } from 'react-bootstrap';

export default class PanelAction extends React.Component {
  constructor(props) {
    super(props);
    this.optionElArr = [];
    this.insertElemet();
    this.state = { activeCards: false };
  }

  newTaskClick = (r) => {
    let text = 'Данняі з карт завдання та помʼяті буде стерто';
    if (confirm(text) == true)
      Db.stateVariables.newProject = 1;
    this.activeCards = false;
    this.setState({ activeCards: false });
  }

  cleanClick = () => {
    let text = 'Буде стерто всі данні з карт завдання';
    if (confirm(text) == true)
      Db.stateVariables.cleanCard = 1;
    this.activeCards = false;
    this.setState({ activeCards: false });
  }

  addPerfoocard = (r) => {
    Db.setPpz(Resource.punchCard());
    this.indexCard = Db.getPpzAll().length;
    this.insertElemet();
    this.activeCards = true;
    this.setState({ activeCards: true });
  }

  handleClickRun = (e) => {
    let logikHanding = new LogikHanding();
  }

  changeIdCard = (e) => {
    Db.stateVariables.ppzSelectId = parseInt(e.target.value.split(':')[1]);
  }

  buttonAction = () => {
    return (
      <div className="btn-group" role="group" aria-label="Basic example">
        <Button type="button" className="btn btn-secondary btn-success" onClick={this.newTaskClick}  > Нова задача </Button>
        <Button type="button" className="btn btn-secondary btn-success" onClick={this.addPerfoocard}  > Додади карту </Button>
        <Button type="button" className="btn btn-secondary btn-success" onClick={this.cleanClick}  > Очистити </Button>
        <Button type="button" className="btn btn-secondary btn-danger" onClick={this.handleClickRun}  > Виконати </Button>
      </div>
    );
  }

  insertElemet = () => {
    this.optionElArr = [];
    for (let key = 0; key < this.indexCard; key++) {
      this.optionElArr.push(<option key={key} >{'Carta :' + key}</option>);
    };
  }

  selectCards() {
    return (
      <form onChange={this.changeIdCard}>
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
