# TerraTime Grounds - App Store Submission Guide

This guide walks you through the process of submitting TerraTime Grounds to the Apple App Store.

## Prerequisites

1. Apple Developer Program membership ($99/year)
2. Xcode installed on a Mac
3. App Store Connect account set up
4. App icons and screenshots prepared

## Step 1: Generate App Icons

The app icons have been prepared in the `app-store-assets/app-icons` directory. You can use these icons for your App Store submission.

If you need to regenerate the icons, run:

```bash
npm run generate-icons
```

## Step 2: Build the App for iOS

1. Prepare the iOS project:

```bash
npm run prepare:ios
```

2. Build the app for iOS:

```bash
npm run build:ios
```

This will generate an .ipa file that you can submit to the App Store.

## Step 3: App Store Connect Setup

1. Log in to [App Store Connect](https://appstoreconnect.apple.com/)
2. Go to "My Apps" and click the "+" button to add a new app
3. Fill in the required information:
   - Platform: iOS
   - App Name: TerraTime Grounds
   - Primary Language: English
   - Bundle ID: com.terratime.grounds (or your registered bundle ID)
   - SKU: terratime-grounds-001
   - User Access: Full Access

## Step 4: App Information

Fill in the following information in App Store Connect:

### App Information
- App Name: TerraTime Grounds
- Subtitle: Grounds Maintenance Tracker
- Privacy Policy URL: (Your privacy policy URL)
- Category: Business, Productivity

### Pricing and Availability
- Price: (Your chosen price or Free)
- Availability: (Select countries)

### App Review Information
- Contact Information: (Your contact details)
- Notes: "This app is for grounds maintenance workers to track their tasks. The login uses phone verification. For testing, use phone number +15551234567 and verification code 123456."

## Step 5: Version Information

### 1.0 Prepare for Submission
- Screenshots: Upload the screenshots from `app-store-assets/app-store-screenshots`
- App Icon: The app icon is included in the build
- Description: Use the description from `app-store-assets/app-description.md`
- Keywords: grounds maintenance,landscaping,task tracking,work timer,field service
- Support URL: (Your support URL)
- Marketing URL (optional): (Your marketing URL)
- Promotional Text (optional): "Track grounds maintenance tasks with ease"

### Build
- Upload the .ipa file generated in Step 2

## Step 6: Submit for Review

1. Ensure all required information is filled in
2. Click "Save" and then "Submit for Review"
3. Answer the export compliance questions
4. Submit the app

## App Store Review Guidelines

Ensure your app complies with Apple's [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/). Key areas to focus on:

1. **Privacy**: Ensure your app only requests necessary permissions and includes a privacy policy
2. **Design**: Follow iOS Human Interface Guidelines
3. **Functionality**: Ensure all features work as described
4. **Content**: Ensure all content is appropriate and complies with guidelines

## Common Rejection Reasons

- Incomplete information
- Bugs or crashes
- Misleading descriptions
- Requesting unnecessary permissions
- Poor user interface
- Placeholder content

## After Submission

- The review process typically takes 1-3 days
- You'll receive email notifications about the status of your app
- If rejected, address the issues and resubmit

## Resources

- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/overview/themes/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)