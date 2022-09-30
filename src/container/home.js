//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create a component


const Home = ({navigation}) => {
  const logout = async () => {
    await AsyncStorage.clear()
    navigation.replace("Login")
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => logout()}
        style={{
          height: 50,
          width: 100,
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 25
        }} >
        <Text style={{
          fontSize: 20,
          color: "#fff"
        }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Home;
