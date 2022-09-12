import React, { useState } from 'react'
import { View, Text, Box, Flex, Image, Center, Button} from 'native-base'
import { ScrollView, TouchableOpacity } from 'react-native'
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons'
import coloresAIQ from '../../../styles/coloresAIQ'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { urlImg } from '../../../api/controlWS'

const Carrito = (props) => {

  const idRes = props.route.params.idRes
  const nomProd = props.route.params.nombre
  const precio = props.route.params.precio
  const comentario = props.route.params.comentario
  const imagen = props.route.params.imagen

  const [arrCarrito, setArrCarrito] = useState([''])
  let datosCarrito = [{
    idRes: idRes,
    nomProd: nomProd,
    precio: precio,
    comentario: comentario,
    imagen: imagen
  }];
  // You only need to define what will be added or updated
  let datosCarritoAdd = [{
    age: 31,
    traits: { eyes: 'blue', shoe_size: 10 }
  }];
  
  AsyncStorage.setItem(
    'CARRITO',
    JSON.stringify(datosCarrito),
    () => {
      AsyncStorage.getItem('CARRITO', (err, result) => {
        setArrCarrito(JSON.parse(result));
        (JSON.parse(JSON.stringify(datosCarritoAdd)))

        console.log(arrCarrito);
      });
    }
  );

  
  
  const enviaDatos = async (idRes) => {
    props.navigation.navigate("Menu", {
      idRes: idRes
    });
  }

  return (
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
                  key={item.idRes}
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
                        {item.nomProd}
                      </Text>
                        {/* Costo de platillo */}
                      <Text
                        ml={1}
                        color={coloresAIQ.grisAIQ}
                        fontSize='md'
                        fontFamily='body'>
                        costo: ${item.precio}
                      </Text>
                    </Box>
                    <TouchableOpacity 
                      style={{justifyContent:'center', alignItems: 'center', margin: 8}}
                      onPress={() => {}}>
                      <MaterialCommunityIcons name="delete-empty-outline" size={36} color={coloresAIQ.azulOscuroAIQ}/>
                    </TouchableOpacity>
                  </Flex>
                </Box>)
        })) : (null)}
      </ScrollView>

      {/* Total */}
      <Center>
        <Text
          paddingX={4}
          paddingTop={3}
          fontSize={22}
          fontFamily='heading'
          colorScheme={coloresAIQ.negro}>
          Total: $000.00
        </Text>
      </Center>
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
  )
}

export default Carrito