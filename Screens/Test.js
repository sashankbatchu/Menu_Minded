import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import Camera from './Camera';



const Test = ({ route }) => {
    const { photos } = route.params;
  
    return (
      <View style={styles.container}>
        {photos.length > 0 && <Image style={styles.preview} source={{ uri: `data:image/jpg;base64,${photos[0]}` }} />}
      </View>
    );
  };
  
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  preview: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: '#F2EFE9'
  },
});

export default Test;
