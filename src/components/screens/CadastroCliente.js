import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function CadastroCliente({
  nome,
  cpf,
  email,
  senha,
  mostraSenha,
  telefone,
  placa,
  setNome,
  setCpf,
  setEmail,
  setSenha,
  setTelefone,
  setPlaca,
  togglePasswordVisibility,
}) {
  return (
    <View>
      <Text style={styles.titleItemForm}>Nome</Text>
      <TextInput
        placeholder="Digite seu nome"
        autoCapitalize="characters"
        onChangeText={setNome}
        value={nome}
        style={styles.input}
      />
      <Text style={styles.titleItemForm}>Cpf</Text>
      <TextInputMask
        style={styles.input}
        type={"cpf"}
        placeholder={"Digite o CPF"}
        value={cpf}
        onChangeText={(text) => setCpf(text)}
      />
      <Text style={styles.titleItemForm}>Email</Text>
      <TextInput
        placeholder="Digite seu email"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
      />
      <Text style={styles.titleItemForm}>Senha</Text>
      <View>
        <TextInput
          placeholder="Digite sua senha"
          onChangeText={setSenha}
          secureTextEntry={!mostraSenha}
          value={senha}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.passwordIcon}
        >
          <MaterialCommunityIcons
            name={mostraSenha ? "eye-off" : "eye"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.titleItemForm}>Celular</Text>
      <TextInputMask
        style={styles.input}
        type={"cel-phone"}
        options={{
          maskType: "BRL",
          withDDD: true,
          dddMask: "(99) ",
        }}
        placeholder="Digite seu celular"
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
      />
      <Text style={styles.titleItemForm}>Placa do Veiculo</Text>
      <TextInput
        placeholder="Digite a placa do veiculo"
        autoCapitalize="characters"
        onChangeText={setPlaca}
        value={placa}
        style={styles.input}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  titleItemForm: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    padding: 5,
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 190, 0, 0.3)",
    height: 30,
    fontFamily: "Montserrat_400Regular",
    marginBottom: 8,
    fontSize: 16,
  },
  passwordIcon: {
    position: "absolute",
    right: 10,
  },
  errorText: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: "Montserrat_400Regular",
    color: "red",
  },
});
