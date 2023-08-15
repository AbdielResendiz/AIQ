import React, { useState, useEffect  } from 'react';
import { Button, Text, Input, ScrollView, Center,Stack, FormControl, useToast} from 'native-base'
import {MaterialIcons } from '@expo/vector-icons';
import coloresAIQ from '../../styles/coloresAIQ';
import ProcesandoAir from '../components/ProcesandoAir';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logo from '../components/Logo';
import {Indicaciones, TituloInput} from '../components/Textos';

const Direcciones = (props) => {
    //aviso mesa o contra erroneos
    const toast = useToast();
    //datos mesa
	
    const borraUser = () => setUsuario('');
    
	

	const [cargando, setCargando] = useState(false);
    //validaciones C=Mesa, P=Password
	const [validoC, setValidoC] = useState(false);
	const [validoP, setValidoP] = useState(false);
	const cambioC = () => setValidoC(false);
	const cambioP = () => setValidoP(false);

    const [municipio, setMunicipio] = useState("");
    const [colonia, setColonia] = useState("");
    const [calle, setCalle] = useState("");
    const [cp, setCp] = useState("");
    const [nInt, setNInt] = useState("");
    const [nExt, setNExt] = useState("");
    const [estado, setEstado] = useState("");
    const [referencias, setReferencias] = useState("");
   

//Conseguir el ID  de usuario almacenado en login Asyncstorage.

    const [ idUser, setIdUser ] = useState(null);

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('idUser')
        if(value !== null) {
         // console.log("valor id getData direccioes", parseInt(value))
          setIdUser(value);
       
          
        }
      } catch(e) {
        console.log("error", e);
      }
    }
    useEffect(() => {
     getData()
      console.log("id user para direcciones", idUser)
    }, [idUser]);
    // Fin ID USER
	
    const demoServiciosAxios = async () => {
      /*  if (nombre.length === 0 || usuario.length === 0  || contrasena.length === 0 ) {
            toast.show({
                status: 'warning',
                description: 'Por favor, completa todos los campos.',
                placement: 'top',
            });
            return;
        }*/
    
        setCargando(true);
    
        try {
            const data = new FormData();
            console.log("este es el id", idUser);
            data.append('id_mesa', idUser);
            data.append("municipio", municipio );
            data.append("colonia",colonia);
            data.append("calle", calle);
            data.append("cp", cp);
            data.append("no_int", nInt);
            data.append("no_ext", nExt);
            data.append("estado", estado);
            data.append("referencias", referencias);
            
            //console.log('PASSWORD', contrasena);
            const response = await fetch('https://speedyeats.app/Direcciones/addDireccion', {
                method: 'post',
                body: data,
            });
          
            const result = await response.json(); 
            const acceso = result.res;

            console.log(result);
            if (acceso === true) {
                // Registro exitoso
               // AsyncStorage.setItem('idUser', JSON.stringify(result.user.id_mesa));
    
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
            <FormControl>
            <Stack>
            <TituloInput titulo={'Municipio'} />
            <Input fontSize={14} height={12} rounded={12} variant='outline' placeholder='Correo electrónico' fontFamily='body'keyboardType='default'
              autoCapitalize='none' autoCorrect={false}
               InputRightElement={(
              <Button ml={1} variant='link' roundedLeft={0} roundedRight='md' onPress={borraUser} _pressed={{ bg: coloresAIQ.grisClaroAiq, }}>
              <MaterialIcons name='cancel' size={20} color={coloresAIQ.grisOscuroAIQ} /> </Button>

               )}
                    value={municipio}
                    onChangeText={(val) =>
                    setMunicipio(val)
                        }
                        onChange={cambioC}
                    />
                    <FormControl.ErrorMessage>
                        Ingresa un correo valido bro
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>


            <FormControl>
            <Stack>
            <TituloInput titulo={'Colonia'} />
            <Input fontSize={14} height={12} rounded={12} variant='outline' placeholder='Correo electrónico' fontFamily='body'keyboardType='default'
              autoCapitalize='none' autoCorrect={false} InputRightElement={(
            <Button ml={1} variant='link' roundedLeft={0} roundedRight='md' onPress={borraUser} _pressed={{ bg: coloresAIQ.grisClaroAiq, }}>
                <MaterialIcons name='cancel' size={20} color={coloresAIQ.grisOscuroAIQ} />
            </Button>
                        )}
                        value={colonia}
                        onChangeText={(val) =>
                            setColonia(val)
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
          <TituloInput titulo={'Calle'} />
          <Input fontSize={14} height={12} rounded={12} variant='outline' placeholder='Calle'fontFamily='body' keyboardType='default' autoCapitalize='none'autoCorrect={false}
              
                InputRightElement={(
          <Button ml={1} variant='link'  roundedLeft={0} roundedRight='md' onPress={borraUser} _pressed={{ bg: coloresAIQ.grisClaroAiq, }}>
               <MaterialIcons name='cancel'size={20} color={coloresAIQ.grisOscuroAIQ} />
          </Button>
                        )}
                        value={calle}
                        onChangeText={(val) =>
                            setCalle(val)
                        }
                        onChange={cambioC}
          />
                    <FormControl.ErrorMessage>
                        Ingresa tu nombre
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>

            {/** numero interior */}
            <FormControl isInvalid={validoC}>
        <Stack>
          <TituloInput titulo={'Número interior'} />
          <Input fontSize={14} height={12} rounded={12} variant='outline' placeholder='numero interior'fontFamily='body' keyboardType='default' autoCapitalize='none'autoCorrect={false}
              
                InputRightElement={(
          <Button ml={1} variant='link'  roundedLeft={0} roundedRight='md' onPress={borraUser} _pressed={{ bg: coloresAIQ.grisClaroAiq, }}>
               <MaterialIcons name='cancel'size={20} color={coloresAIQ.grisOscuroAIQ} />
          </Button>
                        )}
                        value={nInt}
                        onChangeText={(val) =>
                            setNInt(val)
                        }
                        onChange={cambioC}
          />
                    <FormControl.ErrorMessage>
                        Ingresa tu nombre
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>

             {/** numero Exteriro */}
             <FormControl isInvalid={validoC}>
        <Stack>
          <TituloInput titulo={'Número exterior'} />
          <Input fontSize={14} height={12} rounded={12} variant='outline' placeholder='numero'fontFamily='body' keyboardType='default' autoCapitalize='none'autoCorrect={false}
              
                InputRightElement={(
          <Button ml={1} variant='link'  roundedLeft={0} roundedRight='md' onPress={borraUser}
               _pressed={{ bg: coloresAIQ.grisClaroAiq, }}>
               <MaterialIcons name='cancel'size={20} color={coloresAIQ.grisOscuroAIQ} />
          </Button>
                        )}
                        value={nExt}
                        onChangeText={(val) =>
                            setNExt(val)
                        }
                        onChange={cambioC}
          />
                    <FormControl.ErrorMessage>
                        Ingresa tu nombre
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>
          



            {/** Codigo postal */}
   <FormControl isInvalid={validoC}>
        <Stack>
          <TituloInput titulo={'CP'} />
          <Input fontSize={14} height={12} rounded={12} variant='outline' placeholder='Cp'fontFamily='body' keyboardType='default' autoCapitalize='none'autoCorrect={false}
              
                InputRightElement={(
          <Button ml={1} variant='link'  roundedLeft={0} roundedRight='md' onPress={borraUser}
               _pressed={{ bg: coloresAIQ.grisClaroAiq, }}>
               <MaterialIcons name='cancel'size={20} color={coloresAIQ.grisOscuroAIQ} />
          </Button>
                        )}
                        value={cp}
                        onChangeText={(val) =>
                            setCp(val)
                        }
                        onChange={cambioC}
          />
                    <FormControl.ErrorMessage>
                        Ingresa tu nombre
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>

                        {/** estado */}
   <FormControl isInvalid={validoC}>
        <Stack>
          <TituloInput titulo={'Estado'} />
          <Input fontSize={14} height={12} rounded={12} variant='outline' placeholder='Estado'fontFamily='body' keyboardType='default' autoCapitalize='none'autoCorrect={false}
              
                InputRightElement={(
          <Button ml={1} variant='link'  roundedLeft={0} roundedRight='md' onPress={borraUser}
               _pressed={{ bg: coloresAIQ.grisClaroAiq, }}>
               <MaterialIcons name='cancel'size={20} color={coloresAIQ.grisOscuroAIQ} />
          </Button>
                        )}
                        value={estado}
                        onChangeText={(val) =>
                            setEstado(val)
                        }
                        onChange={cambioC}
          />
                    <FormControl.ErrorMessage>
                        Ingresa tu nombre
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>

            
                        {/** Referencias  */}
   <FormControl isInvalid={validoC}>
        <Stack>
          <TituloInput titulo={'Referencias'} />
          <Input fontSize={14} height={12} rounded={12} variant='outline' placeholder='Referencias'fontFamily='body' keyboardType='default' autoCapitalize='none'autoCorrect={false}
              
                InputRightElement={(
          <Button ml={1} variant='link'  roundedLeft={0} roundedRight='md' onPress={borraUser}
               _pressed={{ bg: coloresAIQ.grisClaroAiq, }}>
               <MaterialIcons name='cancel'size={20} color={coloresAIQ.grisOscuroAIQ} />
          </Button>
                        )}
                        value={referencias}
                        onChangeText={(val) =>
                            setReferencias(val)
                        }
                        onChange={cambioC}
          />
                    <FormControl.ErrorMessage>
                        Ingresa tu nombre
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>

           
            <Center mt={6}>
        <Button  bg={coloresAIQ.blanco}  onPress={()=>{  demoServiciosAxios(); }}  width={200} bold mb={4} borderWidth={1} borderColor={coloresAIQ.azulAIQ} height={12} borderRadius={32}>
         <Text color={coloresAIQ.azulAIQ} fontSize='lg' fontFamily='body'>Guardar Direccion</Text>
       </Button>
       </Center>


        </ScrollView>
    </>
  )
}
export default Direcciones