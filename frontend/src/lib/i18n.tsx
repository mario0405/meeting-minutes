'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type SupportedLanguage = 'en' | 'de';

type TranslationMap = Record<string, Record<SupportedLanguage, string>>;

const translations: TranslationMap = {
  transcriptionLanguage: {
    en: 'Transcription Language',
    de: 'Transkriptionssprache',
  },
  languagePreferenceSavedTitle: {
    en: 'Language preference saved',
    de: 'Spracheinstellung gespeichert',
  },
  languagePreferenceSavedDescription: {
    en: 'Transcription language set to',
    de: 'Transkriptionssprache gesetzt auf',
  },
  languagePreferenceSaveFailedTitle: {
    en: 'Failed to save language preference',
    de: 'Spracheinstellung konnte nicht gespeichert werden',
  },
  currentLanguageLabel: {
    en: 'Current:',
    de: 'Aktuell:',
  },
  autoDetectWarningTitle: {
    en: 'Auto Detect may produce incorrect results',
    de: 'Automatische Erkennung kann ungenau sein',
  },
  autoDetectWarningBody: {
    en: 'For best accuracy, select your specific language (e.g., English, Spanish, etc.)',
    de: 'Für die beste Genauigkeit bitte die konkrete Sprache auswählen (z.B. Deutsch, Spanisch usw.)',
  },
  autoTranslateNoticeTitle: {
    en: 'Translation Mode Active',
    de: 'Übersetzungsmodus aktiv',
  },
  autoTranslateNoticeBody: {
    en: 'Automatic detection without forcing English. Select German to guarantee German transcripts and summaries.',
    de: 'Automatische Erkennung ohne erzwungene englische Übersetzung. Wähle Deutsch für garantiert deutsche Transkripte und Zusammenfassungen.',
  },
  optimizedForLanguage: {
    en: 'Transcription will be optimized for',
    de: 'Die Transkription wird optimiert für',
  },
  parakeetSupportTitle: {
    en: 'Parakeet Language Support',
    de: 'Sprachunterstützung von Parakeet',
  },
  parakeetSupportBody: {
    en: 'Parakeet currently only supports automatic language detection. Manual language selection is not available. Use Whisper if you need to specify a particular language.',
    de: 'Parakeet unterstützt derzeit nur automatische Spracherkennung. Eine manuelle Auswahl ist nicht verfügbar. Nutze Whisper, wenn du eine bestimmte Sprache angeben möchtest.',
  },
  languageSettingsTitle: {
    en: 'Language Settings',
    de: 'Spracheinstellungen',
  },
  done: {
    en: 'Done',
    de: 'Fertig',
  },
  audioDeviceSettingsTitle: {
    en: 'Audio Device Settings',
    de: 'Audio-Einstellungen',
  },
  devicesSelectedToastTitle: {
    en: 'Devices selected',
    de: 'Geräte ausgewählt',
  },
  meetingSummaryHeading: {
    en: 'Meeting Summary',
    de: 'Besprechungsprotokoll',
  },
  keyPointsHeading: {
    en: 'Key Points',
    de: 'Kernpunkte',
  },
  actionItemsHeading: {
    en: 'Action Items',
    de: 'Aufgaben',
  },
  decisionsHeading: {
    en: 'Decisions',
    de: 'Entscheidungen',
  },
  mainTopicsHeading: {
    en: 'Main Topics',
    de: 'Hauptthemen',
  },
  fullSummaryHeading: {
    en: 'Full Summary',
    de: 'Vollständige Zusammenfassung',
  },
  generatingSummary: {
    en: 'Generating AI Summary...',
    de: 'KI-Zusammenfassung wird erstellt...',
  },
  addContextPlaceholder: {
    en: 'Add context for AI summary. For example people involved, meeting overview, objective etc...',
    de: 'Kontext für die KI-Zusammenfassung hinzufügen, z.B. Teilnehmende, Zielsetzung oder Rahmen.',
  },
  deleteLabel: {
    en: 'Delete',
    de: 'Löschen',
  },
  deleteBlocksLabel: {
    en: 'Delete block',
    de: 'Block löschen',
  },
  deleteMultipleBlocksLabel: {
    en: 'Delete blocks',
    de: 'Blöcke löschen',
  },
  copyBlockLabel: {
    en: 'Copy block',
    de: 'Block kopieren',
  },
  copyBlocksLabel: {
    en: 'Copy blocks',
    de: 'Blöcke kopieren',
  },
  addSectionTitle: {
    en: 'Add new section',
    de: 'Neuen Abschnitt hinzufügen',
  },
  autoDetectOriginal: {
    en: 'Auto Detect (Original Language)',
    de: 'Automatische Erkennung (Originalsprache)',
  },
  autoDetectTranslate: {
    en: 'Auto Detect (Translate to German)',
    de: 'Automatische Erkennung (ins Deutsche)',
  },
  germanLanguage: {
    en: 'German',
    de: 'Deutsch',
  },
  summaryEmptyTitle: {
    en: 'No summary content available.',
    de: 'Keine Zusammenfassung vorhanden.',
  },
  summaryEmptySubtitle: {
    en: 'Try generating a new summary.',
    de: 'Erstelle eine neue Zusammenfassung.',
  },
  processingTranscriptTitle: {
    en: 'Processing Transcript',
    de: 'Transkript wird verarbeitet',
  },
  processingTranscriptBody: {
    en: 'Analyzing your transcript...',
    de: 'Transkript wird analysiert...',
  },
  generatingSummaryTitle: {
    en: 'Generating Summary',
    de: 'Zusammenfassung wird erstellt',
  },
  generatingSummaryBody: {
    en: 'Creating a detailed summary of your meeting...',
    de: 'Eine detaillierte Besprechungszusammenfassung wird erstellt...',
  },
};

const I18nContext = createContext<{
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}>({
  language: 'de',
  setLanguage: () => {},
});

export function I18nProvider({
  children,
  initialLanguage = 'de',
}: {
  children: React.ReactNode;
  initialLanguage?: SupportedLanguage;
}) {
  const [language, setLanguage] = useState<SupportedLanguage>(initialLanguage);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('uiLanguage') as SupportedLanguage | null;
    if (stored === 'en' || stored === 'de') {
      setLanguage(stored);
    }
  }, []);

  const handleSetLanguage = useCallback((nextLanguage: SupportedLanguage) => {
    setLanguage(nextLanguage);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('uiLanguage', nextLanguage);
      } catch (error) {
        console.warn('Failed to persist language preference', error);
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage: handleSetLanguage,
    }),
    [handleSetLanguage, language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const { language, setLanguage } = useContext(I18nContext);

  const t = useCallback(
    (key: keyof typeof translations | string) => {
      const translationEntry = translations[key];
      if (translationEntry) {
        return translationEntry[language] ?? translationEntry.de ?? key;
      }
      return key;
    },
    [language]
  );

  return { t, language, setLanguage };
}

export { translations };
