import { StyleSheet } from "react-native";
import coloresAIQ from "./coloresAIQ";

const estilosAIQ = StyleSheet.create({
    textCategoriasSelect: {
      color: coloresAIQ.naranjaOscuroFood,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      textShadowColor: 'gray',
      textShadowOffset: {width: -0.5, height: 1},
      textShadowRadius: 1
    },
    textCategorias: {
      color: 'gray',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    containerCategorias: {
      marginTop: 12,
      marginHorizontal: 12,
      textAlign: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    botonTouch: {
      backgroundColor: coloresAIQ.naranjaOscuroFood,
      margin: 24,
      textAlign: 'center',
      padding:16,
      borderRadius: 24,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    textBtn: {
      color: coloresAIQ.blanco, 
      fontWeight: '600', 
      fontSize: 18
    },
    containerCategorias: {
      marginTop: 12,
      marginHorizontal: 12,
      textAlign: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    textUps: {
      color: coloresAIQ.naranjaOscuroFood,
      fontSize: 20,
      fontWeight: 'normal',
      textAlign: 'center',
    },
})

export default estilosAIQ