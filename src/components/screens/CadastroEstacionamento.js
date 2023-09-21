import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function CadastroEstacionamento({
  nomeResponsavel,
  razaoSocial,
  nomeFantasia,
  cnpj,
  email,
  senha,
  mostraSenha,
  telefone,
  cep,
  endereco,
  numero,
  complemento,
  bairro,
  cidade,
  estado,
  mensagem,
  setCnpj,
  setEmail,
  setSenha,
  setNomeResponsavel,
  setRazaoSocial,
  setNomeFantasia,
  setTelefone,
  setCep,
  setEndereco,
  setNumero,
  setComplemento,
  setBairro,
  setCidade,
  setEstado,
  togglePasswordVisibility,
}) {
  return (
    <View>
      <Text style={styles.titleItemForm}>Responsável</Text>
      <TextInput
        placeholder="Digite o Nome do Responsável"
        autoCapitalize="characters"
        onChangeText={setNomeResponsavel}
        value={nomeResponsavel}
        style={styles.input}
      />
      <Text style={styles.titleItemForm}>Razão Social</Text>
      <TextInput
        placeholder="Digite a Razão Social"
        autoCapitalize="characters"
        onChangeText={setRazaoSocial}
        value={razaoSocial}
        style={styles.input}
      />
      <Text style={styles.titleItemForm}>Nome Fantasia</Text>
      <TextInput
        placeholder="Digite o Nome Fantasia"
        autoCapitalize="characters"
        onChangeText={setNomeFantasia}
        value={nomeFantasia}
        style={styles.input}
      />
      <Text style={styles.titleItemForm}>Cnpj</Text>
      <TextInputMask
        style={styles.input}
        type={"cnpj"}
        placeholder={"Digite o CNPJ"}
        value={cnpj}
        onChangeText={(text) => setCnpj(text)}
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
      <Text style={styles.titleItemForm}>Telefone</Text>
      <TextInputMask
        style={styles.input}
        type={"cel-phone"}
        options={{
          maskType: "BRL",
          withDDD: true,
          dddMask: "(99) ",
        }}
        placeholder="Digite Telefone"
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
      />
      <Text style={styles.titleItemForm}>Cep</Text>
      <TextInputMask
        style={styles.input}
        type={"zip-code"}
        placeholder="Digite o Cep"
        value={cep}
        onChangeText={(text) => setCep(text)}
      />
      <Text style={styles.titleItemForm}>Endereço</Text>
      <TextInput
        placeholder="Digite o endereço"
        autoCapitalize="characters"
        onChangeText={setEndereco}
        value={endereco}
        style={styles.input}
      />
      <Text style={styles.titleItemForm}>Numero</Text>
      <TextInput
        placeholder="Digite o Número"
        autoCapitalize="characters"
        onChangeText={setNumero}
        value={numero}
        style={styles.input}
      />
      <Text style={styles.titleItemForm}>Complemento</Text>
      <TextInput
        placeholder="Digite o Complemento"
        autoCapitalize="characters"
        onChangeText={setComplemento}
        value={complemento}
        style={styles.input}
      />
      <Text style={styles.titleItemForm}>Bairro</Text>
      <TextInput
        placeholder="Digite o Bairro"
        autoCapitalize="characters"
        onChangeText={setBairro}
        value={bairro}
        style={styles.input}
      />
      <Text style={styles.titleItemForm}>Cidade</Text>
      <TextInput
        placeholder="Digite a Cidade"
        autoCapitalize="characters"
        onChangeText={setCidade}
        value={cidade}
        style={styles.input}
      />
      <Text style={styles.titleItemForm}>Estado</Text>
      <TextInput
        placeholder="Digite o Estado"
        autoCapitalize="characters"
        onChangeText={setEstado}
        value={estado}
        style={styles.input}
      />
      <Text style={styles.errorText}>{mensagem}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  titleItemForm: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    padding: 3,
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 190, 0, 0.3)",
    height: 20,
    fontFamily: "Montserrat_400Regular",
    marginBottom: 6,
    fontSize: 14,
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
