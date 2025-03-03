# TerraTime Grounds - Internal Testing Guide

This guide explains how to build and distribute test versions of the TerraTime Grounds app for internal testing before submitting to the app stores.

## iOS TestFlight Testing

TestFlight is Apple's platform for distributing test versions of your app to internal and external testers.

### Setting Up TestFlight

1. **Prepare Your App**:
   - Ensure your app has a valid Bundle ID
   - Configure app signing (see `app-store-assets/signing/ios-signing-guide.md`)
   - Increment the build number in Xcode for each new test build

2. **Create an App Record in App Store Connect**:
   - Log in to [App Store Connect](https://appstoreconnect.apple.com/)
   - Go to "My Apps" and click the "+" button to add a new app
   - Fill in the required information (Bundle ID, app name, etc.)
   - You don't need to complete all metadata for testing

3. **Upload a Build**:
   - In Xcode, select Product > Archive
   - When the archive is complete, click "Distribute App"
   - Select "TestFlight & App Store" and follow the prompts
   - Wait for the build to process (can take 15-30 minutes)

4. **Add Internal Testers**:
   - In App Store Connect, go to your app > TestFlight > Internal Testing
   - Add team members who have Apple Developer account access
   - Each tester will receive an email invitation to test the app

5. **Add External Testers (Optional)**:
   - Create a test group in TestFlight > External Testing
   - Add email addresses for your testers
   - Provide a beta app description and feedback email
   - Submit for Beta App Review (usually takes 1-2 days)
   - Once approved, testers will receive email invitations

### Testing with TestFlight

1. Testers need to install the TestFlight app from the App Store
2. They open the invitation email on their iOS device and follow the instructions
3. The app will be available in the TestFlight app
4. Testers can provide feedback directly through TestFlight

## Android Internal Testing

Google Play offers several testing tracks: internal, closed, open, and production.

### Setting Up Internal Testing

1. **Prepare Your App**:
   - Ensure your app has a unique package name
   - Configure app signing (see `app-store-assets/signing/android-signing-guide.md`)
   - Increment `versionCode` in your app's `build.gradle` file for each new test build

2. **Create an App in Google Play Console**:
   - Log in to [Google Play Console](https://play.google.com/console/)
   - Click "Create app" and fill in the required information
   - You don't need to complete all store listing details for internal testing

3. **Set Up Internal Testing Track**:
   - Go to your app > Testing > Internal testing
   - Click "Create release"
   - Upload your signed APK or App Bundle
   - Add release notes
   - Save and then review the release

4. **Add Testers**:
   - Create a new email list or use an existing one
   - Add the email addresses of your testers (must be Google accounts)
   - Save changes
   - Click "Start rollout to Internal testing"

5. **Invite Testers**:
   - Testers will receive an email invitation
   - The email contains a link to opt in to testing

### Testing with Google Play Internal Testing

1. Testers need to click the opt-in link from their Android device
2. After opting in, they can download the app from Google Play
3. Updates will be delivered automatically through Google Play
4. Testers can provide feedback via email or your preferred feedback system

## Alternative Testing Methods

### iOS Ad Hoc Distribution

For quick testing without using TestFlight:

1. Collect the UDID (device identifier) of each test device
2. Add these UDIDs to your Apple Developer account under Devices
3. Create an Ad Hoc provisioning profile that includes these devices
4. Build your app using this profile
5. Distribute the IPA file via a service like Diawi, Firebase App Distribution, or your own web server

### Android Direct APK Distribution

For quick testing without using Google Play:

1. Build a signed APK using your release keystore
2. Enable "Unknown sources" on test devices
3. Distribute the APK via email, download link, or a service like Firebase App Distribution

## Firebase App Distribution

Firebase App Distribution is a cross-platform solution that works for both iOS and Android:

1. Set up a Firebase project and add your app
2. Configure your build system to upload to Firebase:
   - For iOS, use the Firebase CLI or Fastlane
   - For Android, use Gradle, Firebase CLI, or Fastlane
3. Add testers by email in the Firebase console
4. Testers receive an email with instructions to install the app

## Best Practices for Internal Testing

1. **Create a Test Plan**:
   - Define what features to test
   - Create test scenarios and expected outcomes
   - Prioritize critical functionality

2. **Collect Structured Feedback**:
   - Use a feedback form or issue tracker
   - Ask testers to include device model, OS version, and steps to reproduce issues
   - Request screenshots or screen recordings of issues

3. **Test on Multiple Devices**:
   - Test on different screen sizes
   - Test on different OS versions
   - Include both newer and older devices

4. **Track Issues**:
   - Use a bug tracking system (Jira, GitHub Issues, etc.)
   - Prioritize issues based on severity
   - Verify fixes in subsequent test builds

5. **Implement Crash Reporting**:
   - Integrate a crash reporting tool like Firebase Crashlytics
   - Review crash reports regularly
   - Fix critical crashes before public release

## Setting Up Automated Builds

To streamline the testing process, consider setting up CI/CD:

### Using GitHub Actions

1. Create a workflow file in `.github/workflows/build.yml`
2. Configure it to build your app when you push to specific branches
3. Set up secrets for signing credentials
4. Configure the workflow to upload builds to your testing platform

### Using Fastlane

1. Install Fastlane for your project
2. Create a `Fastfile` with lanes for building and distributing test builds
3. Set up environment variables for signing credentials
4. Run Fastlane commands to build and distribute your app

## Conclusion

Regular internal testing is crucial for delivering a high-quality app. By setting up a structured testing process, you can identify and fix issues before your users encounter them, leading to better reviews and higher user satisfaction when you launch on the App Store and Google Play Store.