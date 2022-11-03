import { Alert } from "react-native";

//funcion para regresar al inicio despues de cierto tiempo, enviar siempre 
//props para navegacion en backTime
export function backTime (props) {
    timerId = setTimeout(() => {
      console.log("regresar InicioAds")
      Alert.alert(
        '¡Hola!',
        '¿Necesitas más tiempo de navegación?',
        [
          {
            text: 'Si',
            onPress: () => {
              clearTimeout(backID)
              backTime(props)
              console.log('me quedo')
            },
          },
          {
            text: 'No, ir a inicio',
            onPress: () => {
              clearTimeout(backID)
              console.log('en inicio')
            },
            style: 'cancel',
          },
        ],
        { cancelable: false,}
      );
      backID = setTimeout(() => {
        Alert,alert(
          '¡Bienvenido!'
        )
        clearTimeout(timerId)
        props.navigation.navigate("InicioAds");
      }, 10000)
    }, 60000);
  }

  //corta tiempo de la funcion backTime
  export function cortaTimer() {
    clearTimeout(timerId)
  }