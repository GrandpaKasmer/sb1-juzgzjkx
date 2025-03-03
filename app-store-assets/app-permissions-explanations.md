# TerraTime Grounds - App Permissions Explanations

## iOS Permission Descriptions

These descriptions will appear in your Info.plist file and will be shown to users when the app requests each permission.

### Location Permission
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>TerraTime needs your location to track where tasks are performed. This helps supervisors verify work and improves service quality.</string>
```

### Camera Permission
```xml
<key>NSCameraUsageDescription</key>
<string>TerraTime needs camera access to document completed work. Photos provide verification of task completion and quality.</string>
```

### Microphone Permission
```xml
<key>NSMicrophoneUsageDescription</key>
<string>TerraTime needs microphone access to record voice notes. This allows you to provide additional details about completed tasks.</string>
```

### Photo Library Permission
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>TerraTime needs access to your photo library to save task documentation photos and allow you to select existing photos for task documentation.</string>
```

### Photo Library Add-Only Permission
```xml
<key>NSPhotoLibraryAddUsageDescription</key>
<string>TerraTime needs permission to save task documentation photos to your photo library.</string>
```

## Android Permission Explanations

These descriptions will be shown to users when the app requests each permission on Android devices.

### Location Permission
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

**User-facing explanation:**
"TerraTime needs your location to track where tasks are performed. This helps supervisors verify work and improves service quality."

### Camera Permission
```xml
<uses-permission android:name="android.permission.CAMERA" />
```

**User-facing explanation:**
"TerraTime needs camera access to document completed work. Photos provide verification of task completion and quality."

### Microphone Permission
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

**User-facing explanation:**
"TerraTime needs microphone access to record voice notes. This allows you to provide additional details about completed tasks."

### Storage Permission
```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

**User-facing explanation:**
"TerraTime needs storage access to save and access task documentation photos."

### Internet Permission
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

**User-facing explanation:**
"TerraTime needs internet access to sync your tasks with your team and supervisors."

## Best Practices for Permission Requests

1. **Request permissions at the appropriate time:**
   - Request permissions when the user tries to use a feature that requires them
   - Provide context about why the permission is needed before requesting it
   - Don't request all permissions at once when the app first launches

2. **Provide clear explanations:**
   - Use simple, non-technical language
   - Explain the benefit to the user
   - Be specific about how the permission will be used

3. **Handle permission denials gracefully:**
   - Provide alternative functionality when possible
   - Don't repeatedly ask for the same permission if denied
   - Explain how to enable permissions manually in settings if needed

4. **Respect privacy:**
   - Only request permissions that are essential for app functionality
   - Only access sensitive features when actively being used
   - Follow the principle of least privilege