import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ButtonStatus from "../../components/buttons/ButtonStatus";
import ButtonCancelar from "../../components/buttons/ButtonCancelar";
import { useNavigation } from "@react-navigation/native";
import converterDataParaFormatoBrasileiro from "../../util/converterDataParaFormatoBrasileiro";
import axios from "axios";
import Config from "../../util/Config";
import getStored from "../../util/getStored";
import { Buffer } from "buffer";
export default function Reserva() {
  const navigation = useNavigation();
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clienteId, setClienteId] = useState(null);
  useEffect(() => {
    getStored("token")
      .then((getToken) => {
        if (getToken) {
          const token = JSON.stringify(getToken);
          const { id } = JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
          );
          setClienteId(id);
        } else {
          console.log("Token não encontrado no AsyncStorage.");
        }
      })
      .catch((error) => {
        console.error("Erro ao obter o token do AsyncStorage:", error);
      });
  }, []);

  useEffect(() => {
    if (clienteId) {
      loadApi();
    }
  }, [clienteId]);

  async function loadApi() {
    if (loading) return;
    setLoading(true);
    const response = await axios.get(
      `${Config.API_URL}/reservas?idcliente=${clienteId}`
    );
    const dataOrdenada = [...response.data].sort(
      (a, b) => new Date(b.entradareserva) - new Date(a.entradareserva)
    );
    setData(dataOrdenada);
    setLoading(false);
  }

  function ListItem({ data, isLastItem }) {
    let label = "";
    let color = "";
    let canCancel = false;
    if (data.status === 1) {
      const entradaReservaNoFuturo = new Date(data.entradareserva) > new Date();
      const entradaReservaNoPassado =
        new Date(data.entradareserva) < new Date();

      if (entradaReservaNoFuturo) {
        label = "Agendado";
        color = "blue";
        canCancel = true;
      } else if (entradaReservaNoPassado && data.datahoraentrada === null) {
        label = "Ausente";
        color = "grey";
      } else if (data.datahoraentrada !== null) {
        label = "Confirmado";
        color = "green";
      }
    } else if (data.status === 0) {
      label = "Cancelado";
      color = "red";
    }

    const renderButtonCancelar = canCancel ? (
      <ButtonCancelar color={"red"} label={"Cancelar"} />
    ) : null;
    return (
      <View style={{ ...styles.listItem, marginBottom: isLastItem ? 75 : 10 }}>
        <View style={styles.separator}></View>
        <View style={styles.itemRow}>
          <Text style={styles.listTitulo}>Estacionamento:</Text>
          <Text style={styles.listText}>
            {data.Vagas.Estacionamentos.razaosocial}
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.listTitulo}>Endereço:</Text>
          <Text style={styles.listText}>
            {`${data.Vagas.Estacionamentos.logradouro}, ${data.Vagas.Estacionamentos.numero}`}
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.listTitulo}>Bairro:</Text>
          <Text style={styles.listText}>
            {data.Vagas.Estacionamentos.bairro}
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.listTitulo}>Cidade:</Text>
          <Text
            style={styles.listText}
          >{`${data.Vagas.Estacionamentos.cidade} - ${data.Vagas.Estacionamentos.estado}`}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.listTitulo}>Cep:</Text>
          <Text style={styles.listText}>{data.Vagas.Estacionamentos.cep}</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.itemRow}>
          <Text style={styles.listTitulo}>Reserva:</Text>
          <Text
            style={styles.listText}
          >{`Entrada: ${converterDataParaFormatoBrasileiro(
            data.entradareserva
          )}\nSaída:     ${converterDataParaFormatoBrasileiro(
            data.saidareserva
          )} \nPlaca:     ${data.placa}`}</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.buttonContainer}>
          <ButtonStatus color={color} label={label} />
          {renderButtonCancelar}
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerTipo}>
        <Text style={styles.titulo}>Minhas Reservas</Text>
        <FlatList
          style={{ ...styles.flatList }}
          contentContainerStyle={{ marginHorizontal: 20 }}
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <ListItem data={item} isLastItem={index === data.length - 1} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE00",
  },
  flatList: { marginTop: 10 },
  listItem: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  listTitulo: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    color: "#000",
    marginRight: 8,
    height: 16,
    textAlignVertical: "center",
  },
  listText: {
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    color: "#000",
    marginTop: 2,
  },

  listStatus: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    color: "#000",
    backgroundColor: "green",
    borderRadius: 10,
    marginTop: 2,
  },
  button: {
    backgroundColor: "#FFBE00",
    borderRadius: 50,
    paddingVertical: 8,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Montserrat_700Bold",
  },
  separator: {
    borderBottomColor: "#rgba(255, 190, 0, 0.3)",
    borderBottomWidth: 2,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  containerTipo: {
    marginTop: 2,
    marginBottom: "2%",
    paddingStart: "3%",
    height: "100%",
  },
  titulo: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    color: "black",
  },
});
