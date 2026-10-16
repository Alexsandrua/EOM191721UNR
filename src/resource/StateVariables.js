class StateVariables {
    constructor() {
        this.aktCleanCard = 0;
        this.newProject = 0;
        this.updateManualCard = 0;
        this.selectCardId = 0;
        this._sessionId = 0;
    }

    async setSessionId(id) {
        this._sessionId = id;
    }

    set sessionId(id) {
        this._sessionId = id;
    }
    get sessionId() {
        return this._sessionId;
    }
}

export default new StateVariables();

