import React, { useState } from 'react';
import { Button, Text, Input, ScrollView, Stack, FormControl, useToast } from 'native-base'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import coloresAIQ from '../../styles/coloresAIQ';
import { Alert } from 'react-native';
import ProcesandoAir from '../components/ProcesandoAir';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logo from '../components/Logo';
import {Indicaciones, TituloInput} from '../components/Textos';

const Registro = (props) => {
    //aviso mesa o contra erroneos
    const toast = useToast();
    //datos mesa
	const [usuario, setUsuario] = useState('');
    const borraUser = () => setUsuario('');
	const [contrasena, setContrasena] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena2, setContrasena2] = useState('');
    //show/hide pass
	const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
	const handleClick = () => setShow(!show);
    const handleClick2 = () => setShow2(!show2);
    //carga
	const [cargando, setCargando] = useState(false);
    //validaciones C=Mesa, P=Password
	const [validoC, setValidoC] = useState(false);
	const [validoP, setValidoP] = useState(false);
    const [validoP2, setValidoP2] = useState(false);
	const cambioC = () => setValidoC(false);
	const cambioP = () => setValidoP(false);
    const cambioP2 = () => setValidoP2(false);

    //funcion login
	const demoServiciosAxios = async () => {
        setCargando(true);
        
        // Validar que los campos no estén vacíos
        if (nombre.length === 0 || usuario.length === 0 || contrasena.length === 0) {
            toast.show({
                status: 'warning',
                description: 'Por favor, completa todos los campos.',
                placement: 'top',
            });
            setCargando(false);
            return;
        }
        
        var data = new FormData();
        data.append('nombre', nombre);
        data.append('descripcion', usuario);
        data.append('password', contrasena);
        
        try {
            const response = await fetch('http://persianasdecorsilv.com/speedyeats/Mesas/addMesa', {
                method: 'post',
                body: data,
            });
    
            const result = await response.json();
    
            if (result.res === true) {
                // Registro exitoso
                toast.show({
                    status: 'success',
                    description: 'Registro exitoso.',
                    placement: 'top',
                });
    
                // Limpia los campos después del registro exitoso
                setNombre('');
                setUsuario('');
                setContrasena('');
            } else {
                // Registro fallido
                toast.show({
                    status: 'warning',
                    description: 'Error al registrar. Mesa o contraseña incorrecto.',
                    placement: 'top',
                });
            }
        } catch (error) {
            // Error en la conexión
            toast.show({
                status: 'warning',
                description: 'Error de conexión. Por favor, intenta nuevamente más tarde.',
                placement: 'top',
            });
        }
    
        setCargando(false);
    };
     //fin demoServiciosAxios

   
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
                        fontSize={14}
                        height={12}
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
                        value={correo}
                        onChangeText={(val) =>
                            setCorreo(val)
                        }
                        onChange={cambioC}
                    />
                    <FormControl.ErrorMessage>
                        Ingresa una mesa valida.
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>
            
            <FormControl isInvalid={validoC}>
                <Stack>
                    <TituloInput titulo={'NOMBRE'} />
                    <Input
                        fontSize={14}
                        height={12}
                        rounded={12}
                        variant='outline'
                        placeholder='Nombre'
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

             {/* Input Password */}
             <FormControl isInvalid={validoP2}>
                <Stack>
                    <TituloInput titulo={'CONFIRMA CONTRASEÑA'} />
                    <Input fontSize={12}
                        height={10}
                        rounded={12}
                        fontFamily='body'
                        type={
                            show2 ? 'text' : 'password'
                        }
                        InputRightElement={
                            <Button
                                ml={1}
                                variant='link'
                                roundedLeft={0}
                                roundedRight='md'
                                onPress={handleClick2}
                                _pressed={{
                                    bg: coloresAIQ.grisClaroAiq,
                                }}>
                                {show2 ? (
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
                        placeholder='Confirma Contraseña'
                        value={contrasena2}
                        onChangeText={(val) =>
                            setContrasena2(val)
                        }
                        onChange={cambioP2}
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
                height={16}
                borderRadius={32}
                onPress={()=>{
                    //loginUWU();
                    demoServiciosAxios();
                    // validarDatos();
                }}
                _pressed={{
                    bg: coloresAIQ.azulBtn}}>
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
                height={16}
                borderRadius={32}
                onPress={()=>{
                    props.navigation.navigate('Registro')
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
                height={16}
                borderRadius={32}
                onPress={()=>{
                    props.navigation.navigate('Registro')
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
export default Registro