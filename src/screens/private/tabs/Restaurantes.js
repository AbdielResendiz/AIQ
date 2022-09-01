import React, {useState, useEffect, useCallback} from 'react'
import {Text, Box, Button, Image, Flex, Center, View} from 'native-base';
import {ScrollView, TouchableOpacity, RefreshControl, SafeAreaView} from 'react-native';
import Procesando from '../../components/Procesando';
import { AntDesign } from '@expo/vector-icons';
import coloresAIQ from '../../../styles/coloresAIQ';
import { paddingBottom } from 'styled-system';

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
      desc: "Cafetería",
      imagen: '../../../../assets/Logos/logoStarbucks.png'
    },
    {
      idRes: 2,
      nombre: "Brije",
      desc: "Postrería",
      imagen: '../../../../assets/Logos/logoBrije.png'
    },
    {
      idRes: 3,
      nombre: "Puerta de Serra",
      desc: "Restaurante",
      imagen: '../../../../assets/Logos/logoPuertaSerra.png'
    },
    {
      idRes: 4,
      nombre: "The Lounge",
      desc: "Restaurante",
      imagen: '../../../../assets/Logos/logoLounge.png'
    },
    {
      idRes: 5,
      nombre: "Mi México",
      desc: "Cafetería",
      imagen: '../../../../assets/Logos/logoStarbucks.png'
    },
    {
      idRes: 6,
      nombre: "HKG",
      desc: "Tienda",
      imagen: '../../../../assets/Logos/logoHKG.jpeg'
    },
    {
      idRes: 7,
      nombre: "Prueba1",
      desc: "Pizzas",
      imagen: '../../../../assets/Logos/logoHKG.jpeg'
    },
    {
      idRes: 8,
      nombre: "Prueba2",
      desc: "Hamburguesas",
      imagen: '../../../../assets/Logos/logoHKG.jpeg'
    },
  ];

  useEffect(() => {
    setCargando(false);
  }, []);

  const menu = (nombre, descripcion, imagen) => {
		props.navigation.navigate('Menu', {
			idRes: nombre,
      desc: descripcion,
      imagen: imagen
		});
	};

  return (
    <>
      {cargando ? <Procesando /> : null}
      <SafeAreaView flex={1} flexDirection={'column'} style={{backgroundColor: coloresAIQ.amarilloFood}}>
        {/* Scroll anuncios */}
        <ScrollView 
          contentContainerStyle={{paddingBottom: 32}}
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
        <Box paddingTop={3} paddingBottom={1} >
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
          {/* Inicio if restaurantes activos */}
          {arrRestaurantes.length > 0 ? (
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
                      style={{ backgroundColor: coloresAIQ.blanco, borderRadius: 6 }}>
                      {/* Cambiar por idRes onPress cuando esten los WS */}
                      <TouchableOpacity
                        style={{
                          width: 150,
                          height: 150,
                          marginRight: 3,
                        }}
                        onPress={() => menu(item.nombre, item.desc, item.imagen)}>
                        <Image
                          borderRadius={6}
                          source={{require: item.imagen}}
                          alt='Restaurante'
                          style={{
                            width: '100%',
                            height: 150,
                          }} />
                        <Center
                          bg={coloresAIQ.cafeFood}
                          _text={{
                            color: coloresAIQ.blanco,
                            fontWeight: '700',
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
                  );
                })}
              </Box>
            ) : (<View><Center>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 18}}>
                    No tenemos servicio en estos momentos</Text>
                </Center></View>)
          }

        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Restaurantes