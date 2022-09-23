import React, {useState, useEffect} from 'react'
import { ScrollView, View, StyleSheet, Text, Alert } from 'react-native';
import { Divider, Image, Box, Center, Flex } from 'native-base';
import coloresAIQ from '../../../styles/coloresAIQ';

const Pedidos = (props) => {

  const foods = [
    {
      id: 1,
      title: "chicken",
      description: "pollo ",
        imagen: '../../../../assets/Alimentos/comida.jpeg',
      price: "$ 10.99",
    },
  ];

  const [pedido, setPedido] = useState(true)

  const generaAlert = async() => {
    Alert.alert(
      'Pedido aceptado',
      'Mensaje de demostración.' ,
      [{
        text: 'Ok',
        onPress: () => {props.navigation.navigate("InicioAds")},
        style: 'default',
      }]);
  }

  useEffect(() => {
    generaAlert();
  }, [])

  return (
    <>
      <ScrollView flex={1}>
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
                  alt={item.title}
                  size={"xl"}
                  />
                  <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                  {/* Nombre platillo */}
                  <Text
                  fontFamily='heading'
                  fontSize='xl'
                  color={coloresAIQ.naranjaOscuroFood}>
                  {item.title}
                  </Text>
                  {/* Costo de platillo */}
                  <Text
                  ml={1}
                  color={coloresAIQ.grisAIQ}
                  fontSize='md'
                  fontFamily='body'>
                  Costo: ${item.price}
                  </Text>
                  <Text
                  ml={1}
                  color={coloresAIQ.grisAIQ}
                  fontSize='md'
                  fontFamily='body'>
                  Estado: Confirmado
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