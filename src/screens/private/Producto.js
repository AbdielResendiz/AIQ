import React, {useState, useEffect} from 'react'
import { View, Text, Center, Image, ScrollView, Button, Box, Flex, Divider} from 'native-base'
import {MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons'
import { urlImg } from '../../api/controlWS'
import coloresAIQ from '../../styles/coloresAIQ'
import { TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addCarrito } from '../../api/controlWS'
import { backTime, cortaTimer } from '../../api/backHome'
import estilosAIQ from '../../styles/estilosAIQ'
import { DetalleProducto, InfoProducto, NombreBox } from '../components/Textos'

const Producto = (props) => {
  const [comentario, setComentario] = useState('');
  //Cantidad de producto
  const [cantP, setCantp] = useState(1);
  //obtener idMesa
  const [mesa, setMesa] = useState('');

  //datos recibidos de Menu.js
  const idComida = props.route.params.id_comida
  const idRes = props.route.params.idRest
  const nomProd = props.route.params.nombre
  const desc = props.route.params.desc
  const precio = props.route.params.precio
  const imagen = props.route.params.imagen
  const tiempo = props.route.params.tiempo
  //idMesa en local sotarege
  const getMesa = async() => {
    const m = await AsyncStorage.getItem('ID_MESA');
    setMesa(m);
  }

  // control spinner cantidad
  const disminCarrito = async () => {
    if (cantP <= 1) {
      setCantp(1);
    } else {
      setCantp(cantP - 1);
    }
  };

  const upCarrito = async () => {
    if (cantP >= 9) {
    } else {
      setCantp(cantP + 1);
    }
  };
  
  useEffect(()=>{
    getMesa()
    backTime(props)
  },[])

  const enviaDatos = async (comentario, precio, idRes, cantP, idComida) => {
    cortaTimer();
    await addCarrito(JSON.parse(mesa), idComida, cantP, cantP*precio, comentario);
    await props.navigation.navigate("Carrito", {
      idRes: idRes,
    });
  }

  return (
    <ScrollView flex={1}>
        {/* Imagen Producto */}
        <Center paddingTop={4}>
            <Image
                style={{...estilosAIQ.imagenMenu, borderBottomRightRadius: 12, borderTopRightRadius: 12,}}
                source={{uri: urlImg+imagen}}
                alt={"Imagen producto"}
                size='180'/>
        </Center>
        {/* Nombre Producto y precio */}
        <Center p={4}>
            <NombreBox nombre={nomProd.toUpperCase()} color={coloresAIQ.negro}/>
            <NombreBox nombre={`$${precio}`} color={coloresAIQ.azulAIQ                                            }/>
        </Center>
        {/* Descripcion y tiempo de producto */}
        <Divider></Divider>
        <View paddingY={2} paddingX={8}>
           {/* Descripcion y tiempo de producto <InfoProducto info={'Información del producto'}/>*/}
          <DetalleProducto detalle={desc}/>
          <View margin={2}/>
          <InfoProducto info={'Tiempo de entrega aproximado:'}/>
          <DetalleProducto detalle={`${tiempo}min.`}/>
        </View>
        {/* Comentarios */}
        <View paddingY={2} paddingX={8}>
          <InfoProducto info={'Comentarios:'}/>
            <TextInput
                style={{...estilosAIQ.input, textAlignVertical: 'top', }}
                numberOfLines={5}
                placeholder="Escribe tus comentarios"
                multiline
                value={comentario}
                maxLength={200}
                onChangeText={(val) => setComentario(val)}
            />
        </View>

        {/* Input spinner cantidad */}
        <Box w='50%' alignContent='center' marginLeft={8} marginTop={3}>
          <InfoProducto info={'Cantidad:'}/>
          <Flex direction={"row"} alignItems='flex-start' marginTop={3}>
            <Button
              bg={coloresAIQ.blanco}
              style={{...estilosAIQ.btnCantidadProd, 
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30}}
              startIcon={
                <FontAwesome
                  name='minus'
                  color={coloresAIQ.negro}
                />
              }
              _pressed={{ bg: coloresAIQ.grisClaroAiq}}
              onPress={disminCarrito}
            />
            <Text
              h={12}
              w={8}
              bg={coloresAIQ.blanco}
              fontSize={"md"}
              style={{ textAlignVertical: "center", textAlign: "center" }}
              color={coloresAIQ.negro}
            >
              {cantP}
            </Text>
            <Button
              bg={coloresAIQ.blanco}
              style={{...estilosAIQ.btnCantidadProd, 
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30}}
              endIcon={
                <FontAwesome
                  name='plus'
                  color={coloresAIQ.negro}
                />
              }
              _pressed={{ bg: coloresAIQ.grisClaroAiq }}
              onPress={upCarrito}
            />

          <Button
                leftIcon={<MaterialCommunityIcons
                    name='cart-plus'
                    size={23}
                    color={coloresAIQ.blanco}/>}
                bg={coloresAIQ.azulAIQ}
                mt='0'
                mx={5}
                mb=''
                width={160}
                height={49}
                borderRadius={30}
               
                onPress={() => {enviaDatos(comentario, precio, idRes, cantP, idComida)}}
                _pressed={{
                    bg: coloresAIQ.grisClaroAiq}}>
                <Text
                    color={coloresAIQ.blanco}
                    fontSize='lg'
                    fontFamily='body'>
                    Agregar
                </Text>
            </Button>



          </Flex>

         


        </Box>

        {/* btn AddCarrito */}
       
    </ScrollView>
  )
}

export default Producto