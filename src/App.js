import React from 'react';
import ReactDOM from 'react-dom/client';
import Logo from './components/Logo';
import Excel from './components/Excel';
import Db from './components/Db';
import Display from './components/Display';
import PanelAction from './components/PanelAction';
import InfoHelp from './components/InfoHelp';
import ShowOrInCard from './components/ShowOrInCard'


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid bg-dark text-white " data-bs-theme="dark">

        <table className='container-fluid table table-dark'><tbody>
          <tr><th> <Logo /> -EOM191721UNR- </th></tr>
          <tr>
            <th>
              <div>< Display /></div>
            </th>
            <th>
              <div>
                <div className='container-fluid'> <PanelAction /></div>
                <InfoHelp />
                <ShowOrInCard />
              </div>
            </th>
          </tr>
          <tr><th colSpan="2">
            <div className='container-fluid'>
              <Logo /> -Перфокарта-
              <Excel />
            </div>
          </th></tr>
        </tbody></table>
      </div>
    );
  }
}

//const app = ReactDOM.createRoot(document.getElementById('app'));
//app.render(<App />);
