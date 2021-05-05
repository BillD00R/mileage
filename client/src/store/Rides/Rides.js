import { makeAutoObservable } from "mobx";

class Rides {
  constructor() {
    this._list = [];
    makeAutoObservable(this);
  }

  setList(value) {
    console.log(`setting rides to ${value}`);
    this._list = value;
  }

  get list() {
    return this._list;
  }
}

export default new Rides();
