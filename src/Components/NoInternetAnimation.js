import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

const NoInternetAnimation = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Lottie
        source={require('../../asserts/noInternetAnimation.json')}
        loop
        autoPlay
      />
    </View>
  );
};

export default NoInternetAnimation;

const styles = StyleSheet.create({});
