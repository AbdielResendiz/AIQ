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
          <View style={styles.menuItemStyle}>
            <Text style={styles.titleStyle}>{food.description}</Text>
            <Text style={styles.titleStyle}>{food.price}</Text>
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
});

export default Pedidos