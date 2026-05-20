import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

/**
 * Type for supported languages in the application
 */
export type Language = 'it' | 'en';

/**
 * Interface for translations
 * Contains all text strings for each page and component
 */
export interface Translations {
  // General
  appTitle: string;
  museum: string;
  home: string;
  gallery: string;
  admin: string;
  backToHome: string;
  back: string;
  logout: string;
  loading: string;
  items: string;

  // Home page
  museumTitle: string;
  museumSubtitle: string;
  viewGallery: string;
  contact: string;
  featuredTitle: string;
  featuredDescription: string;
  card1Year: string;
  card1Title: string;
  card1Description: string;
  card2Year: string;
  card2Title: string;
  card2Description: string;
  card3Year: string;
  card3Title: string;
  card3Description: string;
  aboutMuseum: string;
  aboutText: string;

  // Gallery
  galleryTitle: string;
  galleryDescription: string;
  noRadios: string;
  details: string;
  emptyCollection: string;

  // Admin
  adminPanel: string;
  adminTitle: string;
  adminDescription: string;
  addNewRadio: string;
  radioName: string;
  year: string;
  description: string;
  photoUrl: string;
  specs: string;
  addButton: string;
  radioList: string;
  deleteConfirm: string;
  delete: string;
  addSuccess: string;
  nameRequired: string;
  signingOut: string;

  // Login
  loginTitle: string;
  email: string;
  password: string;
  loginButton: string;
  signingIn: string;
  invalidCredentials: string;

  // Languages
  language: string;
  italian: string;
  english: string;
}

