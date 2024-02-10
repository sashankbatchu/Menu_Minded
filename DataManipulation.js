const manipulateData = (userJsonData) => {
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

    // Targeted towards user
    // Combine allergens and dietary restrictions
    const userAllergensList = ["soy"];
    const userRestrictions = [""]; // Add your specific user restrictions here

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

    // Bools 1 = high, -1 = low, 0 = not specified
    const wantsProtein = 0;
    const wantsCarbs = 0;
    const wantsFat = 0;
    const wantsSugar = 1;
    const wantsSodium = 0;
    const wantsCholesterol = 0;


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
