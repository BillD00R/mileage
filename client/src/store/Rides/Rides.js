import { makeAutoObservable } from "mobx";

class Rides {
  constructor() {
    this._list = [];
    makeAutoObservable(this);
  }

  setList(value) {
    this._list = value;
  }

  get list() {
    return this._list;
  }
}

export default new Rides();
