// AsyncStorageUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAllergens = async (allergens) => {
    try {
        await AsyncStorage.setItem('selectedAllergens', JSON.stringify(allergens));
        console.log('Allergens saved successfully');
    } catch (error) {
        console.error('Error saving allergens:', error);
    }
};

export const getAllergens = async () => {
    try {
        const value = await AsyncStorage.getItem('selectedAllergens');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
        console.error('Error retrieving selected allergens:', error);
        return [];
    }
};
