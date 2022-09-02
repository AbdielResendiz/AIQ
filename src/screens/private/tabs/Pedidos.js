import React from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Divider, Image } from 'native-base';


const foods = [
  {
    title: "chicken",
    description:
      "Lorem ipsum dolor sit amet consectetur,  recusandae error amet cum doloremque mollitia hic, porro autem qui libero fugit atque.",
    image:
      "some image link",
    price: "$ 10.99",
  },
  {
    title: "barbecued chicken",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quis quam architecto. ",
    image:
      "some image link",
    price: "$ 14.99",
  },
  {
    title: "barbecued chicken",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quis quam architecto. ",
    image:
      "some image link",
    price: "$ 14.99",
  },
];

const Pedidos = () => {
  return (
    <ScrollView>
      {foods.map((food, index) => (
        <View key={index}>
             <View style={styles.cardView}>
              <View style={{flexDirection:'column'}}> 
                  <Text style={{textTransform: 'uppercase', color:'#07B83A'}} >Humedad:
                  {food.description}</Text>  
                   <Text style={{textTransform: 'uppercase', color:'#07B83A'}} >temperatura:
                    {props.price}</Text>          
                         </View>    
                </View>
          <Divider width={0.5} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
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

export default Pedidos