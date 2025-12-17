

class Db {
  constructor() {
    this.ppz = [];
    this.op = {};
    this.ppzSelectId = 0;
  }
  
  stateVariables = {
    ppzSelectId: 0,
    newProject: 0,
    cleanCard: 0,
  }
  
  setPpz (data) {
    this.ppz.push(data);
  }
  
  getPpz (id) {
    return this.ppz[id];
  }
  
  getPpzAll () {
    return this.ppz;
  }
  
  deleteAllPpz () {
     this.ppz = [];
    
  }
  
  setOpMem (id, data) {
    this.op[id] = data;
  }
  
  getOpMem (id) {
    return this.op[id];
  }
  
  getAllOpMem () {
    return this.op;
  }
  
  deleteOpMem (id) {
    delete this.op[id];
  }
  
  deleteAllOpMem () {
    this.op = {};
  }

} 

export default Db = new Db();
