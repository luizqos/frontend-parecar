import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Config from "../../util/Config";
import getStored from "../../util/getStored";
import { Buffer } from "buffer";
import Aguarde from "../../components/screens/Aguarde";

export default function Usuario() {
  const [clienteId, setClienteId] = useState(null);
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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

  const loadApi = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${Config.API_URL}/clientes?id=${clienteId}`
      );
      const userData = [...response.data];
      setData(userData[0]);
    } catch (error) {
      console.error("Erro ao carregar dados da API:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {data ? (
        <>
          <Animatable.View
            animation="fadeInLeft"
            style={styles.containerHeader}
          >
            <Text style={styles.message}>Meus Dados</Text>
          </Animatable.View>
          <Animatable.View
            delay={500}
            animation="fadeInUp"
            style={styles.containerForm}
          >
            <Text style={styles.title}>Nome</Text>
            <TextInput
              autoCapitalize="characters"
              maxLength={100}
              value={data.nome}
              style={styles.input}
              editable={false}
            />
            <Text style={styles.title}>CPF</Text>
            <TextInput
              autoCapitalize="characters"
              maxLength={100}
              value={data.cpf}
              style={styles.input}
              editable={false}
            />
            <Text style={styles.title}>Email</Text>
            <TextInput
              autoCapitalize="none"
              maxLength={100}
              value={data.email}
              style={styles.input}
              editable={false}
            />
            <Text style={styles.title}>Telefone</Text>
            <TextInput
              autoCapitalize="none"
              maxLength={100}
              value={data.telefone}
              style={styles.input}
              editable={false}
            />
            <Text style={styles.title}>Placa do Veículo</Text>
            <TextInput
              autoCapitalize="characters"
              maxLength={10}
              value={data.placa}
              style={styles.input}
              editable={false}
            />
          </Animatable.View>
        </>
      ) : (
        <Aguarde />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE00",
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
    color: "black",
  },
  title: {
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    fontFamily: "Montserrat_400Regular",
    marginBottom: 12,
    fontSize: 16,
    color: "#000",
  },
});
