import retrieveAndManipulateGoalData from './Screens/retrieveAndManipulateGoalData'; // Update the path as needed
import { getAllergens } from './Screens/allergenAsyncStorage';
import { getRestrictions } from './Screens/restrictionsAsyncStorage';
import { useEffect, useState } from 'react';
import extractItemValues from './functions/extractItemValues'

manipulateData = async (userJsonData) => {
    // const [userAllergensList, setUserAllergensList] = useState([""]);
    // const [userRestrictions, setUserRestrictions] = useState([""]);
    let userAllergensList;
    let userRestrictions;
    let wantsCarbs = 0; 
    let wantsProtein = 0; 
    let wantsFat = 0;
    let wantsSugar = 0; 
    let wantsSodium = 0;
    let wantsCholesterol = 0;

    console.log("userJsonData1", userJsonData)
    let toReturn;
   
    // useEffect(() => {

            const fetchedAllergens = await getAllergens();
            userAllergensList = extractItemValues(JSON.stringify(fetchedAllergens));

            const fetchedRestrictions = await getRestrictions();
            userRestrictions = extractItemValues(JSON.stringify(fetchedRestrictions));


            const retrievedManipulatedData = await retrieveAndManipulateGoalData();
            // Use manipulatedData here
                wantsProtein = retrievedManipulatedData.protein;
                wantsCarbs = retrievedManipulatedData.carbs;
                wantsFat = retrievedManipulatedData.fat;
                wantsSugar = retrievedManipulatedData.sugar;
                wantsSodium = retrievedManipulatedData.sodium;
                wantsCholesterol = retrievedManipulatedData.cholesterol;
                // console.log('Manipulated data:', manipulatedData);
                toReturn = actuallyManipulateData(userJsonData, userAllergensList, userRestrictions, wantsProtein, wantsCarbs, wantsFat, wantsSugar, wantsSodium, wantsCholesterol);
                console.log("toreturn", toReturn);

         return toReturn;        

    // }, []);

    // handleFetchedData = (allergens, restrictions, wantsProtein, wantsCarbs, wantsFat, wantsSugar, wantsSodium, wantsCholesterol) => {
    //     console.log("Allergen1", allergens);
    //     console.log("restrictions1", restrictions);
    //     console.log("wantsProtein", wantsProtein)
    //     console.log("wantsCarbs" ,wantsCarbs)
    //     console.log("wantsFat", wantsFat)
    //     console.log("wantsSugar", wantsSugar)
    //     console.log("wantsSodium", wantsSodium)
    //     console.log("wantsCholesterol", wantsCholesterol)
    //     console.log("running function")
    //     toReturn = actuallyManipulateData(userJsonData, allergens, restrictions, wantsProtein, wantsCarbs, wantsFat, wantsSugar, wantsSodium, wantsCholesterol);
    //     console.log("toreturn", toReturn);
    //     return toReturn
    // };
}


