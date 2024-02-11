import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import userNutritionAnalysis from '../userNutritionAnalysis';
import AsyncStorage from '@react-native-async-storage/async-storage';

let jsonUserGoals;

const NutritionalGoalsPage = ({ navigation }) => {
    const [userGoals, setUserGoals] = useState('');
    let analyzedUserGoals = "";

    const handleSubmit = async () => {
        console.log("running")
        userNutritionAnalysis(userGoals).then(analyzedUserGoals => {
            jsonUserGoals = JSON.parse(analyzedUserGoals);
            AsyncStorage.setItem('userGoals', JSON.stringify(jsonUserGoals))
                .then(() => {
                    console.log('jsonUserGoals saved successfully');
                })
                .catch(error => {
                    console.error('Error saving jsonUserGoals:', error);
                });

            navigation.navigate('AllergenPage')

        }).catch(error => {
            console.error("Error generating text:", error);
        });

    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Nutritional Goals</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline={true}
                    numberOfLines={4} // Adjust the number of lines as needed
                    placeholder="Enter your nutritional goals here in a few words..."
                    onChangeText={setUserGoals}
                    value={userGoals}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Next" color={"#568259"} onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#568259'
    },
    header: {
        color: "#F2EFE9",
        fontSize: 40,
        marginBottom: 20,
        alignItems: "flex-end"

    },
    headerContainer: {
        justifyContent: "flex-start"
    },
    inputContainer: {
        backgroundColor: "#F2EFE9",
        width: "85%",
        padding: "5%",
        borderRadius: 20,
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%"
    },
    textInput: {
        width: "100%", // Adjust width as needed
        height: "100%", // Adjust height as needed
        textAlignVertical: "top" // Start input from top
    },
    buttonContainer: {
        backgroundColor: "#F2EFE9",
        borderRadius: 25,
        width: "25%",
        marginTop: "7%"
    }
});

// export { jsonUserGoals };

export default NutritionalGoalsPage;

//import { jsonUserGoals } from './NutritionalGoalsPage';
