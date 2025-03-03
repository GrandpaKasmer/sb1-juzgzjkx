# Firebase App Distribution Setup for TerraTime Grounds

Firebase App Distribution provides a simple way to distribute your pre-release builds to testers. This guide will help you set up Firebase App Distribution for both iOS and Android versions of TerraTime Grounds.

## Prerequisites

- A Google account
- Firebase project
- Your TerraTime Grounds app code

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "TerraTime Grounds")
4. Follow the setup wizard to complete project creation

## Step 2: Add Your Apps to Firebase

### Add iOS App

1. In the Firebase console, click the iOS icon (⊕) to add an app
2. Enter your app's Bundle ID (e.g., "com.terratime.grounds")
3. Enter a nickname (e.g., "TerraTime Grounds iOS")
4. Download the `GoogleService-Info.plist` file
5. Place this file in your Xcode project (usually in the root of your project)
6. Complete the setup steps in Firebase

### Add Android App

1. In the Firebase console, click the Android icon (⊕) to add an app
2. Enter your app's package name (e.g., "com.terratime.grounds")
3. Enter a nickname (e.g., "TerraTime Grounds Android")
4. Download the `google-services.json` file
5. Place this file in your Android project's app module directory
6. Complete the setup steps in Firebase

## Step 3: Set Up Firebase App Distribution

### Enable App Distribution

1. In the Firebase console, select your project
2. In the left sidebar, click "App Distribution"
3. Click "Get started"
4. Accept the terms of service

### Add Testers

1. In the App Distribution section, click "Testers & Groups"
2. Click "Add testers"
3. Enter email addresses of your testers
4. Optionally, create groups to organize testers (e.g., "Internal Team", "QA", "Stakeholders")

## Step 4: Configure Your Build System

### iOS Configuration

#### Using Fastlane

1. Install the Firebase App Distribution Fastlane plugin:
   ```bash
   fastlane add_plugin firebase_app_distribution
   ```

2. Add the following to your Fastfile:
   ```ruby
   lane :distribute_ios do
     build_app(
       scheme: "TerraTimeGrounds",
       workspace: "ios/TerraTimeGrounds.xcworkspace",
       export_method: "ad-hoc"
     )
     
     firebase_app_distribution(
       app: "1:123456789:ios:abcd1234",  # Your Firebase App ID
       testers: "tester1@example.com, tester2@example.com",
       groups: "internal-testers, qa",
       release_notes: "Bug fixes and performance improvements"
     )
   end
   ```

#### Using Firebase CLI

1. Install the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Log in to Firebase:
   ```bash
   firebase login
   ```

3. Distribute your app:
   ```bash
   firebase appdistribution:distribute "path/to/your.ipa" \
     --app "1:123456789:ios:abcd1234" \
     --groups "internal-testers, qa" \
     --release-notes "Bug fixes and performance improvements"
   ```

### Android Configuration

#### Using Fastlane

1. Install the Firebase App Distribution Fastlane plugin:
   ```bash
   fastlane add_plugin firebase_app_distribution
   ```

2. Add the following to your Fastfile:
   ```ruby
   lane :distribute_android do
     gradle(
       task: "clean assembleRelease",
       project_dir: "android/"
     )
     
     firebase_app_distribution(
       app: "1:123456789:android:abcd1234",  # Your Firebase App ID
       testers: "tester1@example.com, tester2@example.com",
       groups: "internal-testers, qa",
       release_notes: "Bug fixes and performance improvements",
       apk_path: "android/app/build/outputs/apk/release/app-release.apk"
     )
   end
   ```

#### Using Firebase CLI

1. Install the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Log in to Firebase:
   ```bash
   firebase login
   ```

3. Distribute your app:
   ```bash
   firebase appdistribution:distribute "path/to/your.apk" \
     --app "1:123456789:android:abcd1234" \
     --groups "internal-testers, qa" \
     --release-notes "Bug fixes and performance improvements"
   ```

## Step 5: Integrate with CI/CD (GitHub Actions)

Add the following to your GitHub Actions workflow:

```yaml
- name: Set up Firebase CLI
  run: npm install -g firebase-tools

- name: Distribute iOS app
  run: |
    firebase appdistribution:distribute "path/to/your.ipa" \
      --app "1:123456789:ios:abcd1234" \
      --groups "internal-testers" \
      --release-notes "Build from GitHub Actions"
  env:
    FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}

- name: Distribute Android app
  run: |
    firebase appdistribution:distribute "path/to/your.apk" \
      --app "1:123456789:android:abcd1234" \
      --groups "internal-testers" \
      --release-notes "Build from GitHub Actions"
  env:
    FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

To get your Firebase token:
```bash
firebase login:ci
```

Add this token as a secret in your GitHub repository.

## Step 6: Tester Experience

1. Testers will receive an email invitation to test your app
2. They need to click the link in the email to accept the invitation
3. For iOS:
   - Testers need to install the TestFlight app
   - They'll be guided through the installation process
4. For Android:
   - Testers need to follow the link to download the APK
   - They'll need to enable "Install from unknown sources" in their device settings

## Best Practices

1. **Include meaningful release notes:**
   - List new features and bug fixes
   - Highlight areas that need specific testing

2. **Use tester groups effectively:**
   - Create different groups for different testing purposes
   - Start with a small group for initial testing before expanding

3. **Set up automated builds:**
   - Configure your CI/CD pipeline to automatically distribute builds
   - Use different distribution groups for different branches

4. **Collect feedback systematically:**
   - Set up a feedback form or system
   - Ask testers to include device information and steps to reproduce issues

## Troubleshooting

### Common Issues

1. **iOS builds not installing:**
   - Ensure the device UDID is included in your provisioning profile
   - Verify the app is signed with the correct certificate

2. **Android builds not installing:**
   - Check that the APK is signed
   - Ensure the user has enabled "Install from unknown sources"

3. **Testers not receiving invitations:**
   - Check spam folders
   - Verify email addresses are correct
   - Re-send invitations if needed

### Getting Help

If you encounter issues with Firebase App Distribution:
- Check the [Firebase documentation](https://firebase.google.com/docs/app-distribution)
- Visit the [Firebase support page](https://firebase.google.com/support)