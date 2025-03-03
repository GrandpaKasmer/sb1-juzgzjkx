const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Create directories if they don't exist
const iosIconsDir = path.join(__dirname, '../../App_Resources/iOS/Assets.xcassets/AppIcon.appiconset');
const launchScreenDir = path.join(__dirname, '../../App_Resources/iOS/Assets.xcassets/LaunchScreen.Center.imageset');
const launchBgDir = path.join(__dirname, '../../App_Resources/iOS/Assets.xcassets/LaunchScreen.AspectFill.imageset');

if (!fs.existsSync(iosIconsDir)) {
  fs.mkdirSync(iosIconsDir, { recursive: true });
}

if (!fs.existsSync(launchScreenDir)) {
  fs.mkdirSync(launchScreenDir, { recursive: true });
}

if (!fs.existsSync(launchBgDir)) {
  fs.mkdirSync(launchBgDir, { recursive: true });
}

// iOS icon sizes
const iosSizes = [
  { size: 1024, name: 'icon-1024' },
  { size: 180, name: 'icon-60@3x' },
  { size: 167, name: 'icon-83.5@2x' },
  { size: 152, name: 'icon-76@2x' },
  { size: 120, name: 'icon-60@2x' },
  { size: 120, name: 'icon-40@3x' },
  { size: 80, name: 'icon-40@2x' },
  { size: 76, name: 'icon-76' },
  { size: 58, name: 'icon-29@2x' },
  { size: 87, name: 'icon-29@3x' },
  { size: 40, name: 'icon-40' },
  { size: 29, name: 'icon-29' },
  { size: 20, name: 'icon-20' },
  { size: 40, name: 'icon-20@2x' },
  { size: 60, name: 'icon-20@3x' }
];

// Launch screen sizes
const launchScreenSizes = [
  { size: 384, name: 'LaunchScreen-Center' },
  { size: 768, name: 'LaunchScreen-Center@2x' },
  { size: 1152, name: 'LaunchScreen-Center@3x' }
];

// Launch screen background sizes
const launchBgSizes = [
  { size: 750, name: 'LaunchScreen-AspectFill', height: 1334 },
  { size: 1125, name: 'LaunchScreen-AspectFill@2x', height: 2001 },
  { size: 1242, name: 'LaunchScreen-AspectFill@3x', height: 2208 }
];

// Function to resize image and save
async function resizeAndSaveImage(imagePath, size, outputPath, height = null) {
  try {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(size, height || size);
    const ctx = canvas.getContext('2d');
    
    // Fill with green background for launch screens
    if (height) {
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, 0, size, height);
    } else {
      // For icons, use a white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, size, size);
    }
    
    // Draw the image
    if (height) {
      // Center the image for launch screens
      const aspectRatio = image.width / image.height;
      let drawWidth, drawHeight, drawX, drawY;
      
      if (aspectRatio > 1) {
        // Image is wider than tall
        drawHeight = height * 0.4;
        drawWidth = drawHeight * aspectRatio;
        drawX = (size - drawWidth) / 2;
        drawY = (height - drawHeight) / 2;
      } else {
        // Image is taller than wide
        drawWidth = size * 0.4;
        drawHeight = drawWidth / aspectRatio;
        drawX = (size - drawWidth) / 2;
        drawY = (height - drawHeight) / 2;
      }
      
      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    } else {
      // For icons, fill the entire canvas
      ctx.drawImage(image, 0, 0, size, size);
    }
    
    // Save the image
    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    
    return new Promise((resolve, reject) => {
      out.on('finish', resolve);
      out.on('error', reject);
    });
  } catch (error) {
    console.error(`Error resizing image to ${size}x${height || size}:`, error);
    throw error;
  }
}

// Main function to generate all icons
async function generateIcons() {
  try {
    console.log('Generating iOS icons...');
    const logoPath = path.join(__dirname, 'Tt-app-Logo.png');
    
    // Check if the logo file exists, if not download it
    if (!fs.existsSync(logoPath)) {
      console.log('Logo file not found, creating a placeholder...');
      const canvas = createCanvas(1024, 1024);
      const ctx = canvas.getContext('2d');
      
      // Create a green background
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, 0, 1024, 1024);
      
      // Add text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 200px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TT', 512, 512);
      
      const out = fs.createWriteStream(logoPath);
      const stream = canvas.createPNGStream();
      stream.pipe(out);
      
      await new Promise((resolve, reject) => {
        out.on('finish', resolve);
        out.on('error', reject);
      });
    }
    
    // Generate app icons
    for (const { size, name } of iosSizes) {
      const outputPath = path.join(iosIconsDir, `${name}.png`);
      console.log(`Creating ${outputPath}...`);
      await resizeAndSaveImage(logoPath, size, outputPath);
    }
    
    // Generate launch screen center image
    for (const { size, name } of launchScreenSizes) {
      const outputPath = path.join(launchScreenDir, `${name}.png`);
      console.log(`Creating ${outputPath}...`);
      await resizeAndSaveImage(logoPath, size, outputPath);
    }
    
    // Generate launch screen background
    for (const { size, name, height } of launchBgSizes) {
      const outputPath = path.join(launchBgDir, `${name}.png`);
      console.log(`Creating ${outputPath}...`);
      await resizeAndSaveImage(logoPath, size, outputPath, height);
    }
    
    console.log('All iOS app icons and launch screens generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

// Run the icon generation
generateIcons();