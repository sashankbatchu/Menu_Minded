import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Camera from './Camera';



const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MenuApp</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera')}
      >
        <Image
          source={require('../assets/camera.png')} // Adjust the path to your image
          style={styles.buttonImage}
        />
      </TouchableOpacity>
    </View>
     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EFE9'
  },
  button: {
    backgroundColor: '#568259',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 86,
    height: 86,
    marginTop: 400,
    shadowColor: 'black',  
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.5,  
    shadowRadius: 5,
  },
  buttonImage: {
    justifyContent: 'center',
    width: 50, // Adjust the width of the image
    height: 50, // Adjust the height of the image
    marginBottom: 5,
  },
  title: {
    fontSize: 50,
    marginBottom: 20,
  },
});

export default Welcome;
