import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  requestBackgroundPermissionsAsync,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import Loading from "../../components/Loading";
import ButtonReservar from "../../components/buttons/ButtonReservar";
import EstacionamentoModal from "../../components/modals/EstacionamentoModal";
import ReservaModal from "../../components/modals/ReservaModal";
import estacionamentoService from "../../services/EstacionamentoService";
import getStored from "../../util/getStored";
import { Buffer } from "buffer";
import Map from "./Map";

const { width, height } = Dimensions.get("screen");

const Home = ({ route }) => {
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

  let { dadosNovaBusca } = route?.params ?? 0;

  const [searchedLocation, setSearchedLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [estacionamentoModalVisible, setEstacionamentoModalVisible] =
    useState(false);
  const [reservaModalVisible, setReservaModalVisible] = useState(false);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const [clienteId, setClienteId] = useState(null);
  const [clienteType, setClienteType] = useState(null);

  const toggleModalEstacionamento = (marker) => {
    setSelectedMarker(marker);
    setEstacionamentoModalVisible(!estacionamentoModalVisible);
    setReservaModalVisible(false);
  };

  const toggleModalBuscaReserva = () => {
    setReservaModalVisible(!reservaModalVisible);
    setEstacionamentoModalVisible(false);
  };

  const [initialRegion, setinitialRegion] = useState(null);
  const [findRegion, setFindRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isPermited, setIsPermited] = useState(false);
  const [mensagem, setMensagem] = useState("Estamos buscando sua localização");
  const [dadosBusca, setDadosBusca] = useState(false);
  const handleFloatingButtonPress = () => {
    toggleModalBuscaReserva();
  };

  function buscarEstacionamento(dados) {
    if (dadosNovaBusca) {
      dados = dadosNovaBusca;
    }
    setDadosBusca(dados);
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
          setLoading(false);
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

  const handleBuscarEstacionamento = (searchData) => {
    if (dadosNovaBusca) {
      dadosNovaBusca = 0;
      setFindRegion(null);
    }

    buscarEstacionamento(searchData);

    setSearchedLocation({
      lat: searchData.latitude,
      lng: searchData.longitude,
    });

    if (searchData.latitude && searchData.longitude) {
      setinitialRegion({
        latitude: searchData.latitude,
        longitude: searchData.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }

    setReservaModalVisible(false);
  };

  useEffect(() => {
    getStored("token")
      .then((getToken) => {
        if (getToken) {
          const token = JSON.stringify(getToken);
          const { id, tipo } = JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
          );
          setClienteId(id);
          setClienteType(tipo);
        } else {
          console.log("Token não encontrado no AsyncStorage.");
        }
      })
      .catch((error) => {
        console.error("Erro ao obter o token do AsyncStorage:", error);
      });
  }, []);

  useEffect(() => {
    if (dadosNovaBusca && dadosNovaBusca.latitude && dadosNovaBusca.longitude) {
      setFindRegion({
        latitude: dadosNovaBusca.latitude,
        longitude: dadosNovaBusca.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setSearchedLocation({
        lat: dadosNovaBusca.latitude,
        lng: dadosNovaBusca.longitude,
      });
    }
  }, [dadosNovaBusca]);

  return (
    <View style={styles.container}>
      {initialRegion && isPermited && !!markers ? (
        <Map
          markers={markers}
          initialRegion={initialRegion}
          findRegion={findRegion}
          searchedLocation={searchedLocation}
          toggleModalEstacionamento={toggleModalEstacionamento}
        />
      ) : (
        <View style={styles.containerLogo}>
          <Animatable.Image
            animation="zoomInUp"
            source={require("../../assets/img/logo.png")}
            style={{ width: "75%" }}
            resizeMode="contain"
          />
          <Text style={styles.textoLoading}>{mensagem}</Text>
          {loading && <Loading />}
        </View>
      )}
      {isPermited && <ButtonReservar onPress={handleFloatingButtonPress} />}
      <EstacionamentoModal
        isModalVisible={estacionamentoModalVisible}
        toggleModalEstacionamento={toggleModalEstacionamento}
        selectedMarker={selectedMarker}
        clienteId={clienteId}
        dadosBusca={dadosBusca}
      />
      <ReservaModal
        isModalVisible={reservaModalVisible}
        toggleModalBuscaReserva={toggleModalBuscaReserva}
        onBuscarEstacionamento={handleBuscarEstacionamento}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE00",
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    flex: 1,
    borderRadius: 20,
    width: width,
    height: height,
    ...StyleSheet.absoluteFillObject,
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
  textoLoading: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    marginTop: 28,
    marginBottom: 12,
  },
  button: {
    position: "absolute",
    backgroundColor: "#ffe599",
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
export default Home;
