import { Alert } from "react-native";

//funcion para regresar al inicio despues de cierto tiempo, enviar siempre 
//props para navegacion en backTime
export function backTime (props) {
    timerId = setTimeout(() => {
      console.log("regresar InicioAds")
      
      backID = setTimeout(() => {

        clearTimeout(timerId)

      }, 15000)
    }, 80000);
  }
  //corta tiempo de la funcion backTime
  export function cortaTimer() {
    clearTimeout(timerId)
  }