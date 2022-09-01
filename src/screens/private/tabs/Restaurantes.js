import React, {useState, useEffect, useCallback} from 'react'
import {Text, Box, Button, Image, Flex, Center} from 'native-base';
import {ScrollView, TouchableOpacity, RefreshControl, SafeAreaView} from 'react-native';
import Procesando from '../../components/Procesando';
import { AntDesign } from '@expo/vector-icons';
import coloresAIQ from '../../../styles/coloresAIQ';

const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout)
	);
};

const Restaurantes = (props) => {
  const [cargando, setCargando] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
  const [car, setCar] = useState({});
  const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(1500).then(() => setRefreshing(false));
	}, []);

  const arrAnuncios = [
    {
      idAd: 1,
      imagen: '../../../../assets/Logos/1.png'
    },
    {
      idAd: 2,
      imagen: '../../../../assets/Logos/2.png'
    },
    {
      idAd: 3,
      imagen: '../../../../assets/Logos/1.png'
    },
    {
      idAd: 4,
      imagen: '../../../../assets/Logos/2.png'
    },
  ];

  const arrRestaurantes = [
    {
      idRes: 1,
      nombre: "Starbucks",
      imagen: '../../../../assets/Logos/logoStarbucks.png'
    },
    {
      idRes: 2,
      nombre: "Brije",
      imagen: '../../../../assets/Logos/logoBrije.png'
    },
    {
      idRes: 3,
      nombre: "Puerta de Serra",
      imagen: '../../../../assets/Logos/logoPuertaSerra.png'
    },
    {
      idRes: 4,
      nombre: "The Lounge",
      imagen: '../../../../assets/Logos/logoLounge.png'
    },
    {
      idRes: 5,
      nombre: "Mi México",
      imagen: '../../../../assets/Logos/logoStarbucks.png'
    },
    {
      idRes: 6,
      nombre: "HKG",
      imagen: '../../../../assets/Logos/logoHKG.jpeg'
    },
    {
      idRes: 7,
      nombre: "Prueba1",
      imagen: '../../../../assets/Logos/logoHKG.jpeg'
    },
    {
      idRes: 8,
      nombre: "Prueba2",
      imagen: '../../../../assets/Logos/logoHKG.jpeg'
    },
  ];
  useEffect(() => {
    setCargando(false);
  }, []);

  const menu = (item) => {
		props.navigation.navigate('Menu', {
			idRes: item,
		});
	};

  return (
    <>
      {cargando ? <Procesando /> : null}
      <SafeAreaView flex={1} style={{backgroundColor: coloresAIQ.amarilloFood}}>
        {/* Scroll anuncios */}
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}/>
          }>
          <Box
            flex={1}
            p={3}
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            {arrAnuncios.map((item) => {
              return (
                <Box key={item.idAd} mb={4}>
                  <TouchableOpacity
                    style={{
                      width: 200,
                      height: 100,
                      marginRight: 8
                    }}
                    onPress={() => {console.log(item.idAd)}}>
                    <Image
                      borderRadius={5}
                      source={require('../../../../assets/Logos/1.png')}
                      alt='Anuncio'
                      style={{
                        width: '100%',
                        height: 100,
                      }}
                    />
                  </TouchableOpacity>
                </Box>
              );
            })}
          </Box>
        </ScrollView>

        {/* Titulo: restaurantes */}
        <Box paddingTop={4} paddingBottom={1}>
          <Flex
            direction='row'
            justifyContent='flex-start'>
            <Center w='53%' h={8}>
              <Flex direction='row'>
                <Text
                  fontSize={24}
                  fontFamily='heading'
                  colorScheme={coloresAIQ.negro}>
                  Restaurantes:
                </Text>
              </Flex>
            </Center>
            {car.length != 0 &&
            car.length !== undefined ? (
              <Center>
                <Box>
                  <Button
                    variant='ghost'
                    onPress={() =>
                      props.navigation.navigate(
                        'Carrito'
                      )
                    }
                    _pressed={coloresAIQ.grisOscuroAIQ}>
                    <AntDesign
                      name='shoppingcart'
                      color={coloresAIQ.negro}
                      size={24}
                    />
                  </Button>
                </Box>
              </Center>
            ) : null}
          </Flex>
        </Box>

        {/* Scroll restaurantes */}
        <ScrollView
          contentContainerStyle={{paddingBottom: 4}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <Box
            flex={1}
            p={3}
            paddingTop={1}
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            {arrRestaurantes.map((item) => {
              return (
                <Box 
                  key={item.idRes} 
                  mb={4} 
                  style={{backgroundColor: coloresAIQ.blanco, borderRadius: 6}}>
                  <TouchableOpacity
                    style={{
                      width: 150,
                      height: 150,
                      marginRight: 3,
                    }}
                    onPress={() =>
                      menu(item.idRes)
                    }>
                    <Image
                      borderRadius={6}
                      source={require('../../../../assets/Logos/logoStarbucks.png')}
                      alt='Restaurante'
                      style={{
                        width: '100%',
                        height: 150,
                      }}
                    />
                    <Center
                      bg={coloresAIQ.cafeFood}
                      _text={{
                        color: coloresAIQ.blanco,
                        fontWeight:'700',
                        fontSize: 'sm',
                      }}
                      position='absolute'
                      bottom={0}
                      px={2}
                      py={1}
                      borderRadius={6}>
                      {item.nombre}
                    </Center>
                  </TouchableOpacity>
                </Box>
              )
            })}
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Restaurantes