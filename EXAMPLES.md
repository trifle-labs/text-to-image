# Usage Examples

## Browser Usage

Visit the [GitHub Pages site](https://trifle-labs.github.io/text-to-image/) to use the tool.

### Encoding Text to Image

1. Click on the "Encode Text" tab
2. Enter your text in the text area
3. Click "Generate Image"
4. View the preview of the generated grayscale image
5. Click "Download PNG" to save the image

**Example:**
- Input: `"Hello World!"`
- Output: 7×2 pixel grayscale PNG image

### Decoding Image to Text

1. Click on the "Decode Image" tab
2. Click "Choose File" and select a previously encoded image
3. Click "Decode Image"
4. View the decoded text in the text area
5. Click "Copy to Clipboard" to copy the text

## Programmatic Usage

You can also use the library directly in your own JavaScript/TypeScript projects:

```javascript
import { encodeText, downloadImage } from './dist/encode.js';
import { decodeImage } from './dist/decode.js';

// Encode text to image
const text = "Hello World!";
const canvas = encodeText(text);

// Download the image
downloadImage(canvas, 'my-encoded-text.png');

// Decode an image file
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const decodedText = await decodeImage(file);
  console.log('Decoded text:', decodedText);
});
```

## How It Works

### Encoding Process

1. Each character in the text is converted to its ASCII decimal value
2. The value is taken modulo 256 to fit in 8-bit grayscale (0-255)
3. Values of 0 are converted to 1 to avoid NULL terminators
4. Image dimensions are calculated to be as square as possible
5. Pixels are filled left-to-right, top-to-bottom with character values
6. Remaining pixels are set to 0 (black) to indicate end of text

### Decoding Process

1. Image is loaded and pixel data is extracted using Canvas API
2. Pixels are read left-to-right, top-to-bottom
3. Each non-zero pixel value is converted back to its character
4. Zero pixels are skipped (NULL terminators)
5. The result is the original text

## Technical Details

- **Pixel Format**: 8-bit grayscale (0-255)
- **Character Encoding**: ASCII/UTF-8 compatible (with modulo 256)
- **Image Format**: PNG with lossless compression
- **Browser Support**: Modern browsers with Canvas API and ES2020 support

## Limitations

- Characters with values above 255 are wrapped using modulo operation
- Very large texts will create correspondingly large images
- Best suited for ASCII text; some Unicode characters may not decode correctly
