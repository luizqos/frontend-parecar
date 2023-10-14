import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useForm, Controller } from "react-hook-form";
import Loading from "../../components/Loading";
import ButtonCadastrar from "../../components/buttons/ButtonCadastrar";
import TipoAcesso from "../../components/screens/TipoAcesso";
import CadastroCliente from "../../components/screens/CadastroCliente";
import CadastroEstacionamento from "../../components/screens/CadastroEstacionamento";
import { useNavigation } from "@react-navigation/native";
import usuarioService from "../../services/UsuarioService";
import { TextInputMask } from "react-native-masked-text";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { cpf, cnpj } from "cpf-cnpj-validator";
const { height } = Dimensions.get("screen");
const schemaCliente = yup.object().shape({
  nome: yup
    .string()
    .required("Nome é obrigatório.")
    .matches(/^[A-Za-zÀ-ú\s']+$/, "Nome deve conter apenas letras")
    .test("nome-completo", "Informe o nome completo", (value) => {
      const nomes = value.trim().split(" ");
      return nomes.length >= 2;
    })
    .min(3, "Nome deve conter no mínimo 3 letras")
    .max(50, "Nome deve conter no maximo 50 letras"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .test("cpf-valido", "CPF inválido", (value) => {
      if (cpf.isValid(value)) {
        return true;
      } else {
        return false;
      }
    }),
  email: yup
    .string()
    .email("Digite um email válido")
    .required("Email é obrigatório"),
  senha: yup
    .string()
    .required("Senha é obrigatória")
    .min(4, "Sua senha deve ter pelo menos 4 caracteres"),
  telefone: yup
    .string()
    .required("Celular é obrigatório")
    .test("is-phone", "Número Inválido", (value) => {
      const celularValido = /^\([1-9]{2}\) 9[0-9]{4}-[0-9]{4}$/;
      if (celularValido.test(value)) {
        return true;
      } else {
        return false;
      }
    }),
  placa: yup.string(),
});
const schemaEstacionamento = yup.object().shape({
  nomeResponsavel: yup.string(),
  razaoSocial: yup.string().required("Razão Social é Obrigatório"),
  nomeFantasia: yup.string().required("Nome Fantasia é Obrigatório"),
  cnpj: yup
    .string()
    .required("CNPJ é obrigatório")
    .test("cnpj-valido", "CNPJ inválido", (value) => {
      if (cnpj.isValid(value)) {
        return true;
      } else {
        return false;
      }
    }),
  email: yup
    .string()
    .email("Digite um email válido")
    .required("Email é obrigatório"),
  senha: yup
    .string()
    .required("Senha é obrigatória")
    .min(4, "Sua senha deve ter pelo menos 4 caracteres"),
  telefone: yup
    .string()
    .required("Celular é obrigatório")
    .test("is-phone", "Número Inválido", (value) => {
      const celularValido = /^\([1-9]{2}\) 9[0-9]{4}-[0-9]{4}$/;
      if (celularValido.test(value)) {
        return true;
      } else {
        return false;
      }
    }),
  cep: yup.string().required("Cep é obrigatório").min(9, "Cep Incompleto"),
  endereco: yup
    .string()
    .required("Endereço é obrigatório")
    .min(3, "Endereço Incompleto"),
  numero: yup.string().required("Número é obrigatório"),
  complemento: yup.string(),
  bairro: yup.string().required("Bairro é obrigatório"),
  cidade: yup.string().required("Cidade é obrigatória"),
  estado: yup
    .string()
    .uppercase()
    .length(2, "Digite a UF com 2 digitos")
    .matches(
      /^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/,
      "UF inválida"
    ),
});

export default function CadastroUsuario() {
  const navigation = useNavigation();
  const [mensagem, setMensagem] = useState(null);
  const [selectedId, setSelectedId] = useState("1");
  //const [cpf, setCpf] = useState("");
  //const [cnpj, setCnpj] = useState("");
  //const [telefone, setTelefone] = useState("");
  //const [cep, setCep] = useState("");
  //const [nome, setNome] = useState("");
  //const [nomeResponsavel, setNomeResponsavel] = useState("");
  //const [nomeFantasia, setNomeFantasia] = useState("");
  //const [razaoSocial, setRazaoSocial] = useState("");
  // const [endereco, setEndereco] = useState("");
  // const [numero, setNumero] = useState("");
  // const [complemento, setComplemento] = useState("");
  // const [bairro, setBairro] = useState("");
  // const [cidade, setCidade] = useState("");
  // const [estado, setEstado] = useState("");
  // const [email, setEmail] = useState("");
  // //const [placa, setPlaca] = useState("");
  //const [senha, setSenha] = useState("");
  const [mostraSenha, setMostraSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      selectedId === "1" ? schemaCliente : schemaEstacionamento
    ),
  });

  handleTextChange = (text) => {
    return text.replace(/[^a-zA-Z]/g, "");
  };

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

  const checkCep = (cepValue) => {
    const cep = cepValue._dispatchInstances.memoizedProps.value.replace(
      /\D/g,
      ""
    );
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setEndereco(data.logradouro.toUpperCase());
            setComplemento(data.complemento.toUpperCase());
            setBairro(data.bairro.toUpperCase());
            setCidade(data.localidade.toUpperCase());
            setEstado(data.uf.toUpperCase());
          }
        });
    }
  };

  function cadastrar(data) {
    startLoading();
    let endpoint = "";
    if (tipo.value === "C") {
      data = {
        nome: data.nome,
        cpf: removeCaracteres(data.cpf, "numeros"),
        email: data.email,
        senha: data.senha,
        telefone: removeCaracteres(data.telefone, "numeros"),
        placa: removeCaracteres(data.placa, "letrasENumeros"),
      };
      endpoint = "clientes";
    } else if (tipo.value === "E") {
      data = {
        nomecontato: data.nomeResponsavel,
        razaosocial: data.razaoSocial,
        nomefantasia: data.nomeFantasia,
        cnpj: removeCaracteres(data.cnpj, "numeros"),
        email: data.email,
        senha: data.senha,
        telefone: removeCaracteres(data.telefone, "numeros"),
        cep: removeCaracteres(data.cep, "letrasENumeros"),
        logradouro: data.endereco,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
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
        console.error("Erro", "Tente novamente.", error);
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
        <Animatable.View animation="fadeInLeft">
          <TipoAcesso
            radioButtons={radioButtons}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        </Animatable.View>
        <Animatable.View
          delay={500}
          animation="fadeInUp"
          style={styles.containerForm}
        >
          {selectedId === "1" ? (
            <View style={styles.containerCadastro}>
              <View>
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
                {errors.cpf && (
                  <Text style={styles.errorText}>{errors.cpf.message}</Text>
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
                  <Text style={styles.errorText}>
                    {errors.telefone.message}
                  </Text>
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
              </View>
              <Text style={styles.errorText}>{mensagem}</Text>
              {loading ? (
                <>
                  <Loading />
                </>
              ) : (
                <>
                  <ButtonCadastrar onPress={handleSubmit(cadastrar)} />
                </>
              )}
            </View>
          ) : (
            <View style={styles.containerCadastro}>
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
                  <Text style={styles.errorText}>
                    {errors.nomeResponsavel.message}
                  </Text>
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
                  <Text style={styles.errorText}>
                    {errors.razaoSocial.message}
                  </Text>
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
                  <Text style={styles.errorText}>
                    {errors.nomeFantasia.message}
                  </Text>
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
                  <Text style={styles.errorText}>
                    {errors.telefone.message}
                  </Text>
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
                      placeholder="Digite o Cep"
                      maxLength={9}
                      value={value}
                      onChangeText={onChange}
                      onBlur={(text) => {
                        onBlur(checkCep(text));
                      }}
                    />
                  )}
                  name="cep"
                />
                {errors.cep && (
                  <Text style={styles.errorText}>{errors.cep.message}</Text>
                )}
                <Text style={styles.titleItemForm}>Endereço</Text>
                <Controller
                  control={control}
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
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="endereco"
                />
                {errors.endereco && (
                  <Text style={styles.errorText}>
                    {errors.endereco.message}
                  </Text>
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
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="complemento"
                />
                {errors.complemento && (
                  <Text style={styles.errorText}>
                    {errors.complemento.message}
                  </Text>
                )}
                <Text style={styles.titleItemForm}>Bairro</Text>
                <Controller
                  control={control}
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
                      onChangeText={onChange}
                      value={value}
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
                      onChangeText={onChange}
                      value={value}
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
                      onChangeText={(text) => {
                        onChange(handleTextChange(text));
                      }}
                      value={value}
                    />
                  )}
                  name="estado"
                />
                {errors.estado && (
                  <Text style={styles.errorText}>{errors.estado.message}</Text>
                )}
                <Text style={styles.errorText}>{mensagem}</Text>
              </View>
              <Text style={styles.errorText}>{mensagem}</Text>
              {loading ? (
                <>
                  <Loading />
                </>
              ) : (
                <>
                  <ButtonCadastrar onPress={handleSubmit(cadastrar)} />
                </>
              )}
            </View>
          )}
        </Animatable.View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE00",
  },
  containerCadastro: {
    flex: 1,
    flexGrow: 1,
    minHeight: height * 0.8,
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
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    padding: 5,
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
