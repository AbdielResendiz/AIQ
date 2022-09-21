import { Box, Image } from 'native-base'
import React from 'react'

const Logo = () => {
  return (
    <Box paddingTop={2}>
        <Image
        source={require('../../../assets/image/AIQ.png')}
        alignContent={'center'}
        alignSelf={'center'}
        resizeMode='center'
        alt='AIQ'
        width={'100%'}
        height={180}/>
    </Box>
  )
}

export default Logo