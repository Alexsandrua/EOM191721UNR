import Resource from '../resource/Resource';
import axios from 'axios';


class RoutersCast {
  constructor() {
    this.hostname = window.location.hostname;
  }

  loadDisp = () => {

  }

  getTestId = async () => {
    try {
      let res = await axios.get(`http://${this.hostname}:3012/` + `test?id=${Resource.configs.idCardServer}`);
      return { statuCode: res.status, data: res.data };
    } catch (err) {
      console.error(err);
    }

  }

  getData = () => {
    axios.get(`http://${this.hostname}:3012/` + 'data')
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

  postData = (data, sesionId) => {
    axios.post(`http://${this.hostname}:3012/` + 'setcard', {
      sesionId,
      punchCard: data || '',
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        console.log(OK);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        console.log('Finally');
      })
  }


}

export default RoutersCast = new RoutersCast();