import axios from "axios";

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