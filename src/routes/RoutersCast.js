import Resource from '../resource/Resource';
import StateVar from '../resource/StateVariables';
import axios from 'axios';


class RoutersCast {
  constructor() {
    this.hostname = window.location.hostname;
  }

  loadDisp = () => {

  }

  getTestId = async (id) => {
    try {
      let res = await axios.get(`/api/sesion?id=${id}`);//`http://${this.hostname}:3012/` + 
      return { statuCode: res.status, data: res.data };
    } catch (err) {
      console.error(err);
    }

  }

  postData = (data, sesionId) => {
    axios.post('/api/setcard', {
      sesionId,
      punchCard: data,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        console.log('OK');
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