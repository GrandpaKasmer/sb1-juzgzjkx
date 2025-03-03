# TerraTime Grounds - App Store Submission Alternative Guide

Since you're working in a cloud environment that doesn't support native modules like `canvas`, here's an alternative approach to prepare your app for App Store submission.

## Prerequisites

1. Apple Developer Program membership ($99/year)
2. Xcode installed on a Mac
3. App Store Connect account set up

## Step 1: Download the Project

First, download your project from StackBlitz to your local machine:

1. Click on the "Download Project" button in StackBlitz
2. Extract the downloaded ZIP file to a location on your Mac

## Step 2: Generate App Icons Locally

You'll need to generate app icons on your local machine:

### Option 1: Use the Provided Script

1. Open Terminal and navigate to your project directory
2. Install the canvas module:
   ```bash
   npm install canvas
   ```
3. Run the icon generation script:
   ```bash
   node app-store-assets/app-icons/generate-ios-icons.js
   ```

### Option 2: Use an Online Tool

1. Visit an online app icon generator like [AppIcon.co](https://appicon.co/) or [MakeAppIcon](https://makeappicon.com/)
2. Upload the TerraTime logo (app-store-assets/app-icons/Tt-app-Logo.png)
3. Download the generated icons
4. Place them in the appropriate directories in your project:
   - iOS app icons: `App_Resources/iOS/Assets.xcassets/AppIcon.appiconset/`
   - Launch screen images: `App_Resources/iOS/Assets.xcassets/LaunchScreen.Center.imageset/`
   - Launch screen backgrounds: `App_Resources/iOS/Assets.xcassets/LaunchScreen.AspectFill.imageset/`

## Step 3: Set Up NativeScript Locally

1. Install NativeScript CLI globally:
   ```bash
   npm install -g nativescript
   ```

2. Install iOS development requirements:
   ```bash
   ns environment
   ```
   Follow the prompts to install any missing requirements.

## Step 4: Prepare and Build the App

1. Navigate to your project directory in Terminal
2. Prepare the iOS project:
   ```bash
   ns prepare ios
   ```
3. Build the app for iOS:
   ```bash
   ns build ios --release --for-device
   ```
   This will generate an .ipa file that you can submit to the App Store.

## Step 5: Open the Project in Xcode

1. Navigate to the generated iOS project:
   ```bash
   cd platforms/ios
   ```
2. Open the Xcode project:
   ```bash
   open TerraTimeGrounds.xcworkspace
   ```

## Step 6: Configure Signing in Xcode

1. In Xcode, select the project in the Project Navigator
2. Select the TerraTimeGrounds target
3. Go to the "Signing & Capabilities" tab
4. Sign in with your Apple Developer account
5. Select your team
6. Ensure "Automatically manage signing" is checked
7. Resolve any signing issues that appear

## Step 7: Archive and Upload to App Store

1. In Xcode, select "Generic iOS Device" as the build target
2. Select Product > Archive from the menu
3. When the archive is complete, the Organizer window will appear
4. Select your archive and click "Distribute App"
5. Select "App Store Connect" and click "Next"
6. Select "Upload" and click "Next"
7. Follow the prompts to complete the upload process

## Step 8: Complete App Store Submission

1. Log in to [App Store Connect](https://appstoreconnect.apple.com/)
2. Go to "My Apps" and select your app
3. Complete all required metadata:
   - App Information
   - Pricing and Availability
   - App Review Information
   - Version Information
4. Upload screenshots (from app-store-assets/app-store-screenshots)
5. Submit for review

## App Store Review Guidelines

Ensure your app complies with Apple's [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/). Key areas to focus on:

1. **Privacy**: Ensure your app only requests necessary permissions and includes a privacy policy
2. **Design**: Follow iOS Human Interface Guidelines
3. **Functionality**: Ensure all features work as described
4. **Content**: Ensure all content is appropriate and complies with guidelines

## Resources

- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/overview/themes/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [NativeScript Documentation](https://docs.nativescript.org/)