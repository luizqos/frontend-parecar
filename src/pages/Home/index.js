import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  PermissionsAndroid,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  requestBackgroundPermissionsAsync,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import { TextInputMask } from "react-native-masked-text";
import Loading from "../../components/Loading";
import ButtonAgendar from "../../components/buttons/ButtonAgendar";
import estacionamentoService from "../../services/EstacionamentoService";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const { width, height } = Dimensions.get("screen");

export default function Home() {
  ///////////////// config for expo ////////////////////////

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const toggleModal = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(!isModalVisible);
  };
  const [initialRegion, setinitialRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isPermited, setIsPermited] = useState(false);
  const [mensagem, setMensagem] = useState("Estamos buscando sua localização");
  const navigation = useNavigation();

  function buscarEstacionamento(dados) {
    estacionamentoService
      .buscaEstacionamento(dados)
      .then((response) => {
        if (response && response.length) {
          const dadosEstacionamento = response.map(
            (elemento, indice, array) => {
              const funcionamento = array[indice].funcionamento;
              return {
                ...elemento,
                abertura: funcionamento.abertura,
                dia: funcionamento.dia,
                fechamento: funcionamento.fechamento,
              };
            }
          );
          setMarkers(dadosEstacionamento);
        } else {
          setMensagem(
            response
              ? "Desculpe, não encontramos estacionamentos na sua localidade."
              : "Erro, não foi possível buscar estacionamentos."
          );
          setMarkers(null);
        }
      })
      .catch((error) => {
        console.error("Erro", "Tente novamente.", error);
      });
  }

  const permissaoLocalizacaoSegundoPlano = async () => {
    try {
      const { granted } = await requestBackgroundPermissionsAsync();
      if (granted) {
        await getCurrentPositionAsync();
        getLocation();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const permissaoLocalizacao = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsPermited(true);
        getLocation();
        permissaoLocalizacaoSegundoPlano();
        setMensagem("Permissão concedida");
      } else {
        setMensagem("Permissão negada");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = async () => {
    setMensagem("Buscando sua localização");
    try {
      watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
          timeInterval: 3000,
          distanceInterval: 500,
        },
        (response) => {
          setinitialRegion({
            latitude: response.coords.latitude,
            longitude: response.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          buscarEstacionamento({
            latitude: response.coords.latitude,
            longitude: response.coords.longitude,
          });
        }
      );
    } catch (err) {
      setMensagem("Houve um erro ao buscar localização");
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      permissaoLocalizacao();
    }
  }, []);
  return (
    <View style={styles.container}>
      {initialRegion && isPermited && !!markers ? (
        <MapView
          style={styles.map}
          region={initialRegion}
          zoomEnabled={true}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          {markers.map((m) => (
            <Marker
              key={m.id}
              coordinate={{
                latitude: parseFloat(m.latitude),
                longitude: parseFloat(m.longitude),
              }}
              onPress={() => toggleModal(m)}
            >
              <Image
                source={require("../../assets/img/pinIcon.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </Marker>
          ))}
        </MapView>
      ) : (
        <View style={styles.containerLogo}>
          <Animatable.Image
            animation="zoomInUp"
            source={require("../../assets/img/logo.png")}
            style={{ width: "75%" }}
            resizeMode="contain"
          />
          <Text style={styles.textoLoading}>{mensagem}</Text>
          <Loading />
        </View>
      )}
      <Modal
        animationType="slide-up"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE00",
  },
  bodyModal: {
    backgroundColor: "rgba(255, 190, 0, 0.9)",
    marginTop: 100,
    width: width * 0.95,
    height: height * 0.6,
    padding: 20,
    borderRadius: 10,
  },
  containerModal: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  map: {
    flex: 1,
    borderRadius: 20,
    width: width,
    height: height,
  },
  containerLogo: {
    flex: 2,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    marginTop: 28,
    marginBottom: 12,
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
  textoLoading: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    marginTop: 28,
    marginBottom: 12,
  },
  button: {
    position: "absolute",
    backgroundColor: "#FFBE00",
    borderRadius: 50,
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    bottom: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
});
