// Plik: src/features/onboarding/screens/PersonalityScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../../context/AppContext';
import { useTranslation } from '../../../shared/hooks/useTranslation';
import { pickImage } from '../../../services/imagePicker';
import { styles } from '../../../styles';

export const PersonalityScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { personality, setPersonality, profileImage, setProfileImage } = useApp();

  const handlePickImage = async () => {
    if (!setProfileImage) return;
    try {
      const uri = await pickImage();
      if (uri) {
        setProfileImage(uri);
      }
    } catch (err) {
      Alert.alert(t.conv_permission || 'Błąd', t.pers_photo_error || 'Potrzebujemy dostępu do galerii!');
    }
  };

  const handleRemoveImage = () => {
    if (setProfileImage) {
      setProfileImage(null);
    }
  };

  const personalities = [
    { id: 'assertive', label: t.pers_1, icon: '💪' },
    { id: 'confident', label: t.pers_2, icon: '😎' },
    { id: 'playful', label: t.pers_3, icon: '😜' },
    { id: 'empathetic', label: t.pers_4, icon: '😔' },
    { id: 'flirtatious', label: t.pers_5, icon: '💦' }
  ];

  return (
    <LinearGradient colors={['#0f172a', '#581c87', '#0f172a']} style={styles.gradient}>
      <View style={{padding: 24, paddingTop: 40}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft color="#94a3b8" size={28} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <View style={styles.iconBox}><Text style={{ fontSize: 24 }}>🎩</Text></View>
          <Text style={styles.h1}>{t.pers_title}</Text>
        </View>
        <View style={{ gap: 12 }}>
          {personalities.map(p => (
            <TouchableOpacity key={p.id} onPress={() => setPersonality(p.id)} style={[styles.card, personality === p.id && styles.cardSelected]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <Text style={{ fontSize: 24 }}>{p.icon}</Text>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '500', flex: 1 }}>{p.label}</Text>
                {personality === p.id && <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#22c55e', alignItems: 'center', justifyContent: 'center' }}><Text style={{color:'white', fontSize: 10}}>✓</Text></View>}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', marginBottom: 12 }}>
            {t.pers_photo_title || 'Dodaj zdjęcie (opcjonalnie)'}
          </Text>
          {profileImage ? (
            <View>
              <View style={[styles.card, { padding: 0, overflow: 'hidden' }]}>
                <Image source={{ uri: profileImage }} style={{ width: '100%', height: 220, resizeMode: 'cover' }} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                <TouchableOpacity
                  onPress={handlePickImage}
                  style={{
                    flex: 1,
                    borderRadius: 12,
                    paddingVertical: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#d97706',
                    shadowColor: '#d97706',
                    shadowOpacity: 0.3,
                    elevation: 5,
                    marginRight: 8
                  }}
                >
                  <Text style={{ color: '#0f172a', fontWeight: '600', fontSize: 14 }}>
                    {t.pers_photo_change || 'Zmień zdjęcie'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleRemoveImage}
                  style={{
                    flex: 1,
                    borderRadius: 12,
                    paddingVertical: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.12)',
                    marginLeft: 8
                  }}
                >
                  <Text style={{ color: '#ef4444', fontWeight: '600', fontSize: 14 }}>
                    {t.pers_photo_remove || 'Usuń'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handlePickImage}
              style={{
                borderWidth: 2,
                borderColor: 'rgba(234, 179, 8, 0.5)',
                borderStyle: 'dashed',
                padding: 20,
                borderRadius: 12,
                alignItems: 'center',
                backgroundColor: 'rgba(15, 23, 42, 0.5)'
              }}
            >
              <Text style={{ fontSize: 32, marginBottom: 8 }}>🖼️</Text>
              <Text style={{ color: '#eab308', fontWeight: '600', fontSize: 16 }}>
                {t.pers_photo_add || 'Dodaj zdjęcie z galerii'}
              </Text>
              <Text style={{ color: '#64748b', fontSize: 12, marginTop: 4, textAlign: 'center' }}>
                {t.pers_photo_hint || 'Pokaż nam swój styl, aby lepiej personalizować wskazówki.'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          onPress={() => personality && navigation.navigate('Subscription')} 
          style={[styles.btnGreen, { opacity: personality ? 1 : 0.5 }]} 
          disabled={!personality}
        >
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>{t.pers_btn}</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

