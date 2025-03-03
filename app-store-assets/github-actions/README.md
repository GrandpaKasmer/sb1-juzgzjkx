# GitHub Actions for TerraTime Grounds

This directory contains GitHub Actions workflow files to automate the build and distribution process for TerraTime Grounds.

## Available Workflows

### Beta Build Workflow

The `beta-workflow.yml` file defines a workflow that:

1. Builds and uploads an iOS build to TestFlight
2. Builds and uploads an Android build to Google Play Internal Testing

This workflow runs automatically when:
- Code is pushed to the `main` branch
- The workflow is manually triggered via the GitHub Actions UI

## Setup Instructions

To use these workflows, you need to:

1. Copy the workflow file to your GitHub repository:
   ```
   mkdir -p .github/workflows
   cp app-store-assets/github-actions/beta-workflow.yml .github/workflows/
   ```

2. Set up the required secrets in your GitHub repository:

   Go to your repository > Settings > Secrets and variables > Actions > New repository secret

   **iOS Secrets:**
   - `IOS_P12_CERTIFICATE`: Base64-encoded P12 certificate file
   - `IOS_P12_PASSWORD`: Password for the P12 certificate
   - `KEYCHAIN_PASSWORD`: Password for the temporary keychain
   - `IOS_PROVISIONING_PROFILE`: Base64-encoded provisioning profile
   - `FASTLANE_USER`: Your Apple ID
   - `FASTLANE_PASSWORD`: Your Apple ID password
   - `FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD`: App-specific password for your Apple ID

   **Android Secrets:**
   - `ANDROID_KEYSTORE_BASE64`: Base64-encoded keystore file
   - `ANDROID_KEYSTORE_PASSWORD`: Password for the keystore
   - `ANDROID_KEY_ALIAS`: Key alias in the keystore
   - `ANDROID_KEY_PASSWORD`: Password for the key
   - `PLAY_STORE_JSON_KEY`: Base64-encoded Google Play service account JSON key

## How to Encode Files as Base64

### macOS/Linux:

```bash
# For iOS P12 certificate
base64 -i path/to/certificate.p12 | pbcopy

# For iOS provisioning profile
base64 -i path/to/profile.mobileprovision | pbcopy

# For Android keystore
base64 -i path/to/terratime.keystore | pbcopy

# For Google Play JSON key
base64 -i path/to/play-store-key.json | pbcopy
```

### Windows:

```powershell
# For iOS P12 certificate
[Convert]::ToBase64String([IO.File]::ReadAllBytes("path\to\certificate.p12")) | Set-Clipboard

# For iOS provisioning profile
[Convert]::ToBase64String([IO.File]::ReadAllBytes("path\to\profile.mobileprovision")) | Set-Clipboard

# For Android keystore
[Convert]::ToBase64String([IO.File]::ReadAllBytes("path\to\terratime.keystore")) | Set-Clipboard

# For Google Play JSON key
[Convert]::ToBase64String([IO.File]::ReadAllBytes("path\to\play-store-key.json")) | Set-Clipboard
```

## Customization

You may need to customize the workflow based on your project structure:

1. Update the paths to match your project structure
2. Add or remove steps as needed
3. Adjust the trigger conditions (e.g., run on different branches)

## Troubleshooting

If you encounter issues with the workflow:

1. Check the workflow run logs in GitHub Actions
2. Verify that all secrets are correctly set
3. Ensure your project structure matches the paths in the workflow
4. Check that your certificates and provisioning profiles are valid

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Fastlane Documentation](https://docs.fastlane.tools)
- [iOS Code Signing Guide](https://docs.fastlane.tools/codesigning/getting-started/)
- [Android Code Signing Guide](https://docs.fastlane.tools/best-practices/android/#setting-up-supply)