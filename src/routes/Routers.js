import Resource from '../resource/Resource';
import axios from 'axios';


class Routers {
  constructor() {
    this.URL = Resource.configs.URL;
  }

  componentDidMount() {
    //this.intervlLoadDisplay = setInterval(() => this.loadDisp(), 1000);
  }

  componentWillUnmount() {
    //clearInterval(this.intervlLoadDisplay);
  }

  loadDisp = () => {

  }

  getSessionmem = () => {
    axios.get(this.URL + 'sessionmem')
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        console.log('Finally');
      })
  }

  getData = () => {
    axios.get(this.URL + 'data')
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        console.log('Finally');
      })
  }

  postData = (data) => {
    axios.post(this.URL + 'setcard', {
      name: "session",
      progects: data,
    }, {
      headers: {
        'Content-Type': 'application/json', // Обов'язково для ТІЛА запиту
        ///'Accept': 'application/json'        // Обов'язково для ТИПУ ВІДПОВІДІ
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        console.log('Finally');
      })
  }


}

export default Routers = new Routers();