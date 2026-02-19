/**
 * Main application entry point
 */
import { encodeText, downloadImage } from './encode.js';
import { decodeImage } from './decode.js';
import { ASPECT_RATIOS } from './utilities.js';
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const encodeTab = document.getElementById('encode-tab');
    const decodeTab = document.getElementById('decode-tab');
    const encodeSection = document.getElementById('encode-section');
    const decodeSection = document.getElementById('decode-section');
    const textInput = document.getElementById('text-input');
    const textFileInput = document.getElementById('text-file-input');
    const aspectRatioSelect = document.getElementById('aspect-ratio-select');
    const encodeBtn = document.getElementById('encode-btn');
    const previewCanvas = document.getElementById('preview-canvas');
    const downloadBtn = document.getElementById('download-btn');
    const imageSizeInfo = document.getElementById('image-size-info');
    const imageInput = document.getElementById('image-input');
    const decodeBtn = document.getElementById('decode-btn');
    const decodedOutput = document.getElementById('decoded-output');
    const copyBtn = document.getElementById('copy-btn');
    let currentCanvas = null;
    // Tab switching
    encodeTab.addEventListener('click', () => {
        encodeTab.classList.add('active');
        decodeTab.classList.remove('active');
        encodeSection.classList.add('active');
        decodeSection.classList.remove('active');
    });
    decodeTab.addEventListener('click', () => {
        decodeTab.classList.add('active');
        encodeTab.classList.remove('active');
        decodeSection.classList.add('active');
        encodeSection.classList.remove('active');
    });
    // Encode functionality
    encodeBtn.addEventListener('click', () => {
        const text = textInput.value;
        if (!text) {
            alert('Please enter some text to encode');
            return;
        }
        try {
            const ratioKey = aspectRatioSelect.value;
            const aspectRatio = ASPECT_RATIOS[ratioKey] ?? [1, 1];
            currentCanvas = encodeText(text, 256, aspectRatio);
            // Display preview
            const ctx = previewCanvas.getContext('2d');
            if (ctx) {
                previewCanvas.width = currentCanvas.width;
                previewCanvas.height = currentCanvas.height;
                ctx.drawImage(currentCanvas, 0, 0);
                // Show size info
                imageSizeInfo.textContent = `Image size: ${currentCanvas.width} × ${currentCanvas.height} pixels`;
                imageSizeInfo.style.display = 'block';
                // Enable download button
                downloadBtn.disabled = false;
            }
        }
        catch (error) {
            console.error('Encoding error:', error);
            alert('Failed to encode text: ' + error.message);
        }
    });
    // Download functionality
    downloadBtn.addEventListener('click', () => {
        if (currentCanvas) {
            downloadImage(currentCanvas, 'encoded-text.png');
        }
    });
    // Decode functionality
    decodeBtn.addEventListener('click', async () => {
        const file = imageInput.files?.[0];
        if (!file) {
            alert('Please select an image to decode');
            return;
        }
        try {
            const decodedText = await decodeImage(file);
            decodedOutput.value = decodedText;
            copyBtn.disabled = false;
        }
        catch (error) {
            console.error('Decoding error:', error);
            alert('Failed to decode image: ' + error.message);
        }
    });
    // Copy to clipboard functionality
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(decodedOutput.value);
            // Visual feedback
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }
        catch (error) {
            console.error('Failed to copy text:', error);
            alert('Failed to copy text to clipboard');
        }
    });
    // Enable encode button when text is entered
    textInput.addEventListener('input', () => {
        encodeBtn.disabled = textInput.value.length === 0;
    });
    // Load text file contents into textarea
    textFileInput.addEventListener('change', () => {
        const file = textFileInput.files?.[0];
        if (!file)
            return;
        if (!file.type.startsWith('text/') && !file.name.endsWith('.txt')) {
            alert('Please select a valid text file (.txt)');
            textFileInput.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            textInput.value = e.target?.result ?? '';
            encodeBtn.disabled = textInput.value.length === 0;
        };
        reader.onerror = () => {
            alert('Failed to read file. Please try again.');
            textFileInput.value = '';
        };
        reader.readAsText(file);
    });
    // Enable decode button when file is selected
    imageInput.addEventListener('change', () => {
        decodeBtn.disabled = !imageInput.files?.[0];
    });
});
