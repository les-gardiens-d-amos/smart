import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
// import DisplayResultScreen from "../screens/DisplayResultScreen";
import ArchamosScreen from "../screens/ArchamosScreen";
import AmosSingleScreen from "../screens/AmosSingleScreen";
import DashboardScreen from "../screens/DashboardScreen";
import DisplayResultScreen from "../screens/DisplayResultScreen";

import LoginScreen from "../screens/LoginScreen";
import { colors } from "../style/theme";
import CameraScreen from '../screens/CameraScreen';
const { primary_c } = colors;

// const Stack = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [isConnected, setIsConnected] = useState(false);

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
            name="CameraScreen"
            component={CameraScreen}
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
          <Stack.Screen
            name="DisplayResultScreen"
            component={DisplayResultScreen}
            options={{ title: "Capture" }}
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
