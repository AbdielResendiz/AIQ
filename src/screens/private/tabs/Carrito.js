import React from 'react'
import { View, Text, Box, Flex, Image, Center, Button} from 'native-base'
import { ScrollView, TouchableOpacity } from 'react-native'
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons'
import coloresAIQ from '../../../styles/coloresAIQ'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Carrito = (props) => {

  const idRes = props.route.params.idRes

  let UID123_object = {
    name: 'Chris',
    age: 30,
    traits: { hair: 'brown', eyes: 'brown' }
  };
  // You only need to define what will be added or updated
  let UID123_delta = {
    age: 31,
    traits: { eyes: 'blue', shoe_size: 10 }
  };
  
  AsyncStorage.setItem(
    'UID123',
    JSON.stringify(UID123_object),
    () => {
      AsyncStorage.mergeItem(
        'UID123',
        JSON.stringify(UID123_delta),
        () => {
          AsyncStorage.getItem('UID123', (err, result) => {
            console.log(result);
          });
        }
      );
    }
  );

  const arrCombos = [
    {
      idRes: 1,
      nombre: "Hamburguesa con papas y refresco",
      desc: "elegir: Cocacola, Fanta o Mundet",
      precio: "100.00",
      tiempo: 30,
      imagen: '../../../../assets/Alimentos/combo.jpeg'
    },
    {
      idRes: 2,
      nombre: "Dos rebanadas pizzas",
      desc: "Pepperonni o Jamón",
      precio: "100.00",
      tiempo: 30,
      imagen: '../../../../assets/Alimentos/combo.jpeg'
    },
    {
      idRes: 3,
      nombre: "Enchiladas y postre",
      desc: "Rojas o verdes",
      precio: "80.00",
      tiempo: 30,
      imagen: '../../../../assets/Alimentos/combo.jpeg'
    },
    {
      idRes: 4,
      nombre: "orden 5 tacos",
      desc: "Pastor",
      precio: "80.00",
      tiempo: 30,
      imagen: '../../../../assets/Alimentos/combo.jpeg'
    },
  ];
  
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
      {arrCombos.length > 0 ? 
        (arrCombos.map((item) => {
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
                    <Image
                    style={{
                        resizeMode: "cover",
                        justifyContent: "center",
                        borderTopLeftRadius: 12,
                        borderBottomLeftRadius: 12,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                    }}
                    source={require('../../../../assets/Alimentos/combo.jpeg')}
                    alt={item.nombre}
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