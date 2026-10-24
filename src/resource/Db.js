class Db {
  constructor() {
    this.idSesion = window.location.pathname.split(':')[1];
    this._ppz = [];
    this.op = {};
    this.ppzSelectId = 0;
  }

  stateVariables = {
    ppzSelectId: 0,
    newProject: 0,
    cleanCard: 0,
    updateManualCard: 0,
  }

  set ppz(data) {
    this._ppz = data;
  }

  setIdPpz(id, data) {
    
    this._ppz[id] = data;
  }

  addPpz(data) {
    this._ppz.push(data);
  }

  getPpz(id) {
    return this._ppz[id];
  }

  getPpzAll() {
    return this._ppz;
  }

  deleteAllPpz() {
    this._ppz = [];
  }



  setOpMem(id, data) {
    this.op[id] = data;
  }

  getOpMem(id) {
    return this.op[id];
  }

  getAllOpMem() {
    return this.op;
  }

  deleteOpMem(id) {
    delete this.op[id];
  }

  deleteAllOpMem() {
    this.op = {};
  }

}

export default Db = new Db();
