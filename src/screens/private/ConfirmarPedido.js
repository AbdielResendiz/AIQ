import React, {useState, useEffect} from 'react'
import { ScrollView, Text, View, Box, Center, Button, FormControl } from 'native-base'
import { TextInput } from 'react-native';
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import Procesando from '../components/Procesando';
import coloresAIQ from '../../styles/coloresAIQ';
import Logo from '../components/Logo';
import { Indicaciones } from '../components/Textos';

const ConfirmarPedido = (props) => {
  const metodo = props.route.params.datoMetodo;
  const monto = props.route.params.datoMonto;
  const [cargando, setCargando] = useState(true);
  const [alias, setAlias] = useState('');
  const [celular, setCelular] = useState('');
  const [codigo, setCodigo] = useState('');
  //validaciones N=Name, P=Phone, C=Code
  const [validoN, setValidoN] = useState(false);
  const [validoP, setValidoP] = useState(false);
  const [validoC, setValidoC] = useState(false);
  const cambioN = () => setValidoN(false);
  const cambioP = () => setValidoP(false);
  const cambioC = () => setValidoC(false);

  const generaPedido = async() => {
    //validando nombre
    if (alias.length == 0) {
        setValidoN(true);
        setAlias('');
        return;
    } //validando celular
    if (celular.length == 0) {
        setValidoP(true);
        setCelular('');
        return;
    } //validando codigo
    if (codigo.length == 0) {
        setValidoC(true);
        setCodigo('');
        return;
    }
    else {
        console.log('nombre valido');
        props.navigation.navigate("Pedidos")
    }
  }

  useEffect(() => {
    setCargando(false);
  }, [])

  return (
    <>
      {cargando ? <Procesando /> : null}
      <ScrollView>
        {/* Logo */}
        <Logo/>
        {/* Indicaciones */}
        <Box>
            <Center>
                <Text
                fontSize={22}
                fontFamily='body'
                colorScheme={coloresAIQ.negro}>
                ¿Quién recibirá el pedido?
                </Text>
            </Center>
        </Box>

        {/* Input nombre */}
        <FormControl isInvalid={validoN}>
            <View paddingY={2} paddingX={8}>
                <Text
                marginY={2}                 
                fontSize={18}
                fontFamily='body'
                fontWeight={'bold'}
                color={coloresAIQ.negro}>
                    Nombre/Alias:
                </Text>
                <TextInput
                    style={{ 
                        padding: 4,
                        borderWidth: 1.5, 
                        borderColor: coloresAIQ.grisOscuroAIQ,
                        borderRadius: 8,
                        backgroundColor: coloresAIQ.blanco
                    }}
                    placeholder="Ingresa un nombre/apellido o alias"
                    value={alias}
                    onChangeText={(val) => setAlias(val)}
                />
                <FormControl.ErrorMessage>
                    Ingresa un nombre o alias.
                </FormControl.ErrorMessage>
            </View>
        </FormControl>
        {/* Indicaciones celular */}
        <Box flex={1} paddingTop={3} paddingX={8}>
            <Center>
                <Indicaciones indicacion='Te enviaremos un codigo de verifiación vía Whatsapp'/>
            </Center>
        </Box>

        {/* Input celular */}
        <FormControl isInvalid={validoP}>
            <View paddingY={2} paddingX={8}>
                <Text
                marginY={2}                 
                fontSize={18}
                fontFamily='body'
                fontWeight={'bold'}
                color={coloresAIQ.negro}>
                    Celular:
                </Text>
                <TextInput
                    style={{ 
                        padding: 4,
                        borderWidth: 1.5, 
                        borderColor: coloresAIQ.grisOscuroAIQ,
                        borderRadius: 8,
                        backgroundColor: coloresAIQ.blanco
                    }}
                    placeholder="Ingresa tu celular"
                    value={celular}
                    onChangeText={(val) => setCelular(val)}
                />
                <FormControl.ErrorMessage>
                    Ingresa un numero valido.
                </FormControl.ErrorMessage>
            </View>
        </FormControl>
        {/* Btn envia codigo */}
        <Center>
            <Button
                leftIcon={<FontAwesome
                    name='send'
                    size={16}
                    color={coloresAIQ.blanco}/>}
                bg={coloresAIQ.azulAIQ}
                mt='1'
                width={150}
                height={42}
                borderRadius={18}
                onPress={() => {}}
                _pressed={{
                    bg: coloresAIQ.azulBtn}}>
                <Text
                    color={coloresAIQ.blanco}
                    fontSize='sm'
                    fontFamily='body'>
                    Enviar código
                </Text>
            </Button>
        </Center>

        {/* Input codigo */}
        <FormControl isInvalid={validoC}>
            <View paddingY={2} paddingX={8}>
                <Text
                marginY={2}                 
                fontSize={18}
                fontFamily='body'
                fontWeight={'bold'}
                color={coloresAIQ.negro}>
                    Código:
                </Text>
                <TextInput
                    style={{ 
                        padding: 4,
                        borderWidth: 1.5, 
                        borderColor: coloresAIQ.grisOscuroAIQ,
                        borderRadius: 8,
                        backgroundColor: coloresAIQ.blanco
                    }}
                    placeholder="Ingresa el código enviado a Whatsapp"
                    value={codigo}
                    onChangeText={(val) => setCodigo(val)}
                />
                <FormControl.ErrorMessage>
                    Codigo erroneo, intentalo nuevamente.
                </FormControl.ErrorMessage>
            </View>
        </FormControl>
        {/* Btn confirma codigo */}
        <Center>
            <Button
                leftIcon={<AntDesign
                    name='check'
                    size={16}
                    color={coloresAIQ.blanco}/>}
                bg={coloresAIQ.azulAIQ}
                mt='1'
                width={150}
                height={42}
                borderRadius={18}
                onPress={() => {}}
                _pressed={{
                    bg: coloresAIQ.azulBtn}}>
                <Text
                    color={coloresAIQ.blanco}
                    fontSize='sm'
                    fontFamily='body'>
                    Validar código
                </Text>
            </Button>
        </Center>

        {/* btn continuar */}
        <Center marginTop={2} marginBottom={4}>
            <Button
                leftIcon={<AntDesign
                    name='arrowright'
                    size={24}
                    color={coloresAIQ.blanco}/>}
                bg={coloresAIQ.azulAIQ}
                mt='3'
                width={250}
                height={55}
                borderRadius={32}
                onPress={() => {
                    generaPedido();
                }}
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
      </ScrollView>
    </>

  )
}

export default ConfirmarPedido