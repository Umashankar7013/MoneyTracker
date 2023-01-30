import {StyleSheet, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

const NoItemsAnimationComponent = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Lottie
        source={require('../../asserts/noDataAnimation.json')}
        loop
        autoPlay
      />
    </View>
  );
};

export default NoItemsAnimationComponent;

const styles = StyleSheet.create({});
