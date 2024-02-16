import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getProcessedMenuData } from './menuDataAsyncStorage';
import manipulateData from '../DataManipulation';
const Categories = ({ navigation }) => {
  const [data, setData] = useState(Array.from({ length: 4 }, (_, index) => ({ id: index, text: `Item ${index + 1}` })));
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => {
        navigation.navigate('Results')
      }}>
      <Text style={styles.itemText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const [processedMenuData, setProcessedMenuData] = useState([""]);

  useEffect(() => {
    const fetchMenuData = async () => {
        // fetchedRestrictions = await getRestrictions();
        // userRestrictions = extractItemValues(JSON.stringify(fetchedRestrictions));
        // setUserRestrictions(userRestrictions)
        await getProcessedMenuData().then((fetchMenuData) => {
            setProcessedMenuData(JSON.stringify(fetchMenuData));
        })
    };
    fetchMenuData();
}, []);


    const manipulatedData = manipulateData(processedMenuData);
    console.log("Manipulated Data", manipulatedData);


// console.log('Processed Data2:', processedMenuData);

//uncomment in a lil
// const manipulatedData = manipulateData(processedMenuData);
// console.log("Manipulated Data", manipulatedData);

  // const userJsonData = [
  //   {
  //     "name": "Ice Cream",
  //     "nutritionalValues": {
  //       "protein": "2",
  //       "carbs": "20",
  //       "fat": "10",
  //       "sugar": "10",
  //       "sodium": "0.05",
  //       "cholesterol": "0.01"
        
  //     },
  //     "ingredients": "Milk, cream, sugar, flavoring."
  //   },
  //   {
  //     "name": "Chicken Nuggets",
  //     "nutritionalValues": {
  //       "protein": "15",
  //       "carbs": "10",
  //       "fat": "5",
  //       "sugar": "0.2",
  //       "sodium": "0.2",
  //       "cholesterol": "0.035"
        
  //     },
  //     "ingredients": "Chicken, breading, oil."
  //   }
  // ];
  // const resultJson = manipulateData(userJsonData); // Call the function

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
      />
      <Text>{processedMenuData}</Text>
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
