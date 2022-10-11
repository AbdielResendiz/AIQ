import React, {useState, useEffect} from 'react'
import { ScrollView, Text, View, Box, Center, Button, FormControl } from 'native-base'
import { TextInput, Alert, } from 'react-native';
import {FontAwesome, Entypo} from '@expo/vector-icons';
import coloresAIQ from '../../styles/coloresAIQ';
import estilosAIQ from '../../styles/estilosAIQ';
import Logo from '../components/Logo';
import { Indicaciones, TituloInput } from '../components/Textos';
import { getCodigo, creaPedido, getTotalCart, getIdCart,  insertCode, enviaMensaje, deleteCode} from '../../api/controlWS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProcesandoAir from '../components/ProcesandoAir';
import IntlPhoneInput from 'react-native-intl-phone-input';

const ConfirmarPedido = (props) => {
  const metodo = props.route.params.datoMetodo;
  const monto = props.route.params.datoMonto;
  const [cargando, setCargando] = useState(true);
  const [loading, setLoading] = useState(false);
  //datos de usuario
  const [alias, setAlias] = useState('');
  const [celular, setCelular] = useState('');
  const [codigo, setCodigo] = useState('');
  //validaciones N=Name, P=Phone, C=Code
  const [validoN, setValidoN] = useState(false);
  const [validoP, setValidoP] = useState(false);
  const [validoC, setValidoC] = useState(false);
  const cambioN = () => setValidoN(false);
  const cambioC = () => setValidoC(false);

    //datos de input celular
    onChangeText = ({dialCode, unmaskedPhoneNumber, phoneNumber, isVerified}) => {
        setCelular(dialCode+unmaskedPhoneNumber);
        setValidoP(isVerified);
      };

  const enviaWhats = async() => {
    if (alias.length == 0) {
        setValidoN(true);
        setAlias('');
        return;
    } //validando celular
    if (validoP == false) {
        return;
    } else {
        let randomCod = (Math.random() + 1).toString(36).substring(6);
        await insertCode(randomCod);
        await enviaMensaje(parseInt(celular), randomCod, alias);
        Alert.alert(
            'Mensaje enviado',
            'Favor de revisar tu Whatsapp.',
          )
    }
  }

  //funcion envia datos y genera pedido, cod=codigo
  const validarCodigo = async(cod) => {
    //valida si el codigo esta vacio
    if (codigo.length < 4) {
        setValidoC(true);
        setCodigo('');
        return;
    } else {
        //inicio loader
        setLoading(true);
        //se envia codigo para validar si existe
        const m = await getCodigo(cod);
        if (m == true) {
            //vacia input
            setCodigo('');
            //datos para generar pedido
            const mesa = await AsyncStorage.getItem('ID_MESA');
            const idRest = await AsyncStorage.getItem('ID_REST');
            const t = await getTotalCart(JSON.parse(mesa));
            const idCar = await getIdCart(JSON.parse(mesa));
            await creaPedido(JSON.parse(mesa), alias, parseInt(celular), t, JSON.parse(idRest), metodo, idCar, monto);
            await deleteCode(cod);
            //fin loader if
            setLoading(false);
            //confirmacion de codigo existoso y navagacion a screen pedidos
            Alert.alert(
                'Código valido',
                'El código es correcto.' ,
                [{
                  text: 'Continuar',
                  onPress: () => {props.navigation.navigate("Pedidos")},
                  style: 'default',
                }]);
        } else {
            //fin loader else
            setLoading(false);
            //si el codigo es invalido
            setCodigo('');
            Alert.alert(
                'ERROR',
                'El código es invalido, vuelve a intentarlo.' ,
            );
        }
    }
  }

  useEffect(() => {
    setCargando(false);
  }, [])

  return (
    <>
      {cargando || loading ? <ProcesandoAir /> : null}
      <ScrollView flex={1}>
        <>
        {/* Logo */}
        <Logo/>
        {/* Indicaciones */}
        <Box>
            <Indicaciones indicacion={'¿Quíen recibirá el pedido?'} />
        </Box>

        {/* Input nombre */}
        <FormControl isInvalid={validoN}>
            <View  paddingX={8}>
                <TituloInput titulo={'Nombre/Alias:'} />
                <TextInput
                    keyboardType='default'
                    style={estilosAIQ.input}
                    placeholder="Ingresa un nombre/apellido o alias"
                    value={alias}
                    onChangeText={(val) => setAlias(val)}
                    onChange={cambioN}
                />
                <FormControl.ErrorMessage>
                    Ingresa un nombre o alias.
                </FormControl.ErrorMessage>
            </View>
        </FormControl>

        {/* Input celular */}
        <FormControl isInvalid={!validoP}>
            <View paddingY={2} paddingX={8}>
                <TituloInput titulo={'Celular:'} />
                <IntlPhoneInput 
                    onChangeText={this.onChangeText}
                    defaultCountry="MX" 
                    renderAction={() => 
                        <Entypo
                            name='phone'
                            size={28}
                            color={coloresAIQ.azulClaroAIQ}
                    />} 
                />
                <FormControl.ErrorMessage>
                    Ingresa un número valido.
                </FormControl.ErrorMessage>
            </View>
        </FormControl>

        {/* Indicaciones celular */}
        <Box flex={1} paddingTop={3} paddingX={8}>
            <Center>
                <Indicaciones indicacion='Te enviaremos un código de verifiación vía Whatsapp.'/>
            </Center>
        </Box>
        
        {/* Btn envia codigo */}
        <Center>
            <Button
                leftIcon={<FontAwesome
                    name={'send'}
                    size={20}
                    color={coloresAIQ.blanco}/>}
                bg={coloresAIQ.azulAIQ}
                mt='4'
                width={200}
                height={52}
                borderRadius={24}
                onPress={() => {enviaWhats()}}
                _pressed={{
                    bg: coloresAIQ.azulBtn}}>
                <Text
                    color={coloresAIQ.blanco}
                    fontSize='md'
                    fontFamily='body'>
                    Enviar código
                </Text>
            </Button>
        </Center>

        {/* margen */}
        {/* <View margin={2}/> */}

        {/* Indicaciones sin Whats */}
        {/* <Box flex={1} paddingTop={3} paddingX={8}>
            <Center>
                <Indicaciones indicacion='¿No cuentas con Whatsapp? Un mesero te compartirá un código.'/>
            </Center>
        </Box> */}

        {/* Btn envia mesero */}
        {/* <Center>
            <Button
                leftIcon={<FontAwesome5
                    name={'running'}
                    size={16}
                    color={coloresAIQ.blanco}/>}
                bg={coloresAIQ.azulAIQ}
                mt='1'
                width={150}
                height={42}
                borderRadius={18}
                onPress={() => {enviaMesero()}}
                _pressed={{
                    bg: coloresAIQ.azulBtn}}>
                <Text
                    color={coloresAIQ.blanco}
                    fontSize='sm'
                    fontFamily='body'>
                    Solicitar mesero
                </Text>
            </Button>
        </Center> */}

        {/* Input codigo */}
        <FormControl isInvalid={validoC}>
            <View paddingY={2} paddingX={8}>
                <TituloInput titulo={'Código'} />
                <TextInput
                    keyboardType='default'
                    autoCapitalize='none'
                    style={estilosAIQ.input}
                    placeholder="Ingresa el código enviado a Whatsapp"
                    value={codigo}
                    onChangeText={(val) => setCodigo(val)}
                    onChange={cambioC}
                />
                <FormControl.ErrorMessage>
                    Código erroneo, intentalo nuevamente.
                </FormControl.ErrorMessage>
            </View>
        </FormControl>
        {/* Btn confirma codigo */}
        <Center>
            <Button
                leftIcon={<FontAwesome
                    name={'check'}
                    size={20}
                    color={coloresAIQ.blanco}/>}
                bg={coloresAIQ.azulAIQ}
                mt='4'
                width={200}
                height={52}
                borderRadius={24}
                onPress={() => {validarCodigo(codigo)}}
                _pressed={{
                    bg: coloresAIQ.azulBtn}}>
                <Text
                    color={coloresAIQ.blanco}
                    fontSize='md'
                    fontFamily='body'>
                    Validar código
                </Text>
            </Button>
        </Center>  
        </>
      </ScrollView>
    </>

  )
}

export default ConfirmarPedido