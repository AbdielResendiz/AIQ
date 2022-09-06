import React, {useState, useEffect, useCallback} from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Box, Center, Image, Text, Flex } from 'native-base';
import { FAB } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import coloresAIQ from '../../styles/coloresAIQ';
import estilosAIQ from '../../styles/estilosAIQ';
import Procesando from '../components/Procesando';
import axios from 'axios';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

const Menu = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [categoria, setCategoria] = useState('Alimentos')
  
  //Datos restaurante
  const idRest = props.route.params.idRes
  const nombreRes = props.route.params.nombre
  const logo = props.route.params.imagen
  
  const baseUrl = 'https://v-csoft.com/AIQ/MovilR';
  const url = `${baseUrl}/getMenu`
  const source = axios.CancelToken.source();
  const [hasError, setErrorFlag] = useState(false);
  const [arrAlimentos, setArrAlimentos] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => setRefreshing(false));
  }, []);
  
  /*
  const arrBebidas = [
    {
      idRes: 1,
      nombre: "Capuchino",
      desc: "Cafe caliente",
      precio: "100.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/cafe.jpeg'
    },
    {
      idRes: 2,
      nombre: "Frappe",
      desc: "Cafe frio",
      precio: "100.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/cafe.jpeg'
    },
    {
      idRes: 3,
      nombre: "Expresso",
      desc: "Cafe caliente",
      precio: "80.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/cafe.jpeg'
    },
    {
      idRes: 4,
      nombre: "Té",
      desc: "Bebida caliente",
      precio: "80.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/cafe.jpeg'
    },
    {
      idRes: 5,
      nombre: "Frape Moca",
      desc: "Frappe frio, elegir leche entera o light",
      precio: "130.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/cafe.jpeg'
    },
    {
      idRes: 6,
      nombre: "Americano",
      desc: "Cafe caliente",
      precio: "130.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/cafe.jpeg'
    },
  ];

  const arrPlatillos = [
    {
      idRes: 1,
      nombre: "Hamburgueza",
      desc: "Con lechuga y carne de res",
      precio: "100.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/comida.jpeg'
    },
    {
      idRes: 2,
      nombre: "Pizza",
      desc: "Pepperonni o Jamón",
      precio: "100.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/comida.jpeg'
    },
    {
      idRes: 3,
      nombre: "Enchiladas",
      desc: "Rojas o verdes",
      precio: "80.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/comida.jpeg'
    },
    {
      idRes: 4,
      nombre: "Taco",
      desc: "Pastor",
      precio: "80.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/comida.jpeg'
    },
    {
      idRes: 5,
      nombre: "Baguette",
      desc: "Verduras frescas",
      precio: "130.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/comida.jpeg'
    },
    {
      idRes: 6,
      nombre: "Rebanada de pastel",
      desc: "Sabor Chocolate",
      precio: "130.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/comida.jpeg'
    },
  ];

  const arrCombos = [
    {
      idRes: 1,
      nombre: "Hamburguesa con papas y refresco",
      desc: "elegir: Cocacola, Fanta o Mundet",
      precio: "100.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/combo.jpeg'
    },
    {
      idRes: 2,
      nombre: "Dos rebanadas pizzas",
      desc: "Pepperonni o Jamón",
      precio: "100.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/combo.jpeg'
    },
    {
      idRes: 3,
      nombre: "Enchiladas y postre",
      desc: "Rojas o verdes",
      precio: "80.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/combo.jpeg'
    },
    {
      idRes: 4,
      nombre: "orden 5 tacos",
      desc: "Pastor",
      precio: "80.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/combo.jpeg'
    },
    {
      idRes: 5,
      nombre: "Baguette con galleta",
      desc: "Verduras frescas",
      precio: "130.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/combo.jpeg'
    },
    {
      idRes: 6,
      nombre: "Rebanada de pastel y malteada",
      desc: "Sabor Chocolate",
      precio: "130.00",
      tiempo: 30,
      imagen: '../../../assets/Alimentos/combo.jpeg'
    },
  ];
  */

  const getMenu = async () => {
    try{
      setCargando(true);
      const response = await axios.get(url, {cancelToken: source.token});
      if (response.status === 200) {
        setArrAlimentos(response.data);
        setCargando(false);
        return;
      } else {
        throw new Error("Fallo en fetch array restaurantes")
      }
    } catch (error) {
      if(axios.isCancel(error)) {
        console.log('Data fetching cancelado')
      } else {
        setErrorFlag(true);
        setCargando(false);
      }
    }
  }

  const detalleProducto = (idRes, nombre, desc, precio, imagen, tiempo, restaurante) => {
    props.navigation.navigate("Producto", {
      idProd: idRes,
      nombre: nombre,
      desc: desc,
      imagen: imagen,
      precio: precio,
      tiempo: tiempo,
      nomRes: restaurante
    });
  };
  const enviaDatos = async (nombreRes) => {
    props.navigation.navigate("Carrito", {
      nombreRes: nombreRes
    });
  }

  const navCategoria = ((tipCat) => {
    setCategoria(tipCat)
  })

  useEffect(() => {
    getMenu();
    setCargando(false);
  }, [])

  return (
    <>
      {cargando ? <Procesando /> : null}
      <SafeAreaView flex={1}>
        {/* Datos restaurante */}
        <Box>
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
                source={{uri: logo}}
                alt={"Logo restaurante"}
                size={"xl"}/>
            {/* Nombre */}
            <Text
                fontFamily='heading'
                fontSize='2xl'
                color={coloresAIQ.negro}>
                {nombreRes}
            </Text>
          </Center>
        </Box>

        {/* Categorias */}
        <Box p={2}>
            <Center flexDir={'row'}>
            {categoria == 'Alimentos' ? 
            (<>
              {arrAlimentos.length > 0 ? 
                (<TouchableOpacity
                    style={estilosAIQ.containerCategorias}
                    onPress={() => {navCategoria('Alimentos')}}>
                    <Text style={estilosAIQ.textCategoriasSelect}>Platillos</Text>
                </TouchableOpacity>) : (null)}
              {arrAlimentos.length > 0 ? (
                <TouchableOpacity
                    style={estilosAIQ.containerCategorias}
                    onPress={() => {navCategoria('Bebidas')}}>
                    <Text style={estilosAIQ.textCategorias}>Bebidas</Text>
                </TouchableOpacity>) : (null)}
              {arrAlimentos.length > 0 ? (                 
                <TouchableOpacity
                    style={estilosAIQ.containerCategorias}
                    onPress={() => {navCategoria('Combos')}}>
                    <Text style={estilosAIQ.textCategorias}>Combos</Text>
                </TouchableOpacity>) : (null)}
            </>) : (null)}
            {categoria == 'Bebidas' ? 
            (<>
                {arrAlimentos.length > 0 ? 
                    (<TouchableOpacity
                        style={estilosAIQ.containerCategorias}
                        onPress={() => {navCategoria('Alimentos')}}>
                        <Text style={estilosAIQ.textCategorias}>Platillos</Text>
                    </TouchableOpacity>) : (null)}
                {arrAlimentos.length > 0 ? (
                    <TouchableOpacity
                        style={estilosAIQ.containerCategorias}
                        onPress={() => {navCategoria('Bebidas')}}>
                        <Text style={estilosAIQ.textCategoriasSelect}>Bebidas</Text>
                    </TouchableOpacity>) : (null)}
                {arrAlimentos.length > 0 ? (                 
                    <TouchableOpacity
                        style={estilosAIQ.containerCategorias}
                        onPress={() => {navCategoria('Combos')}}>
                        <Text style={estilosAIQ.textCategorias}>Combos</Text>
                    </TouchableOpacity>) : (null)}
                </>) : (null)}
            {categoria == 'Combos' ? 
            (<>
                {arrAlimentos.length > 0 ? 
                    (<TouchableOpacity
                        style={estilosAIQ.containerCategorias}
                        onPress={() => {navCategoria('Alimentos')}}>
                        <Text style={estilosAIQ.textCategorias}>Platillos</Text>
                    </TouchableOpacity>) : (null)}
                {arrAlimentos.length > 0 ? (
                    <TouchableOpacity
                        style={estilosAIQ.containerCategorias}
                        onPress={() => {navCategoria('Bebidas')}}>
                        <Text style={estilosAIQ.textCategorias}>Bebidas</Text>
                    </TouchableOpacity>) : (null)}
                {arrAlimentos.length > 0 ? (                 
                    <TouchableOpacity
                        style={estilosAIQ.containerCategorias}
                        onPress={() => {navCategoria('Combos')}}>
                        <Text style={estilosAIQ.textCategoriasSelect}>Combos</Text>
                    </TouchableOpacity>) : (null)}
                </>) : (null)}
            </Center>
        </Box>

        {/* Menu */}
        <ScrollView flex={1}
          refreshControl={refreshing} onRefresh={onRefresh}>
          <Box flex={2} p={3}>
          {categoria == 'Alimentos' && arrAlimentos.length > 0 ? 
            (arrAlimentos.map((item) => { 
              if (item.id_categoria == 2) {
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
                          detalleProducto(item.idRes, item.nombre, item.desc, item.precio, item.imagen, item.tiempo, idRest);
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
                          source={{uri: item.imagen}}
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
            })) : (null)}
          {categoria == 'Bebidas' && arrAlimentos.length > 0 ? 
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
                          detalleProducto(item.idRes, item.nombre, item.desc, item.precio, item.imagen, item.tiempo);
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
                            source={{uri: item.imagen}}
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
            })) : (null)}
          {categoria == 'Combos' && arrAlimentos.length > 0 ? 
            (arrAlimentos.map((item) => {
                if (item.id_categoria == 1) {
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
                          detalleProducto(item.idRes, item.nombre, item.desc, item.precio, item.imagen, item.tiempo);
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
                            source={{uri: item.imagen}}
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
            })) : (null)}
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