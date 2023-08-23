import React, { useState } from 'react';
import { Button, Text, Input, ScrollView, Stack, FormControl, useToast } from 'native-base'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import coloresAIQ from '../../styles/coloresAIQ';
import { Alert } from 'react-native';
import ProcesandoAir from '../components/ProcesandoAir';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logo from '../components/Logo';
import {Indicaciones, TituloInput} from '../components/Textos';
import fetchPost from '../private/fetchPost';

import {useRef , useEffect} from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      
      console.log('tokenn', token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

    const Login = (props) => {
    //para las notificaciones

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log("response", esponse);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    // fin notificanones


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
    const [ loading, setLoading ] = useState(true);
    //validaciones C=Mesa, P=Password
	const [validoC, setValidoC] = useState(false);
	const [validoP, setValidoP] = useState(false);
	const cambioC = () => setValidoC(false);
	const cambioP = () => setValidoP(false);
     
   

    //insertar el token a la base de datos
    const insertToken = async () => {
        if (expoPushToken) {
          console.log("login tokn", expoPushToken);
      
          const id_mesa = await AsyncStorage.getItem('idUser');
          const dataUser = new FormData();
      
          dataUser.append("id_mesa", id_mesa);
          dataUser.append("tokenNotifi", expoPushToken.data);
          console.log("LAMSA-. ", id_mesa)
          console.log("tokeeen UWU ", expoPushToken.data)
      
          const url = `https://speedyeats.app/Mesas/insertToken`;
          const options = {
            method: 'POST',
            body: dataUser,
          };
          const res = await fetchPost(url, options);
          console.log("res insert token :", res);
      
          setLoading(false);
        } else {
          console.log("El token de notificación es undefined.");
        }
      };
      
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
          setExpoPushToken(token);
          insertToken(token); // Insertar el token aquí
        });
    }, []);
    //find


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
                //onPress={()=>{
                    //demoServiciosAxios();
                    //demoServiciosAxios();
                    // validarDatos();
               //</ScrollView> }}
                onPress={async () => {
                          demoServiciosAxios();
                         await insertToken();
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