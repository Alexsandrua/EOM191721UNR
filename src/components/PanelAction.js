import React from 'react';
import Db from './Db'
import LogikHanding from './LogikHanding';
import Button from './Button';
import Resource from './Resource';

export default class PanelAction extends React.Component {
  constructor(props) {
    super(props);
    this.optionElArr = [];
    this.insertElemet();
    this.state = {activeCards: false};
  }
  
  newTaskClick = (r) => {
    let text = 'Данняі з карт завдання та помʼяті буде стерто';
    if(confirm(text) == true)
    Db.stateVariables.newProject = 1;
    this.activeCards = false;
    this.setState({activeCards: false});
  }
  
  cleanClick = () => {
    let text = 'Буде стерто всі данні з карт завдання';
    if(confirm(text) == true) 
    Db.stateVariables.cleanCard = 1;
    this.activeCards = false;
    this.setState({activeCards: false});
  }
  
  addPerfoocard = (r) => {
      Db.setPpz(Resource.punchCard());
      this.indexCard = Db.getPpzAll().length;
      this.insertElemet();
      this.activeCards = true;
      this.setState({activeCards: true});
  }
  
  handleClickRun = (e) => {
    let logikHanding = new LogikHanding();
  }
  
  changeIdCard = (e) => {
    Db.stateVariables.ppzSelectId = parseInt(e.target.value.split(':')[1]);
  }
  
  buttonAction = () => {
    return (
        <div>
    <Button onClick={this.newTaskClick} style={{backgroundColor: 'blue', color: 'white'}} > Нова задача </Button>
    <Button onClick={this.addPerfoocard} style={{backgroundColor: 'blue', color: 'white'}} > Додади карту </Button>
    <Button onClick={this.cleanClick} style={{backgroundColor: 'blue', color: 'white'}} > Очистити </Button>
    <Button onClick={this.handleClickRun} style={{backgroundColor: 'red', color: 'white'}} > Виконати </Button>
    </div>
    );
  }
  
  insertElemet = () => {
  this.optionElArr = [];
    for(let key = 0; key < this.indexCard;  key++) {
       this.optionElArr.push(<option key={key} >{'Carta :' + key}</option>);
    };
  }
  
  selectCards () {
    return (    
     <form onChange={this.changeIdCard}>
      <select>
       {[...this.optionElArr]}
      </select>
     </form>
    );
  }
    
    render () {
      return (
    <div> 
    <p>Панель команд</p>
    {this.buttonAction()}
    {this.activeCards?this.selectCards() :null}
    </div>
    )
    }
}
