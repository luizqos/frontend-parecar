import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
export default function ButtonCancelar({ label, color, onPress }) {
  const buttonColor = color || "red";
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{!label ? "" : label}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 8,
    width: "100%",
    marginLeft: 50,
    marginRight: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonText: {
    fontSize: 16,
    color: "#E5E5E5",
    fontFamily: "Montserrat_700Bold",
  },
});
