import React,{useState,useCallback} from 'react';
import { TouchableOpacity,ScrollView,RefreshControl,SafeAreaView} from 'react-native';
import estilosAIQ from '../../styles/estilosAIQ';
import {Text, Box, Button, Image, Flex, Center, View} from 'native-base';
import { alignItems } from 'styled-system';

const InicioAds = (props) => {
	const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(1500).then(() => setRefreshing(false));
	}, []);

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
    <ScrollView 
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
      {arrAnuncios.map((item) => {
        return (
          <Box key={item.idAd} mb={4}>
            <TouchableOpacity
              style={{
                width: 400 ,
                height: 250,
                marginRight: 8, justifyContent: 'center',
                flexWrap: 'nowrap',
                alignContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {console.log(item.idAd)}}>
              <Image
                borderRadius={5}
                source={require('../../../assets/Logos/1.png')}
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
      {arrAnuncios.map((item) => {
        return (
          <Box key={item.idAd} mb={4}>
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
              onPress={() => {console.log(item.idAd)}}>
              <Image
                borderRadius={5}
                source={require('../../../assets/Logos/1.png')}
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