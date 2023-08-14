import { NativeBaseProvider, View, Text, Icon, Stack, Input, Pressable, ScrollView, Button} from "native-base";
import { useState, useEffect } from "react";
import { FontAwesome, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import Loader from "../components/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchPost from "./fetchPost";
import coloresAIQ from "../../styles/coloresAIQ";
import { Alert } from "react-native";

export default function Perfil(props) {
  const [show, setShow] = useState(false);
  const [ loading, setLoading ] = useState(true);
  //const [ idMesa, setIdMesa ] = useState(true);c
  const [nombre, setNombre] = useState("");
  const handleNombre = (value) => {
    setNombre(value);
  };
  console.log("nombre ingresado: ", nombre)

  const [ Password, setPassword] = useState("");
  const[correo, setCorreo] = useState("")
  
  //Conseguir el ID  de usuario almacenado en login Asyncstorage.
  const [ idUser, setIdUser ] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('idUser')
      if(value !== null) {
        console.log("valor id getData", parseInt(value))
        setIdUser(value);
        getDatos(value);
        
      }
    } catch(e) {
      console.log("error", e);
    }
  }
  useEffect(() => {
   getData()
    console.log("iddd", idUser)
  }, [idUser]);
  // Fin ID USER

  //get datos
  const getDatos = async(value) => {
    const dataUser = new FormData();
    dataUser.append("id_mesa", value)
    const url = `https://speedyeats.app/Mesas/infoUsu/`;
    const options = {
      method:'POST',
      body: dataUser
    };
    const res = await fetchPost(url, options);
    console.log("idmesa paserint", parseInt(value))
    console.log("idmesa normal", value)
    console.log("idmesa tipo", typeof(value))

    console.log("res getDatos :", res)
  //console.log("res.data.nombre", res.mesas.nombre);s
  //console.log("user:", res.mesas.id_mesa);
  //setCorreo(res.data.zona);
  setCorreo(res.data.descripcion);
  setNombre(res.data.nombre);
  
  //setCelular(res.data.telefono);
  //setSelected( res.data.nombre);
   
    setLoading(false);
}

  const [ actualizando, setActualizando] = useState(false);
    //ACTUALIZA DATOS
    const Actualizar = async() => {
      setActualizando(true);
      if (nombre.length<2) {
          Alert.alert(
              'Nombre invalido',
              'Ingresa un nombre de al menos 3 carácteres',
              [
                { text: 'OK',  onPress: () => console.log("Arregla el nombre")  },
              ],
              { cancelable: false },
            );
            }else{
  
          const dataNew = new FormData();
          dataNew.append('nombre_mesa', nombre);
          dataNew.append('descripcion_mesas', correo);
          console.log('appenddescc',correo)
          console.log('appendnombrer',nombre)
         //dataNew.append("password_mesas",Password );
          dataNew.append('id_mesa', idUser);
  
          const url = `https://speedyeats.app/Mesas/updateMesa`
          const options ={
            method:'POST',
            body: dataNew
           
          };
          console.log("nueva data", dataNew);
          {/**respuesta */}
          const response = await fetchPost(url, options);
          console.log("respuesta: ", response);
          if (response===true) {
             
                Alert.alert(
                  '!Éxito!',
                  "!Se actualizaron tus datos!'",
                  [
                    { text: 'OK',  onPress: () =>  props.navigation.navigate("Cuenta") },
                  ],
                  { cancelable: false },
                );
              
          }else{
              Alert.alert(
                  '!Ups....!',
                  'Hubo un error, intenta más tarde',
                  [
                    { text: 'OK',  onPress: () => console.log("error editar perfil")  },
                  ],
                  { cancelable: false },
                );
          }
      }
      setActualizando(false);
    }


    // Borrar cuenta
    const borrarAviso = () =>{
      Alert.alert(
        '¿Seguro que deseas borrar tu cuenta?',
        "Esta acción no se puede deshacer",
        [
          {
            text: 'Volver',
        onPress: () => console.log('Cancel Pressed'),
          },

          { text: 'Eliminar cuenta',  onPress: () => {borrarCuenta()},
            },
        ],
        { cancelable: false },
      );
    }

    const borrarCuenta = async()=>{
      const dataUser= new FormData();
      dataUser.append('id_mesa', idUser);
      const url = `https://speedyeats.app/Mesas/deleteMesa`
      const options = {
        method:'POST',
        body: dataUser
      };
      const res = await fetchPost(url, options);
      console.log("RESPONSE: ", res);
      console.log("id USUARIO" , idUser) ;
      
      if (res != true){
        alert("Error al borrar cuenta, intentelo más tarde.")
        }else{
          Alert.alert(
            'Se eliminó tu cuenta.',
            "Esperamos verte pronto",
            [
    
              { text: 'Volver',  onPress: () => { logOut();},
                },
            ],
            { cancelable: false },
          );
        }
    }
  return (
    <NativeBaseProvider>

      {loading === true ? <Loader/> : 
      <View  bg={coloresAIQ.blanco}>
        <Text bold fontSize={"xl"}  w="90%" ml={5} my={3}>Mi perfil</Text>
        <ScrollView bg={coloresAIQ.blanco} mx="5%" mb={5}  shadow={6} borderRadius={10}>
          <Stack space={4} w="100%" alignItems="center">
          {/**NOMBRE */}
         
            <Input w={"90%"} mt={2} placeholder="Nombre" variant="underlined" 
            value={nombre} onChangeText={handleNombre} size="lg"
            InputLeftElement={<Icon as={<MaterialIcons name="person" />} 
            size={9} ml="2" mr={2} color={coloresAIQ.azulAIQ} />}  />

            {/**Apellidos 
            <Input w={"90%"} mt={2} placeholder="Apellidos" variant="underlined" 
            value={apellidos} onChangeText={handleApellidos} size="lg"
            InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={9} ml="2" mr={2} color={"warning.400"} />}  />
*/}
            {/**Celular *
            <Input w={"90%"} mt={2} placeholder="Teléfono" variant="underlined"
            value={celular} onChangeText={handleCelular} size="lg" maxLength={10}
            keyboardType="numeric"
            InputLeftElement={<Icon as={<FontAwesome name="mobile-phone" />} size={9} ml={4}  color={colors.rosa} />}  />

            {/**FALTA LA SUCURSAL */}

            {/**EMAIL */}
            <Input w={"90%"} mt={2} placeholder="Correo electrónico" variant="underlined"
            value={correo} isreadOnly={true} size="lg"
            InputLeftElement={<Icon as={<Ionicons name="mail" />} size={8} ml={2} mr={3} color={coloresAIQ.azulAIQ} />}  />

          
           

           {/* <Button size="lg"   w="50%" color={coloresAIQ.azulAIQ}  isLoading={actualizando} isLoadingText="Guardando" onPress={()=>Actualizar()}> Guardar</Button>

           *<Button size="lg"   color={coloresAIQ.azulAIQ} onPress={()=>props.navigation.navigate("Password", { IdU: idUser })} w="50%"> Cambiar contraseña</Button> */

           } 

       <Button  bg={coloresAIQ.blanco}   width={200} bold mb={1} borderWidth={1} borderColor={coloresAIQ.azulAIQ} height={12} borderRadius={32} isLoading={actualizando} isLoadingText="Guardando" 
         onPress={()=>Actualizar()} _pressed={{
         bg: coloresAIQ.azulAIQ}}>
         <Text color={coloresAIQ.azulAIQ} fontSize='lg'  fontFamily='body'> Guardar</Text>
      </Button>

      <Button  bg={coloresAIQ.blanco}    width={200} bold mb={4} borderWidth={1} borderColor={coloresAIQ.azulAIQ} height={12} borderRadius={32} onPress={()=>props.navigation.navigate("Password", { IdU: idUser })} _pressed={{
         bg: coloresAIQ.azulAIQ}}>
         <Text color={coloresAIQ.azulAIQ} fontSize='lg' fontFamily='body'> Cambiar contraseña </Text>
      </Button>

       {/* eliminar cuenta */}
       <Pressable w="90%" mx="5%" flexDirection={"row"} my={5} onPress={()=> borrarAviso()}>
                <Icon as={AntDesign} name="deleteuser" mx={2}  size="lg"  color={coloresAIQ.azulAIQ}  />
                <Text bold   ml={2} fontSize="xl">Eliminar cuenta</Text>
       </Pressable>

        </Stack>

        </ScrollView>

      </View>
      } 
    </NativeBaseProvider>
    
  );
}