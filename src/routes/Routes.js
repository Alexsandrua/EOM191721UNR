import React from 'react'
import Resource from '../resource/Resource';
import axios from 'axios';


export default class Routers extends React.Component {
  constructor(props) {
    super(props);
    this.URL = Resource.configs.URL;
  }

  componentDidMount() {
    this.intervlLoadDisplay = setInterval(() => this.loadDisp(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervlLoadDisplay);
  }

  loadDisp = () => {
   
  }

  getData = () => {
    axios.get(this.URL + '/test')
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        console.log(e);
      })
      .finally(() => {
        console.log('Finally');
      })
    
  }

  
}
