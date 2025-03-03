# iOS App Signing Guide for TerraTime Grounds

This guide walks you through the process of setting up app signing for your iOS app to prepare it for App Store submission.

## Prerequisites

- An Apple Developer Program account ($99/year)
- Xcode installed on your Mac
- Your TerraTime Grounds app project

## Step 1: Create an App ID

1. Log in to your [Apple Developer Account](https://developer.apple.com/account)
2. Navigate to "Certificates, IDs & Profiles"
3. Select "Identifiers" from the sidebar
4. Click the "+" button to register a new App ID
5. Enter the following details:
   - Description: TerraTime Grounds
   - Bundle ID: com.terratime.grounds (or your preferred bundle ID)
6. Select the capabilities your app needs:
   - Push Notifications
   - Associated Domains (if you're using universal links)
7. Click "Continue" and then "Register"

## Step 2: Create a Distribution Certificate

If you don't already have a distribution certificate:

1. In the "Certificates, IDs & Profiles" section, select "Certificates"
2. Click the "+" button
3. Select "App Store and Ad Hoc" under Production
4. Follow the instructions to create a Certificate Signing Request (CSR) using Keychain Access
5. Upload the CSR file
6. Download the certificate and double-click to install it in your Keychain

## Step 3: Create a Provisioning Profile

1. In the "Certificates, IDs & Profiles" section, select "Profiles"
2. Click the "+" button
3. Select "App Store" under Distribution
4. Select the App ID you created earlier
5. Select the distribution certificate you want to use
6. Enter a profile name (e.g., "TerraTime Grounds App Store")
7. Generate and download the profile

## Step 4: Configure Xcode Project

1. Open your Xcode project
2. Select your project in the Project Navigator
3. Select your app target
4. In the "Signing & Capabilities" tab:
   - Check "Automatically manage signing" or manually select your provisioning profile
   - Ensure your Team is selected
   - Verify that the Bundle Identifier matches your App ID

## Step 5: Archive and Upload

1. Connect your iOS device (optional)
2. Select "Generic iOS Device" or your connected device as the build target
3. Select Product > Archive from the menu
4. When the archive is complete, the Organizer window will appear
5. Select your archive and click "Distribute App"
6. Select "App Store Connect" and click "Next"
7. Select "Upload" and click "Next"
8. Select your distribution certificate and provisioning profile if prompted
9. Review the app properties and click "Next"
10. Click "Upload"

## Step 6: Submit in App Store Connect

1. Log in to [App Store Connect](https://appstoreconnect.apple.com/)
2. Navigate to "My Apps" and select your app
3. Create a new version if needed
4. Wait for your build to process (this may take some time)
5. Once processed, select the build for your version
6. Complete all required metadata, screenshots, and app information
7. Submit for review

## Troubleshooting

### Common Issues

1. **Provisioning profile is invalid**
   - Ensure your certificate is valid and not expired
   - Regenerate your provisioning profile

2. **App ID mismatch**
   - Make sure your Bundle ID in Xcode matches your App ID

3. **Missing capabilities**
   - Add any required capabilities to your App ID and regenerate your provisioning profile

4. **Certificate not found**
   - Ensure your distribution certificate is installed in your Keychain

### Getting Help

If you encounter issues with the signing process, you can:

- Check Apple's [Developer Documentation](https://developer.apple.com/documentation/)
- Contact Apple Developer Support
- Visit the [Apple Developer Forums](https://developer.apple.com/forums/)