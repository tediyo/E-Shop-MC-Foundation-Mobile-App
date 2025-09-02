import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>🛍️</Text>
        </View>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  logoText: {
    fontSize: 32,
  },
  text: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
});

export default LoadingScreen;