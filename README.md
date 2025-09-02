# 🔐 Ecommerce Mobile - Authentication App

A React Native mobile application with complete authentication functionality that integrates with the ecommerce backend auth service.

## 🚀 Features

- **User Registration** - Complete registration form with validation
- **User Login** - Secure authentication with JWT tokens
- **Profile Management** - View and manage user profile information
- **Token Management** - Automatic token refresh and secure storage
- **Error Handling** - Comprehensive error handling and user feedback
- **Loading States** - Smooth loading indicators throughout the app
- **Form Validation** - Real-time form validation with helpful error messages
- **Responsive Design** - Beautiful UI that works on all screen sizes

## 🛠️ Tech Stack

- **Framework**: React Native 0.81.1
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **State Management**: React Context API
- **Forms**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **UI**: Custom styled components

## 📋 Prerequisites

1. **Backend Service Running** - Your auth service must be running on `localhost:3001`
2. **MongoDB** - Database must be accessible
3. **Redis** - For token storage and session management
4. **Node.js** - Version 20 or higher
5. **React Native Development Environment** - Set up for iOS/Android development

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Install iOS Dependencies (iOS only)
```bash
cd ios && pod install && cd ..
```

### 3. Start Metro Bundler
```bash
npm start
```

### 4. Run on Device/Simulator

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   └── LoadingScreen.tsx
├── contexts/           # React Context providers
│   └── AuthContext.tsx
├── navigation/         # Navigation configuration
│   ├── AuthNavigator.tsx
│   ├── AppNavigator.tsx
│   └── MainNavigator.tsx
├── screens/           # Screen components
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   └── ProfileScreen.tsx
└── services/          # API and business logic
    ├── api.ts
    └── authService.ts
```

## 🔧 Configuration

### API Configuration
The app is configured to connect to your auth service at `http://localhost:3001`. To change this, update the `API_BASE_URL` in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://your-backend-url:port/api/v1';
```

### Authentication Flow

1. **Registration**: Users can create new accounts with email, password, and optional profile information
2. **Login**: Users authenticate with email and password
3. **Token Storage**: Access and refresh tokens are securely stored using AsyncStorage
4. **Auto Refresh**: Tokens are automatically refreshed when they expire
5. **Profile Access**: Authenticated users can view their profile information
6. **Logout**: Users can securely logout, clearing all stored tokens

## 🧪 Testing the App

### 1. Registration Flow
1. Open the app (you'll see the login screen)
2. Tap "Sign Up" to go to registration
3. Fill out the registration form with valid information
4. Tap "Create Account"
5. You'll be automatically logged in and redirected to the profile screen

### 2. Login Flow
1. If you're not logged in, you'll see the login screen
2. Enter your email and password
3. Tap "Sign In"
4. You'll be redirected to the profile screen

### 3. Profile Management
1. View your profile information
2. Check verification status
3. Pull down to refresh profile data
4. Tap "Logout" to sign out

## 🔐 Security Features

- **JWT Tokens**: Secure authentication using JSON Web Tokens
- **Token Refresh**: Automatic token refresh to maintain session
- **Secure Storage**: Tokens stored securely using AsyncStorage
- **Input Validation**: Comprehensive form validation on both client and server
- **Error Handling**: Secure error handling that doesn't expose sensitive information

## 📱 Supported Platforms

- **iOS**: 11.0+
- **Android**: API level 21+ (Android 5.0)

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **iOS build issues**: Clean and rebuild with `cd ios && xcodebuild clean && cd ..`
3. **Android build issues**: Clean with `cd android && ./gradlew clean && cd ..`
4. **Network issues**: Ensure your backend service is running and accessible

### Debug Mode
Enable debug mode by shaking the device or pressing `Cmd+D` (iOS) / `Cmd+M` (Android) to open the developer menu.

## 🔄 API Integration

The app integrates with the following backend endpoints:

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh-token` - Token refresh
- `GET /api/v1/auth/me` - Get user profile
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/forgot-password` - Password reset request
- `POST /api/v1/auth/reset-password` - Password reset

## 🚀 Deployment

### Android
1. Generate a signed APK: `cd android && ./gradlew assembleRelease`
2. Or build a release bundle: `cd android && ./gradlew bundleRelease`

### iOS
1. Open `ios/EcommerceMobile.xcworkspace` in Xcode
2. Select your target device/simulator
3. Build and run the project

## 📄 License

This project is part of the Ecommerce ecosystem and follows the same licensing terms.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please refer to the main ecommerce project documentation or create an issue in the repository.