import React from 'react';
import { View, Text, StyleSheet} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ButtonNew({ color, size }){
    return (
        <View style={styles.container}> 
            <MaterialCommunityIcons name="map-marker-radius-outline" color={color == '#0000FF' ? '#E5E5E5' : color} size={size * 2} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#fd7014',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.9,
        shadowRadius: 6,
        elevation: 4,
      }
  });