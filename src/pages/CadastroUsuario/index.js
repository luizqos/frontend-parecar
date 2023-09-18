import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import RadioGroup from "react-native-radio-buttons-group";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import usuarioService from "../../services/UsuarioService";
const { height } = Dimensions.get("screen");

export default function CadastroUsuario() {
  const navigation = useNavigation();
  const [mensagem, setMensagem] = useState(null);
  const [selectedId, setSelectedId] = useState("1");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [placa, setPlaca] = useState("");
  const [senha, setSenha] = useState("");
  const [mostraSenha, setMostraSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  function removeCaracteres(texto, tipoRetorno) {
    let textoConvertido = texto;
    if (tipoRetorno === "letrasENumeros") {
      textoConvertido = texto.replace(/[^a-zA-Z0-9]/g, "");
    } else if (tipoRetorno === "numeros") {
      textoConvertido = texto.replace(/[^0-9]/g, "");
    } else textoConvertido = null;
    return textoConvertido;
  }
  function cadastrar() {
    startLoading();
    let data = "";
    let endpoint = "";
    if (tipo.value === "C") {
      data = {
        nome: nome,
        cpf: removeCaracteres(cpf, "numeros"),
        email: email,
        senha: senha,
        telefone: removeCaracteres(telefone, "numeros"),
        placa: removeCaracteres(placa, "letrasENumeros"),
      };
      endpoint = "clientes";
    } else if (tipo.value === "E") {
      data = {
        nome: nome,
        cpf: removeCaracteres(cpf, "numeros"),
        email: email,
        senha: senha,
        telefone: removeCaracteres(telefone, "numeros"),
        placa: removeCaracteres(placa, "letrasENumeros"),
      };
      endpoint = "estacionamentos";
    }

    usuarioService
      .cadastro(data, endpoint)
      .then((response) => {
        if (response) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        } else {
          setLoading(false);
          setMensagem("Ocorreu um erro ao fazer cadastro");
          setTimeout(() => {
            setMensagem(null);
          }, 5000);
        }
      })
      .catch((error) => {
        Alert.alert("Erro", "Tente novamente.");
      });
  }
  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Cliente",
        value: "C",
      },
      {
        id: "2",
        label: "Estacionamento",
        value: "E",
      },
    ],
    []
  );
  const tipo = radioButtons.find((item) => item.id === selectedId);
  //console.log(tipo.value);

  const togglePasswordVisibility = () => {
    setMostraSenha(!mostraSenha);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerTipo}>
          <Text style={styles.title}>Crie seu acesso</Text>
          <Text style={styles.subtitle}>Selecione seu tipo de acesso</Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
            borderColor="red"
            layout="row"
          />
        </View>

        <View style={styles.containerForm}>
          {selectedId === "1" ? (
            <View style={styles.containerCliente}>
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
              <Text style={styles.errorText}>{mensagem}</Text>
              {loading ? (
                <>
                  <Text style={styles.loading}>Aguarde...</Text>
                  <ActivityIndicator size="large" color="#FFBE00" />
                </>
              ) : (
                <>
                  <TouchableOpacity style={styles.button} onPress={cadastrar}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ) : (
            <View style={styles.containerEstacionamento}>
              <Text style={styles.titleItemForm}>Responsável</Text>
              <TextInput
                placeholder="Digite o Nome do Responsável"
                autoCapitalize="characters"
                style={styles.input}
              />
              <Text style={styles.titleItemForm}>Razão Social</Text>
              <TextInput
                placeholder="Digite a Razão Social"
                autoCapitalize="characters"
                style={styles.input}
              />
              <Text style={styles.titleItemForm}>Nome Fantasia</Text>
              <TextInput
                placeholder="Digite o Nome Fantasia"
                autoCapitalize="characters"
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
                style={styles.input}
              />
              <Text style={styles.titleItemForm}>Numero</Text>
              <TextInput
                placeholder="Digite o Número"
                autoCapitalize="characters"
                style={styles.input}
              />
              <Text style={styles.titleItemForm}>Complemento</Text>
              <TextInput
                placeholder="Digite o Complemento"
                autoCapitalize="characters"
                style={styles.input}
              />
              <Text style={styles.titleItemForm}>Bairro</Text>
              <TextInput
                placeholder="Digite o Bairro"
                autoCapitalize="characters"
                style={styles.input}
              />
              <Text style={styles.titleItemForm}>Cidade</Text>
              <TextInput
                placeholder="Digite a Cidade"
                autoCapitalize="characters"
                style={styles.input}
              />
              <Text style={styles.titleItemForm}>Estado</Text>
              <TextInput
                placeholder="Digite o Estado"
                autoCapitalize="characters"
                style={styles.input}
              />
              <Text style={styles.errorText}>{mensagem}</Text>
              {loading ? (
                <>
                  <Text style={styles.loading}>Aguarde...</Text>
                  <ActivityIndicator size="large" color="#FFBE00" />
                </>
              ) : (
                <>
                  <TouchableOpacity style={styles.button} onPress={cadastrar}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE00",
  },
  containerCliente: {
    height: height / 1.3,
  },
  containerEstacionamento: {
    height: height * 1.1,
  },
  radioButton: {
    marginBottom: 10,
    marginLeft: 15,
    tintColor: "red",
    fontFamily: "Montserrat_400Regular",
  },
  containerTipo: {
    flex: 1,
    marginTop: "2%",
    marginBottom: "2%",
    paddingStart: "3%",
  },
  containerForm: {
    flex: 2,
    backgroundColor: "#E5E5E5",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  message: {
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
    color: "black",
  },
  title: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    padding: 5,
    marginTop: 16,
  },
  titleItemForm: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    padding: 3,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    padding: 2,
    marginTop: 8,
    position: "relative",
  },
  button: {
    backgroundColor: "#FFBE00",
    borderRadius: 50,
    paddingVertical: 8,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Montserrat_700Bold",
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
  loading: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
  },
});
