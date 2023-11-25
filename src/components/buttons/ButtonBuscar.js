import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
export default function ButtonBuscar({ disabled, onPress }) {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: disabled ? "grey" : "#fd7014" },
        ]}
        disabled={disabled}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fd7014",
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
