import StorageManager from "@lib/utils/StorageManager";
import React from "react";
import GlobalContextProvider from "./globalContext/GlobalContext";
import Root from "./Root";

export const storageManager = new StorageManager();

const App = () => {
  return (
    <GlobalContextProvider>
      <Root />
    </GlobalContextProvider>
  );
};

export default App;
