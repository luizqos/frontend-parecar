import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function ButtonReservar({ onPress }) {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <View style={styles.buttonContent}>
        <MaterialCommunityIcons
          name={"calendar-plus"}
          size={25}
          color="black"
        />
        <Text style={styles.floatingButtonText}>Reservar</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    borderRadius: 50,
    padding: 10,
    top: 16,
    left: 16,
    backgroundColor: "#FFBE00",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButtonText: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    color: "black",
    marginLeft: 5,
  },
});
