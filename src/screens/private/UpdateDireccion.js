import React, { useState, useEffect  } from 'react';
import { Button, Text, Input, ScrollView, Center,Stack, FormControl, useToast} from 'native-base'
import {MaterialIcons } from '@expo/vector-icons';
import coloresAIQ from '../../styles/coloresAIQ';
import ProcesandoAir from '../components/ProcesandoAir';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Logo from '../components/Logo';
import {Indicaciones, TituloInput} from '../components/Textos';
import fetchPost from './fetchPost';
import { Alert } from 'react-native';

const UpdateDirecciones = (props) => {
    //aviso mesa o contra erroneos
    const toast = useToast();
    //datos mesa
	
    const borraUser = () => setUsuario('');

	const [cargando, setCargando] = useState(false);
    //validaciones C=Mesa, P=Password
	const [validoC, setValidoC] = useState(false);
	const cambioC = () => setValidoC(false);


    const [municipio, setMunicipio] = useState("");
    const [colonia, setColonia] = useState("");
    const [calle, setCalle] = useState("");
    const [cp, setCp] = useState("");
    const [nInt, setNInt] = useState("");
    const [nExt, setNExt] = useState("");
    const [estado, setEstado] = useState("");
    const [referencias, setReferencias] = useState("");
   
    const [ loading, setLoading ] = useState(true);

//extrae el id direcion seleccionadon y el iduser, que se pasa al presionar el botón.
 const { idDi, idUser } = props.route.params;
//

  const getDatos = async() => {
    const dataUser = new FormData();
    dataUser.append("idDi", idDi)
    
    const url = `https://speedyeats.app/Direcciones/infoDireccion`;
    const options = {
      method:'POST',
      body: dataUser
    };
    const res = await fetchPost(url, options);
    console.log("res getDatos :", res)

  setMunicipio(res.data.municipio);
  setEstado(res.data.estado);
  setColonia(res.data.colonia);
  setCalle(res.data.calle);
  setNInt(res.data.no_Int);
  setNExt(res.data.no_ext);
  setCp(res.data.cp);
  setReferencias(res.data.referencias);
   
    setLoading(false);
}
useEffect(() => {
  getDatos();
}, []);

  const [ actualizando, setActualizando] = useState(false);
    //ACTUALIZA DATOS
    const Actualizar = async () => {
      setActualizando(true);
      if (municipio.trim() === '' || colonia.trim() === '' || calle.trim() === '' || cp.trim() === '' || estado.trim() === '') {
        Alert.alert(
            'Campos vacíos',
            'Por favor, completa todos los campos obligatorios.',
            [
                { text: 'OK', onPress: () => console.log("Completa los campos") },
            ],
            { cancelable: false },
        );
    }
    else {
    
        const dataNew = new FormData();
        dataNew.append('estado', estado);
        dataNew.append('municipio', municipio);
        dataNew.append('colonia', colonia);
        dataNew.append('calle', calle);
        dataNew.append('no_Int', nInt);
        dataNew.append('no_ext', nExt);
        dataNew.append('cp', cp);
        dataNew.append('referencias', referencias);
        dataNew.append("id_mesa", idUser); 
        dataNew.append("idDi", idDi); 

        console.log(" id_mesa mando: ", idUser)
        console.log(" id de direccion mando: ", idDi)
        console.log(" municipio mandado: ", municipio)
        console.log(" estado mandado: ", estado)
        console.log(" colonia mandado: ", colonia)
        console.log(" calle mandado: ", calle)
        console.log(" no int mandado: ", nInt)
        console.log(" no ext mandado: ", nExt)
        console.log(" cp mandado: ", cp)
        console.log(" referencias mandado: ", referencias)

    
        const url = `https://speedyeats.app/Direcciones/updateDirec`;
        const options = {
          method: 'POST',
          body: dataNew,
        };
    
        try {
          const response = await fetchPost(url, options);
          console.log("respuesta: ", response);
          if (response.success === true) {
            Alert.alert(
              '!Éxito!',
              "!Se actualizaron tus datos!'",
              [
                { text: 'OK', onPress: () => props.navigation.navigate("ViewDirecciones") },
              ],
              { cancelable: false },
            );
          } else {
            Alert.alert(
              '!Ups....!',
              'Hubo un error, intenta más tarde',
              [
                { text: 'OK', onPress: () => console.log("error editar direccion ") },
              ],
              { cancelable: false },
            );
          }
        } catch (error) {
          console.error("Error en Actualizar:", error);
        }
      }
      setActualizando(false);
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
            <Input fontSize={14} height={12} rounded={12} variant='outline' placeholder='Municipio' fontFamily='body'keyboardType='default'
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
            <Input fontSize={14} height={12} rounded={12} variant='outline' placeholder='Colonia' fontFamily='body'keyboardType='default'
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
          <Input fontSize={14} height={12} rounded={12} variant='outline' placeholder='NÚmero interior'fontFamily='body' keyboardType='default' autoCapitalize='none'autoCorrect={false}
              
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
          <Input fontSize={14} height={12} rounded={12} variant='outline' placeholder='NÚmero exterior'fontFamily='body' keyboardType='default' autoCapitalize='none'autoCorrect={false}
              
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
        <Button  bg={coloresAIQ.blanco}  isLoading={actualizando} isLoadingText="Guardando" onPress={()=>Actualizar()}width={200} bold mb={4} borderWidth={1} borderColor={coloresAIQ.azulAIQ} height={12} borderRadius={32}>
         <Text color={coloresAIQ.azulAIQ} fontSize='lg' fontFamily='body'>Guardar</Text>
       </Button>
       </Center>


        </ScrollView>
    </>
  )
}
export default UpdateDirecciones