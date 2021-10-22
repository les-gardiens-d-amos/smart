import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
import CaptureScreen from "../screens/CaptureScreen";
import DisplayResultScreen from "../screens/DisplayResultScreen";

import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [isConnected, setIsConnected] = useState(false);

  const login = () => {
    setIsConnected(true);
  }

  if (isConnected) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerShown: false,
            // headerTintColor: "red",
            // headerTransparent: true,
            // headerTitle: "",
            // headerTitleAlign: "right",
            // headerLeftContainerStyle: {
            //   paddingLeft: 20,
            // },
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: "Acceuil" }}
          />
          <Stack.Screen
            name="CaptureScreen"
            component={CaptureScreen}
            options={{ title: "Capture" }}
          />
          <Stack.Screen
            name="DisplayResultScreen"
            component={DisplayResultScreen}
            options={{ title: "Resultat de la capture" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <LoginScreen onLogin={login}/>
    );
  }
};

export default RootStack;

const styles = StyleSheet.create({});
