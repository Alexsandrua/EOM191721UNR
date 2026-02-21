import React from 'react';
import Modals from './Modals';
import Db from './Db';

export default class ShowOrInCard extends React.Component {
    constructor(props) {
        super(props);
        this.data = Db.getPpzAll(); 


    }

    card = () => {
        return (
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Перфокартка</h5>
                    <textarea className="card-text container-fluid" defaultValue={this.data} />
                </div>
            </div>

        );
    }
    render() {
        return <div className='container-fluid text-center p-4 text-white ' >
            <Modals mTitle='На єкран' mData={this.card()} titleBtn='Содержиме перфокартки' />
        </div>;
    }
}




