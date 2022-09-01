import React from 'react';
import { TouchableOpacity, Text, View} from 'react-native';
import estilosAIQ from '../../styles/estilosAIQ';
import coloresAIQ from '../../styles/coloresAIQ';

const InicioAds = (props) => {
  return (
    <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: coloresAIQ.amarilloFood
    }}>
        <TouchableOpacity 
            style={estilosAIQ.botonTouch}
            onPress={() => {props.navigation.navigate('GeneralTab')}}>
            <Text style={estilosAIQ.textBtn}>Ver restaurantes</Text>
        </TouchableOpacity>
    </View>
  )
}

export default InicioAds