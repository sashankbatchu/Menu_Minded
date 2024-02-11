// import { jsonUserGoals } from './Screens/NutritionalGoalsPage';
import retrieveAndManipulateGoalData from './Screens/retrieveAndManipulateGoalData'; // Update the path as needed
import { getAllergens } from './Screens/allergenAsyncStorage';
import { getRestrictions } from './Screens/restrictionsAsyncStorage';
import { useEffect, useState } from 'react';
import extractItemValues from './functions/extractItemValues'

const manipulateData = (userJsonData) => {
    const [userAllergensList, setUserAllergensList] = useState([""]);
    const [userRestrictions, setUserRestrictions] = useState([""]);
    const [wantsCarbs, setWantsCarbs] = useState(0);
    const [wantsProtein, setWantsProtein] = useState(0);
    const [wantsFat, setWantsFat] = useState(0);
    const [wantsSugar, setWantsSugar] = useState(0);
    const [wantsSodium, setWantsSodium] = useState(0);
    const [wantsCholesterol, setWantsCholesterol] = useState(0);

    //let userAllergensList = [""];
    //let userRestrictions = [""];

    // const data = JSON.parse(userJsonData);
    const data = userJsonData;
    const fish = ["Tilapia", "Cod", "Bass", "Swordfish", "Salmon", "Tuna", "Halibut", "Catfish", "Squid", "Calamari", "Octopus", "Scallop"];
    const lactoseIntolerant = ["Milk", "Cheese", "Yogurt", "Butter", "Ice Cream"];
    const eggFree = ["Whole Eggs", "Egg Whites", "Mayonnaise"];
    const shellfishFree = ["Shrimp", "Crab", "Lobster", "Clams", "Mussels", "Oyster"];
    const halal = ["Beef", "Chicken", "Pork", "Lamb", "Turkey", "Duck", "Mutton", "Steak", "Ham", "Gelatin"];

    const dietaryRestrictions = {
        "vegetarian": shellfishFree.concat(halal, fish),
        "vegan": shellfishFree.concat(halal, fish, eggFree, lactoseIntolerant),
        "gluten-free": ["Wheat", "Barley", "Rye", "Semolina", "Flour", "Bread"],
        "lactose-intolerant": lactoseIntolerant,
        "jain": ["Potatoes", "Carrots", "Onions", "Garlic"].concat(shellfishFree, halal, fish, eggFree),
        "kosher": ["Pork"].concat(shellfishFree),
        "halal": halal
    };

    // Allergen info
    const allergens = {
        "peanuts": "peanuts",
        "tree nuts": ["almonds", "brazil nuts", "cashews", "hazelnuts", "pecans", "pistachios", "walnuts"],
        "shellfish": shellfishFree,
        "fish": fish,
        "milk": "Milk",
        "eggs": "Eggs",
        "wheat": "Wheat",
        "soy": "Soy",
        "sesame": "Sesame",
    };

    // Targeted towards user -- store user information
    // let userAllergensList = [""];
    useEffect(() => {
        const fetchAllergens = async () => {
            // fetchedAllergens = await getAllergens();
            // userAllergensList = extractItemValues(JSON.stringify(fetchedAllergens));
            // setUserAllergensList(userAllergensList);
            await getAllergens().then((fetchedAllergens) => {
                setUserAllergensList(extractItemValues(JSON.stringify(fetchedAllergens)));
            })
        };
        fetchAllergens()
    }, []);
    console.log('Allergens:', userAllergensList);

    // let userRestrictions = [""]; // Add your specific user restrictions here
    useEffect(() => {
        const fetchRestrictions = async () => {
            // fetchedRestrictions = await getRestrictions();
            // userRestrictions = extractItemValues(JSON.stringify(fetchedRestrictions));
            // setUserRestrictions(userRestrictions)
            await getRestrictions().then((fetchedRestrictions) => {
                setUserRestrictions(extractItemValues(JSON.stringify(fetchedRestrictions)));
            })
        };
        fetchRestrictions()
    }, []);
    console.log('Restrictions:', userRestrictions);

    const dietaryRestrictionsList = userRestrictions.flatMap(restriction =>
        dietaryRestrictions[restriction.toLowerCase()] || []
    ).map(item => item.toLowerCase()); //checl

    const allergenRestrictionsList = userAllergensList.flatMap(restriction =>
        allergens[restriction.toLowerCase()] || []
    ).map(item => item.toLowerCase()); //check

    // Find all possible food items to avoid
    const allToAvoid = [...new Set(allergenRestrictionsList.concat(dietaryRestrictionsList))]; // check
    // Filtering initial menu_items
    const filteredMenuItems = data.filter(item => {
        const ingredients = item.ingredients.toLowerCase().split(', ');
        return !ingredients.some(ingredient => allToAvoid.includes(ingredient));
    }); //check

    // Weights
    const proteinWeight = 0.00176352705;
    const carbWeight = 0.00096192385;
    const fatWeight = 0.00440881764;
    const sugarWeight = 0.00529058116;
    const sodiumWeight = 0.10581162325;
    const cholesterolWeight = 0.88176352705;

    // let wantsProtein = 1;
    // let wantsCarbs = 1;
    // let wantsFat = 1;
    // let wantsSugar = 1;
    // let wantsSodium = 1;
    // let wantsCholesterol = 1;
    // Bools 1 = high, -1 = low, 0 = not specified
    retrieveAndManipulateGoalData().then(manipulatedData => {
        // Use manipulatedData here
        setWantsProtein(manipulatedData.protein);
        setWantsCarbs(manipulatedData.carbs);
        setWantsFat(manipulatedData.fat);
        setWantsSugar(manipulatedData.sugar);
        setWantsSodium(manipulatedData.sodium);
        setWantsCholesterol(manipulatedData.cholesterol);
        // console.log('Manipulated data:', manipulatedData);
    }).catch(error => {
        console.error('Error retrieving and manipulating data:', error);
    });



    // Extract nutritional values and item names, then create a 2D array
    const nutritionalData = filteredMenuItems.map(item => [
        item.name,
        item.nutritionalValues.protein,
        item.nutritionalValues.carbs,
        item.nutritionalValues.fat,
        item.nutritionalValues.sugar,
        item.nutritionalValues.sodium,
        item.nutritionalValues.cholesterol,

        (
            parseFloat(item.nutritionalValues.protein) * proteinWeight * wantsProtein +
            parseFloat(item.nutritionalValues.carbs) * carbWeight * wantsCarbs +
            parseFloat(item.nutritionalValues.fat) * fatWeight * wantsFat +
            parseFloat(item.nutritionalValues.sodium) * sodiumWeight * wantsSodium +
            parseFloat(item.nutritionalValues.cholesterol) * cholesterolWeight * wantsCholesterol +
            parseFloat(item.nutritionalValues.sugar) * sugarWeight * wantsSugar
        )
    ]); // check because it is converting from loop to this

    // Sort based on the "Composite Value" column (descending order)
    const sortedNutritionalData = nutritionalData.sort((a, b) => parseFloat(b[7]) - parseFloat(a[7])); // check

    // Print the sorted 2D array
    const headers = ["name", "protein", "carbs", "fat", "sugar", "sodium", "cholesterol", "score"];

    // Extract header and data
    // Create a list of dictionaries for all food items
    const resultList = sortedNutritionalData.map(row => {
        const resultDict = { "name": row[0] };
        for (let i = 1; i < headers.length - 1; i++) {
            resultDict[headers[i]] = row[i];
        }
        resultDict["score"] = row[row.length - 1];
        return resultDict;
    }); // check this shit

    // Convert the list of dictionaries to JSON
    const resultJson = JSON.stringify(resultList, null, 2);
    return resultJson;
}

export default manipulateData;
