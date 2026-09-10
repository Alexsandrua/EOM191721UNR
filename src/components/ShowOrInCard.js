import React from 'react';
import Modals from './Modals';
import Db from '../resource/Db';

export default class ShowOrInCard extends React.Component {
    constructor(props) {
        super(props);
        this.data = Db.getPpzAll();
        this.buff = '';
    }

    saveChange = (e) => {
        let arr = [[[]]];
        let lenD = this.data.length;
        let lenB = this.buff.length;
        if (lenB && lenB > 1) {
            Db.stateVariables.updateManualCard = 1;
            let i = 0, inx = 0, inc = 0;

            this.buff.map((c) => {
                arr[i][inx][inc] = c;
                inc++;
                if (inc > 11) inx++, inc = 0, arr[i][inx] = [];
                if (inx > 11) {
                    inx = 0;
                    i++;
                    if (i < lenD - 1) return 0;
                    arr[i] = [];
                }
            });


            console.log('aee : ', arr)
            Db.setPpz(arr);
        }
    }

    buffChange = (e) => {
        this.buff = '';
        this.buff = e.target.value.split(',');
    }

    card = () => {
        return (
            <div className="card bg-dark text-white border-secondary h-100">
  <form>
    <div className="card-body d-flex flex-column gap-3">
      <h5 className="card-title m-0">Перфокартка</h5>
      
      <div>
        <textarea 
          className="form-control bg-dark text-white border-secondary" 
          rows="5" 
          defaultValue={this.data} 
          onChange={this.buffChange}
          placeholder="Введіть дані..."
        />
      </div>

      <div className="d-flex justify-content-end">
        <button 
          type="button" 
          className="btn btn-info px-4 fw-bold" 
          onClick={this.saveChange}
        >
          Зберегти зміни
        </button>
      </div>
    </div>
  </form>
</div>

        );
    }
    render() {
        return <div className='container-fluid text-center p-4 text-white ' >
            <Modals mTitle='На єкран' mData={this.card()} titleBtn='Содержиме перфокартки' />
        </div>;
    }
}




