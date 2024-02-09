// GlobalStateProvider.js
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import {store} from "./store";


type childrenPropsType ={
    children:React.ReactNode,
}
const GlobalStateProvider = ({ children }:childrenPropsType) => {
  return (
  
   
      <ReduxProvider store={store}>{children}</ReduxProvider>
   
  );
};

export default GlobalStateProvider;
