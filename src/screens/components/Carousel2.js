import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';
import CarouselItem from './CarouselItem';
import SwiperFlatList from 'react-native-swiper-flatlist';

const { width, heigth } = Dimensions.get('window');

const Carousel2 = ({ data }) => {
    return (
        <SwiperFlatList
        autoplay
        autoplayDelay={10}
        autoplayLoop
        autoplayInvertDirection
        data={data}
        renderItem={({ item }) => <CarouselItem item={item}/>}
      />
    )
}

export default Carousel2;