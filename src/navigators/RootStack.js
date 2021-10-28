import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
import CaptureScreen from "../screens/CaptureScreen";
import ArchamosScreen from "../screens/ArchamosScreen";
import AmosSingleScreen from "../screens/AmosSingleScreen";
import DashboardScreen from "../screens/DashboardScreen";

import LoginScreen from "../screens/LoginScreen";
import { colors } from "../style/theme";
const { primary_c } = colors;

// const Stack = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [isConnected, setIsConnected] = useState(true);

  const login = () => {
    setIsConnected(true);
  };

  if (isConnected) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: primary_c,
            },
            headerTintColor: "#fff",
            fontWeight: "bold",
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Accueil" }}
          />
          <Stack.Screen
            name="CaptureScreen"
            component={CaptureScreen}
            options={{ title: "Capture" }}
          />
          <Stack.Screen
            name="ArchamosScreen"
            component={ArchamosScreen}
            options={{ title: "Archamos" }}
          />
          <Stack.Screen
            name="AmosSingleScreen"
            component={AmosSingleScreen}
            options={{ title: "Amos" }}
          />
          <Stack.Screen
            name="DashboardScreen"
            component={DashboardScreen}
            options={{
              title: "Tableau de bord",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <LoginScreen onLogin={login} />;
  }
};

export default RootStack;

const styles = StyleSheet.create({});
