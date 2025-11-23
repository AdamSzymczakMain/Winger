# 📚 DOKUMENTACJA PROJEKTU CZARODZIEJ (WINGER)

> **Wersja:** 1.0.0  
> **Ostatnia aktualizacja:** 2024-01-XX  
> **Status:** W aktywnym rozwoju

---

## 🎯 INFORMACJE OGÓLNE

### Opis projektu
Czarodziej (Winger) to aplikacja mobilna React Native/Expo stworzona jako asystent rozwoju kompetencji społecznych. Pomaga użytkownikom w:
- Rozpoczynaniu i prowadzeniu rozmów
- Radzeniu sobie z niezręcznymi sytuacjami
- Generowaniu inteligentnych odpowiedzi

### Technologie
- **Framework:** React Native z Expo (~54.0.25)
- **Język:** JavaScript (React 19.1.0)
- **Styling:** Inline styles + LinearGradient
- **Ikony:** lucide-react-native
- **Stan:** React Hooks (useState)

---

## 📁 STRUKTURA PROJEKTU

```
winger/
├── index.js                          # Punkt wejścia (registerRootComponent)
├── App.js                           # GŁÓWNY PLIK - logika nawigacji i stanów
├── app.json                         # Konfiguracja Expo
├── package.json                     # Zależności projektu
├── README.md                        # Dokumentacja Snack
│
├── assets/                          # Obrazy i ikony
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
│
├── components/                      # Stary folder (nieużywany)
│   └── AssetExample.js
│
└── src/                            # GŁÓWNY FOLDER ŹRÓDŁOWY
    ├── translations.js              # Tłumaczenia i języki
    ├── styles.js                    # Globalne style
    │
    └── components/                  # Komponenty React
        ├── Onboarding.js           # Ekrany onboardingu
        ├── Dashboard.js            # Ekran główny (dashboard)
        ├── MainFeatures.js         # Funkcje główne aplikacji
        └── Modals.js               # Modale (język, ustawienia)
```

---

## 🔄 PRZEPŁYW APLIKACJI (NAWIGACJA)

### Schemat nawigacji
```
1. welcome          → Ekran powitalny
2. goals            → Wybór celów
3. personality      → Wybór osobowości
4. subscription     → Ekran subskrypcji
5. dashboard        → Panel główny (po onboardingu)
   ├── conversation → Rozpocznij rozmowę
   ├── awkward      → Niezręczna sytuacja
   └── replySuggestions → Sugestie odpowiedzi
```

### Stan nawigacji
- **Zarządzanie:** `screen` state w `App.js`
- **Funkcja:** `setScreen(screenName)`
- **Przekazywanie:** Prop `onNavigate` do wszystkich ekranów

---

## 📄 SZCZEGÓŁOWY OPIS PLIKÓW

### 🎯 `App.js` - RDZEŃ APLIKACJI

**Rola:** Główny koordynator aplikacji

**Stany globalne:**
```javascript
const [screen, setScreen] = useState('welcome');      // Aktywny ekran
const [goals, setGoals] = useState([]);              // Wybrane cele użytkownika
const [personality, setPersonality] = useState(null); // Wybrana osobowość
const [langCode, setLangCode] = useState('pl');       // Aktywny język
const [showLang, setShowLang] = useState(false);     // Modal języka
const [showSettings, setShowSettings] = useState(false); // Modal ustawień
```

**Pomocnicze funkcje:**
- `t` - Aktywne tłumaczenia (z translations.js)
- `currentFlag` - Flaga aktywnego języka
- `toggleGoal(id)` - Przełączanie celów

**Importy:**
```javascript
// Onboarding
import { WelcomeScreen, GoalsScreen, PersonalityScreen, SubscriptionScreen } 
  from './src/components/Onboarding';

// Dashboard
import { DashboardScreen } from './src/components/Dashboard';

// Funkcje główne
import { ConversationScreen, AwkwardSituationScreen, ReplySuggestionsScreen } 
  from './src/components/MainFeatures';

// Modale
import { LanguageMenu, SettingsMenu } from './src/components/Modals';
```

---

### 🌍 `src/translations.js` - WIELOJĘZYCZNOŚĆ

**Struktura:**
```javascript
export const languages = [
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
];

export const translations = {
  pl: { /* klucze polskie */ },
  en: { /* klucze angielskie */ },
  cs: { /* klucze czeskie */ },
  tr: { /* klucze tureckie */ }
};
```

