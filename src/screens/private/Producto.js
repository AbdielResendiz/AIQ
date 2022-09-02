import React, {useState} from 'react'
import { View, Text, Center, Image, ScrollView, Button, Box, Flex, } from 'native-base'
import {MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons'
import coloresAIQ from '../../styles/coloresAIQ'
import { TextInput } from 'react-native'

const Producto = (props) => {
  const [comentario, setComentario] = useState('');
  const [cantP, setCantp] = useState(1);

  const nomProd = props.route.params.nombre
  const precio = props.route.params.precio
  const desc = props.route.params.desc
  const tiempo = props.route.params.tiempo

  const enviaDatos = async (comentario) => {
    props.navigation.navigate("Carrito", {
      comentario: comentario
    });
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
  return (
    <ScrollView
      flex={1}
      style={{backgroundColor: coloresAIQ.amarilloFood}}>
        {/* Imagen Producto */}
        <Center paddingTop={4}>
            <Image
                style={{
                resizeMode: "cover",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                }}
                source={require('../../../assets/Alimentos/cafe.jpeg')}
                alt={"Imagen producto"}
                size='180'/>
        </Center>
        {/* Nombre Producto y precio */}
        <Center p={3}>
            <Text                   
              fontSize={22}
              fontFamily='heading'
              color={coloresAIQ.negro}>
                {nomProd}
            </Text>
            <Text                   
              fontSize={20}
              fontFamily='heading'
              color={coloresAIQ.naranjaOscuroFood}>
                ${precio}
            </Text>
        </Center>
        {/* Descripcion y tiempo de producto */}
        <View paddingY={2} paddingX={8}>
            <Text                   
              fontSize={18}
              fontFamily='body'
              fontWeight={'bold'}
              color={coloresAIQ.negro}>
                Información del producto:
            </Text>
            <Text                   
              fontSize={18}
              fontFamily='body'
              color={coloresAIQ.grisOscuroAIQ}>
                {desc}
            </Text>
            <Text
              paddingTop={2}                   
              fontSize={18}
              fontFamily='body'
              fontWeight={'bold'}
              color={coloresAIQ.negro}>
                Tiempo de entrega aproximado:
            </Text>
            <Text                   
              fontSize={18}
              fontFamily='body'
              color={coloresAIQ.grisOscuroAIQ}>
                {tiempo}min.
            </Text>
        </View>
        {/* Descripcion, tiempo de producto y comentarios */}
        <View paddingY={2} paddingX={8}>
            <Text                   
              fontSize={18}
              fontFamily='body'
              fontWeight={'bold'}
              color={coloresAIQ.negro}>
                Comentarios:
            </Text>
            <TextInput
                style={{ 
                    padding: 10,
                    textAlignVertical: 'top', 
                    borderWidth: 1.5, 
                    borderColor: coloresAIQ.grisOscuroAIQ,
                    borderRadius: 8,
                    backgroundColor: coloresAIQ.blanco
                 }}
                numberOfLines={4}
                placeholder="Escribe tus comentarios"
                multiline
                value={comentario}
                onChangeText={(val) => setComentario(val)}
            />
        </View>
        {/* Input spinner cantidad */}
        <Box w='50%' alignContent='center' marginLeft={8} marginTop={3}>
          <Text                 
            fontSize={18}
            fontFamily='body'
            fontWeight={'bold'}
            color={coloresAIQ.negro}>
              Cantidad:
          </Text>
          <Flex direction={"row"} alignItems='flex-start'>
            <Button
              bg={coloresAIQ.cafeFood}
              h={12}
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                width: 50,
              }}
              startIcon={
                <FontAwesome
                  name='minus'
                  color={coloresAIQ.blanco}
                />
              }
              _pressed={{ bg: coloresAIQ.cafeClaroFood}}
              onPress={disminCarrito}
            />
            <Text
              h={12}
              w={10}
              bg={coloresAIQ.cafeFood}
              fontSize={"md"}
              style={{ textAlignVertical: "center", textAlign: "center" }}
              color={coloresAIQ.blanco}
            >
              {cantP}
            </Text>
            <Button
              h={12}
              bg={coloresAIQ.cafeFood}
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                width: 50,
              }}
              endIcon={
                <FontAwesome
                  name='plus'
                  color={coloresAIQ.blanco}
                />
              }
              _pressed={{ bg: coloresAIQ.cafeClaroFood }}
              onPress={upCarrito}
            />
          </Flex>
        </Box>
        {/* btn AddCarrito */}
        <Center marginY={4}>
            <Button
                leftIcon={<MaterialCommunityIcons
                    name='cart-plus'
                    size={24}
                    color={coloresAIQ.blanco}/>}
                bg={coloresAIQ.naranjaOscuroFood}
                mt='3'
                width={250}
                height={55}
                borderRadius={32}
                onPress={() => {enviaDatos(comentario)}}
                _pressed={{
                    bg: coloresAIQ.naranjaOscuroFood}}>
                <Text
                    color={coloresAIQ.blanco}
                    fontSize='md'
                    fontFamily='body'>
                    Agregar producto
                </Text>
            </Button>
        </Center>
    </ScrollView>
  )
}

export default Producto