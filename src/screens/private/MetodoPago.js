import React, {useState, useEffect} from 'react'
import { Text, View, Box, Flex, Center, Button, Stack, Input } from 'native-base'
import coloresAIQ from '../../styles/coloresAIQ'
import RadioButtonRN from 'radio-buttons-react-native'; 
import {AntDesign, FontAwesome5} from '@expo/vector-icons';
import { getTotalCart } from '../../api/controlWS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  
  const opcRadioButton = [
    {
      label: 'Efectivo'
    },
    {
      label: 'Tarjeta'
    },
  ]

  useEffect(() => {
    getMesa();
  }, [])

  return (
    <View flex={1} margin={5} marginTop={1}>
      {/* Titulo: Metodo */}
      <Text
        paddingX={4}
        paddingTop={4}
        paddingBottom={2}
        fontSize={24}
        fontFamily='heading'
        colorScheme={coloresAIQ.negro}>
        Selecciona metodo de pago
      </Text>
      
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
                    data={opcRadioButton}
                    selectedBtn={(e) => {
                      setMetodo(e.label)
                      console.log('console', e.label);
                    }}
                    icon={
                      <Icon
                        name="check-circle"
                        size={25}
                        color="#2c9dd1"
                      />
                    }
                />
            </Box>
        </Flex>
      </Box>

      {/* Total */}
      <Center>
        <Text
          paddingX={4}
          paddingTop={3}
          fontSize={22}
          fontFamily='heading'
          colorScheme={coloresAIQ.negro}>
          Total: ${total}
        </Text>
        {/* prueba, escucha metodo */}
        <Text
          paddingX={4}
          paddingTop={3}
          fontSize={22}
          fontFamily='heading'
          colorScheme={coloresAIQ.negro}>
          Selecciono: {metodo}
        </Text>
      </Center>

      {metodo == 'Efectivo' ? 
      (
        //<FormControl> 
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
                keyboardType='default'
                autoCapitalize='none'
                autoCorrect={false}
                InputRightElement={(
                  <Button
                  ml={1}
                  variant='link'
                  roundedLeft={0}
                  roundedRight='md'>
                    <FontAwesome5
                        name='money-bill-alt'
                        size={20}
                        color={coloresAIQ.grisOscuroAIQ}
                    />
                  </Button>
                )}
                value={monto}
                onChangeText={(val) =>
                    setUsuario(val)
                }
                onChange={cambioC}
            />
            {/* <FormControl.ErrorMessage>
                Ingresa una cantidad.
            </FormControl.ErrorMessage> */}
          </Stack>
        // </FormControl> 
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
            onPress={() => props.navigation.navigate("ConfirmaPedido")}
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
    </View>
  )
}

export default MetodoPago