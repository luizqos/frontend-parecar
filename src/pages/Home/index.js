import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

import * as Animatable from 'react-native-animatable'
import { useNavigation } from "@react-navigation/native";


export default function Home() {
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
            <Text style={styles.title}>Pagina Home</Text>
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
        backgroundColor: '#E5E5E5',
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