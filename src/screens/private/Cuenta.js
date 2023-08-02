import React from "react";
import { NativeBaseProvider, Box, ScrollView, Center,VStack, Input,Icon,FontAwesome5,FormControl, Divider,Stack } from "native-base";


export default function Cuenta() {
  return (

    
    <NativeBaseProvider>
       <Center>                                                           
      <Box >CUENTA</Box>
      

      </Center>


      <ScrollView h="74%" bg={"#FFFFFF"} mx={4} mb={3} p={3} rounded={20} shadow={7}>
      <VStack>
      <Box mx={5} px={3} py={3} mb={4} borderRadius={15} bg={"#dee09b"} shadow={7}>
        nombre:
      </Box>
      <Box mx={5} px={3} py={3} mb={4} borderRadius={15} bg={"#dee09b"} shadow={7}>
        Correo Electronico:
      </Box>
      <Box mx={5} px={3} py={3} mb={4} borderRadius={15} bg={"#dee09b"} shadow={7}>
        Contraseña:
      </Box>
      
       </VStack>
      </ScrollView> 

    </NativeBaseProvider>

    

  );

}
