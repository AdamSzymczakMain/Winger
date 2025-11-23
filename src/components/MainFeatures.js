// Plik: src/components/MainFeatures.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { styles } from '../styles';

// --- EKRANY GŁÓWNYCH FUNKCJONALNOŚCI ---

// 1. ROZPOCZNIJ ROZMOWĘ (ConversationScreen)
export const ConversationScreen = ({ t, onNavigate }) => {
    // Logika i stany tej funkcji są lokalne
    const [text, setText] = useState('');
    const [tonality, setTonality] = useState(t.ton_casual);

    return (
      <LinearGradient colors={['#0f172a', '#2e1065', '#0f172a']} style={styles.gradient}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 24, paddingTop: 40, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => onNavigate('dashboard')} style={{ padding: 4 }}><ArrowLeft color="white" size={24} /></TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 32, height: 32, backgroundColor: '#7e22ce', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}><Text>🎩</Text></View>
            <Text style={{ color: 'white', fontSize: 18 }}>{t.welcome_h1} 😌</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}><Text style={{fontSize:20}}>🪄</Text><Text style={{fontSize:20, color:'white'}}>∞</Text></View>
        </View>
        <ScrollView contentContainerStyle={{ padding: 24 }}>
          <TextInput 
            value={text} 
            onChangeText={setText} 
            placeholder={t.conv_placeholder} 
            placeholderTextColor="#475569" 
            multiline 
            maxLength={700} 
            style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', color: '#e2e8f0', borderRadius: 16, padding: 20, height: 200, textAlignVertical: 'top', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }} 
          />
          <Text style={{ color: '#64748b', textAlign: 'right', fontSize: 12, marginTop: 8 }}>✏️ {text.length}/700</Text>
          <Text style={{ color: 'white', marginTop: 24, marginBottom: 12, fontSize: 16 }}>{t.conv_tonalities}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 12}}>
            {[t.ton_casual, t.ton_apol, t.ton_enc].map((tone, i) => (
              <TouchableOpacity key={i} onPress={() => setTonality(tone)} style={{ paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: tonality === tone ? '#db2777' : 'rgba(30, 41, 59, 0.8)' }}>
                <Text style={{ color: 'white', fontSize: 14 }}>{tone}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={{ marginTop: 24 }}>
            <Text style={{ color: 'white', marginBottom: 8 }}>{t.conv_pers} <Text style={{ color: '#64748b', fontSize: 12 }}>(845k uses)</Text></Text>
            <TouchableOpacity style={{ borderWidth: 2, borderColor: 'rgba(234, 179, 8, 0.5)', borderStyle: 'dashed', padding: 16, borderRadius: 12, alignItems: 'center', backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
              <Text style={{ color: '#eab308' }}>{t.conv_attach}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnGreen}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{t.conv_gen} 🪄✨</Text></TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    );
};

// 2. NIEZRĘCZNA SYTUACJA (AwkwardSituationScreen)
export const AwkwardSituationScreen = ({ t, onNavigate }) => (
  <LinearGradient colors={['#0f172a', '#2e1065', '#0f172a']} style={styles.gradient}>
    <View style={{ flexDirection: 'row', padding: 24, paddingTop: 40, alignItems: 'center' }}>
      <TouchableOpacity onPress={() => onNavigate('dashboard')} style={{ padding: 4 }}><ArrowLeft color="white" size={24} /></TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', marginLeft: 16 }}>{t.dash_awk}</Text>
    </View>
    <View style={{ padding: 24, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[styles.sub, { color: '#fb7185', marginBottom: 16 }]}>Trwa budowanie logiki dla tej funkcjonalności.</Text>
      <Text style={[styles.sub, { textAlign: 'center' }]}>Wklej tutaj szczegóły niezręcznej sytuacji, a Czarodziej podpowie, jak się zachować, aby wyjść z niej z klasą.</Text>
      <TextInput 
        placeholder="Opisz niezręczną sytuację..."
        placeholderTextColor="#475569" 
        multiline 
        style={{ marginTop: 20, backgroundColor: 'rgba(30, 41, 59, 0.5)', color: '#e2e8f0', borderRadius: 16, padding: 20, height: 150, textAlignVertical: 'top', width: '100%' }}
      />
      <TouchableOpacity style={styles.btnGreen}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{t.conv_gen} ✨</Text></TouchableOpacity>
    </View>
  </LinearGradient>
);

// 3. SUGESTIE ODPOWIEDZI (ReplySuggestionsScreen)
export const ReplySuggestionsScreen = ({ t, onNavigate }) => (
  <LinearGradient colors={['#0f172a', '#2e1065', '#0f172a']} style={styles.gradient}>
    <View style={{ flexDirection: 'row', padding: 24, paddingTop: 40, alignItems: 'center' }}>
      <TouchableOpacity onPress={() => onNavigate('dashboard')} style={{ padding: 4 }}><ArrowLeft color="white" size={24} /></TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', marginLeft: 16 }}>{t.dash_reply}</Text>
    </View>
    <View style={{ padding: 24, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[styles.sub, { color: '#a855f7', marginBottom: 16 }]}>Wkrótce dodamy mechanizm analizy zrzutów ekranu.</Text>
      <Text style={[styles.sub, { textAlign: 'center' }]}>Wrzuć zrzut ekranu Waszej rozmowy, a Czarodziej podpowie Ci idealną, spersonalizowaną odpowiedź, zgodną z Twoją osobowością.</Text>
      <TouchableOpacity style={{ ...styles.btnPrimary, backgroundColor: 'rgba(234, 179, 8, 0.2)', borderWidth: 2, borderColor: '#eab308', borderStyle: 'dashed', marginTop: 30 }}>
        <Text style={{ color: '#eab308', fontWeight: '600', fontSize: 16 }}>{t.conv_attach} (Wybierz zrzut)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnGreen}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{t.conv_gen} ✨</Text></TouchableOpacity>
    </View>
  </LinearGradient>
);