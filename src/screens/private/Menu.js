import React, {useState, useEffect, useCallback} from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, RefreshControl, BackHandler } from 'react-native';
import { Box, Center, Image, Text, Flex,View} from 'native-base';
import { FAB } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { getMenu, getRestaurantes, urlImg, getCombos, getComidas, getBebidas, deleteCart, getProductos, getCart} from '../../api/controlWS';
import { backTime, cortaTimer } from '../../api/backHome';
import coloresAIQ from '../../styles/coloresAIQ';
import estilosAIQ from '../../styles/estilosAIQ';
import LottieSinServ from '../components/Lotties/LottieSinServ';
import LottieSelect from '../components/Lotties/LottieSelect';
import ProcesandoAir from '../components/ProcesandoAir';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NombreBox, NombreBoxProd, TextBoxProd } from '../components/Textos';

//define tiempos
const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

const Menu = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [cargandoR, setCargandoR] = useState(true);
  const [categoria, setCategoria] = useState('Alimentos')
  
  //Datos restaurante
  const idRest = props.route.params.idRes
  const [arrRestaurantes, setArrRestaurantes] = useState([]);

  const [arrCombos, setArrCombos] = useState([]);
  const [arrPlatillos, setPlatillos] = useState([]);
  const [arrBebidas, setBebidas] = useState([]);
  const [arrProductos, setProductos] = useState([]);
  //Datos menu
  const [arrAlimentos, setArrAlimentos] = useState([]);
  //valida si hay productos en carrito
  const [carrito, setCarrito] = useState([])
  //refresh menu
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      datosMenu();
      setRefreshing(false)});
  }, []);
  
  //obtener menu desde ws, c = combo, p = platillo, b = bebida, a = articulo
  const datosMenu = async() => {
    const menu = await getMenu(idRest);
    setArrAlimentos(menu);
    const mesa = await AsyncStorage.getItem('ID_MESA');
    const cart = await getCart(JSON.parse(mesa));
    setCarrito(cart);
    const zona = await AsyncStorage.getItem('ID_ZONA');
    const restaurante = await getRestaurantes(JSON.parse(zona));
    setArrRestaurantes(restaurante);
    const c = await getCombos(idRest);
    setArrCombos(c);
    const p = await getComidas(idRest);
    setPlatillos(p)
    const b = await getBebidas(idRest);
    setBebidas(b);
    const a = await getProductos(idRest);
    setProductos(a);
    setCargandoR(false)
  }

  //envia datos para generar detalle producto en la sig. screen
  const detalleProducto = (id_comida, nombre, desc, precio, imagen, tiempo, restaurante) => {
    cortaTimer();
    props.navigation.navigate("Producto", {
      id_comida: id_comida,
      nombre: nombre,
      desc: desc,
      precio: precio,
      imagen: imagen,
      tiempo: tiempo,
      idRest: restaurante
    });
  };
  //envia id_rest a screen carrito
  const enviaDatos = async (idRes) => {
    cortaTimer();
    props.navigation.navigate("Carrito", {
      idRes: idRes
    });
  }

  //funcion cambia categoria platillos, bebidad y combos
  const navCategoria = ((tipCat) => {
    setCategoria(tipCat)
  })
  //Alerta que confirma la acción de "vaciar carrito"
	const backAction = () => {

	}; //ALERTA FIN

  //escucha menu
  useEffect(() => {
    const cambiaTamaño = setInterval(() => {
      datosMenu();
    }, 15000);
    return () => {
      // clean up
      clearInterval(cambiaTamaño);
    };
  }, []);

  //carga funciones al entrar screen
  useEffect(() => {
    datosMenu();
    deleteCart();
    backTime(props);
    const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		);
    return () => backHandler.remove();
  }, [])

  return (
    <>
      {cargandoR ? <ProcesandoAir /> : null}
      <SafeAreaView flex={1}>
        {/* Datos restaurante */}
        {arrRestaurantes.map((item) => {
          if (item.id_user == idRest) {
            return(
              <Box key={item.id_user}>
                <Center paddingTop={3}>
                  {/* Logo */}
                  <Image
                    style={estilosAIQ.logo}
                    source={{uri: urlImg + item.avatar}}
                    alt={"Logo restaurante"}
                    size={"xl"}/>
                  {/* Nombre */}
                  <NombreBox nombre={item.nombre.toUpperCase()} color={coloresAIQ.negro}/>
                </Center>
              </Box>
            )
          }
        })}

          {/* Categorias */}  
          <Box p={2}>
              <Center flexDir={'row'}>
                {arrAlimentos.length > 0 ? (<>    
              {categoria == 'Alimentos' ? 
              (<>
                {arrProductos.length > 0 ? 
                  (<TouchableOpacity
                      style={estilosAIQ.containerCategorias}
                      onPress={() => {
                        navCategoria('Alimentos')
                        }}>
                      <Text style={estilosAIQ.textCategoriasSelect}>Productos</Text>
                  </TouchableOpacity>) : 
                  (null)}
                {arrPlatillos.length > 0 ? 
                  (<TouchableOpacity
                      style={estilosAIQ.containerCategorias}
                      onPress={() => {
                        navCategoria('Alimentos')
                        }}>
                      <Text style={estilosAIQ.textCategoriasSelect}>Platillos</Text>
                  </TouchableOpacity>) : 
                  (null)}
                {arrBebidas.length > 0 ? (
                  <TouchableOpacity
                      style={estilosAIQ.containerCategorias}
                      onPress={() => {navCategoria('Bebidas')}}>
                      <Text style={estilosAIQ.textCategorias}>Bebidas</Text>
                  </TouchableOpacity>) : (null)}
                {arrCombos.length > 0 ? (                 
                  <TouchableOpacity
                    style={estilosAIQ.containerCategorias}
                    onPress={() => {navCategoria('Combos')}}>
                    <Text style={estilosAIQ.textCategorias}>Combos</Text>
                  </TouchableOpacity>) : (null)}
              </>) : (null)}

              {categoria == 'Bebidas' ? 
              (<>
                  {arrPlatillos.length > 0 ? 
                      (<TouchableOpacity
                          style={estilosAIQ.containerCategorias}
                          onPress={() => {navCategoria('Alimentos')}}>
                          <Text style={estilosAIQ.textCategorias}>Platillos</Text>
                      </TouchableOpacity>) : (null)}
                  {arrBebidas.length > 0 ? (
                      <TouchableOpacity
                          style={estilosAIQ.containerCategorias}
                          onPress={() => {navCategoria('Bebidas')}}>
                          <Text style={estilosAIQ.textCategoriasSelect}>Bebidas</Text>
                      </TouchableOpacity>) : (null)}
                  {arrCombos.length > 0 ? (                 
                      <TouchableOpacity
                          style={estilosAIQ.containerCategorias}
                          onPress={() => {navCategoria('Combos')}}>
                          <Text style={estilosAIQ.textCategorias}>Combos</Text>
                      </TouchableOpacity>) : (null)}
                  </>) : (null)}
        
              {categoria == 'Combos' ? 
              (<>
                  {arrPlatillos.length > 0 ? 
                      (<TouchableOpacity
                          style={estilosAIQ.containerCategorias}
                          onPress={() => {navCategoria('Alimentos')}}>
                          <Text style={estilosAIQ.textCategorias}>Platillos</Text>
                      </TouchableOpacity>) : (null)}
                  {arrBebidas.length > 0 ? (
                      <TouchableOpacity
                          style={estilosAIQ.containerCategorias}
                          onPress={() => {navCategoria('Bebidas')}}>
                          <Text style={estilosAIQ.textCategorias}>Bebidas</Text>
                      </TouchableOpacity>) : (null)}
                  {arrCombos.length > 0 ? (                 
                      <TouchableOpacity
                          style={estilosAIQ.containerCategorias}
                          onPress={() => {navCategoria('Combos')}}>
                          <Text style={estilosAIQ.textCategoriasSelect}>Combos</Text>
                      </TouchableOpacity>) : (null)}
                  </>) : (null)}
                  </>):(
              null)}
              </Center>
          </Box>

          {/* Menu */}
          <ScrollView flex={1}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }>
            {arrAlimentos.length > 0 ? (<Box flex={2} p={3}>
            {categoria == 'Alimentos' && arrPlatillos.length > 0 ? 
              (arrAlimentos.map((item) => { 
                if (item.id_categoria == 2 ) {
                  return(
                    <Box                       
                    style={{ borderRadius: 12 }}
                    key={item.id_comida}
                    shadow={3}
                    m={2}
                    _light={{
                      backgroundColor: coloresAIQ.blanco,
                    }}>
                        <TouchableOpacity
                        onPress={() => {
                            detalleProducto(item.id_comida, item.nombre, item.descripcion, item.precio, item.imagen, item.tiempo, idRest);
                        }}><Flex direction='row'>
                            <Image
                            style={estilosAIQ.imagenMenu}
                            source={{uri: urlImg+item.imagen}}
                            alt={item.nombre}
                            size={"xl"}
                            />
                            <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                            {/* Nombre platillo */}
                            <NombreBoxProd color={coloresAIQ.azulOscuroAIQ} nombre={item.nombre} />
                            {/* Costo de platillo */}
                            <TextBoxProd dato={`Costo: $${item.precio}`} />
                            </Box>
                        </Flex></TouchableOpacity>
                    </Box>
                )
                }
              })) : (null)}
            {categoria == 'Alimentos' && arrProductos.length > 0 ? 
              (arrProductos.map((item) => { 
                if (item.id_categoria == 4 ) {
                  return(
                    <Box                       
                    style={{ borderRadius: 12 }}
                    key={item.id_comida}
                    shadow={3}
                    m={2}
                    _light={{
                      backgroundColor: coloresAIQ.blanco,
                    }}>
                        <TouchableOpacity
                        onPress={() => {
                            detalleProducto(item.id_comida, item.nombre, item.descripcion, item.precio, item.imagen, item.tiempo, idRest);
                        }}><Flex direction='row'>
                            <Image
                            style={estilosAIQ.imagenMenu}
                            source={{uri: urlImg+item.imagen}}
                            alt={item.nombre}
                            size={"xl"}
                            />
                            <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                            {/* Nombre platillo */}
                            <NombreBoxProd color={coloresAIQ.azulOscuroAIQ} nombre={item.nombre} />
                            {/* Costo de platillo */}
                            <TextBoxProd dato={`Costo: $${item.precio}`} />
                            </Box>
                        </Flex></TouchableOpacity>
                    </Box>
                )
                }
              })) : (null)}
            {categoria == 'Alimentos' && arrPlatillos.length == 0 && arrProductos.length == 0 ? 
              (<View><Center>
                <LottieSelect></LottieSelect>
                <Text>Bienvenido, selecciona una categoría</Text>
              </Center></View>) : (null)}
            {categoria == 'Bebidas' && arrBebidas.length > 0 ? 
              (arrAlimentos.map((item) => {
                  if (item.id_categoria == 3) {
                    return(
                      <Box                       
                      style={{ borderRadius: 12 }}
                      key={item.id_comida}
                      shadow={3}
                      m={2}
                      mt={2}
                      _light={{
                        backgroundColor: coloresAIQ.blanco,
                      }}>
                          <TouchableOpacity
                          onPress={() => {
                            detalleProducto(item.id_comida, item.nombre, item.descripcion, item.precio, item.imagen, item.tiempo, idRest);
                          }}><Flex direction='row'>
                              <Image
                              style={estilosAIQ.imagenMenu}
                              source={{uri: urlImg+item.imagen}}
                              alt={item.nombre}
                              size={"xl"}
                              />
                              <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                              {/* Nombre platillo */}
                              <NombreBoxProd color={coloresAIQ.azulOscuroAIQ} nombre={item.nombre} />
                              {/* Costo de platillo */}
                              <TextBoxProd dato={`Costo: $${item.precio}`} />
                              </Box>
                          </Flex></TouchableOpacity>
                      </Box>
                  )
                  }
              })) : (null)}
            {categoria == 'Combos' && arrCombos.length > 0 ? 
              (arrAlimentos.map((item) => {
                if (item.id_categoria == 1 ) {
                    return(
                      <Box                       
                      style={{ borderRadius: 12 }}
                      key={item.id_comida}
                      shadow={3}
                      m={2}
                      mt={2}
                      _light={{
                        backgroundColor: coloresAIQ.blanco,
                      }}>
                          <TouchableOpacity
                          onPress={() => {
                            detalleProducto(item.id_comida, item.nombre, item.descripcion, item.precio, item.imagen, item.tiempo, idRest);
                          }}><Flex direction='row'>
                              <Image
                              style={estilosAIQ.imagenMenu}
                              source={{uri: urlImg+item.imagen}}
                              alt={item.nombre}
                              size={"xl"}
                              />
                              <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                              {/* Nombre platillo */}
                              <NombreBoxProd color={coloresAIQ.azulOscuroAIQ} nombre={item.nombre} />
                              {/* Costo de platillo */}
                              <TextBoxProd dato={`Costo: $${item.precio}`} />
                              </Box>
                          </Flex></TouchableOpacity>
                      </Box>
                  )
                  }
              })) : (null)}
            </Box>) : (<View><Center>
                        <LottieSinServ></LottieSinServ>
                        <Text>Ups....Intentalo mas tarde</Text>
                      </Center></View>)}
          </ScrollView>
        
          {/* btn carrito */}
          {arrAlimentos.length > 0 && carrito > 0? (<FAB
            placement='right'
            color={coloresAIQ.azulAIQ}
            onPress={() => {enviaDatos(idRest)}}
            icon={<AntDesign name="shoppingcart" size={24} color={coloresAIQ.blanco}/>}
            />) : (null)}
        
      </SafeAreaView>
    </>
  )
}

export default Menu