import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";

export default function TipoAcesso({
  radioButtons,
  selectedId,
  setSelectedId,
}) {
  return (
    <View style={styles.containerTipo}>
      <Text style={styles.title}>Crie seu acesso</Text>
      <Text style={styles.subtitle}>Selecione seu tipo de acesso</Text>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
        borderColor="red"
        layout="row"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  containerTipo: {
    flex: 1,
    marginTop: "2%",
    marginBottom: "2%",
    paddingStart: "3%",
  },
  title: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    padding: 5,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    padding: 2,
    marginTop: 8,
    position: "relative",
  },
});
