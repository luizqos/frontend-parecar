import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { useForm } from "react-hook-form";
import Loading from "../../components/Loading";
import ButtonCadastrar from "../../components/buttons/ButtonCadastrar";
import TipoAcesso from "../../components/screens/TipoAcesso";
import CadastroCliente from "../../components/screens/CadastroCliente";
import CadastroEstacionamento from "../../components/screens/CadastroEstacionamento";
import { useNavigation } from "@react-navigation/native";
import usuarioService from "../../services/UsuarioService";
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
  const [loading, setLoading] = useState(false);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      selectedId === "1" ? schemaCliente : schemaEstacionamento
    ),
  });
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
              <CadastroCliente control={control} errors={errors} />
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
              <Text style={styles.errorText}>{mensagem}</Text>
            </View>
          ) : (
            <View style={styles.containerCadastro}>
              <CadastroEstacionamento
                control={control}
                errors={errors}
                setValue={setValue}
              />
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
  containerForm: {
    flex: 2,
    backgroundColor: "#E5E5E5",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  errorText: {
    fontSize: 14,
    textAlign: "left",
    fontFamily: "Montserrat_400Regular",
    color: "red",
  },
});
