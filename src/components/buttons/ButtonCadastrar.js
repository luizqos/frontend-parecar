import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function ButtonCadastrarr() {
  return (
    <View>
      <Text style={styles.buttonText}>Cadastrar</Text>
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
