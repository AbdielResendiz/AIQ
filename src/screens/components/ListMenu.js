import React from 'react'
import {TouchableOpacity } from 'react-native';
import { Box, Image, Text, Flex } from 'native-base';
import coloresAIQ from '../../styles/coloresAIQ';


const ListMenu = (item) => {
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
            <TouchableOpacity
            onPress={() => {
                detalleProducto();
            }}><Flex direction='row'>
                <Image
                style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center",
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }}
                imageStyle={{
                    borderRadius: 55,
                }}
                source={{uri: item.imagen}}
                alt={item.nombre}
                size={"xl"}
                />
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
                </Box>
            </Flex></TouchableOpacity>
        </Box>
    )
}

export default ListMenu