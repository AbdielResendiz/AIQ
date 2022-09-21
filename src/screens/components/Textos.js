import React from 'react'
import { Box, Text } from 'native-base'
import coloresAIQ from '../../styles/coloresAIQ'

export const Indicaciones = (props) => {
  return (
    <Box flex={1}>
        <Text
            fontSize='lg'
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
    fontSize={24}
    fontFamily='heading'
    colorScheme={coloresAIQ.negro}>
    {props.titulo}
    </Text>
  )
}