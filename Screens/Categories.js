import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { getProcessedMenuData } from './menuDataAsyncStorage';
import manipulateData from '../DataManipulation';

Categories = ({ navigation }) => {

  const [manipulatedData, setManipulatedData] = useState(null);

  useEffect(() => {
    const fetchDataAndManipulate = async () => {
      try {
        const fetchedMenuData = await getProcessedMenuData();
        const processedMenuData = JSON.stringify(fetchedMenuData);
        const newData = await manipulateData(processedMenuData);
        setManipulatedData(newData);
      } catch (error) {
        console.error("Error fetching/manipulating data:", error);
      }
    };

    fetchDataAndManipulate();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Menu</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OutputData manipulatedData={manipulatedData} />
      </ScrollView>
    </View>
  );
};

const OutputData = ({ manipulatedData }) => {
  return (
    <View style={styles.container}>
      {manipulatedData && manipulatedData.map((foodItem, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>{`${index + 1}`}. {foodItem.name}</Text>
          <View style={styles.nutritionalValues}>
            <Text style={styles.nutritionalValue}>{`Protein: ${foodItem.protein}`}</Text>
            <Text style={styles.nutritionalValue}>{`Carbs: ${foodItem.carbs}`}</Text>
            <Text style={styles.nutritionalValue}>{`Fat: ${foodItem.fat}`}</Text>
            <Text style={styles.nutritionalValue}>{`Sodium: ${foodItem.sodium}`}</Text>
            <Text style={styles.nutritionalValue}>{`Cholesterol: ${foodItem.cholesterol}`}</Text>
            <Text style={styles.nutritionalValue}>{`Sugar: ${foodItem.sugar}`}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2EFE9',
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 35,
    marginTop: 50
  },
  item: {
    width: 350,
    height: 100,
    margin: 10,
    backgroundColor: '#568259',
    borderRadius: 8,
    paddingLeft: 10,
    paddingTop: 10,
  },
  itemText: {
    fontSize: 20,
    color: '#F2EFE9',
  },
  nutritionalValues: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10
  },
  nutritionalValue: {
    marginRight: 10,
    fontSize: 16,
    color: '#F2EFE9',
  },
});

export default Categories;
