import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
export default function ButtonStatus({ label, color }) {
  const buttonColor = color || "#fd7014";
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        disabled={true}
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
    marginRight: 50,
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonText: {
    fontSize: 16,
    color: "#E5E5E5",
    fontFamily: "Montserrat_700Bold",
  },
});
