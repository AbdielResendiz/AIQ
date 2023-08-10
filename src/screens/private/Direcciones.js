import React from "react";
import coloresAIQ from "../../styles/coloresAIQ";
import { NativeBaseProvider, RefreshControl, refreshing,onRefresh,Box,Text, View, ScrollView,handleClick,FontAwesome, show,Button, Center,VStack, Input,TituloInput,Icon,FontAwesome5,FormControl, Divider,Stack } from "native-base";



export default function Direcciones() {
  return (
    <NativeBaseProvider>
     <ScrollView bg={coloresAIQ.blanco} flex={1}>
     <Stack shadow={6} mx={8} mb={3}  mt={6} borderRadius={6} bg={coloresAIQ.blanco} space={2}  p={3} borderColor={"#dcdcdc"} borderWidth={1}>
     <Box alignItems="center">Mis direcciones</Box> 
      <Box alignItems="center">
        <Input mx="3" placeholder="Municipio" mb={4} mt={10} w="100%" />
      </Box>
      
      <Box alignItems="center">
        <Input mx="3" placeholder="Colonia " mb={4} mt={1} w="100%" />
      </Box>

      <Box alignItems="center">
        <Input mx="3" placeholder="Calle" mb={4} mt={1} w="100%" />
      </Box>
      <Box alignItems="center">
        <Input mx="3" placeholder="CP" mb={4} mt={1} w="100%" />
      </Box>
      <Box alignItems="center">
        <Input mx="3" placeholder="N.Interior" mb={4} mt={1} w="100%" />
      </Box>
      <Box alignItems="center">
        <Input mx="3" placeholder="N.Exterior" mb={4} mt={1} w="100%" />
      </Box>
      <Box alignItems="center">
        <Input mx="3" placeholder="Referencias" mb={4} mt={1} w="100%" />
      </Box>

          {/* Comentarios 
          <View paddingY={2} paddingX={8}>
          <InfoProducto info={'Comentarios:'}/>
            <TextInput
                style={{...estilosAIQ.input, textAlignVertical: 'top', }}
                numberOfLines={5}
                placeholder="Escribe tus comentarios"
                multiline
                value={comentario}
                maxLength={200}
                onChangeText={(val) => setComentario(val)}
            />
        </View>*/}
        <Center>
        <Button  bg={coloresAIQ.blanco}    width={200} bold mb={4} borderWidth={1} borderColor={coloresAIQ.azulAIQ} height={12} borderRadius={32}>
         <Text color={coloresAIQ.azulAIQ} fontSize='lg' fontFamily='body'> Guardar dirección</Text>
       </Button>
       </Center>

      </Stack>
     </ScrollView>
  </NativeBaseProvider>
  );



  
}