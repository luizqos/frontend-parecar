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

  const [searchedLocation, setSearchedLocation] = useState(null);

  const [estacionamentoModalVisible, setEstacionamentoModalVisible] =
    useState(false);
  const [reservaModalVisible, setReservaModalVisible] = useState(false);

  const [selectedMarker, setSelectedMarker] = useState(null);

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
  const [markers, setMarkers] = useState([]);
  const [isPermited, setIsPermited] = useState(false);
  const [mensagem, setMensagem] = useState("Estamos buscando sua localização");
  const navigation = useNavigation();

  const handleFloatingButtonPress = () => {
    toggleModalBuscaReserva();
  };

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

  const handleBuscarEstacionamento = (searchData) => {
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
              onPress={() => toggleModalEstacionamento(m)}
            >
              <Image
                source={require("../../assets/img/pinIcon.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </Marker>
          ))}
          {searchedLocation && (
            <Marker
              coordinate={{
                latitude: searchedLocation.lat,
                longitude: searchedLocation.lng,
              }}
            >
              <Image
                source={require("../../assets/img/pinIconAddress.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </Marker>
          )}
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
      {isPermited && <ButtonReservar onPress={handleFloatingButtonPress} />}
      <EstacionamentoModal
        isModalVisible={estacionamentoModalVisible}
        toggleModalEstacionamento={toggleModalEstacionamento}
        selectedMarker={selectedMarker}
      />
      <ReservaModal
        isModalVisible={reservaModalVisible}
        toggleModalBuscaReserva={toggleModalBuscaReserva}
        onBuscarEstacionamento={handleBuscarEstacionamento}
      />
    </View>
  );
}

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
