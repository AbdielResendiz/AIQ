import React from 'react'
import { View, Text, Box, Flex, Image,} from 'native-base'
import coloresAIQ from '../../../styles/coloresAIQ'
import { ScrollView, TouchableOpacity } from 'react-native'

const Carrito = (props) => {

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
                    <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('MetodoPago');
                    }}><Flex direction='row'>
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
                        size={"lg"}
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
                        costo: ${item.precio}
                        </Text>
                        </Box>
                    </Flex></TouchableOpacity>
                </Box>
            )
        })) : (null)}
      </ScrollView>
    </View>
  )
}

export default Carrito