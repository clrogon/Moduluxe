import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { LocalizationPreferences } from '../../shared/types/index';

// Statically import TS files for robust module resolution.
import { en } from './locales/en';
import { pt } from './locales/pt';
import { es } from './locales/es';
import { ptAO } from './locales/pt-AO';

type Language = LocalizationPreferences['language'];
type Translations = Record<string, any>;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// A map of the statically imported translation objects.
const staticTranslations: Record<Language, Translations> = {
  'en-US': en,
  'pt-BR': pt,
  'pt-AO': ptAO,
  'es-MX': es,
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt-AO'); // Default to Angolan Portuguese
  const [messages, setMessages] = useState<Translations>(staticTranslations['pt-AO']);

  useEffect(() => {
    // Synchronously set messages from the statically imported object.
    const newMessages = staticTranslations[language] || staticTranslations['pt-AO']; // Fallback to Angola
    setMessages(newMessages);
  }, [language]);
  
  const t = (key: string, options?: { [key: string]: string | number }): string => {
    const keys = key.split('.');
    let result: any = messages;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; // Return key if not found
      }
    }

    if (typeof result === 'string' && options) {
      return Object.entries(options).reduce((str, [key, value]) => {
        return str.replace(`{${key}}`, String(value));
      }, result);
    }
    
    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};