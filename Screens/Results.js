import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import manipulateData from '../DataManipulation';

const Results = ({ navigation }) => {

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>
        {Object.entries(item).map(([key, value]) => `${key}: ${value}`).join(', ')}
      </Text>
    </TouchableOpacity>
  );


  let processedMenuData;
  let manipulatedData;

  const fetchMenuData = async () => {
    // fetchedRestrictions = await getRestrictions();
    // userRestrictions = extractItemValues(JSON.stringify(fetchedRestrictions));
    // setUserRestrictions(userRestrictions)
    const fetchedMenuData = await getProcessedMenuData();
    processedMenuData = JSON.stringify(fetchedMenuData);

    doDataManipulation();
  };
  fetchMenuData();

  doDataManipulation = async () => {

    console.log("mandata running")
    manipulatedData = await manipulateData(processedMenuData);

    console.log("Manipulated Data", manipulatedData);

  }
  //Nutritional Values: {Object.entries(item.nutritionalValues).map(([key, value]) => `${key}: ${value}`).join(', ')}


  if (!manipulatedData || Object.keys(manipulatedData).length === 0) {
    // Render loading state while waiting for data
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(manipulatedData)}
        renderItem={renderItem}
        keyExtractor={item => item.name}
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
    width: 353,
    height: 150,
    margin: 10,
    backgroundColor: '#568259',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 20,
    color: '#F2EFE9',
    textAlign: 'center',
  },
});

export default Results;
