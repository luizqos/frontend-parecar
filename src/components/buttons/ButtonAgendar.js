import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
export default function ButtonAgendar({ disabled, onPress, label, color }) {
  const buttonColor = color || "#fd7014";
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{!label ? "Agendar" : label}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    paddingVertical: 8,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#E5E5E5",
    fontFamily: "Montserrat_700Bold",
  },
});
