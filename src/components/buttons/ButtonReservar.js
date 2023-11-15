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
    borderRadius: 50, // Adicione a borda desejada para o botão flutuante
    padding: 10,
    top: 16, // Ajuste para posicionar mais próximo do topo
    left: 16,
    backgroundColor: "#FFBE00",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: "row", // Isso garante que os itens estejam dispostos na mesma linha
    alignItems: "center", // Alinha os itens verticalmente no centro
    justifyContent: "center", // Alinha os itens horizontalmente no centro
  },
  floatingButtonText: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    color: "black",
    marginLeft: 5, // Adicione o espaçamento desejado entre o ícone e o texto
  },
});
