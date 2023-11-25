import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  Text,
  View,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import BuscaEstacionamento from "../screens/BuscaEstacionamento";
import { StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");

const ReservaModal = ({
  isModalVisible,
  toggleModalBuscaReserva,
  onBuscarEstacionamento,
}) => {
  const handleModalPress = (event) => {
    const { locationX, locationY } = event.nativeEvent;

    // Verifique se o clique está dentro do conteúdo do modal
    if (
      locationX < 0 ||
      locationY < 0 ||
      locationX > width * 0.95 ||
      locationY > height * 0.6
    ) {
      toggleModalBuscaReserva();
    }
  };

  return (
    <Modal
      animationType="slide-up"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        toggleModalBuscaReserva();
      }}
    >
      <TouchableWithoutFeedback onPress={(event) => handleModalPress(event)}>
        <View style={styles.containerModal}>
          <Animatable.View animation="zoomIn" style={styles.bodyModal}>
            <Text style={styles.titleModal}>Busca de Estacionamentos</Text>
            <BuscaEstacionamento
              onBuscarEstacionamento={onBuscarEstacionamento}
            />
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bodyModal: {
    backgroundColor: "rgba(255, 190, 0, 0.9)",
    width: width * 0.95,
    height: height * 0.6,
    padding: 20,
    borderRadius: 10,
    maxWidth: 400,
  },
  containerModal: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleModal: {
    fontSize: 18,
    backgroundColor: "#ffe599",
    borderRadius: 20,
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    marginTop: 2,
    marginBottom: 20,
  },
});

export default ReservaModal;
