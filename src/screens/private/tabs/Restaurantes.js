import React, {useState, useEffect, useCallback} from 'react'
import {Text, Box, Image, Flex, Center, View} from 'native-base';
import {ScrollView, TouchableOpacity, RefreshControl, SafeAreaView, Dimensions} from 'react-native';
import { getRestaurantes, getPublicidad, urlImg, deleteCart } from '../../../api/controlWS';
import LottieSinServ from '../../components/Lotties/LottieSinServ';
import coloresAIQ from '../../../styles/coloresAIQ';
import ProcesandoAir from '../../components/ProcesandoAir';
import { Titulos } from '../../components/Textos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import estilosAIQ from '../../../styles/estilosAIQ';

//ajusta componentes x pantalla
const { width, height } = Dimensions.get('window');

//funcion para contart tiempo
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
    const zona = await AsyncStorage.getItem('ID_ZONA');
    const m = await getRestaurantes(JSON.parse(zona));
    setArrRestaurantes(m);
    setCargando(false)   
  }

  useEffect(()=>{
    datosResAd();
  },[])
 
  //escucha publicidad y negocios
  useEffect(() => {
    const intervalCall = setInterval(() => {  
      datosResAd();
    }, 10000);
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
    //almacena id_rest en local storage
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
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}/>
          }>
          <Box
            p={3}
            style={{...estilosAIQ.boxRest, height: height / 3}}>
            {arrAnuncios.map((item) => {
              return (
                <Box key={item.id_ad} mb={4}>
                  <TouchableOpacity
                    style={estilosAIQ.boxAds}
                    onPress={() => {
                      //console.log(item.id_ad)
                      }}>
                    <Image
                      source={{uri: urlImg + item.imagen}}
                      alt='Anuncio'
                      style={estilosAIQ.imagenAnuncios}
                    />
                  </TouchableOpacity>
                </Box>
              );
            })}
          </Box>
        </ScrollView>

        {/* Titulo: restaurantes */}
        <Titulos titulo='Negocios:'/>

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
                style={estilosAIQ.boxRest}>
                {arrRestaurantes.map((item) => {
                  if (item.status == 1) {
                    return (
                      <Box
                        key={item.id_user}
                        mb={10}
                        style={{ backgroundColor: coloresAIQ.blanco, borderRadius: 6 }}>
                        {/* Cambiar por idRes onPress cuando esten los WS */}
                        <TouchableOpacity
                          style={{
                            width: width / 2.5,
                            height: width / 2.5,
                            marginRight: 3,
                          }}
                          onPress={() => menu(item.id_user)}>
                          <Image
                            source={{uri: urlImg + item.avatar}}
                            alt={item.nombre}
                            style={estilosAIQ.imagenAnuncios} />
                          <Center
                            bg={coloresAIQ.azulAIQ}
                            _text={{
                              color: coloresAIQ.negro,
                              fontWeight: '700',
                              fontSize: 'xl',
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