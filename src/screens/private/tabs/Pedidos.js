import React, {useState} from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Divider, Image,Box,Center,Flex } from 'native-base';
import coloresAIQ from '../../../styles/coloresAIQ';
import estilosAIQ from '../../../styles/estilosAIQ';

const Pedidos = () => {

const foods = [
  {
    id: 1,
    title: "chicken",
    description:
      "pollo ",
      imagen: '../../../../assets/Alimentos/comida.jpeg',

    price: "$ 10.99",
  },
  {
    id: 2,
    title: "barbecued chicken",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quis quam architecto. ",
      imagen: '../../../../assets/Alimentos/comida.jpeg',
    price: "$ 14.99",
  },
  {
    id: 3,
    title: "barbecued chicken",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quis quam architecto. ",
      imagen: '../../../../assets/Alimentos/comida.jpeg',
    price: "$ 14.99",
  },
];

  const [pedido, setPedido] = useState(true)

  return (
    <>
    <ScrollView flex={1}
            >
              <Box flex={2} p={3}>
              {pedido == true && foods.length > 0 ? 
                (foods.map((item) => {
                    return(
                        <Box                       
                        style={{ borderRadius: 12 }}
                        key={item.id}
                        shadow={3}
                        m={2}
                        mt={2}
                        _light={{
                          backgroundColor: coloresAIQ.blanco,
                        }}>
                            <View><Flex direction='row'>
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
                                source={require('../../../../assets/Alimentos/comida.jpeg')}
                                alt={item.nombre}
                                size={"xl"}
                                />
                                <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                                {/* Nombre platillo */}
                                <Text
                                fontFamily='heading'
                                fontSize='xl'
                                color={coloresAIQ.naranjaOscuroFood}>
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
                            </Flex></View>
                        </Box>
                    )
                })) : (null)}
              </Box>
            </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
  cardView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    marginHorizontal:8,
    marginVertical:5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }

});

export default Pedidos