import React,{useState,useCallback,useEffect} from 'react';
import { TouchableOpacity,ScrollView,RefreshControl,SafeAreaView} from 'react-native';
import estilosAIQ from '../../styles/estilosAIQ';
import {Text, Box, Button, Image, Flex, Center, View} from 'native-base';
import { alignItems } from 'styled-system';
import { getAsync } from 'expo-permissions';
import axios from 'axios';

const InicioAds = (props) => {
	const [refreshing, setRefreshing] = useState(false);
  const [anuncios, setAnuncios] = useState([]);


  const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(1500).then(() => setRefreshing(false));
	}, []);

  
  useEffect(() => {
  
    getAnuncios()
  }, []);
  
  const getAnuncios = async() => {
    await fetch('https://v-csoft.com/AIQ/MovilR/getPublicidad', {
     method: 'post',
    
   })
     .then((response) => response.json())
     .then((result) => {
       console.log('Success:', result['Publicidad']);

       const data = result['Publicidad']
       setAnuncios(data)
       // setList()
     })
     .catch((error) => {
       console.error('Error:', error);
     });
 
   

   };



  const arrAnuncios = [
    {
      idAd: 1,
      imagen: '../../../assets/Logos/1.png'
    },
    {
      idAd: 2,
      imagen: '../../../assets/Logos/1.png'
    },
    {
      idAd: 3,
      imagen: '../../../assets/Logos/1.png'
    },
    {
      idAd: 4,
      imagen: '../../../assets/Logos/1.png'
    },
  ];
  return (
    <SafeAreaView flex={5} flexDirection={'column'}>
    <ScrollView r
    contentContainerStyle={{paddingBottom:0}}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    flex={2}>
    <Box
     
      p={3}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        alignContent: 'center',
        alignItems: 'center'
        
      }}>
      {anuncios.map((item) => {
        return (
          <Box key={item.id_ad} mb={4}>
            <TouchableOpacity
              style={{
                width: 400 ,
                height: 250,
                marginRight: 8, justifyContent: 'center',
                flexWrap: 'nowrap',
                alignContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {console.log(item.id_ad)}}>
              <Image
                borderRadius={5}
                source={{uri: item.imagen}}
                alt='Anuncio'
                style={{
                  resizeMode: 'cover',
                  width: '100%',
                  height: 200,
                  
                }}
              />
            </TouchableOpacity>
          </Box>
        );
      })}
    </Box>
  
   
    </ScrollView>

<View style={{
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  flexWrap: 'nowrap',
  alignContent: 'center',
  alignItems: 'center'

}}>
  <TouchableOpacity 
      style={estilosAIQ.botonTouch}
      onPress={() => {props.navigation.navigate('Restaurante')}}>
      <Text style={estilosAIQ.textBtn}>Ver restaurantes</Text>
  </TouchableOpacity>
</View>
<ScrollView 
    contentContainerStyle={{paddingBottom:0}}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    flex={2}>
    <Box
     
      p={3}
      style={{
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        
      }}>
      {anuncios.map((item) => {
        return (
          <Box key={item.id_ad} mb={4}>
            <TouchableOpacity
              style={{
                width: 400 ,
                height: 150,
                marginRight: 8,
                justifyContent: 'center',
                flexWrap: 'nowrap', // falta checar
                alignContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {console.log(item.id_ad)}}>
              <Image
                borderRadius={5}
                source={{uri: item.imagen}}
                alt='Anuncio'
                style={{
                  resizeMode: 'cover',
                  width: '100%',
                  height: 200,
                }}
              />
            </TouchableOpacity>
          </Box>
        );
      })}
    </Box>
  
   
    </ScrollView>
</SafeAreaView>
  )
}

export default InicioAds