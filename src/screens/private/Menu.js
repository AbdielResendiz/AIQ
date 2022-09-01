import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native';
import { Center, Image, Text, View } from 'native-base';
import coloresAIQ from '../../styles/coloresAIQ';
import Procesando from '../components/Procesando';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

const Menu = (props) => {
  const [cargando, setCargando] = useState(true);

  const idRest = props.route.params.idRes
  const descripcion = props.route.params.desc
  const imagen = props.route.params.imagen

  console.log(idRest);

  useEffect(() => {
    setCargando(false);
  }, [])

  return (
    <>
      {cargando ? <Procesando /> : null}
      <SafeAreaView flex={1} flexDirection={'column'} style={{backgroundColor: coloresAIQ.amarilloFood}}>
        {/* Datos restaurante */}
        <View flex={1}>
          <Center flex={1} paddingTop={3}>
            {/* Logo */}
            <Image
                style={{
                resizeMode: "cover",
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                }}
                imageStyle={{
                borderRadius: 55,
                }}
                source={{require: imagen}}
                alt={"Logo restaurante"}
                size={"xl"}/>
            {/* Nombre */}
            <Text
                fontFamily='heading'
                fontSize='xl'
                color={coloresAIQ.negro}>
                {idRest}
            </Text>
            {/* Descripcion */}
            <Text
                color={coloresAIQ.grisOscuroAIQ}
                fontSize='md'
                fontFamily='body'>
                {descripcion}
            </Text>
          </Center>
        </View>
      </SafeAreaView>
    </>
  )
}

export default Menu