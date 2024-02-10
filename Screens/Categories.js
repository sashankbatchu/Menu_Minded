import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Results from './Results';
import Cam from './Cam';

const Categories = ({ navigation, route }) => {
  const [data, setData] = useState(Array.from({ length: 4 }, (_, index) => ({ id: index, text: `Item ${index + 1}` })));
  const { photos } = route.params;
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => {
        navigation.navigate('Results')
      }}>
      <Text style={styles.itemText}>{item.text}</Text>
    </TouchableOpacity>
  );
  // <Image style={styles.preview} source={{ uri: photos[0]}} />
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
      />
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
