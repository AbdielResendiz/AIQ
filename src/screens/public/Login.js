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
	const [usuario, setUsuario] = useState('1234');
    const borraUser = () => setUsuario('');
	const [contrasena, setContrasena] = useState('1234');
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
        data.append('descripcion',usuario)
        data.append('password',contrasena)
          
        //conexion con wb login
        await fetch('https://speedyeats.app/Mesas/existsMesa/', {
                method: 'post',
                  body: data,
                  
        })
        .then((response) => response.json())
        .then((result) => {
            var acceso = result.res
            console.log("user:", result.user.id_mesa);
            console.log("nombree:", result.user.nombre);
            console.log("correo:", result.user.descripcion);
            
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
                    //guarda sesion localStorage
                  //  const idMesa = result.user.id_mesa;
                   
                  //const idZona = result.user.zona;
                   //const idMesa = 60
                   
                    AsyncStorage.setItem(
                        'idUser',
                        (result.user.id_mesa),
                    );
                    props.navigation.navigate('InicioAds');
              
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
                setContrasena('')
                setCargando(false);
            }
        })
        .catch((ex) => {
            Alert.alert('ERROR!', ' Correo o contraseña incorrecto');
        });
        setCargando(false)

	}; //fin demoServiciosAxios

    const loginUWU = async()=> {
        //const idMesa = 1;
        //const idZona = 1;
        await AsyncStorage.setItem(
            'descripcion',
            JSON.stringify(idMesa),
        );
        await AsyncStorage.setItem(
            'password',
            JSON.stringify(idZona),
        );
        props.navigation.navigate('InicioAds');
    }

  return (
    <>
    {cargando ? <ProcesandoAir /> : null}
        <ScrollView marginX={12} showsVerticalScrollIndicator={false}>
            {/* Logo */}
            <Logo/>
            {/* Text: Indicaciones */}
            {/* <Indicaciones indicacion='Inicio de sesión'/> */}
            {/* Input Mesa */}
            <FormControl isInvalid={validoC}>
                <Stack>
                    <TituloInput titulo={'CORREO'} />
                    <Input
                        fontSize={14}  height={12}
                        rounded={12}
                        variant='outline'
                        placeholder='Correo electrónico'
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
                    <TituloInput titulo={'CONTRASEÑA'} />
                    <Input fontSize={12}
                        height={10}
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
                        placeholder='Contraseña'
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
                mt={10}
                mb={2}
                height={12}
                borderRadius={32}
                onPress={()=>{
                    demoServiciosAxios();
                    //demoServiciosAxios();
                    // validarDatos();
                }}
                _pressed={{
                    bg: coloresAIQ.azulAIQ}}>
                <Text
                    color={coloresAIQ.blanco}
                    fontSize='lg'
                    fontFamily='body'>
                    Iniciar sesión
                </Text>
            </Button>

            <Button
                bg={coloresAIQ.azulAIQ}
                mt={4}
                mb={5}
                height={12}
                borderRadius={32}
                onPress={()=>{
                    props.navigation.navigate('Registro');
                    //demoServiciosAxios();
                    // validarDatos();
                }}
                _pressed={{
                    bg: coloresAIQ.azulBtn}}>
                <Text
                    color={coloresAIQ.blanco} 
                    fontSize='lg'
                    fontFamily='body'>
                    Registro
                </Text>
            </Button>

            <Button
                bg={coloresAIQ.blanco}
                mt={4} bold
                mb={5}
                borderWidth={1}
                borderColor={coloresAIQ.azulAIQ}
                height={12}
                borderRadius={32}
                onPress={()=>{
                    props.navigation.navigate('Restaurante')
                    //demoServiciosAxios();
                    // validarDatos();
                }}
                _pressed={{
                    bg: coloresAIQ.azulBtn}}>
                <Text
                    color={coloresAIQ.azulAIQ}
                    fontSize='lg'
                    fontFamily='body'>
                    Invitado
                </Text>
            </Button>

        </ScrollView>
    </>
  )
}

export default Login