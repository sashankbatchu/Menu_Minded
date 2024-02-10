import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash'


export const allergensInfo = [
    {
      item: 'Peanuts',
      id: 'peanuts',
    },
    {
      item: 'Tree Nuts',
      id: 'tree_nuts',
    },
    {
      item: 'Shellfish',
      id: 'shellfish',
    },
    {
      item: 'Fish',
      id: 'fish',
    },
    {
      item: 'Milk',
      id: 'milk',
    },
    {
      item: 'Eggs',
      id: 'eggs',
    },
    {
      item: 'Wheat',
      id: 'wheat',
    },
    {
      item: 'Soy',
      id: 'soy',
    },
    {
      item: 'Sesame',
      id: 'sesame',
    },
    {
      item: 'Sulfites',
      id: 'sulfites',
    },
    {
      item: 'Mustard',
      id: 'mustard',
    },
    {
      item: 'Celery',
      id: 'celery',
    },
    {
      item: 'Lupin',
      id: 'lupin',
    },
    {
      item: 'Molluscs',
      id: 'molluscs',
    },
  ];

const NutritionalGoalsPage = ({ navigation, route }) => {
    const [selectedAllergens, setSelectedAllergens] = useState([])
    const { photos } = route.params;
    function onMultiChange() {
        return (item) => setSelectedAllergens(xorBy(selectedAllergens, [item], 'id'))
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Nutritional Goals</Text>
            </View>
            <View style={styles.inputContainer}>
                <SelectBox
                    label="Select multiple"
                    options={allergensInfo}
                    selectedValues={selectedAllergens}
                    onMultiSelect={onMultiChange()}
                    onTapClose={onMultiChange()}
                    isMulti
                    toggleIconColor={"#568259"}
                    searchIconColor={"#568259"}
                    arrowIconColor={"#568259"}
                    multiOptionContainerStyle={{ backgroundColor: "#568259"}}
                />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Next" color={"#568259"} onPress={() => {navigation.navigate('AllergenPage', { photos })}}/>
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
