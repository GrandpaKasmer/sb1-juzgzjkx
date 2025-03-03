# Android App Signing Guide for TerraTime Grounds

This guide walks you through the process of setting up app signing for your Android app to prepare it for Google Play Store submission.

## Prerequisites

- A Google Play Developer account ($25 one-time fee)
- Android Studio installed
- Your TerraTime Grounds app project

## Step 1: Generate a Keystore

A keystore is a binary file that contains a set of private keys. You'll need to create one to sign your app.

### Using Android Studio

1. Open your project in Android Studio
2. Select **Build** > **Generate Signed Bundle/APK**
3. Select **Android App Bundle** or **APK** based on your preference
4. Click **Next**
5. Click **Create new...**
6. Fill in the form:
   - Keystore path: Choose a secure location (e.g., `/path/to/terratime.keystore`)
   - Password: Create a strong password
   - Alias: `terratime`
   - Validity: 25+ years recommended (e.g., 9000 days)
   - Certificate information: Fill in your organization details
7. Click **OK**

### Using Command Line

Alternatively, you can use the `keytool` command:

```bash
keytool -genkey -v -keystore terratime.keystore -alias terratime -keyalg RSA -keysize 2048 -validity 9000
```

## Step 2: Configure Gradle for App Signing

1. Store your signing information securely in `gradle.properties`:

   Create or edit the `gradle.properties` file in your project's root directory or in `~/.gradle/`:

   ```properties
   RELEASE_STORE_FILE=/path/to/terratime.keystore
   RELEASE_STORE_PASSWORD=your_keystore_password
   RELEASE_KEY_ALIAS=terratime
   RELEASE_KEY_PASSWORD=your_key_password
   ```

2. Reference these properties in your app's `build.gradle` file:

   ```gradle
   android {
       // ...
       
       signingConfigs {
           release {
               storeFile file(RELEASE_STORE_FILE)
               storePassword RELEASE_STORE_PASSWORD
               keyAlias RELEASE_KEY_ALIAS
               keyPassword RELEASE_KEY_PASSWORD
           }
       }
       
       buildTypes {
           release {
               signingConfig signingConfigs.release
               // ...
           }
       }
   }
   ```

## Step 3: Build a Signed Release APK or Bundle

### Using Android Studio

1. Select **Build** > **Generate Signed Bundle/APK**
2. Select **Android App Bundle** or **APK**
3. Click **Next**
4. Select your keystore, enter passwords, and select the alias
5. Click **Next**
6. Select the build variant (usually `release`)
7. Click **Finish**

### Using Command Line

```bash
# For APK
./gradlew assembleRelease

# For App Bundle
./gradlew bundleRelease
```

## Step 4: Enroll in Play App Signing

Google Play App Signing helps secure your app signing key and allows you to use the Play Store as the source of truth for your app.

1. Log in to the [Google Play Console](https://play.google.com/console/)
2. Select your app (or create a new app)
3. Go to **Setup** > **App integrity**
4. Follow the instructions to enroll in Play App Signing

## Step 5: Upload to Google Play Console

1. Log in to the [Google Play Console](https://play.google.com/console/)
2. Select your app
3. Go to **Production** > **Create new release**
4. Upload your signed APK or App Bundle
5. Fill in release notes
6. Save and review the release
7. Submit for review

## Important Security Notes

1. **Keep your keystore secure**
   - Store it in a safe location, not in version control
   - Make backups of your keystore file
   - Remember your passwords

2. **If you lose your keystore**
   - If you've enrolled in Play App Signing, you can request a key reset
   - Otherwise, you'll need to publish a new app with a new package name

3. **Use environment variables or a secure vault**
   - For CI/CD pipelines, use environment variables or a secure vault to store signing information
   - Don't hardcode passwords in your build scripts

## Troubleshooting

### Common Issues

1. **Keystore file not found**
   - Ensure the path to your keystore file is correct
   - Use absolute paths if necessary

2. **Invalid keystore format**
   - Ensure you created the keystore correctly
   - Try regenerating the keystore

3. **Signature verification failed**
   - Ensure you're using the correct keystore and alias
   - Check that passwords are correct

### Getting Help

If you encounter issues with the signing process, you can:

- Check Google's [Android Developer Documentation](https://developer.android.com/studio/publish/app-signing)
- Visit the [Android Developers Forum](https://groups.google.com/g/android-developers)
- Contact Google Play Developer Support