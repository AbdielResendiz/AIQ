import React, { useState, useEffect } from 'react';
import { View, Text, Box, Flex, Image, Center, Button} from 'native-base';
import { ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import coloresAIQ from '../../../styles/coloresAIQ';
import { NombreBoxProd, TextBoxProd, Titulos } from '../../components/Textos';
import { getCart, urlImg, deteleItemCart, getTotalCart } from '../../../api/controlWS';
import { backTime, cortaTimer } from '../../../api/backHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import estilosAIQ from '../../../styles/estilosAIQ';

//ajustar imagenes sin importar pantalla
const { width, height } = Dimensions.get('window');

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

  //elimina articulo seleccionado
  const deleteItem = async(idComida) => {
    Alert.alert(
			'¡Espera!',
			'¿Seguro deseas eliminar este articulo del carrito? ',
			[
				{
					text: 'Cancelar',
					onPress: () => null,
					style: 'cancel',
				},
				{
					text: 'Si',
					onPress: async () => {
            const m = await AsyncStorage.getItem('ID_MESA');
            await deteleItemCart(JSON.parse(m), idComida);
            getMesa();
					},
				},
			],
			{ cancelable: false }
		);
  }
  
  //regrese a menu
  const enviaDatos = async (idRes) => {
    cortaTimer();
    props.navigation.navigate("Menu", {
      idRes: idRes
    });
  }

  //Ir seleccion metodo de pago
  const irPago = async() => {
    //validando carrito con articulos
    if (arrCarrito.length > 0) {
      cortaTimer();
      props.navigation.navigate("MetodoPago")
    } else { //en caso de cart vacio, regresar a menu o restaurantes
      Alert.alert(
        'Carrito vacio',
        'No has seleccionado ningun articulo, ¿Donde deseas ir?',
        [
          {
            text: 'Menú',
            onPress: () => {  
              cortaTimer();  
              props.navigation.navigate("Menu", {
                idRes: idRes
              });
            },
            style: 'default',
          },
          {
            text: 'Restaurantes',
            onPress: () => {
              cortaTimer();
              props.navigation.navigate("Restaurante")
            },
            style: 'default',
          }
        ]
      )
    }
  }

  useEffect(() => {
    getMesa();
    backTime(props)
  }, []);

  return (
    <>
      <View flex={1}>
   
        {/* Scroll: carrito */}
        <ScrollView flex={1}>
        {arrCarrito.length > 0 ? 
          (arrCarrito.map((item) => {
            return(
              <Box                       
                style={{ borderRadius: 12 }}
                key={item.id}
                shadow={3}
                m={6}
                mt={2}
                _light={{
                  backgroundColor: coloresAIQ.blanco,
                }}>
                <Flex direction='row'>
                  {/* Img producto */}
                  <Image
                  style={{...estilosAIQ.imagenMenu, width: (height / 10.5)*1.75,
                  height: height / 8.5}}
                  source={{uri: urlImg+item.imagen}}
                  alt={item.nombre}
                  />
                  <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                    {/* Nombre platillo */}
                    <NombreBoxProd color={coloresAIQ.negro} nombre={item.nombre} />
                    {/* Costo de platillo */}
                    <TextBoxProd dato={`Costo: $${item.precio}`}/>
                    {/* Cantidad */}
                    <TextBoxProd dato={`Cantidad: ${item.cantidad}`}/>
                    {/* Subtotal */}
                    <TextBoxProd dato={`Subtotal: $${item.subtotal}`}/>
                  </Box>
                  {/* Delete item */}
                  <TouchableOpacity 
                    style={{justifyContent:'center', alignItems: 'center', margin: 8}}
                    onPress={() => {
                      deleteItem(item.id_comida)
                      }}>
                    <MaterialCommunityIcons name="trash-can-outline" size={50} color={coloresAIQ.rojo}/>
                  </TouchableOpacity>
                </Flex>
              </Box>)
          })) : (null)}
          {/* Total */}
          <Center>
            <Text
              paddingX={4}
              paddingTop={3}
              fontSize={26}
              fontFamily='heading'
              colorScheme={coloresAIQ.azulAIQ}>
              Total: ${total}
            </Text>
          </Center>
        </ScrollView>


        {/* btn Confirmar compra */}
        <Center marginTop={2}>
          <Button
              leftIcon={<AntDesign
                  name='check'
                  size={28}
                  color={coloresAIQ.blanco}/>}
              bg={coloresAIQ.azulAIQ}
              width={300}
              height={65}
              borderRadius={32}
              onPress={() => {
                props.navigation.navigate('SelectDireccion');
              }}
              _pressed={{
                  bg: coloresAIQ.azulBtn}}>
              <Text
                  color={coloresAIQ.blanco}
                  fontSize='lg'
                  fontFamily='body'>
                  Confirmar compra
              </Text>
          </Button>
        </Center>

        {/* btn Volver menu */}
        <Center marginTop={2} marginBottom={8}>
          <Button
              leftIcon={<AntDesign
                name='arrowleft'
                size={28}
                color={coloresAIQ.blanco}/>}
              bg={coloresAIQ.azulAIQ}
              mt='4'
              width={300}
              height={65}
              borderRadius={32}
              onPress={() => {enviaDatos(idRes)}}
              _pressed={{
                  bg: coloresAIQ.azulBtn}}>
              <Text
                  color={coloresAIQ.blanco}
                  fontSize='lg'
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