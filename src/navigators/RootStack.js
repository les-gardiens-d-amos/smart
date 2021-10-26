import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import CaptureScreen from "../screens/CaptureScreen";
// import DisplayResultScreen from "../screens/DisplayResultScreen";
import ArchamosScreen from "../screens/ArchamosScreen";
import DashboardScreen from "../screens/DashboardScreen";

import LoginScreen from "../screens/LoginScreen";
import { colors } from "../style/theme";
const { primary_c } = colors;

const Stack = createMaterialBottomTabNavigator();

const RootStack = () => {
  const [isConnected, setIsConnected] = useState(true);

  const login = () => {
    setIsConnected(true);
  };

  if (isConnected) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          activeColor="#fff"
          inactiveColor="#a8a8a4"
          barStyle={{ backgroundColor: primary_c }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Stack.Screen
            name="CaptureScreen"
            component={CaptureScreen}
            options={{
              tabBarLabel: "Capture",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="camera-plus"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Stack.Screen
            name="ArchamosScreen"
            component={ArchamosScreen}
            options={{
              tabBarLabel: "Archamos",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="clipboard-file"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Stack.Screen
            name="DashboardScreen"
            component={DashboardScreen}
            options={{
              tabBarLabel: "Dashboard",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="view-dashboard"
                  color={color}
                  size={26}
                />
              ),
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
