import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";
import usuarioService from "../../services/UsuarioService";

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState(null)
    const navigation = useNavigation()

    function logar() {
        let data = {
            email,
            senha
        }

        usuarioService.login(data)
            .then((response) => {
                if (response) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Home" }]
                    });
                } else {
                    setMensagem('Acesso negado, verifique usuário e senha.')
                    setTimeout(() => {
                        setMensagem(null);
                      }, 5000)
                }
            })
            .catch((error) => {
                Alert.alert('Erro', 'Tente novamente.')
            })

    }
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" style={styles.containerHeader}>
                <Text style={styles.message}>Bem Vindo(a)</Text>
            </Animatable.View>

            <Animatable.View delay={500} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput placeholder="Digite seu email"
                           onChangeText={setEmail}
                           value={email}
                    style={styles.input}
                />
                <Text style={styles.title}>Senha</Text>
                <TextInput placeholder="Digite sua senha"
                           onChangeText={setSenha}
                           value={senha}
                    style={styles.input}
                />
                <Text style={styles.forgotText}>Esqueci a senha</Text>
                <Text style={styles.errorText}>{mensagem}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={logar}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonRegister}
                >
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFBE00'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 24,
        fontFamily: 'Montserrat_700Bold',
        color: 'black'
    },
    title: {
        fontSize: 20,
        fontFamily: 'Montserrat_400Regular',
        marginTop: 28
    },
    textLogin: {
        color: 'black'
    },
    button: {
        backgroundColor: '#FFBE00',
        borderRadius: 50,
        paddingVertical: 8,
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Montserrat_700Bold'
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        fontFamily: 'Montserrat_400Regular',
        marginBottom: 12,
        fontSize: 16
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText: {
        fontFamily: 'Montserrat_400Regular',
        color: 'black'
    },    
    forgotText: {
        fontSize: 14,
        textAlign: 'right',
        fontFamily: 'Montserrat_400Regular',
        color: 'black'
    },
    errorText: {
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'Montserrat_400Regular',
        color: 'red'
    }
})