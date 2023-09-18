import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function ButtonEntrar() {
  return (
    <View>
      <Text style={styles.buttonText}>Entrar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Montserrat_700Bold",
  },
});
