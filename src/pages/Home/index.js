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
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");

export default function Home() {
  const [marker, setMarker] = useState({
    latitude: -19.9298306,
    longitude: -44.0589185,
  });
  const [initialRegion, setinitialRegion] = useState(null);
  const [isPermited, setIsPermited] = useState(false);
  const [mensagem, setMensagem] = useState("Estamos buscando sua localização");
  const navigation = useNavigation();

  async function permissaoLocalizacaoSegundoPlano() {
    const { granted } = await requestBackgroundPermissionsAsync();
    if (granted) {
      await getCurrentPositionAsync();
      setIsPermited(true);
    }
  }
  const permissaoLocalizacao = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        permissaoLocalizacaoSegundoPlano();
      } else {
        console.log("Permissão negada");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    if (Platform.OS === "android") {
      permissaoLocalizacao();
    }
  }, []);

  useEffect(() => {
    if (isPermited) {
      watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 1,
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
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.textoLoading}>{mensagem}</Text>
      {initialRegion && isPermited ? (
        <MapView
          style={styles.map}
          region={initialRegion}
          zoomEnabled={true}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          <Marker coordinate={marker} title="Estacione Aqui" />
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
