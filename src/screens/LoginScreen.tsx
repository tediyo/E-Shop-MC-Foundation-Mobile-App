import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../styles/theme';

const { width } = Dimensions.get('window');

// Validation Schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { login, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data.email, data.password);
      // Navigation will be handled by the auth state change
    } catch (error: any) {
      console.error('Login error in screen:', error);
      Alert.alert('Login Failed', `Error: ${error.message}\n\nPlease check the console for more details.`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>🛍️</Text>
            </View>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your shopping journey</Text>
        </View>

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={clearError} style={styles.errorClose}>
              <Text style={styles.errorCloseText}>×</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Form Section */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[
                      styles.input,
                      errors.email && styles.inputError,
                    ]}
                    placeholder="Enter your email"
                    placeholderTextColor={theme.colors.text.tertiary}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              )}
            />
            {errors.email && (
              <Text style={styles.fieldErrorText}>{errors.email.message}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[
                      styles.input,
                      errors.password && styles.inputError,
                    ]}
                    placeholder="Enter your password"
                    placeholderTextColor={theme.colors.text.tertiary}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.eyeButtonText}>
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <Text style={styles.fieldErrorText}>{errors.password.message}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.colors.text.inverse} size="small" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  logoContainer: {
    marginBottom: theme.spacing.lg,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  logoText: {
    fontSize: 32,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    flex: 1,
    paddingTop: theme.spacing.lg,
  },
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    ...theme.typography.body,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    color: theme.colors.text.primary,
    ...theme.shadows.sm,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  eyeButton: {
    position: 'absolute',
    right: theme.spacing.md,
    top: theme.spacing.md,
    padding: theme.spacing.xs,
  },
  eyeButtonText: {
    fontSize: 20,
  },
  fieldErrorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
    ...theme.shadows.md,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.text.tertiary,
  },
  buttonText: {
    ...theme.typography.button,
    color: theme.colors.text.inverse,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  forgotPasswordText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  footerText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  linkText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: theme.colors.error + '10',
    borderColor: theme.colors.error,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    flex: 1,
  },
  errorClose: {
    padding: theme.spacing.xs,
  },
  errorCloseText: {
    ...theme.typography.body,
    color: theme.colors.error,
    fontWeight: 'bold',
  },
});

export default LoginScreen;