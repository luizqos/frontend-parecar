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
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import Loading from "../../components/Loading";
import estacionamentoService from "../../services/EstacionamentoService";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");

export default function Home() {
  const [marker, setMarker] = useState({
    latitude: -19.9298306,
    longitude: -44.0589185,
  });
  const [initialRegion, setinitialRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isPermited, setIsPermited] = useState(false);
  const [mensagem, setMensagem] = useState("Estamos buscando sua localização");
  const navigation = useNavigation();

  function buscarEstacionamento() {
    estacionamentoService
      .buscaEstacionamento()
      .then((response) => {
        if (response) {
          setMarkers(response);
        } else {
          setMensagem("Erro, não foi possível buscar estacionamentos.");
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
        console.log("Permissão negada");
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

  useEffect(() => {
    buscarEstacionamento();
  }, []);
  return (
    <View style={styles.container}>
      {initialRegion && isPermited && !!markers.length ? (
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
              title={m.razaosocial}
            />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE00",
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
