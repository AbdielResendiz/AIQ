import React, {useState, useEffect, useCallback} from 'react'
import {Text, Box, Button, Image, Flex, Center, View} from 'native-base';
import {ScrollView, TouchableOpacity, RefreshControl, SafeAreaView} from 'react-native';
import axios from 'axios';
import Procesando from '../../components/Procesando';
import SearchBar from '../../components/SearchBar';
import { AntDesign } from '@expo/vector-icons';
import coloresAIQ from '../../../styles/coloresAIQ';

const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout)
	);
};

const Restaurantes = (props) => {
  //ws
  const baseUrl = 'https://v-csoft.com/AIQ/MovilR';
  const url = `${baseUrl}/getRestaurantes`
  const url2 = `${baseUrl}/getPublicidad`
  const source = axios.CancelToken.source();
  const [hasError, setErrorFlag] = useState(false);
  //Carga datos
  const [cargando, setCargando] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
  const [car, setCar] = useState({});
  //arreglos restaurantes y anuncios
  const [arrRestaurantes, setArrRestaurantes] = useState([]);
  const [arrAnuncios, setArrAnuncios] = useState([]);
  //barra de busqueda
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  //obtener datos por tiempo
  const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(1500).then(() => setRefreshing(false));
	}, []);

  const datosRes = async () => {
    try{
      setCargando(true);
      const response = await axios.get(url, {cancelToken: source.token});
      if (response.status === 200) {
        setArrRestaurantes(response.data);
        setCargando(false);
        return;
      } else {
        throw new Error("Fallo en fetch array restaurantes")
      }
    } catch (error) {
      if(axios.isCancel(error)) {
        console.log('Data fetching cancelado')
      } else {
        setErrorFlag(true);
        setCargando(false);
      }
    }
  }

  const publicidad = async () => {
    try{
      setCargando(true);
      const response = await axios.get(url2, {cancelToken: source.token});
      if (response.status === 200) {
        setArrAnuncios(response.data.Publicidad);
        setCargando(false);
        return;
      } else {
        throw new Error("Fallo en fetch array anuncio")
      }
    } catch (error) {
      if(axios.isCancel(error)) {
        console.log('Data fetching cancelado')
      } else {
        setErrorFlag(true);
        setCargando(false);
      }
    }
  }

  useEffect(() => {
    datosRes();
    publicidad();
    setCargando(false);
  }, []);

  const menu = (id, nombre, logo) => {
		props.navigation.navigate('Menu', {
			idRes: id,
      nombre: nombre,
      imagen: logo
		});
	};

  return (
    <>
      {cargando ? <Procesando /> : null}   
      <SafeAreaView flex={1} flexDirection={'column'} style={{alignItems: 'flex-start'}}>
        {/* Scroll anuncios */}
        <ScrollView 
          contentContainerStyle={{paddingBottom: 70}}
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
                <Box key={item.id_ad} mb={4}>
                  <TouchableOpacity
                    style={{
                      width: 200,
                      height: 104,
                      marginRight: 8,
                      borderColor: coloresAIQ.azulOscuroAIQ,
                      borderWidth: 2,
                      borderRadius: 5
                    }}
                    onPress={() => {console.log(item.id_ad)}}>
                    <Image
                      borderRadius={5}
                      source={{uri: item.imagen}}
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

        {/* Barra busqueda */}
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        {/* Titulo: restaurantes */}
        <Box paddingTop={3} paddingBottom={2} paddingX={4}>
          <Flex
            direction='row'
            justifyContent='flex-start'>
            <Center>
              <Flex direction='row'>
                <Text
                  fontSize={26}
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
          {arrRestaurantes.length > 0 && searchPhrase === "" ? (
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
                      key={item.id_res}
                      mb={4}
                      style={{ backgroundColor: coloresAIQ.blanco, borderRadius: 6 }}>
                      {/* Cambiar por idRes onPress cuando esten los WS */}
                      <TouchableOpacity
                        style={{
                          width: 150,
                          height: 150,
                          marginRight: 3,
                        }}
                        onPress={() => menu(item.id_res, item.nombre, item.logo)}>
                        <Image
                          borderRadius={6}
                          source={{uri: item.logo}}
                          alt='Restaurante'
                          style={{
                            width: '100%',
                            height: 150,
                          }} />
                        <Center
                          bg={coloresAIQ.azulOscuroAIQ}
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