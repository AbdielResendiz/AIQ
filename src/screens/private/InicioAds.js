import React,{useState, useEffect} from 'react';
import { TouchableOpacity, ScrollView, SafeAreaView, BackHandler} from 'react-native';
import estilosAIQ from '../../styles/estilosAIQ';
import {Text, View} from 'native-base';
import Carousel from '../components/Carousel';
import Carousel2 from '../components/Carousel2';

const InicioAds = (props) => {

  //variables que almacenara datos anuncio
  const [anuncios, setAnuncios] = useState(['']);

  //funcion que impide regreso a login
  const backAction = () => {
    props.navigation.navigate('Restaurante')
  }

  //consume ws getAnuncios
  const getAnuncios = async() => {
    await fetch('https://appaiq.com/MovilR/getPublicidad', {
      method: 'post',
    
    }).then((response) => response.json())
    .then((result) => {
    //  console.log('Success:', result['Publicidad']);
      const dataa = result['Publicidad']
      setAnuncios(dataa);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

   useEffect(() => {
    const cambiaTamaño = setInterval(() => {
      getAnuncios();
      // console.log("reinicio")
    }, 20000);
    return () => {
      // clean up
      clearInterval(cambiaTamaño);
    };
  }, []);

  //Efecto para sobreescribir el funcionamiento del boton back
	//este código sólo se ejecutará la primera vez que cargue
	//el componente
	useEffect(() => {
    getAnuncios();
		//Vincular el evento back del SO a mi alerta Back
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		);
		//Al salir de Home eliminamos el evento del backbutton del SO
		return () => backHandler.remove();
	}, []);

  return (
    <SafeAreaView flex={5} flexDirection={'column'}>
      <ScrollView>
        <Carousel data= {anuncios}></Carousel>
      </ScrollView>

      <View style={estilosAIQ.containerBtn}>
        <TouchableOpacity 
            style={estilosAIQ.botonTouch}
            onPress={() => {props.navigation.navigate('Restaurante')}}>
            <Text style={estilosAIQ.textBtn}>Ver restaurantes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Carousel2 data= {anuncios}></Carousel2>
      </ScrollView>

</SafeAreaView>
  )
}

export default InicioAds