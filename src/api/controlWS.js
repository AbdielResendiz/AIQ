import axios from "axios";
import ProcesandoAir from "../screens/components/ProcesandoAir";
export const urlImg = 'https://v-csoft.com/AIQ/static/img/'
const source = axios.CancelToken.source();
const baseUrl = 'https://v-csoft.com/AIQ/MovilR';
const urlRes = `${baseUrl}/getRestaurantes`;
const urlAD = `${baseUrl}/getPublicidad`;

export const getRestaurantes = async() => {
  try{
    const response = await axios.get(urlRes, {cancelToken: source.token});
    if (response.status === 200) {
      return (response.data);
    } else {
      throw new Error("Fallo en fetch array restaurantes")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion getRestaurantes', error)
    }
  }
}

export const getPublicidad = async () => {
  try{
    const response = await axios.get(urlAD, {cancelToken: source.token});
    if (response.status === 200) {
      return response.data.Publicidad;
    } else {
      throw new Error("Fallo en fetch array anuncio")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion getPublicidad', error)
    }
  }
}

export const getMenu = async (idRes) => {
  const idRest = idRes;
  const urlMenu = `${baseUrl}/getMenu/${idRest}`
  try{
    const response = await axios.get(urlMenu, {cancelToken: source.token});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fallo en fetch array restaurantes")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion getMenu', error)
    }
  }
}
  // traemos todo el arreeglo de comidas de cada restaurante
export const getCombos = async (idRes) => {
  const idRest = idRes;
  const urlCombos = `${baseUrl}/getCombos/${idRest}`

  try{
    const response = await axios.get(urlCombos, {cancelToken: source.token});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fallo en fetch array restaurantes")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion getMenu', error)
    }
  }
}


export const getComidas = async (idRes) => {

  const idRest = idRes;
  const urlPlatillos = `${baseUrl}/getComidas/${idRest}`

  try{
    const response = await axios.get(urlPlatillos, {cancelToken: source.token});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fallo en fetch array restaurantes")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion getMenu', error)
    }
  }
}

export const getBebidas = async (idRes) => {

  const idRest = idRes;
  const urlBebidas = `${baseUrl}/getBebidas/${idRest}`

  try{
    const response = await axios.get(urlBebidas, {cancelToken: source.token});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fallo en fetch array restaurantes")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion getMenu', error)
    }
  }
}
