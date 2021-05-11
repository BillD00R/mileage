import { makeAutoObservable } from "mobx";

class ridesStore {
  constructor() {
    this._list = [];
    this._current = null;
    this._updating = false;
    makeAutoObservable(this);
  }

  setList(value) {
    this._list = value;
    this.setCurrent(null);
  }

  get list() {
    return this._list;
  }

  setCurrent(value) {
    this._current = value;
  }

  get current() {
    return this._current;
  }

  setUpdating(value) {
    this._updating = value;
  }

  get updating() {
    return this._updating;
  }
}

export default new ridesStore();
