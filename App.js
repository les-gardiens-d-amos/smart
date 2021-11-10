import React from "react";
import RootStack from "./src/navigators/RootStack";
import { Provider } from "react-redux";
import { store } from "./src/app/store";

const App = () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};

export default App;
