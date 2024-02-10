import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Categories = () => {
  const [data, setData] = useState(Array.from({ length: 20 }, (_, index) => ({ id: index, text: `Item ${index + 1}` })));

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.text}</Text>
    </TouchableOpacity>
  );

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
