import React, { useMemo, useState } from "react";
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

const CadastroEstacionamento = ({ control, errors, setValue }) => {
  const [mostraSenha, setMostraSenha] = useState(false);
  const [campoFocado, setCampoFocado] = useState(null);
  const togglePasswordVisibility = () => {
    setMostraSenha(!mostraSenha);
  };

  const buscaEndereco = (cepValue) => {
    const cep = cepValue.replace(/\D/g, "");
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setValue("endereco", data.logradouro.toUpperCase());
            setValue("bairro", data.bairro.toUpperCase());
            setValue("cidade", data.localidade.toUpperCase());
            setValue("estado", data.uf.toUpperCase());
            setValue("complemento", data.complemento);
            setCampoFocado("numero");
          }
        });
    }
  };

  return (
    <View>
      <Text style={styles.titleItemForm}>Responsável</Text>
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Digite o Nome do Responsável"
            autoCapitalize="characters"
            onBlur={onBlur}
            onChangeText={onChange}
            maxLength={100}
            value={value}
            style={styles.input}
          />
        )}
        name="nomeResponsavel"
      />
      {errors.nomeResponsavel && (
        <Text style={styles.errorText}>{errors.nomeResponsavel.message}</Text>
      )}
      <Text style={styles.titleItemForm}>Razão Social</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Digite a Razão Social"
            autoCapitalize="characters"
            onBlur={onBlur}
            onChangeText={onChange}
            maxLength={100}
            value={value}
            style={styles.input}
          />
        )}
        name="razaoSocial"
      />
      {errors.razaoSocial && (
        <Text style={styles.errorText}>{errors.razaoSocial.message}</Text>
      )}
      <Text style={styles.titleItemForm}>Nome Fantasia</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Digite o Nome Fantasia"
            autoCapitalize="characters"
            onBlur={onBlur}
            onChangeText={onChange}
            maxLength={100}
            value={value}
            style={styles.input}
          />
        )}
        name="nomeFantasia"
      />
      {errors.nomeFantasia && (
        <Text style={styles.errorText}>{errors.nomeFantasia.message}</Text>
      )}
      <Text style={styles.titleItemForm}>Cnpj</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputMask
            style={styles.input}
            type={"cnpj"}
            placeholder={"Digite o CNPJ"}
            onBlur={onBlur}
            onChangeText={onChange}
            maxLength={18}
            value={value}
          />
        )}
        name="cnpj"
      />
      {errors.cnpj && (
        <Text style={styles.errorText}>{errors.cnpj.message}</Text>
      )}
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
      <Text style={styles.titleItemForm}>Cep</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputMask
            style={styles.input}
            type={"zip-code"}
            placeholder="Digite o CEP"
            maxLength={9}
            value={value}
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(text);
              buscaEndereco(text);
            }}
          />
        )}
        name="cep"
      />
      {errors.cep && <Text style={styles.errorText}>{errors.cep.message}</Text>}
      <Text style={styles.titleItemForm}>Endereço</Text>
      <Controller
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite o endereço"
            autoCapitalize="characters"
            maxLength={100}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="endereco"
      />
      {errors.endereco && (
        <Text style={styles.errorText}>{errors.endereco.message}</Text>
      )}
      <Text style={styles.titleItemForm}>Numero</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite o Número"
            autoCapitalize="characters"
            maxLength={6}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            ref={(input) => {
              if (campoFocado === "numero" && input) {
                input.focus();
              }
            }}
          />
        )}
        name="numero"
      />
      {errors.numero && (
        <Text style={styles.errorText}>{errors.numero.message}</Text>
      )}
      <Text style={styles.titleItemForm}>Complemento</Text>
      <Controller
        control={control}
        setValue={setValue}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite o Complemento"
            autoCapitalize="characters"
            maxLength={30}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="complemento"
      />
      {errors.complemento && (
        <Text style={styles.errorText}>{errors.complemento.message}</Text>
      )}
      <Text style={styles.titleItemForm}>Bairro</Text>
      <Controller
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite o Bairro"
            autoCapitalize="characters"
            maxLength={30}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="bairro"
      />
      {errors.bairro && (
        <Text style={styles.errorText}>{errors.bairro.message}</Text>
      )}
      <Text style={styles.titleItemForm}>Cidade</Text>
      <Controller
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite a Cidade"
            autoCapitalize="characters"
            maxLength={30}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="cidade"
      />
      {errors.cidade && (
        <Text style={styles.errorText}>{errors.cidade.message}</Text>
      )}
      <Text style={styles.titleItemForm}>Estado</Text>
      <Controller
        control={control}
        setValue={setValue}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite o Estado"
            autoCapitalize="characters"
            maxLength={2}
            minLength={2}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="estado"
      />
      {errors.estado && (
        <Text style={styles.errorText}>{errors.estado.message}</Text>
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

export default CadastroEstacionamento;
