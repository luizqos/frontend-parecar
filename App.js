import React from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import Routes from "./src/routes";

export default function App() {
  const [fontLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FFBE00" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