const actuallyManipulateData = (userJsonData, userAllergensList, userRestrictions, wantsProtein, wantsCarbs, wantsFat, wantsSugar, wantsSodium, wantsCholesterol) => {
    console.log("actuallymanipulatdata is running")
    // const [userAllergensList, setUserAllergensList] = useState([""]);
    // const [userRestrictions, setUserRestrictions] = useState([""]);
    
    console.log("userAllergenList2", userAllergensList)
    console.log("userjsondata2", userJsonData)
    console.log("userRestrictions2", userRestrictions)

    // const [wantsCarbs, setWantsCarbs] = useState(0);
    // const [wantsProtein, setWantsProtein] = useState(0);
    // const [wantsFat, setWantsFat] = useState(0);
    // const [wantsSugar, setWantsSugar] = useState(0);
    // const [wantsSodium, setWantsSodium] = useState(0);
    // const [wantsCholesterol, setWantsCholesterol] = useState(0);


    //let userAllergensList = [""];
    //let userRestrictions = [""];

    // const data = JSON.parse(userJsonData);
    const fish = ["Tilapia", "Cod", "Bass", "Swordfish", "Salmon", "Tuna", "Halibut", "Catfish", "Squid", "Calamari", "Octopus", "Scallop"];
    const lactoseIntolerant = ["Milk", "Cheese", "Yogurt", "Butter", "Ice Cream"];
    const eggFree = ["Whole Eggs", "Egg Whites", "Mayonnaise"];
    const shellfishFree = ["Shrimp", "Crab", "Lobster", "Clams", "Mussels", "Oyster"];
    const halal = ["Beef", "Chicken", "Pork", "Lamb", "Turkey", "Duck", "Mutton", "Steak", "Ham", "Gelatin"];

    console.log("halal", halal);

    const dietaryRestrictions = {
        "vegetarian": shellfishFree.concat(halal, fish),
        "vegan": shellfishFree.concat(halal, fish, eggFree, lactoseIntolerant),
        "gluten-free": ["Wheat", "Barley", "Rye", "Semolina", "Flour", "Bread"],
        "lactose-intolerant": lactoseIntolerant,
        "jain": ["Potatoes", "Carrots", "Onions", "Garlic"].concat(shellfishFree, halal, fish, eggFree),
        "kosher": ["Pork"].concat(shellfishFree),
        "halal": halal
    };

    console.log("dietaryRestrictions", dietaryRestrictions);


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

    console.log("allergens", allergens);


    // Targeted towards user -- store user information

    // useEffect(() => {
    //     const fetchAllergensandRestrictions = async () => {
    //         await getAllergens().then((fetchedAllergens) => {
    //             setUserAllergensList(JSON.stringify(fetchedAllergens));

    //         })
    //         await getRestrictions().then((fetchedRestrictions) => {
    //             setUserRestrictions(extractItemValues(JSON.stringify(fetchedRestrictions)));

    //         })
    
    //     };
    //     fetchAllergensandRestrictions();
    // }, []);

    // useEffect(() => {
    //     console.log("are they even changing?")
    //     console.log('Allergens2:', userAllergensList);
    //     console.log('Restrictions2:', userRestrictions);
    // }, [userAllergensList, userRestrictions])
   

    const dietaryRestrictionsList = userRestrictions.flatMap(restriction =>
        dietaryRestrictions[restriction.toLowerCase()] || []
    ).map(item => item.toLowerCase()); 

    console.log("dietaryRestrictionsList", dietaryRestrictionsList);

    const allergenRestrictionsList = userAllergensList.flatMap(restriction =>
        allergens[restriction.toLowerCase()] || []
    ).map(item => item.toLowerCase()); 

    console.log("allerenRestricionLIst", allergenRestrictionsList);


    // Find all possible food items to avoid
    let allToAvoid = [...new Set(allergenRestrictionsList.concat(dietaryRestrictionsList))]; // check
    console.log("allToavoid", allToAvoid);

    //add spaces after commans in userJson
    userJsonData = JSON.parse(userJsonData.replace(/,/g, ', '))
    console.log("userJsonDataworkingbeforefitering?", userJsonData)

    // Filtering initial menu_items
    const filteredMenuItems = userJsonData.filter(item => {
        const ingredients = item.ingredients.toLowerCase().split(', ');
        return !ingredients.some(ingredient => allToAvoid.includes(ingredient.trim()));
    }); 

    console.log("filteredmenudata", filteredMenuItems)

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


    // retrieveAndManipulateGoalData().then(manipulatedData => {
    //     // Use manipulatedData here
    //     setWantsProtein(manipulatedData.protein);
    //     setWantsCarbs(manipulatedData.carbs);
    //     setWantsFat(manipulatedData.fat);
    //     setWantsSugar(manipulatedData.sugar);
    //     setWantsSodium(manipulatedData.sodium);
    //     setWantsCholesterol(manipulatedData.cholesterol);
    //     // console.log('Manipulated data:', manipulatedData);
    // }).catch(error => {
    //     console.error('Error retrieving and manipulating data:', error);
    // });



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
        resultDict["score"] = row[7];
        return resultDict;
    }); // check this shit

    // Convert the list of dictionaries to JSON
    // const resultJson = JSON.stringify(resultList, null, 2);
    console.log("resultList", resultList)
    return resultList;
}

export default manipulateData