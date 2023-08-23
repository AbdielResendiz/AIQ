import { NativeBaseProvider, View, Text, Icon, Checkbox,TouchableOpacity ,Stack,Box,Flex,MaterialCommunityIcons,IconButton,HStack,Pressable, ScrollView} from "native-base";
import { useState, useEffect } from "react";
import { FontAwesome, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import Loader from "../components/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchPost from "./fetchPost";
import coloresAIQ from "../../styles/coloresAIQ";
import { Alert } from "react-native";




export default function ViewDirecciones(props) {
  const [show, setShow] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [arrDirecciones, setArrDirecciones] = useState([]);
  const [nombre, setNombre] = useState("");
  const handleNombre = (value) => {
    setNombre(value);
  };
  console.log("nombre ingresado: ", nombre)

  const[id_mesa, setIdMesa] = useState("")
  
  //Conseguir el ID  de usuario almacenado en login Asyncstorage.
  const [ idUser, setIdUser ] = useState(null);
  const [ idDi, setIdDi ] = useState(null);

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
  }, []);
  // Fin ID USER

  //get datos
  const getDatos = async (value) => {
  const dataUser = new FormData();
  console.log("DATA USER : ", value);
  dataUser.append("id_mesa", value)
  const url = `https://speedyeats.app/Direcciones/getDirecciones`;
  const options = {
    method: 'POST',
    body: dataUser
  };
  const res = await fetchPost(url, options);

  console.log("res getDatos :", res)

  if (res && res.data) {
    setArrDirecciones(res.data); // Actualiza el estado con los datos recibidos
  }

  setLoading(false);
}
  // Borrar cuenta

  const borrarAviso = (index) => {
    Alert.alert(
      '¿Seguro que deseas borrar esta dirección?',
      "Esta acción no se puede deshacer",
      [
        {
          text: 'Volver',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'Eliminar dirección',
          onPress: () => {
            borrarDireccion(arrDirecciones[index].idDi); // Pasar aquí el ID de dirección
          },
        },
      ],
      { cancelable: false },
    );
  };
  

  const borrarDireccion = async (idDi) => {
    const dataUser = new FormData();
    dataUser.append('idDi', idDi);
    const url = `https://speedyeats.app/Direcciones/deleteDireccion`;
    const options = {
      method: 'POST',
      body: dataUser,
    };
    const res = await fetchPost(url, options);
  
    console.log("RESPONSE: ", res);
    console.log("id direccion", idDi);
  
    if (res.res === true) {
      // Eliminación exitosa, actualizar el estado
      const updatedDirecciones = arrDirecciones.filter(
        (direccion) => direccion.idDi !== idDi
      );
      setArrDirecciones(updatedDirecciones);
  
      Alert.alert(
        'Se eliminó la dirección.',
        'Esperamos verte pronto',
        [
          {
            text: 'Volver',
            onPress: () => {
              // Aquí puedes agregar cualquier lógica adicional si es necesario
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      alert('Error al borrar dirección, inténtelo más tarde.');
    }
  };
  
    //ACTUALIZA DATOS
  return (
    <NativeBaseProvider>

      {loading === true ? <Loader/> : 
      <View  bg={coloresAIQ.blanco}>
        <Text bold fontSize={"xl"}  w="90%" ml={5} my={3}>Mis Direccioness</Text>
                <Pressable w="90%" mx="5%" flexDirection={"row"} my={3} borderRadius={32} bold mb={4} width={150} borderWidth={1} borderColor={coloresAIQ.azulAIQ} onPress={() => props.navigation.navigate('Direcciones')} _pressed={{
                      bg: coloresAIQ.grisClaroAiq}}>
                <Text bold color={coloresAIQ.azulAIQ}  ml={2} fontSize="xl" >Agregar Direccion</Text>
                </Pressable>

          <ScrollView bg={coloresAIQ.blanco} mx="5%" mb={5} h={"70%"}shadow={6} borderRadius={10}>

              {/* Renderizar los pedidos */}
              {arrDirecciones.map((direcciones, index) => (
           <Box space={4} w="100%" alignItems="center">
             <Flex direction='row'>
               <View key={index} w="90%" borderBottomWidth={1} borderColor={coloresAIQ.grisClaroAiq} py={2}>
                <View flexDirection="row" justifyContent="space-between">
                      <View>
                          <Text>{direcciones.calle} {direcciones.no_Int}, {direcciones.no_ext}</Text>
                          <Text>{direcciones.colonia}, {direcciones.cp},{direcciones.municipio}, {direcciones.estado}</Text>
                          <Text>Referencias: {direcciones.referencias}</Text> 
                      </View>
                  <View flexDirection="row" alignItems="center">
      
                    <IconButton
                      variant="unstyled"
                      icon={<Icon as={Ionicons} name="create-sharp" color={coloresAIQ.azulAIQ} />}
                      onPress={() => {
                      props.navigation.navigate('UpdateDirecciones', { idDi: direcciones.idDi, idUser: idUser });
                      }}   />
                      <IconButton
                    variant="unstyled"
                    icon={<Icon as={Ionicons} name="trash-outline" color={coloresAIQ.rojo} />}
                    onPress={() => borrarAviso(index)}/>
                 </View>
                </View>
               </View>
              </Flex>
            </Box>
           ))}
 
          </ScrollView>
      </View>
      } 
    </NativeBaseProvider>
    
  );
}