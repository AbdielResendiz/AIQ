import React, {useState, useEffect} from 'react'
import { Text, Box, Flex, Center, Button, Stack, Input, ScrollView, FormControl } from 'native-base'
import coloresAIQ from '../../styles/coloresAIQ'
import RadioButtonRN from 'radio-buttons-react-native'; 
import {AntDesign, FontAwesome5, FontAwesome} from '@expo/vector-icons';
import { getTotalCart } from '../../api/controlWS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Logo';
import { Indicaciones, Titulos } from '../components/Textos';

const MetodoPago = (props) => {
  const [total, setTotal] = useState('');
  const [metodo, setMetodo] = useState('');
  const [monto, setMonto] = useState('');
  const [validoC, setValidoC] = useState(false);
  const cambioC = () => setValidoC(false);
  //idMesa en local sotarege
  const getMesa = async() => {
    const m = await AsyncStorage.getItem('ID_MESA');
    const p = await getTotalCart(JSON.parse(m));
    setTotal(p);
  }
  // opciones metodo de pago
  const opcRadioButton = [
    {
      label: 'Efectivo'
    },
    {
      label: 'Tarjeta'
    },
  ]

  const enviaMetodo = async() => {
    //validando metodos
    if (metodo == 'Efectivo') {
      //si es efectivo y monto vacio, retorna mensaje error
      if (monto.length == 0) {
        setValidoC(true);
        setMonto('');
        return;
      } else {
        //en caso de llenar todo, pasar a la sig. screen
        props.navigation.navigate("ConfirmaPedido", {
          datoMetodo: metodo,
          datoMonto: monto
        });
      }
    } else {
      //en caso de usar tarjeta, solo mandar el metodo
      props.navigation.navigate("ConfirmaPedido", {
        datoMetodo: metodo,
        datoMonto: ''
      });
    } 
  }

  useEffect(() => {
    getMesa();
  }, [])

  return (
    <ScrollView flex={1} margin={5} marginTop={1} showsVerticalScrollIndicator={false}>
      {/* Component Logo*/}
      <Logo/>
      {/* Titulo: Metodo */}
      <Titulos titulo='Selecciona método de pago:'/>
      {/* Box metodo */}
      <Box                       
        style={{ borderRadius: 12 }}
        shadow={3}
        m={3}
        _light={{
            backgroundColor: coloresAIQ.blanco,
        }}>
        <Flex direction='row'>
            <Box m={2} style={{width: 0, flexGrow: 1, flex: 1}}>
                <RadioButtonRN 
                    data={opcRadioButton} //llama arreglo metodo de pago
                    initial={1} //valor predefinido, efectivo
                    selectedBtn={(e) => {
                      setMetodo(e.label);
                    }} //manda metodo seleccionado
                    icon={
                      <FontAwesome
                      name="check-circle"
                      size={25}
                      color={coloresAIQ.azulClaroAIQ}/>
                    } //personalizar icono de seleccion
                />
            </Box>
        </Flex>
      </Box>

      {/* Total */}
      <Center>
        {/* Monto total */}
        <Text
          paddingTop={3}
          fontSize={22}
          fontFamily='heading'
          colorScheme={coloresAIQ.negro}>
          Total: ${total}
        </Text>
        {/* IVA */}
        <Indicaciones indicacion='*IVA incluido'/>
      </Center>

      {/*input monto efectivo */}
      {metodo == 'Efectivo' ? 
      (
        <FormControl isInvalid={validoC}> 
          <Stack>
            <Text
                mt={8}
                fontSize='md'
                fontFamily='body'
                fontWeight={'bold'}
                color={coloresAIQ.azulOscuroAIQ}>
                ¿Requieres cambio?
            </Text>
            <Input
                rounded={12}
                variant='outline'
                placeholder='Ingresa el monto de los billetes'
                fontFamily='body'
                keyboardType='numeric'
                autoCorrect={false}
                backgroundColor={coloresAIQ.blanco}
                InputRightElement={(
                  <Button
                  ml={1}
                  variant='link'
                  roundedLeft={0}
                  roundedRight='md'>
                    <FontAwesome5
                      name='money-bill-alt'
                      size={20}
                      color={coloresAIQ.azulClaroAIQ}
                    />
                  </Button>
                )}
                value={monto}
                onChangeText={(val) =>
                    setMonto(val)
                }
                onChange={cambioC}
            />
            <FormControl.ErrorMessage>
                Ingresa una cantidad.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl> 
      ) : null}

      {/* btn continuar */}
      <Center marginTop={2} marginBottom={4}>
        <Button
            leftIcon={<AntDesign
                name='check'
                size={24}
                color={coloresAIQ.blanco}/>}
            bg={coloresAIQ.azulAIQ}
            mt='3'
            width={250}
            height={55}
            borderRadius={32}
            onPress={() => {
              enviaMetodo();
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
  )
}

export default MetodoPago