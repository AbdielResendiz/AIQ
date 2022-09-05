import React, { useEffect, useState } from 'react';
import { 	
    Button,
	Text,
	Input,
	ScrollView,
	Box,
	Image,
	Stack,
	FormControl,
	useToast,
} from 'native-base'
import axios from 'axios';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import coloresAIQ from '../../styles/coloresAIQ';
import Procesando from '../components/Procesando';
import { Alert, View } from 'react-native';
import { ActivityIndicator } from 'react-native';

const Login = (props) => {
    const toast = useToast();

	const [usuario, setUsuario] = useState('');
    const borraUser = () => setUsuario('');

	const [contrasena, setContrasena] = useState('');
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const [cargando, setCargando] = useState(false);
	const [validoC, setValidoC] = useState(false);
	const [validoP, setValidoP] = useState(false);
	const cambioC = () => setValidoC(false);
	const cambioP = () => setValidoP(false);

    const [loader, setLoader] = useState('none');
    const [login, setLogin] = useState()
   

    useEffect(()=>{
        
    }, [])

	const demoServiciosAxios = async () => {
		
			setLoader('flex');
            var data = new FormData()
            data.append('id_mesa',usuario)
            data.append('password',contrasena)
          
            await fetch('https://v-csoft.com/AIQ/Mesas/existsTable/', {
                method: 'post',
                  body: data,
                  
              })
                .then((response) => response.json())
                .then((result) => {
                  console.log('Success:', result);
               
                  
                var acceso = result.res
                //setLogin(acceso)
  
		if (usuario.length == 0) {
			setValidoC(true);
			setUsuario('');
			return;
		}

		if (
			contrasena.length == 0
		) {
			setValidoP(true);
			setContrasena('');
			return;
		}

		setCargando(true);

		try {
			if (acceso === true) {
                props.navigation.navigate('InicioAds');
			}
			else {
                toast.show({
					status: 'warning',
					description: "Mesa o contraseña erroneo",
					placement: 'top',
				});
            
			}
			setUsuario('');
			setContrasena('');
			setCargando(false);

		} catch (e) {			
			toast.show({
				status: 'warning',
				description: "Error, favor de intentarlo más tarde",
				placement: 'top',
			});
			setUsuario('');
			setContrasena('');
			setCargando(false);
		}


         
                })
                .catch((ex) => {
                    Alert.alert('ERROR', ex.toString());
                });


                setLoader('none')
		 
		
	
	};





  return (
    <>
    {cargando ? <Procesando /> : null}
        <ScrollView margin={5} marginTop={1} showsVerticalScrollIndicator={false}>
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
            {/* Text: Indicaciones */}
            <Box flex={1}>
                <Text
                    mt={2}
                    fontSize='md'
                    fontFamily='body'
                    alignSelf='center'
                    textDecorationLine='underline'
                    color={coloresAIQ.negro}>
                    Vincular dispositivo con una mesa
                </Text>
            </Box>

            {/* Input Mesa */}
            <FormControl isInvalid={validoC}>
                <Stack>
                    <Text
                        mt={8}
                        fontSize='md'
                        fontFamily='body'
                        fontWeight={'bold'}
                        color={coloresAIQ.azulOscuroAIQ}>
                        MESA
                    </Text>
                    <Input
                        rounded={12}
                        variant='outline'
                        placeholder='Escribe el número de mesa'
                        fontFamily='body'
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        InputRightElement={(
                            <Button
                            ml={1}
                            variant='link'
                            roundedLeft={0}
                            roundedRight='md'
                            onPress={borraUser}
                            _pressed={{
                                bg: coloresAIQ.grisClaroAiq,
                            }}>
                            <MaterialIcons
                                name='cancel'
                                size={20}
                                color={coloresAIQ.grisOscuroAIQ}
                            />
                        </Button>
                        )}
                        value={usuario}
                        onChangeText={(val) =>
                            setUsuario(val)
                        }
                        onChange={cambioC}
                    />
                    <FormControl.ErrorMessage>
                        Ingresa una mesa valida.
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>
            
            {/* Input Password */}
            <FormControl isInvalid={validoP}>
                <Stack>
                    <Text
                        mt={8}
                        fontSize='md'
                        fontFamily='body'
                        fontWeight={'bold'}
                        color={coloresAIQ.azulOscuroAIQ}>
                        CONTRASEÑA
                    </Text>
                    <Input
                        rounded={12}
                        fontFamily='body'
                        type={
                            show ? 'text' : 'password'
                        }
                        InputRightElement={
                            <Button
                                ml={1}
                                variant='link'
                                roundedLeft={0}
                                roundedRight='md'
                                onPress={handleClick}
                                _pressed={{
                                    bg: coloresAIQ.grisClaroAiq,
                                }}>
                                {show ? (
                                    <FontAwesome
                                        name='eye-slash'
                                        size={20}
                                        color={coloresAIQ.grisOscuroAIQ}
                                    />
                                ) : (
                                    <FontAwesome
                                        name='eye'
                                        size={20}
                                        color={coloresAIQ.grisOscuroAIQ}
                                    />
                                )}
                            </Button>
                        }
                        placeholder='Escribe tu contraseña'
                        value={contrasena}
                        onChangeText={(val) =>
                            setContrasena(val)
                        }
                        onChange={cambioP}
                    />
                    <FormControl.ErrorMessage>
                        Ingresa una contraseña valida.
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>

            <Button
                bg={coloresAIQ.azulAIQ}
                mt='10'
                size='lg'
                borderRadius={32}
                onPress={demoServiciosAxios}
                _pressed={{
                    bg: coloresAIQ.azulBtn}}>
                <Text
                    color={coloresAIQ.blanco}
                    fontSize='md'
                    fontFamily='body'>
                    Axios
                </Text>
            </Button>
      

			<View
				style={{
					marginVertical: 100,
					alignItems: 'center',
					alignContent: 'center',
					display: loader,
				}}>
				<ActivityIndicator
					size='large'
					color='#333'
				/>
			</View>
            
            {/* Boton Vincular */}
            <Button
                bg={coloresAIQ.azulAIQ}
                mt='10'
                size='lg'
                borderRadius={32}
                onPress={()=>{
                    demoServiciosAxios();
                    // validarDatos();
                }}
                _pressed={{
                    bg: coloresAIQ.azulBtn}}>
                <Text
                    color={coloresAIQ.blanco}
                    fontSize='md'
                    fontFamily='body'>
                    VINCULAR
                </Text>
            </Button>
       

        </ScrollView>
    </>
  )
}

export default Login