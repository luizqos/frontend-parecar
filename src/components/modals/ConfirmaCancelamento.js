// CancelModal.js
import React from "react";
import { Modal, Text, View, Pressable, StyleSheet } from "react-native";

const CancelModal = ({ visible, onCancel, onConfirm, reservationId }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onCancel}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Deseja cancelar esta reserva?</Text>
        <Pressable
          style={[styles.buttonModal, { backgroundColor: "red" }]}
          onPress={onCancel}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={[styles.buttonModal, { backgroundColor: "green" }]}
          onPress={() => {
            onConfirm(reservationId, "C");
            onCancel();
          }}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 12,
    fontFamily: "Montserrat_700Bold",
    color: "#000",
  },
  buttonModal: {
    borderRadius: 10,
    width: 120,
    paddingVertical: 8,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Montserrat_700Bold",
  },
});

export default CancelModal;
