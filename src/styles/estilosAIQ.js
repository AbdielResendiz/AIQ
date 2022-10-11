import { StyleSheet, Dimensions } from "react-native";
import coloresAIQ from "./coloresAIQ";

const { width, height } = Dimensions.get('window');

const estilosAIQ = StyleSheet.create({
    textCategoriasSelect: {
      color: coloresAIQ.azulOscuroAIQ,
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
    containerBtn: {
      
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },
    botonTouch: {
      backgroundColor: coloresAIQ.azulAIQ,
      margin: 20,
      textAlign: 'center',
      padding:24,
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
    textUps: {
      color: coloresAIQ.naranjaOscuroFood,
      fontSize: 20,
      fontWeight: 'normal',
      textAlign: 'center',
    },
    containerLoader: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      paddingTop: 30,
      backgroundColor: coloresAIQ.azulAIQ,
      padding: 8,
    },
    imagenMenu: {                             
      resizeMode: "stretch",
      justifyContent: "center",
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      width: (height / 6.8)*1.75,
      height: height / 6.8
    },
    imagenPedido: {                             
      resizeMode: "stretch",
      justifyContent: "center",
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      width: 200,
      height: 200
    },
    logo: {
      resizeMode: "center", justifyContent: "center",
      width: width / 2.5, height: width / 2.5,
      alignItems: "center", borderRadius: 12,
    },
    boxAds: {    
      width: width - 180,
      height: (width - 180)*0.5825,
      marginRight: 16,
      borderColor: coloresAIQ.azulOscuroAIQ,
      borderWidth: 2,
      borderRadius: 5
    },
    imagenAnuncios: {
      flex: 1,
      resizeMode: 'contain',
      borderRadius: 5,
      width: null,
      height: null,
    },
    boxRest: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    titulosProducto: {
      fontSize:24,
      fontWeight: 'bold',
      color: coloresAIQ.negro
    },
    btnCantidadProd: {
      borderRadius:0,
      width: 64,
      height: 64
    },
    input: {
      padding: 14,
      borderWidth: 1.5, 
      borderColor: coloresAIQ.grisOscuroAIQ,
      borderRadius: 8,
      backgroundColor: coloresAIQ.blanco,
      fontSize: 16,
    }
})

export default estilosAIQ