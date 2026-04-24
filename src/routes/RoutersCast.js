import Resource from '../resource/Resource';
import axios from 'axios';


class RoutersCast {
  constructor() {
    this.URL = Resource.configs.URL;
  }

  loadDisp = () => {

  }

  getTestId = async () => {
    try {
      let res = await axios.get(this.URL + `test?id=${Resource.configs.idCardServer}`);
      return { statuCode: res.status, data: res.data };
    } catch (err) {
      console.error(err);
    }

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

  postData = (data, sesionId) => {
    axios.post(this.URL + 'setcard', {
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