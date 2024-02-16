import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import userPhotoAnalysis from '../userPhotoAnalysis';
import combineItems from '../functions/combineItems';
import { saveProcessedMenuData } from './menuDataAsyncStorage';

const Cam = ({ navigation }) => {
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [photos, setPhotos] = useState([]);
  let initialMenuData = [];

  let temp = [];
  const [processedMenuData, setProcessedMenuData]= useState(null);


  const handleAnalyzeSubmit = async () => {
    console.log("analyze button working");
    // try {
    //   userPhotoAnalysis().then((data) => {
    //     initialMenuData=data;
    //     console.log(data);
    //     temp = combineItems(initialMenuData);
    //     console.log(temp);
    //   });
    // } catch (error) {
    //   console.error("Error analyzing photo:", error);
    //   // Handle error if necerssary
    // }
    if (processedMenuData !== null) {
      console.log(processedMenuData);
      saveProcessedMenuData(processedMenuData);
      navigation.navigate('NutritionalGoalsPage');
    } else {
      alert("Loading")
    }

  };
  

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

        // Save the picture to the app's file system with a fixed filename
        const photoPath = `${FileSystem.documentDirectory}photo.png`;
        await FileSystem.moveAsync({
          from: newPhoto.uri,
          to: photoPath,
        })
        
        console.log(photoPath);
        // Update the state with the saved file path
        setPhotos([photoPath]);


        //new additions / testing
        console.log("about to run photo analysis")
        userPhotoAnalysis().then((data) => {
          console.log("about to retrieve menu data")
          initialMenuData=data
          console.log("retrieved menu data")
          console.log(initialMenuData);
          temp = combineItems(initialMenuData)
          setProcessedMenuData(temp);
        })
        
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
        <Image
          key={photos[0]} // Use the photo path as a key
          style={styles.preview}
          source={{ uri: `file://${photos[0]}?time=${Date.now()}` }} // Append timestamp to force re-render
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={takePic}>
        <Text style={styles.itemText}>Capture</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleAnalyzeSubmit}
        disabled={photos.length === 0}
      >
        <Text style={styles.itemText}>Analyze</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F2EFE9',
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
    backgroundColor: '#F2EFE9',
  },
  itemText: {
    fontSize: 20,
    color: '#F2EFE9',
  },
});

export default Cam;