**Kluczowe grupy kluczy:**
- `welcome_*` - Ekran powitalny
- `goal_*` - Ekran celów
- `pers_*` - Ekran osobowości
- `sub_*` - Ekran subskrypcji
- `dash_*` - Dashboard
- `conv_*` - Konwersacje
- `settings`, `language`, `terms`, `privacy` - Ustawienia

**Użycie:**
```javascript
const t = translations[langCode] || translations['pl'];
<Text>{t.welcome_h1}</Text>
```

---

### 🎨 `src/styles.js` - GLOBALNE STYLE

**Kategorie stylów:**

1. **Ogólne:**
   - `container` - Główny kontener (flex: 1, tło #0f172a)
   - `gradient` - Kontener z gradientem
   - `h1` - Nagłówek główny (32px, biały)
   - `sub` - Podnagłówek (16px, #94a3b8)
   - `backBtn` - Przycisk wstecz
   - `iconBox` - Kontener ikony (60x60, fioletowy)

2. **Karty i przyciski:**
   - `card` - Podstawowa karta (ciemne tło, zaokrąglone rogi)
   - `cardSelected` - Karta wybrana (zielona obwódka)
   - `btnPrimary` - Pomarańczowy przycisk główny
   - `btnGreen` - Zielony przycisk
   - `btnPink` - Różowy przycisk

3. **Modale:**
   - `modalOverlay` - Przyciemnione tło
   - `modalContent` - Zawartość modala (od dołu)
   - `modalHeader` - Nagłówek modala
   - `modalTitle` - Tytuł modala
   - `menuItem` - Element menu

**Kolory projektu:**
- Tło główne: `#0f172a` (ciemny niebieski)
- Fiolet: `#7e22ce`, `#581c87`, `#a855f7`
- Pomarańczowy: `#d97706`
- Zielony: `#16a34a`, `#22c55e`
- Różowy: `#db2777`
- Niebieski: `#60a5fa`
- Żółty: `#fbbf24`, `#eab308`

---

### 🚀 `src/components/Onboarding.js` - EKRANY WDROŻENIA

**Komponenty:**

#### 1. `WelcomeScreen`
- **Rola:** Pierwszy ekran aplikacji
- **Props:** `t` (tłumaczenia), `onNavigate` (funkcja nawigacji)
- **Elementy:**
  - Ikona korony (Crown)
  - Tytuł "Czarodziej"
  - 3 cechy (feat_1, feat_2, feat_3)
  - Przycisk "Rozpocznij transformację"
- **Nawigacja:** → `goals`

#### 2. `GoalsScreen`
- **Rola:** Wybór celów użytkownika
- **Props:** `t`, `onNavigate`, `selectedGoals`, `toggleGoal`
- **Cele:**
  - `reply` - Gra w odpowiedzi (💬)
  - `starting` - Rozpoczynanie rozmów (📝)
  - `emotions` - Czytanie emocji (😔)
- **Stan:** Tablica wybranych ID celów
- **Walidacja:** Przycisk aktywny tylko gdy `selectedGoals.length > 0`
- **Nawigacja:** ← `welcome` | → `personality`

#### 3. `PersonalityScreen`
- **Rola:** Wybór osobowości
- **Props:** `t`, `onNavigate`, `selectedPersonality`, `setPersonality`
- **Osobowości:**
  - `assertive` - Asertywny (💪)
  - `confident` - Pewny siebie (😎)
  - `playful` - Figlarny (😜)
  - `empathetic` - Empatyczny (😔)
  - `flirtatious` - Zalotny (💦)
- **Stan:** String z ID osobowości
- **Walidacja:** Przycisk aktywny tylko gdy `selectedPersonality !== null`
- **Nawigacja:** ← `goals` | → `subscription`

#### 4. `SubscriptionScreen`
- **Rola:** Prezentacja oferty premium
- **Props:** `t`, `onNavigate`
- **Elementy:**
  - Symulacja rozmowy (bąble czatu)
  - Przycisk "Wypróbuj za darmo"
  - Cena: 3 dni free, potem 34,99 zł/msc
  - Linki: Email, Restore, Terms
- **Nawigacja:** ← `personality` | → `dashboard`

---

### 🏠 `src/components/Dashboard.js` - PANEL GŁÓWNY

**Komponent:** `DashboardScreen`

**Rola:** Centralny punkt aplikacji po onboardingu

**Props:** 
- `t` - Tłumaczenia
- `onNavigate` - Funkcja nawigacji
- `flag` - Emoji flagi aktywnego języka
- `onOpenLang` - Otwórz modal języka
- `onOpenSettings` - Otwórz modal ustawień

**Struktura:**
1. **Header (góra):**
   - Logo 🎩 + tytuł "Czarodziej"
   - Przycisk flagi (otwiera LanguageMenu)
   - Przycisk ⚙️ (otwiera SettingsMenu)

2. **3 Główne karty funkcji:**
   - **Rozpocznij rozmowę** (MessageCircle, niebieski)
     - Opis: Prześlij zdjęcie osoby dla pomysłów
     - Stat: 4.6M wskazówek
     - Nawigacja: → `conversation`
   
   - **Niezręczna sytuacja** (Heart, różowy)
     - Opis: Podaj szczegóły dla najlepszej rady
     - Stat: 2.9M wskazówek
     - Nawigacja: → `awkward`
   
   - **Sugestie odpowiedzi** (Brain, fioletowy)
     - Opis: Prześlij screenshot czatu
     - Stat: 6.3M wskazówek
     - Nawigacja: → `replySuggestions`

**Gradient:** `['#2e1065', '#0f172a']`

---

### ⚙️ `src/components/MainFeatures.js` - FUNKCJE GŁÓWNE

#### 1. `ConversationScreen` - Rozpocznij rozmowę
**Stan lokalny:**
```javascript
const [text, setText] = useState('');              // Treść wiadomości
const [tonality, setTonality] = useState(t.ton_casual); // Wybrana tonacja
```

**Elementy:**
- **Header:** Logo, tytuł, licznik ∞
- **TextInput:** 700 znaków max, multiline
- **Licznik:** "✏️ {text.length}/700"
- **Tonacje (horizontal scroll):**
  - Swobodny (ton_casual)
  - Przepraszający (ton_apol)
  - Zachęcający (ton_enc)
- **Personalizacja:** Dołącz zdjęcie (dashed border)
- **Przycisk:** "Abracadabra 🪄✨"

**Gradient:** `['#0f172a', '#2e1065', '#0f172a']`

**Nawigacja:** ← `dashboard`

---

#### 2. `AwkwardSituationScreen` - Niezręczna sytuacja
**Status:** 🚧 W budowie (placeholder)

**Elementy:**
- Header z powrotem do dashboard
- Tytuł z `dash_awk`
- Tekst informacyjny o budowie
- TextInput (150px wysokość)
- Przycisk "Abracadabra ✨"

**Gradient:** `['#0f172a', '#2e1065', '#0f172a']`

**Nawigacja:** ← `dashboard`

---

#### 3. `ReplySuggestionsScreen` - Sugestie odpowiedzi
**Status:** 🚧 W budowie (placeholder)

**Elementy:**
- Header z powrotem do dashboard
- Tytuł z `dash_reply`
- Tekst o przyszłej funkcji zrzutów ekranu
- Przycisk "Dołącz zdjęcie" (dashed, żółty)
- Przycisk "Abracadabra ✨"

**Gradient:** `['#0f172a', '#2e1065', '#0f172a']`

**Nawigacja:** ← `dashboard`

---

### 🔘 `src/components/Modals.js` - OKNA MODALNE

#### 1. `LanguageMenu`
**Props:**
- `visible` - Boolean (czy pokazany)
- `onClose` - Funkcja zamknięcia
- `languages` - Tablica języków z translations.js
- `currentLang` - Aktualny kod języka
- `setLang` - Funkcja zmiany języka
- `t` - Tłumaczenia

**Struktura:**
```javascript
<Modal visible={visible} transparent animationType="slide">
  <View style={modalOverlay}>
    <View style={modalContent}>
      <Header> // Tytuł "Język" + X
      {languages.map(lang => (
        <TouchableOpacity> // Flaga + Nazwa + ✓
      ))}
    </View>
  </View>
</Modal>
```

**Funkcjonalność:**
- Kliknięcie języka: `setLang(lang.code)` + `onClose()`
- Zaznaczenie aktywnego języka: fioletowy ✓

---

#### 2. `SettingsMenu`
**Props:**
- `visible` - Boolean
- `onClose` - Funkcja zamknięcia
- `t` - Tłumaczenia

**Elementy menu:**
1. **Discord** (MessageSquare) - `joindiscord`
2. **Email** (Mail) - `contactus`
3. **Ocena** (Star) - `rateus`

**Stopka (flexDirection: row):**
- Terms (regulamin)
- Version (v 1.2.8)
- Privacy (prywatność)

**Funkcjonalność:** Tylko UI, brak implementacji akcji

---

## 🔗 POŁĄCZENIA MIĘDZY PLIKAMI

### Przepływ danych:

```
App.js (główny stan)
  ↓
  ├─ translations.js (teksty) → przekazywane jako `t`
  ├─ styles.js (style) → importowane w komponentach
  │
  ├─ Onboarding.js
  │   ├─ WelcomeScreen
  │   ├─ GoalsScreen (odbiera: selectedGoals, toggleGoal)
  │   ├─ PersonalityScreen (odbiera: selectedPersonality, setPersonality)
  │   └─ SubscriptionScreen
  │
  ├─ Dashboard.js
  │   └─ DashboardScreen (odbiera: flag, onOpenLang, onOpenSettings)
  │
  ├─ MainFeatures.js
  │   ├─ ConversationScreen (własny stan lokalny)
  │   ├─ AwkwardSituationScreen
  │   └─ ReplySuggestionsScreen
  │
  └─ Modals.js
      ├─ LanguageMenu (odbiera: visible, languages, currentLang, setLang)
      └─ SettingsMenu (odbiera: visible)
```

### Wspólne propsy przekazywane do wszystkich ekranów:
- `t` - Obiekt tłumaczeń
- `onNavigate` - Funkcja `setScreen` do nawigacji

---

## 🎯 KLUCZOWE MECHANIZMY

### 1. System nawigacji
```javascript
// W App.js
const [screen, setScreen] = useState('welcome');

// Przekazywanie do komponentów
<WelcomeScreen onNavigate={setScreen} />

// Użycie w komponencie
onPress={() => onNavigate('goals')}
```

### 2. Zarządzanie językiem
```javascript
// Stan w App.js
const [langCode, setLangCode] = useState('pl');

// Pobieranie tłumaczeń
const t = translations[langCode] || translations['pl'];

// Flaga
const currentFlag = languages.find(l => l.code === langCode)?.flag;

// Zmiana języka (w LanguageMenu)
setLang(lang.code); // Aktualizuje langCode w App.js
```

### 3. Wybór celów (multi-select)
```javascript
// Stan w App.js
const [goals, setGoals] = useState([]);

// Funkcja toggle
const toggleGoal = (id) => {
  setGoals(prev => 
    prev.includes(id) 
      ? prev.filter(x => x !== id)  // Usuń jeśli jest
      : [...prev, id]                // Dodaj jeśli nie ma
  );
};

// Sprawdzanie czy wybrany
const isSelected = selectedGoals.includes(goal.id);
```

### 4. Wybór osobowości (single-select)
```javascript
// Stan w App.js
const [personality, setPersonality] = useState(null);

// Ustawienie (bezpośrednio w komponencie)
onPress={() => setPersonality(p.id)}

// Sprawdzanie czy wybrana
selectedPersonality === p.id
```

### 5. Kontrola modalów
```javascript
// Stany w App.js
const [showLang, setShowLang] = useState(false);
const [showSettings, setShowSettings] = useState(false);

// Otwieranie
<TouchableOpacity onPress={() => setShowLang(true)}>

// Przekazywanie do modala
<LanguageMenu 
  visible={showLang} 
  onClose={() => setShowLang(false)} 
/>
```

---

## 🐛 NAPRAWIONE BŁĘDY

### Błąd w Modals.js (naprawiony)
**Problem:** Brakujący cudzysłów w `animationType="slide`

**Przed:**
```javascript
<Modal visible={visible} transparent animationType="slide>
```

**Po:**
```javascript
<Modal visible={visible} transparent animationType="slide">
```

**Status:** ✅ Naprawiony w obu modalach

---

## 📦 ZALEŻNOŚCI (package.json)

```json
{
  "expo": "~54.0.25",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo-linear-gradient": "~15.0.7",
  "lucide-react-native": "*",
  "expo-router": "~6.0.15",
  "react-native-screens": "~4.16.0",
  "react-native-safe-area-context": "~5.6.0"
}
```

---

## 🚀 URUCHAMIANIE PROJEKTU

```bash
# Instalacja zależności
npm install

# Start projektu
npm start

# Platformy
npm run android  # Android
npm run ios      # iOS
npm run web      # Web
```

---

## ✅ CHECKLIST ROZWOJU

### Zaimplementowane ✅
- [x] System nawigacji między ekranami
- [x] Onboarding (4 ekrany)
- [x] Wielojęzyczność (4 języki)
- [x] Dashboard z 3 funkcjami
- [x] Modal wyboru języka
- [x] Modal ustawień
- [x] Ekran ConversationScreen z inputem
- [x] Wybór celów (multi-select)
- [x] Wybór osobowości (single-select)
- [x] Responsywny design

### W budowie 🚧
- [ ] Logika generowania odpowiedzi (ConversationScreen)
- [ ] Funkcjonalność AwkwardSituationScreen
- [ ] Funkcjonalność ReplySuggestionsScreen
- [ ] Upload zdjęć
- [ ] Analiza screenshotów
- [ ] Integracja z API
- [ ] System subskrypcji

### Planowane 📋
- [ ] Integracja z backend
- [ ] Przechowywanie historii
- [ ] Profil użytkownika
- [ ] Analytics
- [ ] Push notifications
- [ ] Dark mode (już jest de facto)
- [ ] Testy jednostkowe

---

## 🎨 KONWENCJE KODU

### Nazewnictwo
- **Komponenty:** PascalCase (np. `WelcomeScreen`)
- **Funkcje:** camelCase (np. `toggleGoal`)
- **Stany:** camelCase (np. `selectedGoals`)
- **Stałe:** camelCase (np. `languages`)

### Struktura komponentów
```javascript
export const ComponentName = ({ prop1, prop2 }) => {
  // Lokalne stany (jeśli są)
  const [localState, setLocalState] = useState(initial);
  
  // Pomocnicze zmienne
  const helperVar = someCalculation();
  
  // Return JSX
  return (
    <LinearGradient>
      {/* Struktura */}
    </LinearGradient>
  );
};
```

### Style inline
- Używamy obiektu `styles` z `src/styles.js`
- Dodatkowe style inline tylko gdy potrzebne
- Preferujemy wartości hex dla kolorów

---

## 📝 NOTATKI DLA PRZYSZŁEGO ROZWOJU

### Backend (TODO)
- Endpoint dla generowania odpowiedzi
- Autentykacja użytkowników
- Przechowywanie preferencji
- System subskrypcji (payment gateway)

### Features do dodania
1. **Historia rozmów** - przechowywanie poprzednich interakcji
2. **Bookmarki** - zapisywanie ulubionych odpowiedzi
3. **Tutorial** - first-time user experience
4. **Feedback system** - ocenianie jakości odpowiedzi
5. **Profile customization** - dodatkowe opcje personalizacji

### Optymalizacje
- Lazy loading ekranów
- Memoizacja komponentów (React.memo)
- Optymalizacja re-renderów
- Caching tłumaczeń

---

## 🆘 TROUBLESHOOTING

### Problem: Aplikacja nie startuje
**Rozwiązanie:** 
```bash
npm install
expo start --clear
```

### Problem: Błędy importów
**Rozwiązanie:** Sprawdź ścieżki względne w importach

### Problem: Modal nie działa
**Rozwiązanie:** Sprawdź czy state `visible` i `onClose` są poprawnie przekazane

### Problem: Tłumaczenia nie działają
**Rozwiązanie:** Upewnij się, że `langCode` istnieje w `translations`

---

## 📞 KONTAKT / WSPARCIE

Projekt stworzony w 100% z AI.

**Stack używany przez AI:**
- React Native
- Expo
- JavaScript

**Workflow:**
1. Opis funkcjonalności
2. Generowanie kodu przez AI
3. Aktualizacja dokumentacji
4. Dołączanie dokumentacji do kolejnych sesji

---

## 📜 LICENCJA

Licencja: 0BSD (Zero-Clause BSD)

---

**Koniec dokumentacji v1.0.0**

> **Przypomnienie:** Ta dokumentacja powinna być aktualizowana po każdej zmianie w projekcie. Dołącz ją do każdej rozmowy z AI poprzedzając komunikatem: "Pracujemy na projekcie Winger - dołączam dokumentację."