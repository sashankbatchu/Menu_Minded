import AsyncStorage from "@react-native-async-storage/async-storage";

const retrieveAndManipulateGoalData = async () => {
    try {
        const value = await AsyncStorage.getItem('userGoals');
        if (value !== null) {
            const jsonUserGoals = JSON.parse(value);
            console.log('Retrieved jsonUserGoals:', jsonUserGoals);

            // Check if jsonUserGoals is an object before manipulating it
            if (typeof jsonUserGoals === 'object' && jsonUserGoals !== null) {
                // Manipulate jsonUserGoals here
                const manipulatedData = {
                    protein: jsonUserGoals.protein,
                    carbs: jsonUserGoals.carbs,
                    fat: jsonUserGoals.fat,
                    sugar: jsonUserGoals.sugar,
                    sodium: jsonUserGoals.sodium,
                    cholesterol: jsonUserGoals.cholesterol
                    // Manipulate other fields as needed
                };

                return manipulatedData;
            } else {
                console.log('jsonUserGoals is not an object:', jsonUserGoals);
                return null;
            }
        } else {
            console.log('No jsonUserGoals found in AsyncStorage');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving jsonUserGoals:', error);
        return null;
    }
};

export default retrieveAndManipulateGoalData;