/**
 * Service for managing languages and translations
 * Supports Italian and English languages
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // All translations for all languages (declare first!)
  private translations: Record<Language, Translations> = {
    it: {
      // Generale
      appTitle: 'Museo della Radio',
      museum: 'Tutti i diritti riservati.',
      home: 'Home',
      gallery: 'Galleria',
      admin: 'Admin',
      backToHome: '← Torna alla home',
      back: '← Indietro',
      loading: 'Caricamento...',
      items: 'items',

      // Home
      museumTitle: 'Museo della Radio',
      museumSubtitle: 'Un viaggio nel mondo della radio classica e del suono',
      viewGallery: '🎙️ Visualizza galleria',
      contact: 'Contatti',
      featuredTitle: 'Collezione Vintage',
      featuredDescription: 'Scopri una selezione unica di radio storiche che hanno segnato l’evoluzione della comunicazione e del design.',
      card1Year: '1948',
      card1Title: 'Radio Classica',
      card1Description: 'Un modello iconico del dopoguerra italiano con dettagli in legno e design artigianale.',
      card2Year: '1962',
      card2Title: 'Radio Moderna',
      card2Description: 'Linee eleganti e tecnologia innovativa che hanno rivoluzionato il mondo della radio domestica.',
      card3Year: '1975',
      card3Title: 'Onde Analogiche',
      card3Description: 'La magia del suono analogico e delle frequenze che hanno accompagnato intere generazioni.',
      adminPanel: '⚙️ Pannello admin',
      aboutMuseum: 'Info museo',
      aboutText: 'Benvenuti nel nostro museo! Qui troverete un’enorme collezione di ricevitori radio vintage e scoprirete la storia dello sviluppo della radiotecnica.',

      // Galleria
      galleryTitle: '🎙️ Galleria radio',
      galleryDescription: 'Esplora la collezione di radio vintage',
      noRadios: 'Nessuna radio nel catalogo al momento',
      details: 'Dettagli',
      emptyCollection: 'La collezione è attualmente vuota',

      // Admin
      adminTitle: '⚙️ Pannello admin',
      adminDescription: 'Gestisci la tua collezione di radio',
      addNewRadio: 'Aggiungi nuova radio',
      radioName: 'Nome',
      year: 'Anno',
      description: 'Descrizione',
      photoUrl: 'Collegamento foto',
      specs: 'Caratteristiche tecniche',
      addButton: '➕ Aggiungi radio',
      radioList: 'Elenco radio',
      deleteConfirm: 'Eliminare questa radio?',
      delete: 'Elimina',
      addSuccess: '✅ Radio aggiunta!',
      nameRequired: 'Inserire il nome della radio',
      signingOut: 'Disconnessione...',

      // Login
      loginTitle: 'Accesso admin',
      email: 'Email',
      password: 'Password',
      loginButton: 'Accedi',
      signingIn: 'Accesso in corso...',
      invalidCredentials: 'Credenziali non valide',
      logout: 'Esci',

      // Lingue
      language: 'Lingua',
      italian: 'Italiano',
      english: 'English'
    },
    en: {
      // General
      appTitle: 'Radio Museum',
      museum: 'All rights reserved.',
      home: 'Home',
      gallery: 'Gallery',
      admin: 'Admin',
      backToHome: '← Back to home',
      back: '← Back',
      logout: 'Logout',
      loading: 'Loading...',
      items: 'items',

      // Home
      museumTitle: 'Radio Museum',
      museumSubtitle: 'A journey into the world of classic radio and sound',
      viewGallery: '🎙️ View gallery',
      contact: 'Contact',
      featuredTitle: 'Vintage collection',
      featuredDescription: 'Discover a unique selection of historic radios that marked the evolution of communication and design.',
      card1Year: '1948',
      card1Title: 'Classic radio',
      card1Description: 'An iconic post-war Italian model with wood details and handcrafted design.',
      card2Year: '1962',
      card2Title: 'Modern radio',
      card2Description: 'Elegant lines and innovative technology that revolutionized the world of home radio.',
      card3Year: '1975',
      card3Title: 'Analog waves',
      card3Description: 'The magic of analog sound and frequencies that accompanied entire generations.',
      adminPanel: '⚙️ Admin panel',
      aboutMuseum: 'About museum',
      aboutText: 'Welcome to our museum! Here you will find a huge collection of vintage radio receivers and learn about the history of radio technology development.',

      // Gallery
      galleryTitle: '🎙️ Radio gallery',
      galleryDescription: 'Explore the vintage radio collection',
      noRadios: 'No radios in catalog yet',
      details: 'Details',
      emptyCollection: 'The collection is currently empty',

      // Admin
      adminTitle: '⚙️ Admin panel',
      adminDescription: 'Manage your radio collection',
      addNewRadio: 'Add new radio',
      radioName: 'Name',
      year: 'Year',
      description: 'Description',
      photoUrl: 'Photo URL',
      specs: 'Technical specs',
      addButton: '➕ Add radio',
      radioList: 'Radio list',
      deleteConfirm: 'Delete this radio?',
      delete: 'Delete',
      addSuccess: '✅ Radio added!',
      nameRequired: 'Please enter radio name',
      signingOut: 'Signing out...',

      // Login
      loginTitle: 'Admin Login',
      email: 'Email',
      password: 'Password',
      loginButton: 'Login',
      signingIn: 'Signing in...',
      invalidCredentials: 'Invalid credentials',

      // Languages
      language: 'Language',
      italian: 'Italiano',
      english: 'English'
    }
  };

  // Signal for current language
  private languageSignal = signal<Language>('en');
  
  // Public read-only signal
  currentLanguage$ = this.languageSignal.asReadonly();

  // Signal for current translations (now we can use this.translations)
  private translationsSignal = signal<Translations>(this.translations.en);
  
  // Public read-only signal
  translations$ = this.translationsSignal.asReadonly();

  constructor() {
    // Load saved language on initialization
    this.loadSavedLanguage();
  }

  /**
   * Sets the current language and updates translations
   * @param lang - Language to set (it, en)
   */
  setLanguage(lang: Language): void {
    // Update language signal
    this.languageSignal.set(lang);
    
    // Update translations according to new language
    this.translationsSignal.set(this.translations[lang]);
    
    // Save language choice in localStorage for next visit
    this.saveLanguageChoice(lang);
  }

  /**
   * Gets the current language
   * @returns Current language
   */
  getLanguage(): Language {
    return this.languageSignal();
  }

  /**
   * Gets the current translations
   * @returns Object with all translations for current language
   */
  getTranslations(): Translations {
    return this.translationsSignal();
  }

  /**
   * Gets the translation for a specific key
   * @param key - Translation key
   * @returns Translation text
   */
  get(key: keyof Translations): string {
    return this.translationsSignal()[key];
  }

  /**
   * Saves language choice in localStorage
   * @param lang - Language to save
   */
  private saveLanguageChoice(lang: Language): void {
    try {
      localStorage.setItem('preferredLanguage', lang);
    } catch (e) {
      console.warn('Cannot save language choice:', e);
    }
  }

  /**
   * Loads saved language from localStorage
   * If not saved, uses browser language or defaults to English
   */
  private loadSavedLanguage(): void {
    try {
      // First try to load language from localStorage
      const saved = localStorage.getItem('preferredLanguage');
      if (saved && (saved === 'it' || saved === 'en')) {
        this.setLanguage(saved as Language);
        return;
      }

      // If not saved, try to determine browser language
      const browserLang = navigator.language.substring(0, 2);
      if (browserLang === 'it') {
        this.setLanguage('it');
      } else if (browserLang === 'en') {
        this.setLanguage('en');
      } else {
        // Default to English
        this.setLanguage('en');
      }
    } catch (e) {
      // If error occurs, default to English
      this.setLanguage('en');
    }
  }
}
