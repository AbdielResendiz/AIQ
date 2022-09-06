import React, {useState, useEffect} from 'react';
import {extendTheme, Image, NativeBaseProvider, useToast } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
import ListMenu from './src/screens/components/ListMenu';
import coloresAIQ from './src/styles/coloresAIQ';

const Stack = createStackNavigator();

const App = () => {
  const [activo, setActivo] = useState(false);
  const [initScreen, setInitScreen] = useState('Login');
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
          }}>

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
            }}
            component={InicioAds}
          />

          <Stack.Screen
            name='Menu'
            options={{
              title: 'MENÚ',
            }}
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
              title: 'METODO DE PAGO',
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
            }}
            component={Pedidos}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );}
};

export default App;