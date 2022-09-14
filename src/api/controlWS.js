import axios from "axios";
export const urlImg = 'https://v-csoft.com/AIQ/static/img/'
const source = axios.CancelToken.source();
const baseUrl = 'https://v-csoft.com/AIQ';
const urlRes = `${baseUrl}/MovilR/getRestaurantes`;
const urlAD = `${baseUrl}/MovilR/getPublicidad`;
const urlCreaCart = `${baseUrl}/Carrito/createCart/`;

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
  const urlMenu = `${baseUrl}/MovilR/getMenu/${idRest}`
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
  const urlCombos = `${baseUrl}/MovilR/getCombos/${idRest}`

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
  const urlPlatillos = `${baseUrl}/MovilR/getComidas/${idRest}`

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
  const urlBebidas = `${baseUrl}/MovilR/getBebidas/${idRest}`

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

export const creaCarrito = async (idMesa) => {
  const datoMesa = idMesa;
  const urlIdmesa = `${urlCreaCart}/${datoMesa}`;
  try{
    const response = await axios.get(urlIdmesa, {cancelToken: source.token});
    if (response.status === 200) {
      console.log(response.data)
      return response.data;
    } else {
      throw new Error("Fallo en fetch data")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion creaCarrito', error)
    }
  }

}
