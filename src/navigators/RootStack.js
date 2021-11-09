import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
import { colors } from "../style/theme";
const { primary_c } = colors;

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

  if (!appReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <ActivityIndicator size="large" color={primary_c} />
        <Text style={{ textAlign: "center" }}>
          Chargement de l'application...
        </Text>
      </View>
    );
  }

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
