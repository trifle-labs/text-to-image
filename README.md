# Text to Image Converter

A browser-based tool to convert text to grayscale images and vice versa. Each pixel in the generated image represents a single character's ASCII value.

## Features

- **Encode Text**: Convert any text into a grayscale PNG image
- **Decode Image**: Extract text from encoded images
- **Browser-based**: No server required, runs entirely in your browser
- **Download**: Save encoded images to your device
- **Copy**: Easily copy decoded text to clipboard

## How It Works

### Encoding
- Each character in your text is converted to its ASCII/decimal value (1-255)
- These values become pixel intensities in a grayscale image
- The image dimensions are automatically calculated for optimal square-like proportions
- Black pixels (value 0) indicate null terminators

### Decoding
- Upload an encoded image
- Each pixel's grayscale value is converted back to its corresponding character
- The original text is reconstructed and displayed

## Usage

### Online
Visit the [GitHub Pages site](https://trifle-labs.github.io/text-to-image/) to use the tool directly in your browser.

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/trifle-labs/text-to-image.git
cd text-to-image
```

2. Install dependencies:
```bash
npm install
```

3. Build the TypeScript code:
```bash
npm run build
```

4. Open `index.html` in your browser or serve it with a local web server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

## Technology Stack

- **TypeScript**: Type-safe JavaScript
- **HTML5 Canvas**: For image manipulation
- **Vanilla JavaScript**: No frameworks required
- **CSS3**: Modern styling

## Inspired By

This project is a JavaScript/TypeScript implementation inspired by [akapila011/Text-to-Image](https://github.com/akapila011/Text-to-Image), which is a Python-based command-line tool.

## License

MIT
