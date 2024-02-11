export default function extractItemValues(allergensData) {
    try {
        if (typeof allergensData !== 'string') {
            throw new TypeError('Input data must be a string');
        }

        // Extract the JSON portion by removing any additional characters
        const jsonStartIndex = allergensData.indexOf('[');
        const jsonEndIndex = allergensData.lastIndexOf(']');
        const json = allergensData.substring(jsonStartIndex, jsonEndIndex + 1);

        const allergens = JSON.parse(json);
        const itemValues = allergens.map(allergen => allergen.item);
        return itemValues;
    } catch (error) {
        console.error('Error extracting item values:', error);
        return [];
    }
}
