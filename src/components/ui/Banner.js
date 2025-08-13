import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Banner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Image 
        source={require('../../../assets/banner.jpg')} 
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    margin:15,
  },
  bannerImage: {
    width: '100%',
    height: 170,
    position: 'absolute',
  },
});

export default Banner;