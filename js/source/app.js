import React from 'react';
import ReactDOM from 'react-dom/client';
import Logo from './components/Logo';
import Excel from './components/Excel';
import Db from './components/Db';
import Display from './components/Display';
import PanelAction from './components/PanelAction';


class App extends React.Component {
  constructor(props) {
    super(props);
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
    <div><PanelAction /></div>
    </th>
    </tr>
    <tr><th colspan="2">
    <div>
    <Logo /> -Перфокарта-
    <Excel />
    </div>
    </th>></tr>
    </tbody></table>
    </div>
    );
  }
}

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(<App />);
