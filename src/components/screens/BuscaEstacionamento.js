import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import EnderecoGoogle from "./EnderecoGoogle";
import DataPicker from "./DataPicker";
import ButtonBuscar from "../buttons/ButtonBuscar";

const BuscaEstacionamento = () => {
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

  const receberCoordenadas = (lat, lng) => {
    setCoordenadas({ lat, lng });
  };

  return (
    <View>
      <Text style={styles.title}>
        Informe data e endereço para localizar os estaciomantos mais próximos.
      </Text>
      <ButtonBuscar disabled={buttonDisabled} />
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
      {/* <Text style={styles.titleData}>Informe a data de reserva</Text> */}
      {/* {saidaDate && entradaDate && (
        <View>
          <Text style={styles.datasReserva}>
            Entrada: {entradaDate ? formatDateTime(entradaDate) : "N/A"}
          </Text>
          <Text style={styles.datasReserva}>
            Saída: {saidaDate ? formatDateTime(saidaDate) : "N/A"}
          </Text>
        </View>
      )} */}
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
