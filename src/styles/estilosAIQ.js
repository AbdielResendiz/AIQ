import { StyleSheet } from "react-native";
import coloresAIQ from "./coloresAIQ";

const estilosAIQ = StyleSheet.create({
    textCategoriasSelect: {
      color: coloresAIQ.azulAIQ,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      textShadowColor: 'gray',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 2
    },
    textCategorias: {
      color: 'gray',
      fontSize: 18,
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
    }
})

export default estilosAIQ