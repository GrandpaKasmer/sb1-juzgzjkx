const fs = require('fs');
const path = require('path');

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

// Create a placeholder text file to indicate that real icons need to be generated
function createPlaceholderFile(directory, message) {
  const placeholderPath = path.join(directory, 'PLACEHOLDER.txt');
  fs.writeFileSync(placeholderPath, message);
  console.log(`Created placeholder file at ${placeholderPath}`);
}

// Main function
async function createPlaceholders() {
  try {
    console.log('Creating placeholder files for iOS app icons...');
    
    // Create placeholder files
    createPlaceholderFile(iosIconsDir, 
      'PLACEHOLDER FOR APP ICONS\n\n' +
      'To generate real app icons, you need to:\n' +
      '1. Install the canvas module on a system that supports native modules\n' +
      '2. Run the generate-ios-icons.js script\n' +
      '3. Copy the generated icons to this directory\n\n' +
      'For App Store submission, you will need properly sized app icons.'
    );
    
    createPlaceholderFile(launchScreenDir,
      'PLACEHOLDER FOR LAUNCH SCREEN IMAGES\n\n' +
      'To generate real launch screen images, you need to:\n' +
      '1. Install the canvas module on a system that supports native modules\n' +
      '2. Run the generate-ios-icons.js script\n' +
      '3. Copy the generated images to this directory\n\n' +
      'For App Store submission, you will need properly sized launch screen images.'
    );
    
    createPlaceholderFile(launchBgDir,
      'PLACEHOLDER FOR LAUNCH SCREEN BACKGROUND IMAGES\n\n' +
      'To generate real launch screen background images, you need to:\n' +
      '1. Install the canvas module on a system that supports native modules\n' +
      '2. Run the generate-ios-icons.js script\n' +
      '3. Copy the generated images to this directory\n\n' +
      'For App Store submission, you will need properly sized launch screen background images.'
    );
    
    console.log('Placeholder files created successfully!');
  } catch (error) {
    console.error('Error creating placeholder files:', error);
  }
}

// Run the function
createPlaceholders();