# Fastlane Setup for TerraTime Grounds

This directory contains Fastlane configuration files to automate the build and distribution process for TerraTime Grounds.

## Prerequisites

- Ruby installed (Fastlane is a Ruby gem)
- Xcode Command Line Tools (for iOS)
- Android SDK (for Android)

## Installation

1. Install Fastlane:

```bash
gem install fastlane
```

2. Copy the Fastfile to your project:

```bash
mkdir -p fastlane
cp app-store-assets/fastlane-setup/Fastfile fastlane/
```

3. Set up environment variables for signing:

For iOS:
```bash
export MATCH_PASSWORD="your_match_password"
export FASTLANE_USER="your_apple_id"
export FASTLANE_PASSWORD="your_apple_id_password"
```

For Android:
```bash
export SUPPLY_JSON_KEY="path/to/play-store-credentials.json"
```

## Available Lanes

### iOS

- **beta**: Build and upload a new beta build to TestFlight
  ```bash
  fastlane ios beta
  ```

- **adhoc**: Build an ad hoc distribution for direct testing
  ```bash
  fastlane ios adhoc
  ```

### Android

- **internal**: Build and upload a new internal test build to Google Play
  ```bash
  fastlane android internal
  ```

- **build_apk**: Build APK for direct distribution
  ```bash
  fastlane android build_apk
  ```

## Customization

You may need to customize the Fastfile based on your project structure:

1. Update the project paths:
   - iOS: Update `xcodeproj` and `workspace` paths
   - Android: Update `project_dir` path

2. Add additional lanes as needed:
   - Firebase App Distribution
   - Crash reporting upload
   - Screenshot generation

## Continuous Integration

To use Fastlane with CI/CD systems:

### GitHub Actions

Create a workflow file at `.github/workflows/beta.yml`:

```yaml
name: Beta Build

on:
  push:
    branches: [ main ]

jobs:
  ios-beta:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '2.7'
      - name: Install Fastlane
        run: gem install fastlane
      - name: Build and upload to TestFlight
        run: fastlane ios beta
        env:
          MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}
          FASTLANE_USER: ${{ secrets.FASTLANE_USER }}
          FASTLANE_PASSWORD: ${{ secrets.FASTLANE_PASSWORD }}
          
  android-internal:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '2.7'
      - name: Set up JDK
        uses: actions/setup-java@v1
        with:
          java-version: '11'
      - name: Install Fastlane
        run: gem install fastlane
      - name: Decode service account key
        run: echo ${{ secrets.PLAY_STORE_JSON_KEY }} | base64 -d > play-store-key.json
      - name: Build and upload to Play Store
        run: fastlane android internal
        env:
          SUPPLY_JSON_KEY: play-store-key.json
```

## Resources

- [Fastlane Documentation](https://docs.fastlane.tools)
- [iOS Beta Deployment Guide](https://docs.fastlane.tools/best-practices/ios-beta-deployment/)
- [Android Beta Deployment Guide](https://docs.fastlane.tools/best-practices/android-beta-deployment/)