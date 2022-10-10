import React, {useState, useEffect} from 'react';
import {extendTheme, NativeBaseProvider } from 'native-base';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
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

const Stack = createStackNavigator();

const App = () => {
  const [initScreen, setInitScreen] = useState('Principal');
  useEffect(() => {
    getLogin();
  }, []);

  const getLogin = async() => {
    const idMesa = await AsyncStorage.getItem('ID_MESA')
    console.log(idMesa);
    if (idMesa !== null) {
      setInitScreen('InicioAds');
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
  
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={coloresAIQ.azulClaroAIQ}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerMode:'float',
            headerStyle: {
              backgroundColor:
                coloresAIQ.azulClaroAIQ
            },
            headerTintColor: '#FFF',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
          }}
          initialRouteName={initScreen}>

          <Stack.Screen
            name='Principal'
            options={{
              title: 'VINCULAR',
            }}
            component={Login}
          />

          <Stack.Screen
            name='InicioAds'
            options={{
              title: 'INICIO',
              headerLeft: () => null,
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
              title: 'SELECCIONAR',
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
      </NavigationContainer>
    </NativeBaseProvider>
  );}
};

export default App;