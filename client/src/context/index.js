import React, { createContext, useContext } from "react";
import ridesStore from "../store/ridesStore";

const context = createContext(null);

const useMainContext = () => {
  return useContext(context);
};

const MainContext = (props) => {
  return <context.Provider value={{ rides: ridesStore }}>{props.children}</context.Provider>;
};

export { MainContext, useMainContext };
