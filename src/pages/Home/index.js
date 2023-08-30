import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  PermissionsAndroid,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  requestBackgroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";

import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [initialRegion, setinitialRegion] = useState(null);
  const navigation = useNavigation();

  async function requestLocationPermissions() {
    const { granted } = await requestBackgroundPermissionsAsync();
    if (granted) {
      await getCurrentPositionAsync();
    }
  }

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permissão concedida");
      } else {
        console.log("Permissão negada");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      requestLocationPermission();
    }
  }, []);

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (reponse) => {
        setLocation(reponse);
        setinitialRegion(reponse);
      }
    );
  }, []);
  return (
    <View style={styles.container}>
      {location && initialRegion ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Minha Localização"
          />
        </MapView>
      ) : (
        <View style={styles.containerLogo}>
            <Animatable.Image
              animation="zoomInUp"
              source={require("../../assets/img/logo.png")}
              style={{ width: "75%" }}
              resizeMode="contain"
            />
            <Text style={styles.textoLoading}>Aguarde...</Text>
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

