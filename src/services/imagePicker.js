// Plik: src/services/imagePicker.js
// Serwis do wyboru zdjęć z galerii

import * as ImagePicker from 'expo-image-picker';

/**
 * Prosi o uprawnienia i otwiera galerię do wyboru zdjęcia
 * @returns {Promise<string|null>} Base64 URI zdjęcia lub null
 */
export const pickImage = async () => {
  try {
    const existingPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    let hasAccess = existingPermission.granted || existingPermission.accessPrivileges === 'limited';

    if (!hasAccess) {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      hasAccess = permissionResult.granted || permissionResult.accessPrivileges === 'limited';

      if (!hasAccess) {
        throw new Error(permissionResult.canAskAgain ? 'Permission to access media library is required!' : 'Permission permanently denied');
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
      base64: true
    });

    if (result.canceled) {
      return null;
    }

    // Zwracamy base64 URI dla OpenAI Vision API
    return `data:image/jpeg;base64,${result.assets[0].base64}`;
  } catch (error) {
    console.error('Error picking image:', error);
    throw error;
  }
};

