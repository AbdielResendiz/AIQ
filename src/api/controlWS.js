import axios from "axios";
export const urlImg = 'https://appaiq.com/static/img/';
const source = axios.CancelToken.source();
const baseUrl = 'https://appaiq.com';
const urlRes = `${baseUrl}/MovilR/getRestaurantes/`;
const urlAD = `${baseUrl}/MovilR/getPublicidad`;
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

//obtiene todos los negocios
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

//obtiene todo el catalogo de cualquier negocio
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

// traemos todo el arreglo de combos de cada restaurante
export const getCombos = async (idRes) => {
  const idRest = idRes;
  const urlCombos = `${baseUrl}/MovilR/getCombos/${idRest}`

  try{
    const response = await axios.get(urlCombos, {cancelToken: source.token});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fallo en fetch array combos")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion getCombos', error)
    }
  }
}

// traemos todo el arreglo de comidas de cada restaurante
export const getComidas = async (idRes) => {

  const idRest = idRes;
  const urlPlatillos = `${baseUrl}/MovilR/getComidas/${idRest}`

  try{
    const response = await axios.get(urlPlatillos, {cancelToken: source.token});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fallo en fetch array comidas")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion comidas', error)
    }
  }
}

// traemos todo el arreglo de bebidas de cada restaurante
export const getBebidas = async (idRes) => {

  const idRest = idRes;
  const urlBebidas = `${baseUrl}/MovilR/getBebidas/${idRest}`;

  try{
    const response = await axios.get(urlBebidas, {cancelToken: source.token});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fallo en fetch array bebidas")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion getBebidas', error)
    }
  }
}

// traemos todo el arreglo de productos de cada local
export const getProductos = async (idRes) => {

  const idRest = idRes;
  const urlProductos = `${baseUrl}/MovilR/getProductos/${idRest}`;

  try{
    const response = await axios.get(urlProductos, {cancelToken: source.token});
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Fallo en fetch array getproductos")
    }
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('Data fetching cancelado')
    } else {
      console.log('algo pago en funcion getproductos', error)
    }
  }
}

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

//devuelve los articulos del carrito actual x cuenta
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

//elimina articulo especifico de carrito
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

//elimina todos los articulos del carrito
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

// devuelve el total del carrito actual
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

//valida si el codigo ingresado existe
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

//envia datos para crear pedido
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

//recibe un codigo y lo inserta en la DB
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

//Elimina codigo de la DB despues de utilizar en la DB
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

//envia whats con el codigo generado
export const enviaMensaje = async(celular, codigo, alias) => {
  let data = new FormData();
  data.append('numero', celular);
  data.append('tipo', 'cliente');
  data.append('nombre', alias);
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

//envias confirmacions si el pedido fue rechazado o aceptado
export const enviaConfirmacion = async(celular, alias, idPedido, restaurante, total) => {
  let data = new FormData();
  //total sera 0 en caso de ser rechazado el pedido
  if(total == 0) {
    data.append('numero', celular);
    data.append('tipo', 'pRechazado');
    data.append('nombre', alias);
    data.append('idPedido', idPedido);
    data.append('')
  } else {
    data.append('numero', celular);
    data.append('tipo', 'pAceptado');
    data.append('nombre', alias);
    data.append('idPedido', idPedido);
    data.append('restaurante', restaurante);
    data.append('total', total);
  }
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

//se obtiene el id del carrito actual x cuenta
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

//obtiene el id del pedido generado en la ultima compra
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
