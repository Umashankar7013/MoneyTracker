import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

export const LogoutScreen = () => {
  const logoutHandler = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => logoutHandler()}>
        <Text style={styles.logoutButton}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
