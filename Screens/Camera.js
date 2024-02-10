import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const Welcome = ({ navigation }) => {
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const takePic = async () => {
    if (cameraRef.current) {
      try {
        let options = {
          quality: 1,
          base64: true,
          exif: false,
        };
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        
        // Convert the picture to base64 and store in the array
        setPhotos(prevPhotos => [...prevPhotos, newPhoto.base64]);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  if (hasCameraPermission === null) {
    return <Text>Requesting permissions...</Text>;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera, please enable in settings</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <View style={styles.Flatlist}>
        <FlatList
            data={photos}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item }) => (
                <Image style={styles.preview} source={{ uri: `data:image/jpg;base64,${item}` }} />
            )}
        />
      </View>
      <TouchableOpacity style={styles.button}
        color = "#F2EFE9"
        onPress={takePic}
      >
      <Text style={styles.itemText}>Capture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        color = "#F2EFE9"
        onPress={() => navigation.navigate('Categories', { photos })}
      >
      <Text style={styles.itemText}>Analyze</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "#F2EFE9"
    },
    camera: {
        flex: 1,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#568259',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        height: 86,
        marginLeft: 20,
        marginBottom: 20,
        marginRight: 20,
        shadowColor: 'black',  
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.5,  
        shadowRadius: 5, 
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
    Flatlist: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2EFE9'
    },
    itemText: {
      fontSize: 20,
      color: '#F2EFE9',
    },
    
});


export default Welcome
