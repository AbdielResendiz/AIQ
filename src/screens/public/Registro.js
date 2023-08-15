import React, { useState } from 'react';
import { Button, Text, Input, ScrollView, Stack, FormControl, useToast } from 'native-base'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import coloresAIQ from '../../styles/coloresAIQ';
import { Alert } from 'react-native';
import ProcesandoAir from '../components/ProcesandoAir';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logo from '../components/Logo';
import {Indicaciones, TituloInput,color} from '../components/Textos';

const Registro = (props) => {
    //aviso mesa o contra erroneos
    const toast = useToast();
    //datos mesa
	
    const borraUser = () => setUsuario('');
    const [usuario, setUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [contrasena2, setContrasena2] = useState('');
    const [zona_mesas, setZona] = useState('');
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
    const [validoP3, setValidoP3] = useState(false);
	const cambioC = () => setValidoC(false);
	const cambioP = () => setValidoP(false);
    const cambioP2 = () => setValidoP2(false);
    const cambioP3 = () => setValidoP3(false);

    //funcion login
	
    const demoServiciosAxios = async () => {
        if (nombre.length === 0 || usuario.length === 0  || contrasena.length === 0 ) {
            toast.show({
                status: 'warning',
                description: 'Por favor, completa todos los campos.',
                placement: 'top',
            });
            return;
        }
    
        setCargando(true);
    
        try {
            const data = new FormData();
            data.append('nombre_mesa', nombre);
            data.append('descripcion_mesas', usuario);
            data.append('password_mesas', contrasena);
            data.append('zona_mesas', zona_mesas);
            console.log('ZONA MESA', zona_mesas);
            console.log('NOMBRE', nombre);
            console.log('USUARIO', usuario);
            
            //console.log('PASSWORD', contrasena);
            const response = await fetch('https://speedyeats.app/Mesas/addMesa/', {
                method: 'post',
                body: data,


               
            });
          
            const result = await response.json();
            const acceso = result.res;

            console.log(result);
            if (acceso === true) {
                // Registro exitoso
               // AsyncStorage.setItem('idUser', JSON.stringify(result.user.id_mesa));
                props.navigation.navigate('InicioAds');
    
                toast.show({
                    status: 'success',
                    description: 'Registro exitoso.',
                    placement: 'top',
                });
            } else {
                // Datos de inicio de sesión incorrectos
                toast.show({
                    status: 'warning',
                    description: 'ups! intentalo de nuevo',
                    placement: 'top',
                });
            }
    
           
        } catch (error) {
            // Error en la conexión o procesamiento de la respuesta
            console.log(error);
            toast.show({
                status: 'warning',
                description: 'Error de conexión. Por favor, intenta nuevamente más tarde.',
                placement: 'top',
            });
        }
    
        setCargando(false);
    };
    
   
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
                        value={usuario}
                        onChangeText={(val) =>
                            setUsuario(val)
                        }
                        onChange={cambioC}
                    />
                    <FormControl.ErrorMessage>
                        Ingresa un correo valido bro
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
                        value={nombre}
                        onChangeText={(val) =>
                            setNombre(val)
                        }
                        onChange={cambioC}
                    />
                    <FormControl.ErrorMessage>
                        Ingresa tu nombre
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>
            {/* Input Password */}
            <FormControl isInvalid={validoP}>
                <Stack>
                    <TituloInput titulo={'CONTRASEÑA'} color={coloresAIQ.negro} />
                    <Input fontSize={12}
                       // borderColor={coloresAIQ.azulAIQ}
                      
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
                                //background={coloresAIQ.azulAIQ}
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

           {/* Input confirmar Password */}
           <FormControl isInvalid={validoP}>
                <Stack>
                    <TituloInput style={coloresAIQ.negro} titulo={'CONFIRMA TU CONTRASEÑA'} />
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
                        placeholder='Confirma contraseña'
                        value={contrasena2}
                        onChangeText={(val) =>
                            setContrasena2(val)
                        }
                        onChange={cambioP}
                    />
                    <FormControl.ErrorMessage>
                        Ingresa una contraseña valida.
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>




             {/* Input 
             <FormControl isInvalid={validoP3}>
                <Stack>
                    <TituloInput titulo={'ZONA'} />
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
                        value={zona_mesas}
                        onChangeText={(val) =>
                            setZona(val)
                        }
                        onChange={cambioP3}
                    />
                    <FormControl.ErrorMessage>
                        Ingresa una zona valida.
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>

            Password */}
            {/* Boton Vincular */}
          

            <Button
                bg={coloresAIQ.azulAIQ}
                mt={10}
                mb={5}
                height={12}
                borderRadius={32}
                onPress={()=>{
                   
                    demoServiciosAxios();
                    // validarDatos();
                }}
                _pressed={{
                    bg: coloresAIQ.azulBtn}}>
                <Text
                    color={coloresAIQ.blanco} 
                    fontSize='lg'
                    fontFamily='body'>
                    Registrarse
                </Text>
            </Button>

           

        </ScrollView>
    </>
  )
}
export default Registro