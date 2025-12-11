

class Db {
  constructor() {
    this.ppz = {};
    this.op = {};
  }
  
  setPpz (data) {
    this.ppz = data;
  }
  
  getPpz () {
    return this.ppz;
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
