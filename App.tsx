/**
 * Ecommerce Mobile App
 * Authentication-enabled React Native application
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import MainNavigator from './src/navigation/MainNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar 
          barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
          backgroundColor="#007bff"
        />
        <AuthProvider>
          <MainNavigator />
        </AuthProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

export default App;
