import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash'


const NutritionalGoalsPage = ({ navigation, route }) => {

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Nutritional Goals</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#568259'
    },
    header: {
        color: "#F2EFE9",
        fontSize: 40,
        marginBottom: 20,
        alignItems:"flex-end"
        
    },
    headerContainer: {
        justifyContent: "flex-start"
    },
    inputContainer: {
        backgroundColor: "#F2EFE9",
        width: "85%",
        padding: "15%",
        borderRadius: 20,
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%"
    },
    selectBox: {
        flex: 1,
    },
    buttonContainer: {
      backgroundColor: "#F2EFE9",
      borderRadius: 25,
      width: "25%",
      marginTop: "7%"
    }
});

export default NutritionalGoalsPage;
