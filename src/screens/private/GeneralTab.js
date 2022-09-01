import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import { FontAwesome5, Fontisto, MaterialIcons } from '@expo/vector-icons';
import Restaurantes from './tabs/Restaurantes';
import Carrito from './tabs/Carrito';
import Pedidos from './tabs/Pedidos';
import coloresAIQ from '../../styles/coloresAIQ';

const Tab = createBottomTabNavigator();

const GeneralTab = (props) => {
  return (
    <Tab.Navigator
    screenOptions={() => ({
      headerStyle: {backgroundColor: coloresAIQ.naranjaFood},
      headerTintColor: coloresAIQ.blanco,
      headerTitleAlign: 'center',
      tabBarActiveBackgroundColor: coloresAIQ.naranjaOscuroFood,
      tabBarInactiveBackgroundColor: coloresAIQ.naranjaOscuroFood,
      tabBarShowLabel: false,
      tabBarActiveTintColor: coloresAIQ.blanco,
      tabBarInactiveTintColor: coloresAIQ.grisClaroAiq,
    })}>
      <Tab.Screen
				options={{
					title: 'SELECCIONAR',
					tabBarIcon: (tabProps) => {
						return (
							<FontAwesome5
								name='utensils'
								size={23}
								color={tabProps.color}
							/>
						);
					},
				}}
				name='Restaurantes'
				component={Restaurantes}
			/>

      <Tab.Screen
				options={{
					title: 'CARRITO',
					tabBarIcon: (tabProps) => (
						<Fontisto
							name='shopping-basket'
							size={23}
							color={tabProps.color}
						/>
					),
				}}
				name='Carrito'
				component={Carrito}
			/>

      <Tab.Screen
				options={{
					title: 'PEDIDOS',
					tabBarIcon: (tabProps) => (
						<MaterialIcons
							name='history'
							size={24}
							color={tabProps.color}
						/>
					),
				}}
				name='Pedidos'
				component={Pedidos}
			/>
    </Tab.Navigator>
  )
}

export default GeneralTab