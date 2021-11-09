import React, { useEffect } from "react";
import { Provider } from "react-redux";

import RootStack from "./src/navigators/RootStack";
// import store from "./src/store/Store";
import { store } from "./src/app/store";
import * as SecureStore from "expo-secure-store";

const App = () => {
  useEffect(() => {
    existingUser();
  }, []);

  const existingUser = async () => {
    // If a jwt token exists, auto connect the user
    const jwt = await SecureStore.getItemAsync("jwt");
    if (jwt !== undefined) {
      console.log("jwt token existing -", jwt);
      // SET CURRENTUSER BY GETTING INFO FROM ROUTE
      // actionLoginUser(dispatch, userInfo);
    }
  };

  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};

export default App;
