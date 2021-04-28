import { makeAutoObservable } from "mobx";

class Rides {
  list = [
    { id: 1, name: "moskvich", mileage: 21219, consumption: 10, photo: "" },
    { id: 2, name: "Drag Star", mileage: 27592, consumption: 5, photo: "" },
  ];
  constructor() {
    makeAutoObservable(this);
  }
}

export default new Rides();
