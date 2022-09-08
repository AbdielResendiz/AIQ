import React, {useState} from 'react'
import { View, Text, Center, Image, ScrollView, Button} from 'native-base'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { urlImg } from '../../api/controlWS'
import coloresAIQ from '../../styles/coloresAIQ'
import { TextInput } from 'react-native'

const Producto = (props) => {
  const [comentario, setComentario] = useState('');

  const idRes = props.route.params.idRest
  const nomProd = props.route.params.nombre
  const desc = props.route.params.desc
  const precio = props.route.params.precio
  const imagen = props.route.params.imagen
  const tiempo = props.route.params.tiempo
  

  const enviaDatos = async (comentario, nombre, precio, idRes) => {
    props.navigation.navigate("Carrito", {
      comentario: comentario,
      nombre: nombre,
      precio: precio,
      idRes: idRes
    });
  }
  return (
    <ScrollView flex={1}>
        {/* Imagen Producto */}
        <Center paddingTop={4}>
            <Image
                style={{
                resizeMode: "cover",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                }}
                source={{uri: urlImg+imagen}}
                alt={"Imagen producto"}
                size='180'/>
        </Center>
        {/* Nombre Producto y precio */}
        <Center p={4}>
            <Text                   
              fontSize={22}
              fontFamily='heading'
              color={coloresAIQ.negro}>
                {nomProd}
            </Text>
            <Text                   
              fontSize={20}
              fontFamily='heading'
              color={coloresAIQ.azulOscuroAIQ}>
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
        {/* Comentarios */}
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

        {/* btn AddCarrito */}
        <Center marginY={4}>
            <Button
                leftIcon={<MaterialCommunityIcons
                    name='cart-plus'
                    size={24}
                    color={coloresAIQ.blanco}/>}
                bg={coloresAIQ.azulAIQ}
                mt='3'
                width={250}
                height={55}
                borderRadius={32}
                onPress={() => {enviaDatos(comentario, nomProd, precio, idRes)}}
                _pressed={{
                    bg: coloresAIQ.azulBtn}}>
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