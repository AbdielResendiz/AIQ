import React from 'react'
import { View, Text, Center, Image } from 'native-base'
import coloresAIQ from '../../styles/coloresAIQ'

const Producto = (props) => {
  const nomProd = props.route.params.nombre
  const precio = props.route.params.precio
  const desc = props.route.params.desc
  const tiempo = props.route.params.tiempo
  return (
    <View
      flex={1}
      style={{backgroundColor: coloresAIQ.amarilloFood}}>
        {/* Imagen Producto */}
        <Center paddingTop={3}>
            <Image
                style={{
                resizeMode: "cover",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                }}
                source={require('../../../assets/Alimentos/cafe.jpeg')}
                alt={"Imagen producto"}
                size='200'/>
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
        {/* Descripcion y tiempo de producto */}
        <View paddingY={2} paddingX={8}>
            <Text                   
              fontSize={18}
              fontFamily='body'
              fontWeight={'bold'}
              color={coloresAIQ.negro}>
                Comentarios:
            </Text>
            
        </View>
    </View>
  )
}

export default Producto