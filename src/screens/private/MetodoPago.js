import React from 'react'
import { Text, View, Box, Flex, Center, Button } from 'native-base'
import coloresAIQ from '../../styles/coloresAIQ'
import RadioButtonRN from 'radio-buttons-react-native'; 
import {AntDesign} from '@expo/vector-icons'

const MetodoPago = (props) => {
  
    const opcRadioButton = [
        {
          label: 'Efectivo'
        },
        {
          label: 'Tarjeta'
        },
      ]

  return (
    <View flex={1}>
      {/* Titulo: Metodo */}
      <Text
        paddingX={4}
        paddingTop={4}
        paddingBottom={2}
        fontSize={24}
        fontFamily='heading'
        colorScheme={coloresAIQ.negro}>
        Selecciona metodo de pago
      </Text>
      
      {/* Box metodo */}
      <Box                       
        style={{ borderRadius: 12 }}
        shadow={3}
        m={3}
        _light={{
            backgroundColor: coloresAIQ.blanco,
        }}>
        <Flex direction='row'>
            <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                <RadioButtonRN 
                    data={opcRadioButton}
                />
            </Box>
        </Flex>
      </Box>

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

      {/* btn continuar */}
      <Center marginTop={2} marginBottom={4}>
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
            onPress={() => props.navigation.navigate("ConfirmaPedido")}
            _pressed={{
                bg: coloresAIQ.azulBtn}}>
            <Text
                color={coloresAIQ.blanco}
                fontSize='md'
                fontFamily='body'>
                Continuar
            </Text>
        </Button>
      </Center>
    </View>
  )
}

export default MetodoPago