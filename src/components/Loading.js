import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
export default function Loading({ color, size }) {
  return (
    <View>
      <Text style={styles.loading}>Aguarde...</Text>
      <ActivityIndicator size="large" color="#FFBE00" />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
  },
});
