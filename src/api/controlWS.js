import axios from "axios";
export const urlImg = 'https://v-csoft.com/AIQ/static/img/';
const source = axios.CancelToken.source();
const baseUrl = 'https://v-csoft.com/AIQ';
const urlRes = `${baseUrl}/MovilR/getRestaurantes/`;
const urlAD = `${baseUrl}/MovilR/getPublicidad`;
//const urlCreaCart = `${baseUrl}/Carrito/createCart/`;
const urlAddCart = `${baseUrl}/Carrito/addCart/`;
const urlGetCart = `${baseUrl}/Carrito/getCart/`;
const urlIdGetCart = `${baseUrl}/Carrito/getIdCart/`;
const urlDeleteItem = `${baseUrl}/Carrito/deteleItemCart/`;
const urlDeleteCart = `${baseUrl}/Carrito/borraCarrito/`
const urlGetTotalCart = `${baseUrl}/Carrito/getTotalCart/`;
const urlGetCodigo = `${baseUrl}/Carrito/validaCodigo/`;
const urlCreaPedido = `${baseUrl}/Pedidos/creaPedido/`;
const urlInsertCode = `${baseUrl}/Pedidos/insertCod`;
const urlDeleteCode = `${baseUrl}/Pedidos/deleteCod`;
const urlEnviaMensaje = `${baseUrl}/MensajesW/sendTextMessage`;
const urlGetPedido = `${baseUrl}/Pedidos/getPedido/`
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getRestaurantes = async(zona) => {
  const urlRestaurente = `${urlRes}${zona}`
  try{
    const response = await axios.get(urlRestaurente, {cancelToken: source.token});
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

// traemos todo el arreglo de comidas de cada restaurante
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
  const urlBebidas = `${baseUrl}/MovilR/getBebidas/${idRest}`;

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

// funcion crea carrito, solo referencia, remplazado por addCart
// export const creaCarrito = async (idMesa) => {
//   const datoMesa = idMesa;
//   const urlIdmesa = `${urlCreaCart}/${datoMesa}`;
//   try{
//     const response = await axios.get(urlIdmesa, {cancelToken: source.token});
//     if (response.status === 200) {
//       console.log(response.data)
//       return response.data;
//     } else {
//       throw new Error("Fallo en fetch data")
//     }
//   } catch (error) {
//     if(axios.isCancel(error)) {
//       console.log('Data fetching cancelado')
//     } else {
//       console.log('algo pago en funcion creaCarrito', error)
//     }
//   }
// }

//agrega productos en carrito y en caso necesario crea nuevo carrito
export const addCarrito = async (idMesa, idComida, cantP, subtotal, comentario) => {
  let data = new FormData();
  data.append('id_mesa', idMesa);
  data.append('id_comida', idComida);
  data.append('cantidad', cantP);
  data.append('subtotal', subtotal);
  data.append('comentario', comentario);
  await fetch(urlAddCart, {
    method: 'POST',
    body: data,
  })
  .then((response) => response.json())
  .then((result) => {
    let acceso = result.res
    try{
      if (acceso === true) {
        console.log('Success:', result);
      } else {
        console.log('Success:', result);
      }
    } catch (e) {
      console.log("esto no sirve", e);
    }
  }) 
}

export const getCart = async (idMesa) => {
  const mesa = idMesa;
  const urlGetCarrito = `${urlGetCart}${mesa}`;
  try{
    const response = await axios.get(urlGetCarrito, {cancelToken: source.token});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fallo en fetch array carrito")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado', error)
    } else {
      console.log('algo pago en funcion getCart', error)
    }
  }
}

export const deteleItemCart = async(idMesa, idComida) => {
  let data = new FormData();
  data.append('id_mesa', idMesa);
  data.append('id_comida', idComida);
  await fetch(urlDeleteItem, {
    method: 'POST',
    body: data,
  })
  .then((response) => {response.json()})
  .then((result) => {
    let acceso = result
    try{
      if (acceso === true) {
        console.log('Success:', result);
      } else {
        console.log('Error:', result);
      }
    } catch (e) {
      console.log("esto no sirve", e);
    }
  }) 
}

export const deleteCart = async() => {
  const m = await AsyncStorage.getItem('ID_MESA');
  const mesa = JSON.parse(m);
  let data = new FormData();
  data.append('id_mesa', mesa);
  await fetch(urlDeleteCart, {
    method: 'POST',
    body: data,
  });
}

export const getTotalCart = async (idMesa) => {
  const mesa = idMesa;
  const urlTotal = `${urlGetTotalCart}${mesa}`;

  try{
    const response = await axios.get(urlTotal, {cancelToken: source.token});
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

export const getCodigo = async(cod) => {
  const codi = cod;
  const urlCodigo = `${urlGetCodigo}${codi}`;
  try{
    const response = await axios.get(urlCodigo, {cancelToken: source.token});
    if (response.status === 200) {
      console.log(response.data.res)
      return response.data.res;
    } else {
      throw new Error("Fallo en fetch get codigo")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion getCodigo', error)
    }
  }
}

export const creaPedido = async(idMesa, nombre, cel, total, rest, metodo, idCarrito, cambio) => {
  let data = new FormData();
  data.append('id_mesa', idMesa);
  data.append('nombre_alias', nombre);
  data.append('telefono', cel);
  data.append('total', total);
  data.append('id_user', rest);
  data.append('metodo', metodo);
  data.append('id_carrito', idCarrito);
  data.append('cambio', cambio);
  await fetch(urlCreaPedido, {
    method: 'POST',
    body: data,
  })
}

export const insertCode = async(codigo) => {
  let data = new FormData();
  data.append('codigo', codigo);
  await fetch(urlInsertCode, {
    method: 'POST',
    body: data,
  }).then((response) => response.json())
  .then((result) => {
    let acceso = result.res
    try{
      if (acceso === true) {
        console.log('Success:', result);
      } else {
        console.log('Error:', result);
      }
    } catch (e) {
      console.log("esto no sirve", e);
    }
  })
}

export const deleteCode = async(codigo) => {
  let data = new FormData();
  data.append('codigo', codigo);
  await fetch(urlDeleteCode, {
    method: 'POST',
    body: data,
  }).then((response) => response.json())
  .then((result) => {
    let acceso = result.res
    try{
      if (acceso === true) {
        console.log('Success:', result);
      } else {
        console.log('Error:', result);
      }
    } catch (e) {
      console.log("esto no sirve", e);
    }
  })
}

export const enviaMensaje = async(celular, codigo, alias) => {
  let data = new FormData();
  data.append('numero', celular);
  data.append('tipo', 'cliente');
  data.append('mensaje', `Hola ${alias}. 
Tu código es *${codigo}* 
Disfruta tu pedido :)`)
  data.append('codigo', codigo);
  await fetch(urlEnviaMensaje, {
    method: 'POST',
    body: data,
  })
  .then((response) => response.json())
  .then((result) => {
    try{
      if (result === true) {
        console.log('Success:', result);
      } else {
        console.log('Error:', result);
      }
    } catch (e) {
      console.log("esto no sirve", e);
    }
  })
}

export const getIdCart = async(idMesa) => {
  const mesa = idMesa;
  const urlTotal = `${urlIdGetCart}${mesa}`;

  try{
    const response = await axios.get(urlTotal, {cancelToken: source.token});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fallo en fetch idCart")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion getIdCart', error)
    }
  }  
}

export const getIdPedido = async(idCart) => {
  const urlPedido = `${urlGetPedido}${idCart}`;

  try{
    const response = await axios.get(urlPedido, {cancelToken: source.token});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fallo en fetch getIdpedido")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion getIdpedido', error)
    }
  }  
}
