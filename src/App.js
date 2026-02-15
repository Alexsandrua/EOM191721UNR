import React from 'react';
import ReactDOM from 'react-dom/client';
import Logo from './components/Logo';
import Excel from './components/Excel';
import Db from './components/Db';
import Display from './components/Display';
import PanelAction from './components/PanelAction';


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
                <div className='container-fluid text-center p-4'> 
                  <h6 className="w-inline-block" tabIndex="0" data-toggle="tooltip" data-placement="bottom" title="0,0,0,НІ,&i,1,1,1,END : 0,0,0,АБО,1,1,1,1,&i,1,1,1,&i,END" >{"Підсказка -?- наведи"}</h6>
                  </div>
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
