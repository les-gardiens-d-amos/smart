import React from "react";
import { Provider } from 'react-redux';

import RootStack from "./src/navigators/RootStack";
import store from './src/store/Store';

const App = () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  )
}

export default App;
