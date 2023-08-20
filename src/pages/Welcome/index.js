import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

import * as Animatable from 'react-native-animatable'
import { useNavigation } from "@react-navigation/native";
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat'

export default function Welcome() {
    const [fonteLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_700Bold
    });

    if( !fonteLoaded ){
        return null;
    }

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../assets/img/logo.png')}
                    style={{ width: '75%' }}
                    resizeMode="contain"
                />
            </View>


            <Animatable.View delay={500} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>PareCar: Sua Solução Inteligente para Estacionar sem Complicações!</Text>
                <Text style={styles.textLogin}>
                    Faça o login para começar
                </Text>

                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Acessar</Text>
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
    containerLogo: {
        flex: 2,
        backgroundColor: '#FFBE00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 20,
        fontFamily: 'Montserrat_700Bold',
        marginTop: 28,
        marginBottom: 12
    },
    textLogin: {
        fontFamily: 'Montserrat_400Regular',
        color: 'black'
    },
    button: {
        position: 'absolute',
        backgroundColor: '#FFBE00',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Montserrat_700Bold'
    }
})