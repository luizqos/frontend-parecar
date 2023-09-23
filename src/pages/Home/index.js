import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import * as Location from "expo-location";
import Loading from "../../components/Loading";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");

export default function Home() {
  const [marker, setMarker] = useState({
    latitude: -19.9298306,
    longitude: -44.0589185,
  });
  const [location, setLocation] = useState(null);
  const [mensagem, setMensagem] = useState("Estamos buscando sua localização");
  const navigation = useNavigation();

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setMensagem("Sem permissão de acesso a localização");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }
  useEffect(() => {
    getLocation();
    setMensagem(Math.floor(Math.random() * (999 - 1 + 1) + 1));
    const intervalId = setInterval(getLocation, 15000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
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
