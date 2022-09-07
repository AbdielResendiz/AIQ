import React from 'react'
import {StyleSheet,Text, View, TouchableOpacity, Vibration} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';


const ItemTask = (props) => (
   <View style={styles.cardView}>
       <View style={{flexDirection:'column'}}> 
     <Text style={{textTransform: 'uppercase', color:'#07B83A'}} >Humedad:
        {props.temperatura}</Text>  
        <Text style={{textTransform: 'uppercase', color:'#07B83A'}} >temperatura:
        {props.humedad}</Text>          
    </View>    
   </View>
  );
  
const styles = StyleSheet.create({
    cardView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        marginHorizontal:8,
        marginVertical:5,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      }

});

  export default ItemTask;