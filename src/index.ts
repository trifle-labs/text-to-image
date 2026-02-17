/**
 * Main application entry point
 */

import { encodeText, downloadImage } from './encode.js';
import { decodeImage } from './decode.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const encodeTab = document.getElementById('encode-tab') as HTMLButtonElement;
  const decodeTab = document.getElementById('decode-tab') as HTMLButtonElement;
  const encodeSection = document.getElementById('encode-section') as HTMLElement;
  const decodeSection = document.getElementById('decode-section') as HTMLElement;
  
  const textInput = document.getElementById('text-input') as HTMLTextAreaElement;
  const encodeBtn = document.getElementById('encode-btn') as HTMLButtonElement;
  const previewCanvas = document.getElementById('preview-canvas') as HTMLCanvasElement;
  const downloadBtn = document.getElementById('download-btn') as HTMLButtonElement;
  const imageSizeInfo = document.getElementById('image-size-info') as HTMLElement;
  
  const imageInput = document.getElementById('image-input') as HTMLInputElement;
  const decodeBtn = document.getElementById('decode-btn') as HTMLButtonElement;
  const decodedOutput = document.getElementById('decoded-output') as HTMLTextAreaElement;
  const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;

  let currentCanvas: HTMLCanvasElement | null = null;

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
      currentCanvas = encodeText(text);
      
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
    } catch (error) {
      console.error('Encoding error:', error);
      alert('Failed to encode text: ' + (error as Error).message);
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
    } catch (error) {
      console.error('Decoding error:', error);
      alert('Failed to decode image: ' + (error as Error).message);
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
    } catch (error) {
      console.error('Failed to copy text:', error);
      alert('Failed to copy text to clipboard');
    }
  });

  // Enable encode button when text is entered
  textInput.addEventListener('input', () => {
    encodeBtn.disabled = textInput.value.length === 0;
  });

  // Enable decode button when file is selected
  imageInput.addEventListener('change', () => {
    decodeBtn.disabled = !imageInput.files?.[0];
  });
});
