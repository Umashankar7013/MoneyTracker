import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

const LoadingAnimationComponent = () => {
  return (
    <View style={{flex: 1}}>
      <Lottie
        source={require('../../asserts/loadingAnimation.json')}
        loop
        autoPlay
      />
    </View>
  );
};

export default LoadingAnimationComponent;

const styles = StyleSheet.create({});
