import React, {useState, useEffect} from 'react'
import { ScrollView, View, StyleSheet, Text, Alert } from 'react-native';
import { Image, Box, Center, Flex } from 'native-base';
import coloresAIQ from '../../../styles/coloresAIQ';
import { getIdCart, getIdPedido, urlImg, enviaConfirmacion } from '../../../api/controlWS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DetallePedido } from '../../components/Textos';
import estilosAIQ from '../../../styles/estilosAIQ';
import LottieConfirm from '../../components/Lotties/LottieConfirm';

const Pedidos = (props) => {
  //Carga datos
  const [arrPedido, setArrPedido] = useState([]);

  const getPedido = async() => {
    const idMesa = await AsyncStorage.getItem('ID_MESA');
    const idCart = await getIdCart(JSON.parse(idMesa));
    const pedidoData = await getIdPedido(idCart);
    setArrPedido([pedidoData]);    

    if (pedidoData.id_status == 2) {
      enviaConfirmacion(pedidoData.telefono, pedidoData.nombre_alias, pedidoData.id_pedido, pedidoData.nombre, pedidoData.total)
      props.navigation.navigate("InicioAds")
      Alert.alert(
        'Pedido aceptado',
        `Tu pedido ha sido aceptado.
Gracias por usar nuestra app :D` ,
        [{
          text: 'Ok',
          onPress: () => {},
          style: 'default',
        }]);
    }
    else if (pedidoData.id_status == 6) {
      enviaConfirmacion(pedidoData.telefono, pedidoData.nombre_alias, pedidoData.id_pedido, 0, 0)
      props.navigation.navigate("InicioAds")
      Alert.alert(
        'Pedido rechazado',
        `Tu pedido ha sido rechazado :(
Intenta realizar otro pedido.` ,
        [{
          text: 'Ok',
          onPress: () => {},
          style: 'default',
        }]);
    }
  }

  useEffect(() => {
    const cambiaTamaño = setInterval(() => {
      getPedido();
    }, 10000);
    return () => {
      // clean up
      clearInterval(cambiaTamaño);
    };
  })

  useEffect(() => {
    getPedido();
  }, [])

  return (
    <>
      <ScrollView flex={1}>
        <Box flex={2} p={3}>
          {arrPedido.length > 0 ?
            (arrPedido.map((item) => {
              return(
                <Box                       
                style={{ borderRadius: 12 }}
                key={item.id_pedido}
                shadow={3}
                m={2}
                mt={2}
                _light={{
                  backgroundColor: coloresAIQ.blanco,
                }}>
                  <View><Flex direction='row'>
                    <Image
                    style={estilosAIQ.imagenPedido}
                    imageStyle={{
                        borderRadius: 55,
                    }}
                    source={{uri: urlImg + item.avatar}}
                    alt={item.nombre}
                    size={"xl"}
                    />
                    <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                    {/* id pedido */}
                    <DetallePedido detalle={`Pedido: #${item.id_pedido}`}/>
                    {/* Restaurente */}
                    <DetallePedido detalle={`De: ${item.nombre}`}/>
                    {/* Total */}
                    <DetallePedido detalle={`Total: $${item.total}`}/>
                    {/* Restaurente */}
                    <DetallePedido detalle={`Estado: ${item.estado}`}/>
                    </Box>
                  </Flex></View>
                </Box>
              )
            })) : (null)}
        </Box>
        <View><Center>
          <LottieConfirm></LottieConfirm>
          <Text>Espera, estamos confirmando tu pedido.</Text>
        </Center></View>
      </ScrollView>
    </>
  );
};

export default Pedidos