import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import EnderecoGoogle from "./EnderecoGoogle";
import DataPicker from "./DataPicker";
import ButtonBuscar from "../buttons/ButtonBuscar";

const BuscaEstacionamento = () => {
  const [coordenadas, setCoordenadas] = useState(null);
  const [entradaDate, setEntradaDate] = useState(null);
  const [saidaDate, setSaidaDate] = useState(null);
  const [entrada, setEntrada] = useState(null);
  const [saida, setSaida] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleDateChange = (entrada, saida) => {
    setEntradaDate(entrada);
    setSaidaDate(saida);
  };

  useEffect(() => {
    const canEnableButton = saidaDate && entradaDate && coordenadas;
    setButtonDisabled(!canEnableButton);
  }, [saidaDate, entradaDate, coordenadas]);

  function formatDateTime(date) {
    const options = {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("pt-BR", options);
  }

  function formatDateForFind(date) {
    let dataOriginal = new Date(date);
    dataOriginal.setHours(dataOriginal.getHours() - 3);
    return dataOriginal.toISOString().replace(/T|.000Z/g, " ");
  }

  const receberCoordenadas = (lat, lng) => {
    setCoordenadas({ lat, lng });
  };

  return (
    <View>
      <Text style={styles.title}>
        Informe data e endereço para localizar os estaciomantos mais próximos.
      </Text>
      <ButtonBuscar disabled={buttonDisabled} />
      <Text style={styles.titleData}>Informe a data de reserva</Text>
      <View style={styles.datePickerContainer}>
        <DataPicker label="Entrada" onDateChange={handleDateChange} />
        <DataPicker label="Saída" onDateChange={handleDateChange} />
      </View>
      {saidaDate && entradaDate && (
        <View>
          <Text style={styles.datasReserva}>
            Entrada: {entradaDate ? formatDateTime(entradaDate) : "N/A"}
          </Text>
          <Text style={styles.datasReserva}>
            Saida: {saidaDate ? formatDateTime(saidaDate) : "N/A"}
          </Text>
        </View>
      )}
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
  datasReserva: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    marginTop: 2,
    marginBottom: 2,
  },
});

export default BuscaEstacionamento;
