import React from 'react';
import CarouselItem from './CarouselItem';
import SwiperFlatList from 'react-native-swiper-flatlist';

//recibe de inicioAds el arreglo de publicidad y genera el carrusel
const Carousel = ({ data }) => {
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

export default Carousel;