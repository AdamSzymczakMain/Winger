// Plik: src/services/api.js
// Centralne zarządzanie API - OpenAI i inne serwisy

import Constants from 'expo-constants';

// Pobierz klucz API z konfiguracji Expo (priority: env -> extra.openaiApiKey)
const OPENAI_API_KEY =
  process.env.EXPO_PUBLIC_OPENAI_API_KEY ||
  Constants?.expoConfig?.extra?.openaiApiKey ||
  '';

if (!OPENAI_API_KEY) {
  console.warn('⚠️ OpenAI API key is missing. Set EXPO_PUBLIC_OPENAI_API_KEY in .env or fill extra.openaiApiKey in app.json.');
}

/**
 * Generuje rozpoczęcie rozmowy na podstawie tekstu lub zdjęcia
 */
export const generateConversation = async ({ text, imageUri, tonality, langCode = 'pl' }) => {
  if (!text.trim() && !imageUri) {
    throw new Error('Text or image is required');
  }

  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured. Please set EXPO_PUBLIC_OPENAI_API_KEY in .env file.');
  }

  const toneDescriptions = {
    casual: 'swobodny, naturalny, z luzem - jak rozmowa z przyjacielem',
    apologetic: 'przepraszający, delikatny, empatyczny - okazujący skruchę',
    encouraging: 'zachęcający, motywujący, pełen entuzjazmu - dodający otuchy'
  };

  if (imageUri) {
    // Vision API
    const messages = [
      {
        role: 'system',
        content: `Jesteś asystentem pomagającym rozpocząć rozmowy na podstawie zdjęć.

TON: ${toneDescriptions[tonality]}

ZADANIE: 
1. Przeanalizuj zdjęcie
2. Zidentyfikuj kontekst (osoba, miejsce, aktywność, sytuacja)
3. Wygeneruj kreatywne, naturalne rozpoczęcie rozmowy (2-4 zdania)

ZASADY:
- Odnieś się do tego, co widzisz na zdjęciu
- Bądź autentyczny i ciekawy
- Zadaj pytanie lub skomentuj coś konkretnego
- Dostosuj ton do wybranego stylu
- Możesz użyć emoji jeśli pasują
- Zwróć TYLKO sam tekst początkowy rozmowy, bez komentarzy`
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Przeanalizuj to zdjęcie i wygeneruj rozpoczęcie rozmowy w tonie: ${toneDescriptions[tonality]}

${text.trim() ? `Dodatkowy kontekst: ${text}` : ''}`
          },
          {
            type: 'image_url',
            image_url: { url: imageUri }
          }
        ]
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.8,
        max_tokens: 400
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } else {
    // Standard text API
    const messages = [
      {
        role: 'system',
        content: `Jesteś asystentem pomagającym rozpocząć rozmowy. 

TON: ${toneDescriptions[tonality]}

ZADANIE: Na podstawie opisu sytuacji wygeneruj krótki, naturalny tekst do rozpoczęcia rozmowy (2-4 zdania).

ZASADY:
- Bądź autentyczny i naturalny
- Dostosuj język do wybranego tonu
- Nie pisz zbyt formalnie
- Możesz użyć emoji jeśli pasują do tonu
- Zwróć TYLKO sam tekst, bez dodatkowych komentarzy`
      },
      {
        role: 'user',
        content: `Sytuacja: ${text}

Wygeneruj rozpoczęcie rozmowy w tonie: ${toneDescriptions[tonality]}`
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.8,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }
};

/**
 * Generuje radę dla niezręcznej sytuacji
 */
export const generateAwkwardAdvice = async ({ situation, context, category, urgency, langCode = 'pl' }) => {
  if (!situation.trim() || !category) {
    throw new Error('Situation and category are required');
  }

  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured. Please set EXPO_PUBLIC_OPENAI_API_KEY in .env file.');
  }

  const categoryLabels = {
    social: 'Towarzyska',
    romantic: 'Romantyczna',
    work: 'Zawodowa',
    family: 'Rodzinna',
    conflict: 'Konflikt'
  };

  const urgencyLabels = {
    low: 'Spokojnie',
    medium: 'Umiarkowanie',
    high: 'Pilne!'
  };

  const messages = [
    {
      role: 'system',
      content: `Jesteś ekspertem od relacji międzyludzkich i komunikacji. Pomagasz ludziom radzić sobie z niezręcznymi sytuacjami.

ZADANIE: Przeanalizuj niezręczną sytuację i wygeneruj kompleksową radę.

FORMAT ODPOWIEDZI (zwróć TYLKO poprawny JSON):
{
  "mainAdvice": "Główna rada (2-3 zdania)",
  "steps": [
    "Krok 1 z numerem",
    "Krok 2 z numerem",
    "Krok 3 z numerem",
    "Krok 4 z numerem"
  ],
  "whatToSay": [
    "Przykład 1 w cudzysłowie",
    "Przykład 2 w cudzysłowie",
    "Przykład 3 w cudzysłowie"
  ],
  "avoid": [
    "❌ Czego unikać 1",
    "❌ Czego unikać 2",
    "❌ Czego unikać 3",
    "❌ Czego unikać 4"
  ],
  "tips": "💡 Jedna dodatkowa wskazówka"
}

STYL:
- Empatyczny i wspierający
- Konkretny i praktyczny
- Bez osądzania
- Z psychologicznym podejściem`
    },
    {
      role: 'user',
      content: `Sytuacja: ${situation}

${context ? `Dodatkowy kontekst: ${context}` : ''}

Kategoria: ${categoryLabels[category]}
Pilność: ${urgencyLabels[urgency]}

Wygeneruj kompleksową radę jak poradzić sobie z tą niezręczną sytuacją.`
    }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1200,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  const aiResponse = JSON.parse(data.choices[0].message.content);

  return {
    situation: situation,
    category: categoryLabels[category],
    urgency: urgency,
    mainAdvice: aiResponse.mainAdvice,
    steps: aiResponse.steps,
    whatToSay: aiResponse.whatToSay,
    avoid: aiResponse.avoid,
    tips: aiResponse.tips
  };
};

/**
 * Generuje sugestie odpowiedzi na wiadomość
 */
export const generateReplySuggestions = async ({ messageText, imageUri, tone, langCode = 'pl' }) => {
  if (!messageText.trim() && !imageUri) {
    throw new Error('Message text or image is required');
  }

  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured. Please set EXPO_PUBLIC_OPENAI_API_KEY in .env file.');
  }

  const toneDescriptions = {
    friendly: 'przyjazny, ciepły i otwarty - używaj emoji, bądź entuzjastyczny',
    professional: 'profesjonalny, formalny ale ciepły - używaj grzecznościowych zwrotów',
    balanced: 'zrównoważony - ani zbyt formalny ani zbyt casualowy, uniwersalny',
    flirty: 'zalotny, subtelnie flirtujący - użyj emoji, bądź zabawny i intrygujący',
    witty: 'dowcipny, sarkastyczny - używaj humoru, żartów, bądź kreatywny'
  };

  if (imageUri) {
    // Vision API dla zrzutów ekranu
    const messages = [
      {
        role: 'system',
        content: `Jesteś asystentem analizującym zrzuty ekranu rozmów i generującym inteligentne odpowiedzi.

ZADANIE:
1. Przeanalizuj zrzut ekranu konwersacji
2. Zidentyfikuj ostatnią wiadomość, na którą trzeba odpowiedzieć
3. Wygeneruj 3 spersonalizowane odpowiedzi

TON ODPOWIEDZI: ${toneDescriptions[tone]}

FORMAT (zwróć TYLKO JSON):
{
  "detected_message": "Wykryta ostatnia wiadomość z obrazu",
  "replies": [
    {
      "text": "Pierwsza odpowiedź",
      "why": "Wyjaśnienie (30-60 znaków)"
    },
    {
      "text": "Druga odpowiedź",
      "why": "Wyjaśnienie (30-60 znaków)"
    },
    {
      "text": "Trzecia odpowiedź",
      "why": "Wyjaśnienie (30-60 znaków)"
    }
  ]
}`
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Przeanalizuj ten zrzut ekranu konwersacji i wygeneruj 3 odpowiedzi w stylu: ${toneDescriptions[tone]}`
          },
          {
            type: 'image_url',
            image_url: { url: imageUri }
          }
        ]
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.8,
        max_tokens: 1000,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const parsedResponse = JSON.parse(data.choices[0].message.content);

    return {
      originalMessage: parsedResponse.detected_message || 'Wiadomość z obrazu',
      tone: tone,
      replies: parsedResponse.replies,
      fromImage: true
    };
  } else {
    // Standard text API
    const messages = [
      {
        role: 'system',
        content: `Jesteś asystentem pomagającym użytkownikom tworzyć inteligentne odpowiedzi na wiadomości. 

ZADANIE: Wygeneruj dokładnie 3 różne, spersonalizowane odpowiedzi na otrzymaną wiadomość.

TON ODPOWIEDZI: ${toneDescriptions[tone]}

FORMAT ODPOWIEDZI (zwróć TYLKO poprawny JSON):
{
  "replies": [
    {
      "text": "Treść pierwszej odpowiedzi (najlepsza opcja)",
      "why": "Krótkie wyjaśnienie dlaczego ta odpowiedź jest dobra (30-60 znaków)"
    },
    {
      "text": "Treść drugiej odpowiedzi (alternatywa)",
      "why": "Krótkie wyjaśnienie dlaczego ta odpowiedź jest dobra (30-60 znaków)"
    },
    {
      "text": "Treść trzeciej odpowiedzi (inna opcja)",
      "why": "Krótkie wyjaśnienie dlaczego ta odpowiedź jest dobra (30-60 znaków)"
    }
  ]
}

ZASADY:
- Każda odpowiedź musi być inna i unikalna
- Dostosuj styl do wybranej tonacji
- Odpowiedzi powinny być naturalne, nie robotyczne
- Wyjaśnienia "why" powinny być konkretne
- Nie używaj markdown, tylko czysty tekst
- Zwróć TYLKO JSON, bez dodatkowego tekstu`
      },
      {
        role: 'user',
        content: `Otrzymana wiadomość: "${messageText}"

Wygeneruj 3 odpowiedzi w stylu: ${toneDescriptions[tone]}`
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.8,
        max_tokens: 800,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const parsedResponse = JSON.parse(data.choices[0].message.content);

    return {
      originalMessage: messageText,
      tone: tone,
      replies: parsedResponse.replies,
      fromImage: false
    };
  }
};

