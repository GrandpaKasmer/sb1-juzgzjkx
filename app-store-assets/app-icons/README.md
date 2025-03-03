# TerraTime Grounds App Icons

This directory contains scripts for generating app icons for iOS and Android app store submissions.

## iOS App Icons

To generate iOS app icons, you need to run the `generate-ios-icons.js` script on a system that supports the `canvas` module. This typically requires a local development environment rather than a cloud-based environment like StackBlitz.

### Requirements

- Node.js installed locally
- Canvas module installed (`npm install canvas`)
- The TerraTime logo image (Tt-app-Logo.png)

### Steps to Generate Icons Locally

1. Clone or download this project to your local machine
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install canvas
   ```
4. Run the icon generation script:
   ```
   node app-store-assets/app-icons/generate-ios-icons.js
   ```
5. The script will generate all required iOS app icons and place them in the appropriate directories

### Required iOS App Icon Sizes

The following icon sizes are required for iOS app submission:

- 1024x1024 (App Store)
- 180x180 (iPhone 6 Plus, 6s Plus, 7 Plus, 8 Plus)
- 167x167 (iPad Pro)
- 152x152 (iPad, iPad mini)
- 120x120 (iPhone)
- 87x87 (iPhone Spotlight @3x)
- 80x80 (iPhone Spotlight @2x)
- 76x76 (iPad)
- 58x58 (iPhone Settings @2x)
- 40x40 (iPad Spotlight)
- 29x29 (iPhone Settings)

### Launch Screen Images

The script also generates the following launch screen images:

- LaunchScreen-Center.png (384x384)
- LaunchScreen-Center@2x.png (768x768)
- LaunchScreen-Center@3x.png (1152x1152)
- LaunchScreen-AspectFill.png (750x1334)
- LaunchScreen-AspectFill@2x.png (1125x2001)
- LaunchScreen-AspectFill@3x.png (1242x2208)

## Alternative Approach

If you cannot run the canvas module, you can:

1. Use an online tool like [App Icon Generator](https://appicon.co/) or [MakeAppIcon](https://makeappicon.com/)
2. Upload the TerraTime logo (Tt-app-Logo.png)
3. Download the generated icons
4. Place them in the appropriate directories:
   - iOS app icons: `App_Resources/iOS/Assets.xcassets/AppIcon.appiconset/`
   - Launch screen center images: `App_Resources/iOS/Assets.xcassets/LaunchScreen.Center.imageset/`
   - Launch screen background images: `App_Resources/iOS/Assets.xcassets/LaunchScreen.AspectFill.imageset/`

## Android App Icons

For Android app icons, a similar process is required. The script `generate-android-icons.js` can be used to generate Android app icons.

## Manual Icon Creation

If you prefer to create icons manually, you can use graphic design software like Adobe Photoshop, Sketch, or GIMP to create icons of the required sizes.

Make sure to:
1. Start with a high-resolution version of the logo (at least 1024x1024)
2. Create versions at all required sizes
3. Save in PNG format
4. Place in the appropriate directories