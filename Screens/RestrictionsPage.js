import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash'


export const allergensInfo = [
    {
        item: 'Jain',
        id: 'jain',
    },
    {
        item: 'Halal',
        id: 'halal',
    },
    {
        item: 'Kosher',
        id: 'Kosher',
    },
    {
        item: 'Vegeterian',
        id: 'vegeterian',
      },
      {
        item: 'Vegan',
        id: 'vegan',
      },
      {
        item: 'Gluten Free',
        id: 'glutenFree',
      },
      {
        item: 'Lactose Intolerant',
        id: 'lactoseIntolerant',
      },
      
];

const RestrictionsPage = ({ navigation }) => {
    const [selectedRestrictions, setSelectedRestrictions] = useState([])

    function onMultiChange() {
        return (item) => setSelectedRestrictions(xorBy(selectedRestrictions, [item], 'id'))
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Other Restrictions</Text>
            </View>
            <View style={styles.inputContainer}>
                <SelectBox
                    label="Select multiple"
                    options={allergensInfo}
                    selectedValues={selectedRestrictions}
                    onMultiSelect={onMultiChange()}
                    onTapClose={onMultiChange()}
                    isMulti
                    toggleIconColor={"#568259"}
                    searchIconColor={"#568259"}
                    arrowIconColor={"#568259"}
                    multiOptionContainerStyle={{ backgroundColor: "#568259" }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Submit" color={"#568259"} onPress={navigation.navigate("RestrictionsPage")} />
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

export default RestrictionsPage;
