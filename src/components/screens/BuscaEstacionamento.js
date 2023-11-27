import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import EnderecoGoogle from "./EnderecoGoogle";
import DataPicker from "./DataPicker";
import ButtonBuscar from "../buttons/ButtonBuscar";

const BuscaEstacionamento = ({ onBuscarEstacionamento }) => {
  const [coordenadas, setCoordenadas] = useState(null);
  const [entradaDate, setEntradaDate] = useState(null);
  const [saidaDate, setSaidaDate] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleDateChange = (entrada, saida, type) => {
    if (type === "entrada") {
      setEntradaDate(entrada);
    } else if (type === "saida") {
      setSaidaDate(saida);
    }
  };

  useEffect(() => {
    const canEnableButton = saidaDate && entradaDate && coordenadas;
    setButtonDisabled(!canEnableButton);
  }, [saidaDate, entradaDate, coordenadas]);
  const receberCoordenadas = (lat, lng) => {
    setCoordenadas({ lat, lng });
  };

  const handleBuscarPress = () => {
    const searchData = {
      latitude: coordenadas.lat,
      longitude: coordenadas.lng,
      entrada: entradaDate,
      saida: saidaDate,
    };
    onBuscarEstacionamento(searchData);
  };

  return (
    <View>
      <Text style={styles.title}>
        Informe data e endereço para localizar os estaciomantos mais próximos.
      </Text>
      <ButtonBuscar disabled={buttonDisabled} onPress={handleBuscarPress} />
      <View style={styles.datePickerContainer}>
        <View style={styles.datePickerItem}>
          <Text style={styles.datePickerLabel}>Entrada</Text>
          <DataPicker
            label="Entrada"
            onDateChange={handleDateChange}
            type="entrada"
            entradaDate={setEntradaDate}
          />
        </View>
        <View style={styles.datePickerItem}>
          <Text style={styles.datePickerLabel}>Saída</Text>
          <DataPicker
            label="Saída"
            onDateChange={handleDateChange}
            type="saida"
            saidaDate={setSaidaDate}
          />
        </View>
      </View>
      <View>
        <Text style={styles.titleEndereco}>Digite o endereço</Text>
        <EnderecoGoogle receberCoordenadas={receberCoordenadas} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 10,
  },
  titleData: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    marginTop: 10,
    marginBottom: 10,
  },
  titleEndereco: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    marginTop: 10,
    marginBottom: 10,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePickerItem: {
    flex: 1,
    alignItems: "center",
  },
  datePickerLabel: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 5,
  },
  datasReserva: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    marginTop: 2,
    marginBottom: 2,
  },
});

export default BuscaEstacionamento;
