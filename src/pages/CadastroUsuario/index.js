import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import Loading from "../../components/Loading";
import ButtonCadastrar from "../../components/buttons/ButtonCadastrar";
import TipoAcesso from "../../components/screens/TipoAcesso";
import CadastroCliente from "../../components/screens/CadastroCliente";
import CadastroEstacionamento from "../../components/screens/CadastroEstacionamento";
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
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
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
        nomecontato: nomeResponsavel,
        razaosocial: razaoSocial,
        nomefantasia: nomeFantasia,
        cnpj: removeCaracteres(cnpj, "numeros"),
        email: email,
        senha: senha,
        telefone: removeCaracteres(telefone, "numeros"),
        cep: removeCaracteres(cep, "letrasENumeros"),
        logradouro: endereco,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
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

  const togglePasswordVisibility = () => {
    setMostraSenha(!mostraSenha);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TipoAcesso
          radioButtons={radioButtons}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <View style={styles.containerForm}>
          {selectedId === "1" ? (
            <View style={styles.containerCliente}>
              <CadastroCliente
                nome={nome}
                cpf={cpf}
                email={email}
                senha={senha}
                mostraSenha={mostraSenha}
                telefone={telefone}
                placa={placa}
                setNome={setNome}
                setCpf={setCpf}
                setEmail={setEmail}
                setSenha={setSenha}
                setMostraSenha={setMostraSenha}
                setTelefone={setTelefone}
                setPlaca={setPlaca}
                togglePasswordVisibility={togglePasswordVisibility}
              />
              <Text style={styles.errorText}>{mensagem}</Text>
              {loading ? (
                <>
                  <Loading />
                </>
              ) : (
                <>
                  <ButtonCadastrar onPress={cadastrar} />
                </>
              )}
            </View>
          ) : (
            <View style={styles.containerEstacionamento}>
              <CadastroEstacionamento
                cnpj={cnpj}
                setCnpj={setCnpj}
                email={email}
                setEmail={setEmail}
                senha={senha}
                setSenha={setSenha}
                mostraSenha={mostraSenha}
                togglePasswordVisibility={togglePasswordVisibility}
                telefone={telefone}
                setTelefone={setTelefone}
                cep={cep}
                setCep={setCep}
                nomeResponsavel={nomeResponsavel}
                setNomeResponsavel={setNomeResponsavel}
                nomeFantasia={nomeFantasia}
                setNomeFantasia={setNomeFantasia}
                razaoSocial={razaoSocial}
                setRazaoSocial={setRazaoSocial}
                endereco={endereco}
                setEndereco={setEndereco}
                numero={numero}
                setNumero={setNumero}
                complemento={complemento}
                setComplemento={setComplemento}
                bairro={bairro}
                setBairro={setBairro}
                cidade={cidade}
                setCidade={setCidade}
                estado={estado}
                setEstado={setEstado}
              />
              <Text style={styles.errorText}>{mensagem}</Text>
              {loading ? (
                <>
                  <Loading />
                </>
              ) : (
                <>
                  <ButtonCadastrar onPress={cadastrar} />
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
    height: height * 1.15,
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
});
