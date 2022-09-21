import React, {useState, useEffect, useCallback} from 'react'
import {Text, Box, Image, Flex, Center, View} from 'native-base';
import {ScrollView, TouchableOpacity, RefreshControl, SafeAreaView} from 'react-native';
import { getRestaurantes, getPublicidad, urlImg } from '../../../api/controlWS';
import LottieSinServ from '../../components/Lotties/LottieSinServ';
import coloresAIQ from '../../../styles/coloresAIQ';
import ProcesandoAir from '../../components/ProcesandoAir';
import { Titulos } from '../../components/Textos';
import AsyncStorage from '@react-native-async-storage/async-storage'

const wait = (timeout) => {
	return new Promise((resolve) =>
		setTimeout(resolve, timeout)
	);
};

const Restaurantes = (props) => {
  //Carga datos
  const [cargando, setCargando] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
  //arreglos restaurantes y anuncios
  const [arrRestaurantes, setArrRestaurantes] = useState([]);
  const [arrAnuncios, setArrAnuncios] = useState([]);
  //obtener datos por tiempo
  const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(1000).then(() => setRefreshing(false));
	}, []);

  //Funcion consume ws
  const datosResAd = async() => {
    const n = await getPublicidad();
    setArrAnuncios(n);
    const m = await getRestaurantes();
    setArrRestaurantes(m);
    setCargando(false)   
  }

  useEffect(()=>{
    datosResAd()
  },[])
 
  useEffect(() => {
    const intervalCall = setInterval(() => {  
      datosResAd();
    }, 5000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);

  //navegacion a menu y envio de id restaurante
  const menu = (id) => {
		props.navigation.navigate('Menu', {
			idRes: id,
		});
    AsyncStorage.setItem(
      'ID_REST',
      JSON.stringify(id),
  );
	};

  return (
    <>
      {cargando ? <ProcesandoAir /> : null}   
      <SafeAreaView flex={1}>
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
                      source={{uri: urlImg + item.imagen}}
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
        <Titulos titulo='Restaurantes:'/>

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
                  if (item.status == 1) {
                    return (
                      <Box
                        key={item.id_user}
                        mb={4}
                        style={{ backgroundColor: coloresAIQ.blanco, borderRadius: 6 }}>
                        {/* Cambiar por idRes onPress cuando esten los WS */}
                        <TouchableOpacity
                          style={{
                            width: 150,
                            height: 150,
                            marginRight: 3,
                          }}
                          onPress={() => menu(item.id_user)}>
                          <Image
                            borderRadius={6}
                            source={{uri: urlImg + item.avatar}}
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
                  }
                })}
              </Box>
            ) 
            : 
              (
                <Box padding={4}>
                  <Center>
                    <LottieSinServ/>
                    <Text
                    style={{fontWeight: 'bold', fontSize: 18}}>
                    No tenemos servicio en estos momentos</Text>
                  </Center>
                  
                </Box>
                
              )
          }
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Restaurantes