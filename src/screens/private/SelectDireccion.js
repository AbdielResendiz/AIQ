import { NativeBaseProvider, View, Text, Icon,Center, Checkbox,TouchableOpacity ,Stack,Box,Flex,MaterialCommunityIcons,IconButton,HStack,Pressable, ScrollView} from "native-base";
import { useState, useEffect } from "react";
import { FontAwesome, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import Loader from "../components/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchPost from "./fetchPost";
import coloresAIQ from "../../styles/coloresAIQ";
import { Alert } from "react-native";
import { backgroundColor } from "styled-system";

export default function SelectDireccion(props) {
  const [ loading, setLoading ] = useState(true);
  const [arrDirecciones, setArrDirecciones] = useState([]);
  //const [id_direccion, setIdDireccion] = useState(null);
  const [nombre, setNombre] = useState("");
  const handleNombre = (value) => {
    setNombre(value);
  };


  const[id_carrito, setIdCarrito] = useState("")
  
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
  
//funcion para insertar la direccion al carrito

const insertDireccionn = async (idDiSeleccionado) => {
  const dataUser = new FormData();

  dataUser.append("id", id_carrito);
  dataUser.append("idDi", idDiSeleccionado); // Usar el ID seleccionado aquí
  console.log("id carrito XD ", id_carrito);
  console.log("id direccion XD", idDiSeleccionado);

  const url = `https://speedyeats.app/Direcciones/insertDire`;
  const options = {
    method: 'POST',
    body: dataUser,
  };
  const res = await fetchPost(url, options);
  console.log("res insert token :", res);

  setLoading(false);
};


//fin 
  

  //funcion checkout
  const handleCheckboxChange = (idDiSeleccionado) => {
    setIdDi(idDiSeleccionado);
  };
  

    //ACTUALIZA DATOS
  return (
    <NativeBaseProvider>
  
      {loading === true ? <Loader/> : 
<View  bg={coloresAIQ.blanco} flex={1}>
       
        <Text bold fontSize={"xl"}  w="90%" ml={5} my={3}>Selecciona una direccion</Text>
<ScrollView bg={coloresAIQ.blanco} mx="5%" mb={5} h={"70%"} shadow={6} borderRadius={10}>
    
        {/* Renderizar los pedidos */}
        {arrDirecciones.map((direcciones, index) => (
     <Box space={4} w="100%" alignItems="center">
       <Flex direction='row'>
         <View key={index} w="90%" borderBottomWidth={1}  borderColor={coloresAIQ.grisClaroAiq} py={2}>
            <View flexDirection="row" justifyContent="space-between">
                <View>
                <Text>{direcciones.calle} {direcciones.no_Int}, {direcciones.no_ext}</Text>
                <Text>{direcciones.colonia}, {direcciones.cp},{direcciones.municipio}, {direcciones.estado}</Text>
                <Text>Referencias: {direcciones.referencias}</Text> 
                </View>
            
                <View flexDirection="row" alignItems="center">
                    <Checkbox  aria-label="domicilio checkbox"
                              value="checkbox"
                              style={{ borderColor: coloresAIQ.azulAIQ }}
                              isChecked={direcciones.idDi === idDi}
                              onChange={() => handleCheckboxChange(direcciones.idDi)}/>
                </View>
            </View>
         </View>
        </Flex>
     </Box>
    ))}
 </ScrollView>

        <Center marginTop={2} marginBottom={8}>
             <Pressable w="90%" mx="5%" flexDirection={"row"} my={3} borderRadius={32} bold mb={4} 
             width={150} borderWidth={1} borderColor={coloresAIQ.azulAIQ} 
             onPress={() => {
              if (idDi !== null) {
                insertDireccionn(idDi); // Pasar el idDi seleccionado
              } else {
                Alert.alert('Selecciona una dirección antes de guardar.');
              }
            }} _pressed={{
             bg: coloresAIQ.grisClaroAiq}}/>
            <Text bold color={coloresAIQ.azulAIQ}  ml={2} fontSize="xl" >Guardar Direccion</Text>
        </Center>
        
</View>
      } 

    </NativeBaseProvider>
    
  );
}