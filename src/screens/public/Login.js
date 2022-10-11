import React, { useState } from 'react';
import { Button, Text, Input, ScrollView, Stack, FormControl, useToast } from 'native-base'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import coloresAIQ from '../../styles/coloresAIQ';
import { Alert } from 'react-native';
import ProcesandoAir from '../components/ProcesandoAir';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logo from '../components/Logo';
import {Indicaciones, TituloInput} from '../components/Textos';

const Login = (props) => {
    //aviso mesa o contra erroneos
    const toast = useToast();
    //datos mesa
	const [usuario, setUsuario] = useState('');
    const borraUser = () => setUsuario('');
	const [contrasena, setContrasena] = useState('');
    //show/hide pass
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
    //carga
	const [cargando, setCargando] = useState(false);
    //validaciones C=Mesa, P=Password
	const [validoC, setValidoC] = useState(false);
	const [validoP, setValidoP] = useState(false);
	const cambioC = () => setValidoC(false);
	const cambioP = () => setValidoP(false);

    //funcion login
	const demoServiciosAxios = async () => {	
		setCargando(true);
        var data = new FormData()
        data.append('nombre',usuario)
        data.append('password',contrasena)
          
        //conexion con wb login
        await fetch('https://v-csoft.com/AIQ/Mesas/existsMesa/', {
                method: 'post',
                  body: data,
                  
        })
        .then((response) => response.json())
        .then((result) => {
            var acceso = result.res
            //validando mesa y contraseña
            if (usuario.length == 0) {
                setValidoC(true);
                setUsuario('');
                return;
            }

            if (contrasena.length == 0) {
                setValidoP(true);
                setContrasena('');
                return;
            }

		    setCargando(true);

            try {
                //datos login correctos
                if (acceso === true) {
                    //navegacion inicioAds
                    props.navigation.navigate('InicioAds');
                    //guarda sesion localStorage
                    const idMesa = result.user.id_mesa;
                    const idZona = result.user.zona;
                    AsyncStorage.setItem(
                        'ID_MESA',
                        JSON.stringify(idMesa),
                    );
                    AsyncStorage.setItem(
                        'ID_ZONA',
                        JSON.stringify(idZona),
                    );
                }
                //datos login incorrectos
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
            
            //error en la conexion
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
        setCargando(false)
	}; //fin demoServiciosAxios

  return (
    <>
    {cargando ? <ProcesandoAir /> : null}
        <ScrollView marginX={12} showsVerticalScrollIndicator={false}>
            {/* Logo */}
            <Logo/>
            {/* Text: Indicaciones */}
            <Indicaciones indicacion='Vincular dispositivo con una mesa'/>
            {/* Input Mesa */}
            <FormControl isInvalid={validoC}>
                <Stack>
                    <TituloInput titulo={'MESA'} />
                    <Input
                        fontSize={16}
                        height={16}
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
                                    size={28}
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
                    <TituloInput titulo={'CONTRASEÑA'} />
                    <Input fontSize={16}
                        height={16}
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
                                        size={28}
                                        color={coloresAIQ.grisOscuroAIQ}
                                    />
                                ) : (
                                    <FontAwesome
                                        name='eye'
                                        size={28}
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

            {/* Boton Vincular */}
            <Button
                bg={coloresAIQ.azulAIQ}
                mt='10'
                mb={5}
                height={16}
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