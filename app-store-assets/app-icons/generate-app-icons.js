const fs = require('fs');
const path = require('path');
const https = require('https');
const { createCanvas, loadImage } = require('canvas');

// Create directories if they don't exist
const iosIconsDir = path.join(__dirname, 'ios');
const androidIconsDir = path.join(__dirname, 'android');

if (!fs.existsSync(iosIconsDir)) {
  fs.mkdirSync(iosIconsDir, { recursive: true });
}

if (!fs.existsSync(androidIconsDir)) {
  fs.mkdirSync(androidIconsDir, { recursive: true });
}

// iOS icon sizes
const iosSizes = [
  { size: 1024, name: 'app-store-icon-1024x1024' },
  { size: 180, name: 'iphone-60@3x' },
  { size: 167, name: 'ipad-83.5@2x' },
  { size: 152, name: 'ipad-76@2x' },
  { size: 120, name: 'iphone-60@2x' },
  { size: 76, name: 'ipad-76' }
];

// Android icon sizes
const androidSizes = [
  { size: 512, name: 'playstore-icon-512x512' },
  { size: 192, name: 'xxxhdpi' },
  { size: 144, name: 'xxhdpi' },
  { size: 96, name: 'xhdpi' },
  { size: 72, name: 'hdpi' },
  { size: 48, name: 'mdpi' },
  { size: 36, name: 'ldpi' }
];

// Function to download the image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

// Function to resize image and save
async function resizeAndSaveImage(imageBuffer, size, outputPath) {
  try {
    const image = await loadImage(imageBuffer);
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Draw a white background (for transparency handling)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);
    
    // Draw the image
    ctx.drawImage(image, 0, 0, size, size);
    
    // Save the image
    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    
    return new Promise((resolve, reject) => {
      out.on('finish', resolve);
      out.on('error', reject);
    });
  } catch (error) {
    console.error(`Error resizing image to ${size}x${size}:`, error);
    throw error;
  }
}

// Main function to generate all icons
async function generateIcons() {
  try {
    console.log('Downloading source image...');
    const imageUrl = 'https://i.ibb.co/0pTS2KrK/Tt-app-Logo.png';
    const imageBuffer = await downloadImage(imageUrl);
    
    console.log('Generating iOS icons...');
    for (const { size, name } of iosSizes) {
      const outputPath = path.join(iosIconsDir, `${name}.png`);
      console.log(`Creating ${outputPath}...`);
      await resizeAndSaveImage(imageBuffer, size, outputPath);
    }
    
    console.log('Generating Android icons...');
    for (const { size, name } of androidSizes) {
      const outputPath = path.join(androidIconsDir, `${name}.png`);
      console.log(`Creating ${outputPath}...`);
      await resizeAndSaveImage(imageBuffer, size, outputPath);
    }
    
    console.log('All app icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

// Run the icon generation
generateIcons();