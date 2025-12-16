

class Db {
  constructor() {
    this.ppz = {};
    this.op = {};
  }
  
  setPpz (id, data) {
    this.ppz[id] = data;
  }
  
  getPpz (id) {
    return this.ppz[id];
  }
  
  deleteAllPpz () {
    return this.ppz = {};
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

} 

export default Db = new Db();
