import React from 'react'
import { Box, Text } from 'native-base'
import coloresAIQ from '../../styles/coloresAIQ'

//componentes de textos, tipo hoja de estilos
export const Indicaciones = (props) => {
  return (
    <Box flex={1}>
        <Text
            fontSize='xl'
            fontFamily='body'
            alignSelf='center'
            color={coloresAIQ.negro}>
            {props.indicacion}
        </Text>
    </Box>
  )
}

export const Titulos = (props) => {
  return (
    <Text
    paddingX={4}
    paddingY={2}
    fontSize={30}
    fontFamily='heading'
    colorScheme={coloresAIQ.negro}>
    {props.titulo}
    </Text>
  )
}

export const InfoProducto = (props) => {
  return(
    <Text                   
      fontSize={24}
      fontWeight={'bold'}
      color={coloresAIQ.negro}>
        {props.info}
    </Text>
  )
}

export const DetalleProducto = (props) => {
  return(
    <Text                   
      fontSize={24}
      color={coloresAIQ.grisOscuroAIQ}>
        {props.detalle}
    </Text>
  )
}

export const TextBoxProd = (props) => {
  return(
    <Text
      ml={1}
      color={coloresAIQ.grisAIQ}
      fontSize='xl'
      fontFamily='body'>
      {props.dato}
    </Text>
  )
}

export const NombreBoxProd = (props) => {
  return(
    <Text
      fontFamily='heading'
      fontSize='2xl'
      color={props.color}>
      {props.nombre}
    </Text>
  )
}

export const NombreBox = (props) => {
  return(
    <Text
      fontFamily='heading'
      fontSize='3xl'
      color={props.color}>
      {props.nombre}
    </Text>
  )
}

export const TituloInput = (props) => {
  return(
    <Text
      mt={8}
      fontSize='2xl'
      fontFamily='body'
      fontWeight={'bold'}
      color={coloresAIQ.azulOscuroAIQ}>
      {props.titulo}
    </Text>
  )
}

export const DetallePedido = (props) => {
  return(
    <Text
    ml={1}
    color={coloresAIQ.grisAIQ}
    fontSize='md'
    fontFamily='body'>
    {props.detalle}
    </Text>
  )
}