import Resource from '../resource/Resource';
import StateVar from '../resource/StateVariables';
import axios from 'axios';


class RoutersCast {
  constructor() {
    this.hostname = window.location.hostname;
    this.apiUrl = this.hostname === 'localhost' 
      ? '/api' 
      : 'https://eom191721unr.org';
  }

  getTestId = async (id) => {
    try {
      let res = await axios.get(`${this.apiUrl}/sesion?id=${id}`);//`http://${this.hostname}:3012/` + 
      return { statuCode: res.status, data: res.data };
    } catch (err) {
      console.error(err);
      return { statuCode: err.response?.status || 500, data: null };
    }

  }

  postData = (data, sesionId) => {
    axios.post(`${this.apiUrl}/setcard`, {
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
      });
  }


}

//export default RoutersCast = new RoutersCast();
const routersCastInstance = new RoutersCast();
export default routersCastInstance;