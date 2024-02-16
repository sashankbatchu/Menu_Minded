import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveProcessedMenuData = async (menuData) => {
    try {
        await AsyncStorage.setItem('processedMenuData', JSON.stringify(menuData));
        console.log('Menu Data saved successfully');
    } catch (error) {
        console.error('Error saving menu data:', error);
    }
};

// Define a function to retrieve the processedMenuData
export const getProcessedMenuData = async () => {
    try {
        const value = await AsyncStorage.getItem('processedMenuData');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
        console.error('Error retrieving selected allergens:', error);
        return [];
    }
};
