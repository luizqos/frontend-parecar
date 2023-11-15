import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  Text,
  View,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import ButtonAgendar from "../../components/buttons/ButtonAgendar";
import { TextInputMask } from "react-native-masked-text";
import { StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");

const EstacionamentoModal = ({
  isModalVisible,
  toggleModalEstacionamento,
  selectedMarker,
}) => {
  return (
    <Modal
      animationType="slide-up"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        toggleModalEstacionamento();
      }}
    >
      <TouchableWithoutFeedback onPress={toggleModalEstacionamento}>
        <View style={styles.containerModal}>
          <Animatable.View animation="zoomIn" style={styles.bodyModal}>
            {selectedMarker && (
              <>
                <Text style={styles.titleModal}>Reserve sua vaga</Text>
                <Text style={styles.itemNomeEstacionamento}>
                  {selectedMarker.razaosocial}
                </Text>
                <Text style={styles.titleItemModal}>Vagas</Text>
                <Text style={styles.itemModal}>
                  {`${selectedMarker.vagasDisponiveis} Vagas Livres`}
                </Text>
                <Text style={styles.titleItemModal}>Endereço</Text>
                <Text style={styles.itemModal}>
                  {`${selectedMarker.logradouro}, ${selectedMarker.numero}, ${selectedMarker.bairro}, ${selectedMarker.cidade}, ${selectedMarker.estado}`}
                </Text>
                <Text style={styles.titleItemModal}>Contato</Text>
                <Text style={styles.itemModal}>{selectedMarker.email}</Text>
                <TextInputMask
                  style={styles.itemModal}
                  type={"cel-phone"}
                  options={{
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: "(99) ",
                  }}
                  value={selectedMarker.telefone}
                />
                <Text style={styles.titleItemModal}>
                  Horário de Funcionamento
                </Text>
                <Text style={styles.itemModal}>
                  {`De:  ${selectedMarker.abertura}\nAté: ${selectedMarker.fechamento}`}
                </Text>
                <Text style={styles.titleItemModal}>Agendamento</Text>
                <Text style={styles.itemModal}>
                  {`De:  ${selectedMarker.entrada}\nAté: ${selectedMarker.saida}`}
                </Text>
                <ButtonAgendar />
              </>
            )}
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
  titleItemModal: {
    fontSize: 16,
    backgroundColor: "#ffe599",
    borderRadius: 20,
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    marginTop: 2,
    marginBottom: 2,
  },
  itemModal: {
    fontSize: 14,
    marginLeft: 15,
    textAlign: "left",
    fontFamily: "Montserrat_700Bold",
    marginTop: 2,
    marginBottom: 2,
  },
  itemNomeEstacionamento: {
    fontSize: 16,
    paddingStart: "5%",
    paddingEnd: "5%",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    marginBottom: 20,
  },
});

export default EstacionamentoModal;
