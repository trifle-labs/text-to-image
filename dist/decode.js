/**
 * Decode image back to text
 */
/**
 * Decode a grayscale image back to text
 * @param imageFile - The image file to decode
 * @returns Promise that resolves to the decoded text
 */
export function decodeImage(imageFile) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = (e) => {
            if (!e.target?.result) {
                reject(new Error('Failed to read image file'));
                return;
            }
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        reject(new Error('Could not get canvas context'));
                        return;
                    }
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, img.width, img.height);
                    const data = imageData.data;
                    let decodedText = '';
                    // Read pixels and convert back to characters
                    for (let x = 0; x < img.width; x++) {
                        for (let y = 0; y < img.height; y++) {
                            const pixelIndex = (y * img.width + x) * 4;
                            const pixelValue = data[pixelIndex]; // Red channel (they're all the same in grayscale)
                            // Ignore 0 (NULL) values
                            if (pixelValue !== 0) {
                                decodedText += String.fromCharCode(pixelValue);
                            }
                        }
                    }
                    resolve(decodedText);
                }
                catch (error) {
                    reject(error);
                }
            };
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(imageFile);
    });
}
