import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Slider, CheckBox } from 'react-native';

const NutritionalGoalsPage = () => {
  const [sugar, setSugar] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [calories, setCalories] = useState(0);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);

  const handleSubmit = () => {
    // Handle submission of nutritional goals data
    console.log('Submitted Nutritional Goals:', { sugar, protein, carbs, fat, calories, isVegetarian, isVegan, isGlutenFree });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutritional Goals</Text>
      <View style={styles.inputContainer}>
        <Text>Sugar (g): {sugar}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={sugar}
          onValueChange={setSugar}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Protein (g): {protein}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={protein}
          onValueChange={setProtein}
        />
      </View>
      {/* Add more input fields for carbs, fat, calories, etc. */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isVegetarian}
          onValueChange={setIsVegetarian}
          style={styles.checkbox}
        />
        <Text>Vegetarian</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isVegan}
          onValueChange={setIsVegan}
          style={styles.checkbox}
        />
        <Text>Vegan</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isGlutenFree}
          onValueChange={setIsGlutenFree}
          style={styles.checkbox}
        />
        <Text>Gluten-Free</Text>
      </View>
      <View style={styles.buttonContainer}>
              <Button title="Next" color={"#568259"} onPress={() => {navigation.navigate('AllergenPage')}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default NutritionalGoalsPage;
