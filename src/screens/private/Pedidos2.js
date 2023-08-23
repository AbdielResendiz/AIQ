import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, View, Text, ScrollView, Image } from 'native-base';
import { Button } from 'react-native-elements';
import { FontAwesome, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchPost from './fetchPost';
import coloresAIQ from '../../styles/coloresAIQ';
import Loader from '../components/Loader';
import estilosAIQ from '../../styles/estilosAIQ';
import { urlImg } from '../../api/controlWS';

export default function Pedidos2(props) {
  const [loading, setLoading] = useState(true);
  const [arrPedidos, setArrPedidos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [idUser, setIdUser] = useState(null);
  



 
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('idUser');
      if (value !== null) {
        console.log('valor id getData', parseInt(value));
        setIdUser(value);
        getDatos(value);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  useEffect(() => {
    getData();
    console.log('iddd', idUser);
  }, []);

  const getDatos = async (value) => {
    const dataUser = new FormData();
    console.log('DATA USER : ', value);
    dataUser.append('id_mesa', value);
    const url = `https://speedyeats.app/Pedidos/infopedido/`;
    const options = {
      method: 'POST',
      body: dataUser,
    };
    const res = await fetchPost(url, options);

    console.log('res getDatos :', res);

    if (res && res.data) {
      setArrPedidos(res.data);
    }

    setLoading(false);
  };

  return (
    <NativeBaseProvider>
      <View bg={coloresAIQ.blanco}>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView mx={3} mb={4} contentContainerStyle={{ alignItems: 'center' }}>
            {arrPedidos.length === 0 ? (
              <Text style={{ fontSize: 18, marginTop: 20 }}>Por el momento no tienes pedidos, realiza alguna compra para ver tu historial! c:</Text>
            ) : (
              arrPedidos.map((pedido, index) => (
                <View
                  key={index}
                  style={{
                    width: '100%',
                    borderBottomWidth: 2,
                    borderColor: coloresAIQ.grisClaro,
                    paddingVertical: 8,
                    borderRadius: 10,
                    backgroundColor: coloresAIQ.blanco,
                    shadowColor: 'black',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 1 },
                    shadowRadius: 2,
                    marginBottom: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, color: coloresAIQ.azul, fontWeight: 'bold' }}>
                      N° de Pedido: {pedido.id_pedido}
                    </Text>
                    <Text style={{ fontSize: 16 }}>A nombre de: {pedido.nombre_alias}</Text>
                    <Text style={{ fontSize: 16 }}>Estatus: {pedido.estado}</Text>
                    <Text style={{ fontSize: 16 }}>Teléfono: {pedido.telefono}</Text>
                    <Text style={{ fontSize: 16 }}>Restaurante: {pedido.nombre}</Text>
                    <Text style={{ fontSize: 16 }}>Id_carrito: {pedido.id_carrito}</Text>
                    <Text style={{ fontSize: 16, color: coloresAIQ.verde, fontWeight: 'bold' }}>
                      Total: {pedido.total}
                    </Text>
                    {/* ...otros campos de pedido... */}
                  </View>
                  
                  {/* Contenedor de imagen y botón */}
                  <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                    {/* Imagen */}
                    <Image
                      style={{ width: 125, height: 125, borderRadius: 25 }}
                      source={{ uri: urlImg + pedido.avatar }}
                      alt='No hay imagen del pedido de restaurante'
                    />
                    
                    <Button
                      title="Ver el detalle"
                      buttonStyle={{
                        backgroundColor: coloresAIQ.azul,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        marginTop: 10,
                      }}
                      titleStyle={{ fontWeight: 'bold', color: 'black' }}
                      onPress={() => props.navigation.navigate('DetallePedido', {pedido })}

                    />
                    
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
    </NativeBaseProvider>
  );
}
