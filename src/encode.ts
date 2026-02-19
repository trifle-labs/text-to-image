/**
 * Encode text to a grayscale image
 */

import { convertCharToInt, getImageSize } from './utilities.js';

/**
 * Encode text into a grayscale image
 * @param text - The text to encode
 * @param limit - The pixel value limit (default 256 for 8-bit)
 * @param aspectRatio - The desired [width, height] ratio (default [1, 1] for square)
 * @returns A canvas element with the encoded image
 */
export function encodeText(text: string, limit: number = 256, aspectRatio: [number, number] = [1, 1]): HTMLCanvasElement {
  const textLength = text.length;
  const [width, height] = getImageSize(textLength, aspectRatio);

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Create image data
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  let textIndex = 0;

  // Fill pixels with character values
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pixelIndex = (y * width + x) * 4;

      if (textIndex < textLength) {
        const pixelValue = convertCharToInt(text[textIndex], limit);
        // Set RGB to same value for grayscale
        data[pixelIndex] = pixelValue;     // R
        data[pixelIndex + 1] = pixelValue; // G
        data[pixelIndex + 2] = pixelValue; // B
        data[pixelIndex + 3] = 255;        // Alpha (fully opaque)
        textIndex++;
      } else {
        // Remaining pixels are black (0, 0, 0) to indicate null
        data[pixelIndex] = 0;
        data[pixelIndex + 1] = 0;
        data[pixelIndex + 2] = 0;
        data[pixelIndex + 3] = 255;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Download canvas as PNG image
 * @param canvas - The canvas element
 * @param filename - The filename to save as
 */
export function downloadImage(canvas: HTMLCanvasElement, filename: string = 'encoded.png'): void {
  canvas.toBlob((blob) => {
    if (!blob) {
      throw new Error('Failed to create image blob');
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  });
}
