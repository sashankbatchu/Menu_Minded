// AsyncStorageUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveRestrictions = async (restrictions) => {
    try {
        await AsyncStorage.setItem('selectedRestrictions', JSON.stringify(restrictions));
        console.log('Restrictions saved successfully');
    } catch (error) {
        console.error('Error saving restrictions:', error);
    }
};

export const getRestrictions = async () => {
    try {
        const value = await AsyncStorage.getItem('selectedRestrictions');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
        console.error('Error retrieving selected restrictions:', error);
        return [];
    }
};
