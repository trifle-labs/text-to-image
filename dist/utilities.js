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
 * Common aspect ratios available for image generation
 */
export const ASPECT_RATIOS = {
    '1:1': [1, 1],
    '4:3': [4, 3],
    '3:4': [3, 4],
    '16:9': [16, 9],
    '9:16': [9, 16],
};
/**
 * Calculate optimal image dimensions for given text length and aspect ratio
 * @param textLength - The length of text to encode
 * @param aspectRatio - The desired [width, height] ratio (default [1, 1] for square)
 * @returns [width, height] tuple
 */
export function getImageSize(textLength, aspectRatio = [1, 1]) {
    // Account for null terminators at the end
    const totalPixels = textLength + 2;
    const [ratioW, ratioH] = aspectRatio;
    // Solve: width * height >= totalPixels  and  width / height == ratioW / ratioH
    // => width = sqrt(totalPixels * ratioW / ratioH)
    const width = Math.ceil(Math.sqrt(totalPixels * ratioW / ratioH));
    const height = Math.ceil(totalPixels / width);
    return [width, height];
}
