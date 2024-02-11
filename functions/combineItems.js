// export default function combineItems(data) {
//     const menuItems = [];

//     data.forEach(section => {
//         const sectionName = Object.keys(section)[0]; // Get the section name
//         const items = section[sectionName]; // Get the items in the section

//         Object.keys(items).forEach(itemName => {
//             const item = items[itemName];
//             const newItem = {
//                 name: itemName,
//                 nutritionalValues: item.nutritional_values,
//                 ingredients: item.ingredients
//             };
//             menuItems.push(newItem);
//         });
//     });

//     return menuItems;
// }

export default function combineItems(data) {
    const menuItems = [];

    data.forEach(section => {
        const sectionName = Object.keys(section)[0]; // Get the section name
        const items = section[sectionName]; // Get the items in the section

        Object.keys(items).forEach(itemName => {
            const item = items[itemName];
            const newItem = {
                name: itemName,
                nutritionalValues: item.nutritional_values,
                ingredients: item.ingredients
            };
            menuItems.push(newItem);
        });
    });

    return menuItems;
}
