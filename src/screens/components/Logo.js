import React from 'react';
import { Box, Image } from 'native-base';
import { Dimensions } from "react-native";

//ajusta imagen a la pantalla
const { width, height } = Dimensions.get('window');

const Logo = () => {
  return (
    <Box paddingTop={2}>
        <Image
        source={require('../../../assets/image/AIQ.png')}
        alignContent={'center'}
        alignSelf={'center'}
        resizeMode='contain'
        alt='AIQ'
        width={'100%'}
        height={height/4.5}/>
    </Box>
  )
}

export default Logo