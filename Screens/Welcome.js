import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Cam from './Cam';
import manipulateData from '../DataManipulation';
import userNutritionAnalysis from '../userNutritionAnalysis';

const Welcome = ({ navigation }) => {
  const testUserInput = "I want to eat more protein and less sugar."
  const test =  userNutritionAnalysis(testUserInput)
  console.log(test)

  const userJsonData = [
    {
      "name": "Ice Cream",
      "nutritionalValues": {
        "protein": "2",
        "carbs": "20",
        "fat": "10",
        "sugar": "10",
        "sodium": "0.05",
        "cholesterol": "0.01"
        
      },
      "ingredients": "Milk, cream, sugar, flavoring."
    },
    {
      "name": "Chicken Nuggets",
      "nutritionalValues": {
        "protein": "15",
        "carbs": "10",
        "fat": "5",
        "sugar": "0.2",
        "sodium": "0.2",
        "cholesterol": "0.035"
        
      },
      "ingredients": "Chicken, breading, oil."
    }
  ];
  
  const resultJson = manipulateData(userJsonData); // Call the function

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MenuApp</Text>
      <Text>{resultJson}</Text>
      <Text style={styles.title}>{test}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Cam')

        }}
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
    marginTop: 200,
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
