import React from 'react';
import ReactDOM from 'react-dom/client';
import Logo from './components/Logo';
import Button from './components/Button';
import Excel from './components/Excel';
import LogikHanding from './components/LogikHanding';
import Db from './components/Db';
import Display from './components/Display';

class Test001 extends React.Component {
  constructor(props) {
    super(props);
   
  }
    render () {
      return <p>I'm a button</p>
    }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.tes001 = false;
  }
  handleClick = (r) => {
      this.tes001 = true;
      this.setState({Test001});
      return (<Test001 />);
  }
  handleClickRun = (e) => {
    let logikHanding = new LogikHanding();
  }
  render() {
    return (
    <div>
    <Logo /> -Logiks-
    <table><tbody><tr>
    <th>
    <div>< Display /></div>
    </th>
    <th>
    <div>
    <Button onClick={this.handleClick} style={{backgroundColor: 'blue', color: 'white'}} > Нова задача </Button>
    <Button onClick={this.handleClick} style={{backgroundColor: 'blue', color: 'white'}} > Додади карту </Button>
    <Button onClick={this.handleClick} style={{backgroundColor: 'blue', color: 'white'}} > Очистити </Button>
    <Button onClick={this.handleClickRun} style={{backgroundColor: 'red', color: 'white'}} > Виконати </Button>
    {this.tes001?<Test001 />:null}
    </div>
    </th>
    </tr>
    <tr><th colspan="2">
    <div>
    <Logo /> -Перфокарта-
    < Excel/>
    </div>
    </th>></tr>
    </tbody></table>
    </div>
    );
  }
}

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(<App />);
