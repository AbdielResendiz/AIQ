import React, {useState, useEffect, useCallback} from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { Box, Center, Image, Text, Flex,View} from 'native-base';
import { FAB } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { getMenu, getRestaurantes, urlImg, getCombos, getComidas, getBebidas} from '../../api/controlWS';
import coloresAIQ from '../../styles/coloresAIQ';
import estilosAIQ from '../../styles/estilosAIQ';
import Procesando from '../components/Procesando';
import LottieSinServ from '../components/Lotties/LottieSinServ';
import ProcesandoAir from '../components/ProcesandoAir';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

const Menu = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [cargandoR, setCargandoR] = useState(true);
  const [categoria, setCategoria] = useState('Alimentos')
  
  //Datos restaurante
  const idRest = props.route.params.idRes
  const [arrRestaurantes, setArrRestaurantes] = useState([]);

  const [arrCombos, setArrCombos] = useState([]);
  const [arrPlatillos, setPlatillos] = useState([]);
  const [arrBebidas, setBebidas] = useState([]);

  //Datos menu
  const [arrAlimentos, setArrAlimentos] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      datosMenu();
      setRefreshing(false)});
  }, []);
  
  const datosMenu = async() => {
    const m = await getMenu(idRest);
    setArrAlimentos(m);
    const n = await getRestaurantes();
    setArrRestaurantes(n);
    const p = await getCombos(idRest);
    setArrCombos(p);
    const k = await getComidas(idRest);
    setPlatillos(k)
    const l = await getBebidas(idRest)
    setBebidas(l)
    setCargandoR(false)
  }

  const detalleProducto = (id_comida, nombre, desc, precio, imagen, tiempo, restaurante) => {
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
  const enviaDatos = async (idRes) => {
    props.navigation.navigate("Carrito", {
      idRes: idRes
    });
  }

  const navCategoria = ((tipCat) => {
    setCategoria(tipCat)
  })


  useEffect(() => {
    const cambiaTamaño = setInterval(() => {
      datosMenu()
      // setCargandoR(false)
      // console.log("reinicio")
    }, 1500);
    return () => {
      // clean up
     
      clearInterval(cambiaTamaño);
    };
  }, []);


  useEffect(() => {
    datosMenu()
    setCargando(false);
  }, [])

  return (
    <>
      {cargando ? <Procesando /> : null}
      <SafeAreaView flex={1}>
        {/* Datos restaurante */}
        {arrRestaurantes.map((item) => {
          if (item.id_user == idRest) {
            return(
              <Box key={item.id_user}>
                <Center paddingTop={3}>
                  {/* Logo */}
                  <Image
                    style={{
                    resizeMode: "cover", justifyContent: "center",
                    alignItems: "center", borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5, borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    }}
                    imageStyle={{
                    borderRadius: 55,
                    }}
                    source={{uri: urlImg + item.avatar}}
                    alt={"Logo restaurante"}
                    size={"xl"}/>
                  {/* Nombre */}
                  <Text
                      fontFamily='heading'
                      fontSize='2xl'
                      color={coloresAIQ.negro}>
                      {item.nombre}
                  </Text>
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
              {arrPlatillos.length > 0 ? 
                (<TouchableOpacity
                    style={estilosAIQ.containerCategorias}
                    onPress={() => {navCategoria('Alimentos')}}>
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
            {cargandoR ? <ProcesandoAir /> : null}
          <Box flex={2} p={3}>
          {categoria == 'Alimentos' && arrPlatillos.length > 0? 
            (arrAlimentos.map((item) => { 
              if (item.id_categoria == 2 ) {
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
                          style={{
                              flex: 1,
                              resizeMode: "cover",
                              justifyContent: "center",
                              borderTopLeftRadius: 12,
                              borderBottomLeftRadius: 12,
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                          }}
                          imageStyle={{
                              borderRadius: 55,
                          }}
                          source={{uri: urlImg+item.imagen}}
                          alt={item.nombre}
                          size={"xl"}
                          />
                          <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                          {/* Nombre platillo */}
                          <Text
                          fontFamily='heading'
                          fontSize='xl'
                          color={coloresAIQ.azulOscuroAIQ}>
                          {item.nombre}
                          </Text>
                          {/* Costo de platillo */}
                          <Text
                          ml={1}
                          color={coloresAIQ.grisAIQ}
                          fontSize='md'
                          fontFamily='body'>
                          Costo: ${item.precio}
                          </Text>
                          </Box>
                      </Flex></TouchableOpacity>
                  </Box>
              )
              }
            })) : ( (<View>
               {(categoria != 'Alimentos' && arrCombos.length >= 1) || (categoria != 'Alimentos' && arrBebidas.length >= 1 ) || (categoria != 'Alimentos' && arrPlatillos.length ==0) ? 
            (<View></View>) : (<Center>
                                    <LottieSinServ></LottieSinServ>
                                    <Text>Ups....Intentalo mas tarde</Text>
                              </Center>)}

            </View>))}
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
                            style={{
                                flex: 1,
                                resizeMode: "cover",
                                justifyContent: "center",
                                borderTopLeftRadius: 12,
                                borderBottomLeftRadius: 12,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                            }}
                            imageStyle={{
                                borderRadius: 55,
                            }}
                            source={{uri: urlImg+item.imagen}}
                            alt={item.nombre}
                            size={"xl"}
                            />
                            <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                            {/* Nombre platillo */}
                            <Text
                            fontFamily='heading'
                            fontSize='xl'
                            color={coloresAIQ.azulOscuroAIQ}>
                            {item.nombre}
                            </Text>
                            {/* Costo de platillo */}
                            <Text
                            ml={1}
                            color={coloresAIQ.grisAIQ}
                            fontSize='md'
                            fontFamily='body'>
                            Costo: ${item.precio}
                            </Text>
                            </Box>
                        </Flex></TouchableOpacity>
                    </Box>
                )
                }
            })) : ((<View>
             {(categoria != 'Bebidas' && arrCombos.length >= 1) || (categoria != 'Bebidas' && arrBebidas.length == 0 ) || (categoria != 'Bebidas' && arrPlatillos.length >=1 ) ? 
          (<View></View>) : (<Center>
            <LottieSinServ></LottieSinServ>
            <Text>Ups....Intentalo mas tarde</Text>
      </Center>)}

          </View>))}
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
                            style={{
                                flex: 1,
                                resizeMode: "cover",
                                justifyContent: "center",
                                borderTopLeftRadius: 12,
                                borderBottomLeftRadius: 12,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                            }}
                            imageStyle={{
                                borderRadius: 55,
                            }}
                            source={{uri: urlImg+item.imagen}}
                            alt={item.nombre}
                            size={"xl"}
                            />
                            <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                            {/* Nombre platillo */}
                            <Text
                            fontFamily='heading'
                            fontSize='xl'
                            color={coloresAIQ.azulOscuroAIQ}>
                            {item.nombre}
                            </Text>
                            {/* Costo de platillo */}
                            <Text
                            ml={1}
                            color={coloresAIQ.grisAIQ}
                            fontSize='md'
                            fontFamily='body'>
                            Costo: ${item.precio}
                            </Text>
                            </Box>
                        </Flex></TouchableOpacity>
                    </Box>
                )
                }
            })) : (<View>
                {(categoria != 'Combos' && arrCombos.length == 0 ) || (categoria != 'Combos' && arrBebidas.length >= 1 ) || (categoria != 'Combos' && arrPlatillos.length >=1 ) ? 
            (<View></View>) : (<Center>
              <LottieSinServ></LottieSinServ>
              <Text>Ups....Intentalo mas tarde</Text>
        </Center>)}

            </View>)}
          </Box>
        </ScrollView>
        <FAB
            placement='right'
            color={coloresAIQ.azulAIQ}
            onPress={() => {enviaDatos(idRest)}}
            icon={<AntDesign name="shoppingcart" size={24} color={coloresAIQ.blanco}/>}
          />
      </SafeAreaView>
    </>
  )
}

export default Menu