import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, View, Text, Image } from 'native-base';
import coloresAIQ from '../../styles/coloresAIQ';
import { urlImg } from '../../api/controlWS';
import fetchPost from './fetchPost';

export default function DetallePedido(props) {

  const pedido = props.route.params.pedido;
  console.log("Datos pedido detalle : ", pedido)
  const [pedidoDetalle, setPedidoDetalle] = useState(null);

  useEffect(() => {
   getDatos()
  }, []);

  const getDatos = async () => {
    const dataUser = new FormData();
    dataUser.append('id_carrito', pedido.id_carrito);
    const url = `https://speedyeats.app/Pedidos/getDetallePedido/`;
    const options = {
      method: 'POST',
      body: dataUser,
    };
    const res = await fetchPost(url, options);

    console.log('DATOS DE GETDATOS:', res);
    setPedidoDetalle(res[0]);
    console.log('DATOS DE setpedido detalle:', res);
    
  };
  
  return (
    <NativeBaseProvider>
     <View bg={coloresAIQ.blanco} p={4}>
  {pedidoDetalle ? (
    <View>
  
      <Text style={{ fontSize: 22.5, color: coloresAIQ.azul, fontWeight: 'bold', textAlign: 'center'}}>
       {pedidoDetalle.nombre}
      </Text>


      <View style={{ alignItems: 'center' }}>
      <Image
          style={{ width: 200, height: 200, borderRadius: 25, marginTop: 10, marginBottom: 10 }}
          source={{ uri: urlImg + pedidoDetalle.imagen }}
          alt='No hay imagen del pedido de restaurante'
      />
      </View>
      
      <Text style={{ fontSize: 18, color: 'black', textAlign: 'center',fontWeight: 'bold'}}>
      {pedidoDetalle.descripcion}
      </Text>

      <Text> </Text>
      <Text  style={{ fontSize: 18, color: 'black',fontWeight: 'bold'}}>
        Precio: {pedidoDetalle.precio}
      </Text>
      <Text fontSize={18} color="black">
        Subtotal: {pedidoDetalle.subtotal}
      </Text>
      <Text fontSize={18} color="black">
        Cantidad: {pedidoDetalle.cantidad}
      </Text>
      <Text fontSize={18} color="black">
        Comentario: {pedidoDetalle.comentario}
      </Text>
     
    
      <Text fontSize={18} color="black">
        Tiempo de espera: {pedidoDetalle.tiempo}
      </Text>
    </View>
  ) : (
    <Text fontSize={16} color="black">
      Cargando el detalle del pedido...
    </Text>
  )}
</View> 
    </NativeBaseProvider>
  ); 
}
