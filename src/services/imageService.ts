import apiClient from './api';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { Alert } from 'react-native';

export interface ImagePickerOptions {
  mediaType: MediaType;
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    imageUrl: string;
    imageId: string;
  };
}

class ImageService {
  private defaultOptions: ImagePickerOptions = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 800,
    maxHeight: 800,
  };

  // Pick image from gallery
  async pickImage(options?: Partial<ImagePickerOptions>): Promise<string | null> {
    const pickerOptions = { ...this.defaultOptions, ...options };
    
    return new Promise((resolve) => {
      launchImageLibrary(pickerOptions, (response: ImagePickerResponse) => {
        if (response.didCancel || response.errorMessage) {
          resolve(null);
          return;
        }

        if (response.assets && response.assets[0]) {
          const asset = response.assets[0];
          if (asset.uri) {
            resolve(asset.uri);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });
  }

  // Upload profile picture
  async uploadProfilePicture(imageUri: string): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      
      // Create file object for upload
      formData.append('profilePicture', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'profile-picture.jpg',
      } as any);

      const response = await apiClient.post('/users/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Profile picture upload error:', error);
      throw new Error(error.response?.data?.error || 'Failed to upload profile picture');
    }
  }

  // Delete profile picture
  async deleteProfilePicture(): Promise<void> {
    try {
      await apiClient.delete('/users/profile-picture');
    } catch (error: any) {
      console.error('Profile picture delete error:', error);
      throw new Error(error.response?.data?.error || 'Failed to delete profile picture');
    }
  }

  // Show image picker with options
  showImagePickerOptions(): Promise<string | null> {
    return new Promise((resolve) => {
      Alert.alert(
        'Select Profile Picture',
        'Choose how you want to select your profile picture',
        [
          {
            text: 'Camera',
            onPress: () => {
              // For now, we'll use gallery. Camera can be added later
              this.pickImage().then(resolve);
            },
          },
          {
            text: 'Gallery',
            onPress: () => {
              this.pickImage().then(resolve);
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => resolve(null),
          },
        ]
      );
    });
  }

  // Get image URL with fallback
  getImageUrl(imageUrl?: string, fallback?: string): string {
    if (imageUrl && imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return fallback || '';
  }
}

export default new ImageService();
