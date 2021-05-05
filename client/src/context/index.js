import React, { createContext, useContext } from "react";
import Rides from "../store/Rides";

const context = createContext(null);

const useMainContext = () => {
  return useContext(context);
};

const MainContext = (props) => {
  return <context.Provider value={{ rides: Rides }}>{props.children}</context.Provider>;
};

export { MainContext, useMainContext };
