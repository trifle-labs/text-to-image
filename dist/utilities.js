/**
 * Utility functions for text-to-image conversion
 */
/**
 * Convert a character to an integer value with limit
 * @param char - A single character
 * @param limit - The maximum pixel value limit (default 256 for 8-bit)
 * @returns A number between 1 and limit-1 representing the character
 */
export function convertCharToInt(char, limit = 256) {
    let value = char.charCodeAt(0) % limit;
    // Avoid 0 (NULL) values, use 1 instead
    value = value === 0 ? 1 : value;
    return value;
}
/**
 * Calculate optimal image dimensions for given text length
 * @param textLength - The length of text to encode
 * @returns [width, height] tuple
 */
export function getImageSize(textLength) {
    // Account for null terminator(s) at the end
    let trueLength = textLength;
    if (textLength % 2 === 0) {
        trueLength = trueLength + 2; // Add 2 null terminators
    }
    else {
        trueLength += 1; // Add 1 null terminator
    }
    const factors = getFactors(trueLength);
    let width, height;
    if (factors.length % 2 !== 0) {
        // Odd number of factors, middle value gives both width and height
        const mid = Math.floor(factors.length / 2);
        width = height = factors[mid];
    }
    else {
        // Even number of factors, get middle 2 values
        const midFactors = factors.slice(factors.length / 2 - 1, factors.length / 2 + 1);
        width = midFactors[1];
        height = midFactors[0];
    }
    return [width, height];
}
/**
 * Get all factors of a number in ascending order
 * @param num - A positive number
 * @returns Array of factors
 */
function getFactors(num) {
    if (num < 0) {
        throw new Error("Number must be positive");
    }
    const factors = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            factors.push(i);
            if (i !== num / i) {
                factors.push(num / i);
            }
        }
    }
    return factors.sort((a, b) => a - b);
}
