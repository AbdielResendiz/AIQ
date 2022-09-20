import React, { useState, useEffect } from 'react';
import { View, Text, Box, Flex, Image, Center, Button} from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import coloresAIQ from '../../../styles/coloresAIQ';
import { getCart, urlImg, deteleItemCart, getTotalCart } from '../../../api/controlWS';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Carrito = (props) => {
  //datos recibidos de Producto.js
  const idRes = props.route.params.idRes;
  //arreglo carrito
  const [arrCarrito, setArrCarrito] = useState([]);
  //total carrito
  const [total, setTotal] = useState('');
  //idMesa en local sotarege
  const getMesa = async() => {
    const m = await AsyncStorage.getItem('ID_MESA');
    const n = await getCart(JSON.parse(m));
    setArrCarrito(n);
    const p = await getTotalCart(JSON.parse(m));
    setTotal(p);
  }

  const deleteItem = async(idComida) => {
    const m = await AsyncStorage.getItem('ID_MESA');
    await deteleItemCart(JSON.parse(m), idComida);
    getMesa();
  }
  
  //regrese a menu
  const enviaDatos = async (idRes) => {
    props.navigation.navigate("Menu", {
      idRes: idRes
    });
  }

  useEffect(() => {
    getMesa();
  }, []);

  return (
    <>
      <View flex={1}>
        {/* Titulo: Carrito */}
        <Text
          paddingX={4}
          paddingY={3}
          fontSize={26}
          fontFamily='heading'
          colorScheme={coloresAIQ.negro}>
          Mi carrito
        </Text>
        {/* Scroll: carrito */}
        <ScrollView>
        {arrCarrito.length > 0 ? 
          (arrCarrito.map((item) => {
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
                    <Flex direction='row'>
                      {/* Img producto */}
                      <Image
                      style={{
                          resizeMode: "cover",
                          justifyContent: "center",
                          borderTopLeftRadius: 12,
                          borderBottomLeftRadius: 12,
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                      }}
                      source={{uri: urlImg+item.imagen}}
                      alt={item.nomProd}
                      size={"lg"}/>
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
                        {/* Cantidad */}
                        <Text
                          ml={1}
                          color={coloresAIQ.grisAIQ}
                          fontSize='md'
                          fontFamily='body'>
                          Cantidad: {item.cantidad}
                        </Text>
                        {/* Subtotal */}
                        <Text
                          ml={1}
                          color={coloresAIQ.grisAIQ}
                          fontSize='md'
                          fontFamily='body'>
                          Subtotal: ${item.subtotal}
                        </Text>
                      </Box>
                      <TouchableOpacity 
                        style={{justifyContent:'center', alignItems: 'center', margin: 8}}
                        onPress={() => {deleteItem(item.id_comida)}}>
                        <MaterialCommunityIcons name="delete-empty-outline" size={36} color={coloresAIQ.azulOscuroAIQ}/>
                      </TouchableOpacity>
                    </Flex>
                  </Box>)
          })) : (null)}
          {/* Total */}
          <Center>
            <Text
              paddingX={4}
              paddingTop={3}
              fontSize={22}
              fontFamily='heading'
              colorScheme={coloresAIQ.negro}>
              Total: {total}
            </Text>
          </Center>
        </ScrollView>


        {/* btn Confirmar compra */}
        <Center marginTop={2}>
          <Button
              leftIcon={<AntDesign
                  name='check'
                  size={24}
                  color={coloresAIQ.blanco}/>}
              bg={coloresAIQ.azulAIQ}
              mt='3'
              width={250}
              height={55}
              borderRadius={32}
              onPress={() => props.navigation.navigate("MetodoPago")}
              _pressed={{
                  bg: coloresAIQ.azulBtn}}>
              <Text
                  color={coloresAIQ.blanco}
                  fontSize='md'
                  fontFamily='body'>
                  Confirmar compra
              </Text>
          </Button>
        </Center>

        {/* btn Volver menu */}
        <Center marginTop={2} marginBottom={4}>
          <Button
              leftIcon={<AntDesign
                  name='arrowleft'
                  size={24}
                  color={coloresAIQ.blanco}/>}
              bg={coloresAIQ.azulAIQ}
              mt='3'
              width={250}
              height={55}
              borderRadius={32}
              onPress={() => {enviaDatos(idRes)}}
              _pressed={{
                  bg: coloresAIQ.azulBtn}}>
              <Text
                  color={coloresAIQ.blanco}
                  fontSize='md'
                  fontFamily='body'>
                  Volver al menú
              </Text>
          </Button>
        </Center>
      </View>
      </>
  )
}

export default Carrito