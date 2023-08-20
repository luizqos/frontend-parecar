import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

export default function Login() {
    const [fonteLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_700Bold
    });

    if( !fonteLoaded ){
        return null;
    }
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" style={styles.containerHeader}>
                <Text style={styles.message}>Bem Vindo(a)</Text>
            </Animatable.View>

            <Animatable.View delay={500} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput placeholder="Digite seu email"
                    style={styles.input}
                />
                <Text style={styles.title}>Senha</Text>
                <TextInput placeholder="Digite sua senha"
                    style={styles.input}
                />

                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Acessar</Text>
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
    }
})