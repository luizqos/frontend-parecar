import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Controller } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "../Loading";
import ButtonCadastrar from "../buttons/ButtonCadastrar";

const CadastroCliente = ({
  control,
  errors,
  handleSubmit,
  cadastrar,
  loading,
  mensagem,
}) => {
  const [mostraSenha, setMostraSenha] = useState(false);
  const togglePasswordVisibility = () => {
    setMostraSenha(!mostraSenha);
  };
  return (
    <View loading={loading} mensagem={mensagem}>
      <Text style={styles.titleItemForm}>Nome</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Digite seu nome"
            onBlur={onBlur}
            onChangeText={onChange}
            maxLength={100}
            value={value}
            style={styles.input}
          />
        )}
        name="nome"
      />
      {errors.nome && (
        <Text style={styles.errorText}>{errors.nome.message}</Text>
      )}
      <Text style={styles.titleItemForm}>Cpf</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputMask
            style={styles.input}
            type={"cpf"}
            placeholder={"Digite o CPF"}
            onBlur={onBlur}
            onChangeText={onChange}
            maxLength={14}
            value={value}
          />
        )}
        name="cpf"
      />
      {errors.cpf && <Text style={styles.errorText}>{errors.cpf.message}</Text>}
      <Text style={styles.titleItemForm}>Email</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            autoCapitalize="none"
            maxLength={100}
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(text.toLowerCase());
            }}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
      <Text style={styles.titleItemForm}>Senha</Text>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              onChangeText={onChange}
              secureTextEntry={!mostraSenha}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="senha"
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.passwordIcon}
        >
          <MaterialCommunityIcons
            name={mostraSenha ? "eye-off" : "eye"}
            size={30}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {errors.senha && (
        <Text style={styles.errorText}>{errors.senha.message}</Text>
      )}
      <Text style={styles.titleItemForm}>Celular</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputMask
            style={styles.input}
            type={"cel-phone"}
            options={{
              maskType: "BRL",
              withDDD: true,
              dddMask: "(99) ",
            }}
            maxLength={15}
            placeholder="Digite seu celular"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
        name="telefone"
      />
      {errors.telefone && (
        <Text style={styles.errorText}>{errors.telefone.message}</Text>
      )}
      <Text style={styles.titleItemForm}>Placa do Veiculo</Text>
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Digite a placa do veiculo"
            autoCapitalize="characters"
            onBlur={onBlur}
            onChangeText={onChange}
            maxLength={10}
            value={value}
            style={styles.input}
          />
        )}
        name="placa"
      />
      {errors.placa && (
        <Text style={styles.errorText}>{errors.placa.message}</Text>
      )}
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Text style={styles.errorText}>{mensagem}</Text>
          <ButtonCadastrar onPress={handleSubmit(cadastrar)} />
        </>
      )}
    </View>
  );
};

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
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Montserrat_400Regular",
    color: "red",
  },
});

export default CadastroCliente;
