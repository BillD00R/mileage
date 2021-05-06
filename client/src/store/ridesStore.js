import { makeAutoObservable } from "mobx";

class ridesStore {
  constructor() {
    this._list = [];
    this._current = null;
    makeAutoObservable(this);
  }

  setList(value) {
    this._list = value;
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
}

export default new ridesStore();
