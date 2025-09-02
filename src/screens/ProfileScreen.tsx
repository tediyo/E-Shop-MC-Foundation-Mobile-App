import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../styles/theme';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout, isLoading, error } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error: any) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // You can add refresh logic here if needed
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading && !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading profile: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
        </View>
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: user?.isActive ? theme.colors.success : theme.colors.error }
          ]}>
            <Text style={styles.statusText}>
              {user?.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
          <View style={[
            styles.statusBadge,
            { backgroundColor: user?.isEmailVerified ? theme.colors.success : theme.colors.warning }
          ]}>
            <Text style={styles.statusText}>
              {user?.isEmailVerified ? 'Verified' : 'Unverified'}
            </Text>
          </View>
        </View>
      </View>

      {/* Profile Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{user?.role || 'Customer'}</Text>
          </View>
          
          {user?.phone && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user.phone}</Text>
            </View>
          )}
          
          {user?.dateOfBirth && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date of Birth</Text>
              <Text style={styles.infoValue}>{formatDate(user.dateOfBirth)}</Text>
            </View>
          )}
          
          {user?.gender && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>
                {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Account Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>
              {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
            </Text>
          </View>
          
          {user?.lastLogin && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Login</Text>
              <Text style={styles.infoValue}>{formatDate(user.lastLogin)}</Text>
            </View>
          )}
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email Verified</Text>
            <Text style={[
              styles.infoValue,
              { color: user?.isEmailVerified ? theme.colors.success : theme.colors.warning }
            ]}>
              {user?.isEmailVerified ? 'Yes' : 'No'}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone Verified</Text>
            <Text style={[
              styles.infoValue,
              { color: user?.isPhoneVerified ? theme.colors.success : theme.colors.warning }
            ]}>
              {user?.isPhoneVerified ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>

      {/* Address Information */}
      {user?.address && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Information</Text>
          
          <View style={styles.infoCard}>
            {user.address.street && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Street</Text>
                <Text style={styles.infoValue}>{user.address.street}</Text>
              </View>
            )}
            
            {user.address.city && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>City</Text>
                <Text style={styles.infoValue}>{user.address.city}</Text>
              </View>
            )}
            
            {user.address.state && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>State</Text>
                <Text style={styles.infoValue}>{user.address.state}</Text>
              </View>
            )}
            
            {user.address.country && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Country</Text>
                <Text style={styles.infoValue}>{user.address.country}</Text>
              </View>
            )}
            
            {user.address.zipCode && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Zip Code</Text>
                <Text style={styles.infoValue}>{user.address.zipCode}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  retryButtonText: {
    ...theme.typography.button,
    color: theme.colors.text.inverse,
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.sm,
  },
  avatarContainer: {
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  avatarText: {
    ...theme.typography.h1,
    color: theme.colors.text.inverse,
    fontWeight: '700',
  },
  name: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  email: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  statusContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    ...theme.typography.caption,
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
  section: {
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  infoLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  infoValue: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  actionsSection: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  editButtonText: {
    ...theme.typography.button,
    color: theme.colors.text.inverse,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  logoutButtonText: {
    ...theme.typography.button,
    color: theme.colors.text.inverse,
  },
});

export default ProfileScreen;