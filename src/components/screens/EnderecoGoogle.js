import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import Config from "../../util/Config";

const EnderecoGoogle = ({ receberCoordenadas }) => {
  const buscarCoordenadas = async (endereco) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=${Config.API_KEY_GOOGLE}`
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        receberCoordenadas(lat, lng);
      } else {
        console.log("Endereço não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar coordenadas:", error);
    }
  };

  const stylesGoogle = StyleSheet.create({
    textInput: {
      fontSize: 14,
      fontFamily: "Montserrat_400Regular",
    },
  });

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      padding: 2,
      height: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        styles={stylesGoogle}
        placeholder="Informe o endereço"
        onPress={(data, details = null) => {
          buscarCoordenadas(details?.description || data.description);
        }}
        query={{
          key: Config.API_KEY_GOOGLE,
          language: "pt-BR",
        }}
        currentLocation={false}
        currentLocationLabel="Localização Atual"
        enablePoweredByContainer={false}
      />
    </View>
  );
};

export default EnderecoGoogle;
