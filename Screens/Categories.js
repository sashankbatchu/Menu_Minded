import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
      <OutputData manipulatedData={manipulatedData} />
    </View>
  );
};

const OutputData = ({ manipulatedData }) => {
  console.log("manipulatedData", manipulatedData);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(manipulatedData)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2EFE9',
    alignItems: 'center',
    marginTop: 60,
  },
  preview: {
    width: 100,
    height: 100,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    backgroundColor: '#F2EFE9',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  item: {
    width: 180,
    height: 180,
    margin: 10,
    backgroundColor: '#568259',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 20,
    color: '#F2EFE9',
  },
});
export default Categories;
