import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import ButtonAgendar from "../../components/buttons/ButtonAgendar";
import { TextInputMask } from "react-native-masked-text";
import { StyleSheet } from "react-native";
import converterDataParaISO8601 from "../../util/converterDataParaISO8601";
import agendamentoService from "../../services/AgendamentoService";
import Loading from "../Loading";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("screen");

const EstacionamentoModal = ({
  isModalVisible,
  toggleModalEstacionamento,
  selectedMarker,
  clienteId,
  dadosBusca,
}) => {
  const navigation = useNavigation();
  const [dadosReserva, setDadosReserva] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState(null);
  const [placa, setPlaca] = useState("");

  function limpaState() {
    setLoading(false);
    setDisabled(false);
    setLabel(null);
  }

  const showToast = (type, texto1, texto2) => {
    Toast.show({
      type: type,
      text1: texto1,
      text2: texto2,
    });
  };

  function removeCaracteres(texto) {
    return texto.replace(/[^a-zA-Z0-9]/g, "");
  }

  function agendar(data) {
    setLoading(true);
    setDisabled(true);
    agendamentoService
      .agendamento(data)
      .then((response) => {
        setLoading(false);
        if (!response.message) {
          setLabel("Agendado");
        } else {
          setLabel("Erro ao Agendar");
          showToast("error", "Erro", response.message);
          setTimeout(() => {
            setDisabled(false);
            setLabel(null);
          }, 5000);
        }
      })
      .catch((error) => {
        setLabel("Erro ao Agendar");
        showToast("error", "Erro", "Tente novamente mais tarde.");
        setDisabled(false);
        setLabel(null);
        console.error("Erro", "Tente novamente.", error);
      });
  }

  useEffect(() => {
    if (selectedMarker && selectedMarker.vagas && selectedMarker.vagas[0]) {
      const { entrada, saida } = selectedMarker;
      const { id: idvaga } = selectedMarker.vagas[0];
      setDadosReserva({
        idcliente: clienteId,
        idvaga,
        entradareserva: new Date(converterDataParaISO8601(entrada)._j),
        saidareserva: new Date(converterDataParaISO8601(saida)._j),
        status: 1,
      });
    }
  }, [selectedMarker, clienteId]);

  const agendarEstacionamento = () => {
    if (dadosReserva) {
      dadosReserva.placa = placa;
      agendar(dadosReserva);
    } else {
      console.error("Dados de reserva não disponíveis");
    }
  };

  return (
    <Modal
      animationType="slide-up"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        toggleModalEstacionamento();
        if (label === "Agendado") {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home", params: { dadosNovaBusca: dadosBusca } }],
          });
        }
        limpaState();
      }}
    >
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.containerModal}>
          <Toast />
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
                <Text style={styles.titleItemModal}>Veiculo</Text>
                <TextInput
                  placeholder="Digite a placa do veiculo"
                  autoCapitalize="characters"
                  onChangeText={(text) => {
                    setPlaca(removeCaracteres(text));
                  }}
                  value={placa}
                  maxLength={10}
                  style={styles.input}
                />
                {loading ? (
                  <>
                    <Loading color={"white"} />
                  </>
                ) : (
                  <>
                    <ButtonAgendar
                      onPress={agendarEstacionamento}
                      disabled={disabled || placa.length < 7}
                      label={label}
                      color={placa.length < 7 ? "grey" : "#fd7014"}
                    />
                  </>
                )}
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
    height: height * 0.65,
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
  input: {
    backgroundColor: "#fff",
    height: 30,
    width: 230,
    fontFamily: "Montserrat_400Regular",
    borderRadius: 5,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 50,
    marginRight: 50,
    textAlign: "center",
    fontSize: 16,
  },
});

export default EstacionamentoModal;
