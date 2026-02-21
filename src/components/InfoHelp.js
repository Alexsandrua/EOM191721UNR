import React from 'react';
import Modals from './Modals';
import Resource from './Resource';

export default class InfoHelp extends React.Component {
    constructor(props) {
        super(props);
        this.data = Resource.helps.ruls;
       
       this.mdata =this.info();
        this.state = { idCarentCard: 0, valueKomirk: '0', };
    }

    info = () => {
        let ar = [];
        for (let i in this.data) {
            ar.push(<li>{this.data[i]}</li>)
        }
        return (
            <ul className='text-white '>
                {[...ar]}
            </ul>
        );
    }
    render() {
        return <div className='container-fluid text-center p-4 text-white '>
           <Modals mTitle='Справка' mData={this.mdata} titleBtn='Допомога'/>
        </div>;
    }
}




