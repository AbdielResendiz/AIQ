import React, {useState, useEffect} from 'react'
import { ScrollView, Text, View, Box, Image, Center } from 'native-base'
import { TextInput } from 'react-native'
import Procesando from '../components/Procesando';
import coloresAIQ from '../../styles/coloresAIQ';

const ConfirmarPedido = () => {
  const [cargando, setCargando] = useState(true);
  const [alias, setAlias] = useState('');
  const [celular, setCelular] = useState('');
  const [codigo, setCodigo] = useState('');

  useEffect(() => {
    setCargando(false);
  }, [])

  return (
    <>
      {cargando ? <Procesando /> : null}
      <ScrollView>
        {/* Logo */}
        <Box flex={1}>
            <Image
                source={require('../../../assets/image/AIQ.png')}
                alignContent={'center'}
                alignSelf={'center'}
                resizeMode='center'
                alt='AIQ'
                size={'2xl'}/>
        </Box>

        {/* Indicaciones */}
        <Box flex={1}>
            <Center>
                <Text
                fontSize={22}
                fontFamily='body'
                colorScheme={coloresAIQ.negro}>
                ¿Quién recibirá el pedido?
                </Text>
            </Center>
        </Box>

        {/* Indicaciones */}
        <View paddingY={2} paddingX={8}>
            <Text                   
              fontSize={18}
              fontFamily='body'
              fontWeight={'bold'}
              color={coloresAIQ.negro}>
                Comentarios:
            </Text>
            <TextInput
                style={{ 
                    padding: 10,
                    textAlignVertical: 'top', 
                    borderWidth: 1.5, 
                    borderColor: coloresAIQ.grisOscuroAIQ,
                    borderRadius: 8,
                    backgroundColor: coloresAIQ.blanco
                 }}
                placeholder="Escribe tus comentarios"
                value={alias}
                onChangeText={(val) => setAlias(val)}
            />
        </View>
      </ScrollView>
    </>

  )
}

export default ConfirmarPedido