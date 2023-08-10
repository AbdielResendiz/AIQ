import React, {useState, useEffect} from 'react';
import {extendTheme, NativeBaseProvider, Image, Box, HStack, Center, Pressable, Icon, Text } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { FontAwesome,  AntDesign , MaterialCommunityIcons, Ionicons, Entypo} from '@expo/vector-icons'; 
import { View, TouchableOpacity, Alert} from 'react-native';
import Cuenta from './src/screens/private/Cuenta';
import Pedidos2 from './src/screens/private/Pedidos2';
import { deleteCart } from './src/api/controlWS';
import {
	useFonts,
	Nunito_200ExtraLight,
	Nunito_200ExtraLight_Italic,
	Nunito_300Light,
	Nunito_300Light_Italic,
	Nunito_400Regular,
	Nunito_400Regular_Italic,
	Nunito_600SemiBold,
	Nunito_600SemiBold_Italic,
	Nunito_700Bold,
	Nunito_700Bold_Italic,
	Nunito_800ExtraBold,
	Nunito_800ExtraBold_Italic,
	Nunito_900Black,
	Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito';
import Login from './src/screens/public/Login';
import Registro from './src/screens/public/Registro';
import InicioAds from './src/screens/private/InicioAds';
import Menu from './src/screens/private/Menu';
import Producto from './src/screens/private/Producto';
import Restaurantes from './src/screens/private/tabs/Restaurantes';
import Carrito from './src/screens/private/tabs/Carrito';
import Pedidos from './src/screens/private/tabs/Pedidos';
import MetodoPago from './src/screens/private/MetodoPago';
import ConfirmarPedido from './src/screens/private/ConfirmarPedido';
import coloresAIQ from './src/styles/coloresAIQ';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Perfil from './src/screens/private/Perfil';
const Stack = createStackNavigator();

const App = () => {
  //screen por default, login
  const [initScreen, setInitScreen] = useState('Principal');
  const [showFooter, setShowFooter] = useState(false);
  const navigationRef = useNavigationContainerRef();
  const [selected, setSelected] = useState(0);
  //ejectar funcion leer local storage
  useEffect(() => {
    getLogin();
  }, []);
  //funcion obtener idMesa del login
  const getLogin = async() => {
    const idMesa = await AsyncStorage.getItem('ID_MESA')
    //console.log(idMesa);
    
    //si existe datos de sesion, ir directo a Inicio publicidad
    if (idMesa !== null) {
      setInitScreen('Restaurantes');
    }
  }
  let [fontsLoaded] = useFonts({
		Nunito_200ExtraLight,
		Nunito_200ExtraLight_Italic,
		Nunito_300Light,
		Nunito_300Light_Italic,
		Nunito_400Regular,
		Nunito_400Regular_Italic,
		Nunito_600SemiBold,
		Nunito_600SemiBold_Italic,
		Nunito_700Bold,
		Nunito_700Bold_Italic,
		Nunito_800ExtraBold,
		Nunito_800ExtraBold_Italic,
		Nunito_900Black,
		Nunito_900Black_Italic,
	});

  if (!fontsLoaded) {
		return null;
	} else {const theme = extendTheme({
    fonts: {
      heading: 'Nunito_700Bold',
      body: 'Nunito_400Regular',
      mono: 'Nunito_300Light',
    },
  });

  const shouldShowFooter=(route)=>{
    switch (true) {
      case (route.name === "Principal"):
        return false;
      case (route.name === "Registro"):
          return false;
    
      default:
        return true
    }
  }


  const IrInicio = () => {
    setSelected(0)
    navigationRef.navigate('Restaurante');
  };

  const IrPedidos = () => {
    setSelected(1)
    navigationRef.navigate('Pedidos2');
  };

  
  const IrCuenta = () => {
    setSelected(4)
    navigationRef.navigate('Cuenta');
  };
  
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={coloresAIQ.azulAIQ}
      />
      <NavigationContainer  ref={navigationRef}  onStateChange={(state) => setShowFooter(shouldShowFooter(state.routes[state.index]))}>
        <Stack.Navigator
          screenOptions={{
            headerMode:'float',
            headerStyle: {
              backgroundColor:
                coloresAIQ.azulAIQ
            },
            headerTintColor: '#FFF',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
          }}
          initialRouteName={initScreen}>
            {/*initScreen, indicara la screen de inicio login o inicioAds */}
          <Stack.Screen name="Principal" component={Login}   
            options={{title: 'Bienvenido',
            headerTintColor:coloresAIQ.blanco,
            headerStyle: {
              backgroundColor: coloresAIQ.azulAIQ,
            },
            headerShadowVisible: true
          }} />
          <Stack.Screen
            name='Registro'
            options={{
              title: 'Registro',
            }}
            component={Registro}
          />

          <Stack.Screen
            name='Pedidos2'
            options={{
              title: 'Pedidos',
            }}
            component={Pedidos2}
          />

          <Stack.Screen
            name='Cuenta'
            options={{
              title: 'Cuenta',
            }}
            component={Cuenta}
          />    
          <Stack.Screen
            name='Perfil'
            options={{
              title: 'Perfil',
            }}
            component={Perfil}
          />    

          <Stack.Screen
            name='InicioAds'
            options={{
              title: 'INICIO',
            
            }}
            component={InicioAds}
          />

          <Stack.Screen
            name='Menu'
            options={ ({navigation}) => ({
              title: 'MENÚ',
              headerLeft: () => (
                <HeaderBackButton
                  tintColor={coloresAIQ.blanco}
                  onPress={() => {
                    Alert.alert(
                      '¡Espera!',
                      '¿Deseas volver a restaurantes? El carrito actual se vaciara. ',
                      [
                        {
                          text: 'Cancelar',
                          onPress: () => null,
                          style: 'cancel',
                        },
                        {
                          text: 'Si',
                          onPress: async () => {
                            deleteCart();
                            navigation.navigate("Restaurante");
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                    return true;
                  }}
                />
              ),
            })}
            component={Menu}
          />

          <Stack.Screen
            name='Producto'
            options={{
              title: 'PRODUCTO',
            }}
            component={Producto}
          />

          <Stack.Screen
            name='Restaurante'
            options={{
              title: 'Restaurantes',
            }}
            component={Restaurantes}
          />

          <Stack.Screen
            name='Carrito'
            options={{
              title: 'CARRITO',
            }}
            component={Carrito}
          />

          <Stack.Screen
            name='MetodoPago'
            options={{
              title: 'MÉTODO DE PAGO',
            }}
            component={MetodoPago}
          />

          <Stack.Screen
            name='ConfirmaPedido'
            options={{
              title: 'CONFIRMA PEDIDO',
            }}
            component={ConfirmarPedido}
          />

          <Stack.Screen
            name='Pedidos'
            options={{
              title: 'DETALLE PEDIDO',
              headerLeft: () => null,
            }}
            component={Pedidos}
          />

        </Stack.Navigator>


        {/* Footer navegation */}
        {showFooter ? (
        <View style={{height:55, marginBottom:12}} >
           <NativeBaseProvider>
            <Box flex={1} safeAreaY={2}  safeAreaX={5} width="80%"  alignSelf="center"  bg={coloresAIQ.blanco}  >
              
              <HStack bg={coloresAIQ.azulAIQ}  alignItems="center" shadow={6} borderRadius={25} >
                <Pressable cursor="pointer"  py="3" flex={1} 
                  onPress={() => {IrInicio()}}>
                  <Center >
                      <Icon  as={<Ionicons name={selected === 0 ? 'home' : 'home-outline'} />} color={ selected === 0 ? coloresAIQ.blanco : coloresAIQ.footerIcon} size="md" />
                      <Text    color={ selected === 0 ? coloresAIQ.azulL : coloresAIQ.footerIcon} fontSize={12}>Inicio</Text>
                  </Center>
                </Pressable>
                <Pressable cursor="pointer"  py="2" flex={1} onPress={() => {IrPedidos()}}>
                  <Center>
                      <Icon  as={<Entypo name="back-in-time" />} color={ selected === 1 ? coloresAIQ.azul : coloresAIQ.footerIcon} size="md" />
                      <Text   color={ selected === 1 ? coloresAIQ.azul : coloresAIQ.footerIcon} fontSize={12}>Pedidos</Text>
                  </Center>
                </Pressable>
                
                {/* <Pressable cursor="pointer"  py="2" flex={1} onPress={() => {IrCarrito()} }>
                  <Center>
                      <Icon  as={<AntDesign name="shoppingcart"  />} color={ selected === 2 ? coloresAIQ.azul : coloresAIQ.footerIcon} size="md" />
                      <Text color={ selected === 2 ? coloresAIQ.azul : coloresAIQ.footerIcon} fontSize={12}>Carrito</Text>
                  </Center>
                </Pressable> */}
                <Pressable cursor="pointer"  py="2" flex={1} onPress={() => {IrCuenta()} }>
                  <Center>
                      <Icon  as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} 
                      color={ selected === 3 ? coloresAIQ.azul : coloresAIQ.footerIcon} size="md" />
                      <Text   color={ selected === 3 ? coloresAIQ.azul : coloresAIQ.footerIcon} fontSize={12}>Cuenta</Text>
                  </Center>
                </Pressable>
              </HStack>
            </Box>
        </NativeBaseProvider>
        </View>
      ) : null}

      </NavigationContainer>
    </NativeBaseProvider>
  );}
};

export default App;