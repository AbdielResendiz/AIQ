import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import { urlImg } from '../../api/controlWS'

const { width, height } = Dimensions.get('window')

//renderiza cada imagen obtenida de item
const CarouselItem = ({ item }) => {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={{ uri: urlImg + item.imagen}} />
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width - 20,
        height: height / 3,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5,
    },
    image: {
        width: width - 20,
        height: height / 3,
        resizeMode: 'contain',
        borderRadius: 12
    },
})

export default CarouselItem