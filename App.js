import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
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

const styles = StyleSheet.create({});

export default App;
