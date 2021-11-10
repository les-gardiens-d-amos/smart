import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { colors } from "../style/theme";
const { primary_c } = colors;
import Loader from "../components/CustomActivityLoader";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../services/user";

// Screens
import HomeScreen from "../screens/HomeScreen";
import CaptureScreen from "../screens/CaptureScreen";
import ArchamosScreen from "../screens/ArchamosScreen";
import AmodexScreen from "../screens/AmodexScreen";
import AmosSingleScreen from "../screens/AmosSingleScreen";
import DashboardScreen from "../screens/DashboardScreen";
import DisplayResultScreen from "../screens/DisplayResultScreen";
import PreviewScreen from "../screens/PreviewScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const currentUser = useSelector((state) => state.userSlice.currentUser);
  const [appReady, setAppReady] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    existingUser();
  }, []);

  const existingUser = async () => {
    // Automatic connection if jwt is found
    await getCurrentUser(dispatch);
    setAppReady(true);
  };

  if (!appReady) return <Loader message={"Chargement de l'application..."} />;

  if (currentUser === null) return <LoginScreen />;

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
          name="AmodexScreen"
          component={AmodexScreen}
          options={{ title: "Amodex" }}
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
            title: "Menu",
          }}
        />
        <Stack.Screen
          name="DisplayResultScreen"
          component={DisplayResultScreen}
          options={{ title: "Capture" }}
        />
        <Stack.Screen
          name="PreviewScreen"
          component={PreviewScreen}
          options={{ title: "Preview" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
