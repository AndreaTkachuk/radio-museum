import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

/**
 * Тип для підтримуваних мов у додатку
 */
export type Language = 'it' | 'en';

/**
 * Інтерфейс для перекладів
 * Містить всі текстові рядки для кожної сторінки та компонента
 */
export interface Translations {
  // Загальні
  appTitle: string;
  museum: string;
  home: string;
  gallery: string;
  admin: string;
  backToHome: string;
  back: string;

  // Головна сторінка (Home)
  museumTitle: string;
  museumSubtitle: string;
  viewGallery: string;
  adminPanel: string;
  aboutMuseum: string;
  aboutText: string;

  // Галерея
  galleryTitle: string;
  noRadios: string;
  details: string;

  // Адмін
  adminTitle: string;
  addNewRadio: string;
  radioName: string;
  year: string;
  description: string;
  photoUrl: string;
  specs: string;
  addButton: string;
  radioList: string;
  deleteConfirm: string;
  addSuccess: string;
  nameRequired: string;

  // Мовлення
  language: string;
  italian: string;
  english: string;
}

/**
 * Сервіс для управління мовами та перекладами
 * Підтримує українську, італійську та англійську мови
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Всі переклади для всіх мов (декларуємо перше!)
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

      // Home
      museumTitle: 'Museo della Radio',
      museumSubtitle: 'Un viaggio nel mondo della radio classica e del suono',
      viewGallery: '🎙️ Visualizza galleria',
      adminPanel: '⚙️ Pannello admin',
      aboutMuseum: 'Info museo',
      aboutText: 'Benvenuti nel nostro museo! Qui troverete un\'enorme collezione di ricevitori radio vintage e scoprirete la storia dello sviluppo della radiotecnica.',

      // Galleria
      galleryTitle: '🎙️ Galleria radio',
      noRadios: 'Nessuna radio nel catalogo al momento',
      details: 'Dettagli',

      // Admin
      adminTitle: '⚙️ Pannello admin',
      addNewRadio: 'Aggiungi nuova radio',
      radioName: 'Nome',
      year: 'Anno',
      description: 'Descrizione',
      photoUrl: 'Collegamento foto',
      specs: 'Caratteristiche tecniche',
      addButton: '➕ Aggiungi radio',
      radioList: 'Elenco radio',
      deleteConfirm: 'Eliminare questa radio?',
      addSuccess: '✅ Radio aggiunta!',
      nameRequired: 'Inserire il nome della radio',

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

      // Home
      museumTitle: 'Radio Museum',
      museumSubtitle: 'A journey into the world of classic radio and sound',
      viewGallery: '🎙️ View gallery',
      adminPanel: '⚙️ Admin panel',
      aboutMuseum: 'About museum',
      aboutText: 'Welcome to our museum! Here you will find a huge collection of vintage radio receivers and learn about the history of radio technology development.',

      // Gallery
      galleryTitle: '🎙️ Radio gallery',
      noRadios: 'No radios in catalog yet',
      details: 'Details',

      // Admin
      adminTitle: '⚙️ Admin panel',
      addNewRadio: 'Add new radio',
      radioName: 'Name',
      year: 'Year',
      description: 'Description',
      photoUrl: 'Photo URL',
      specs: 'Technical specs',
      addButton: '➕ Add radio',
      radioList: 'Radio list',
      deleteConfirm: 'Delete this radio?',
      addSuccess: '✅ Radio added!',
      nameRequired: 'Please enter radio name',

      // Languages
      language: 'Language',
      italian: 'Italiano',
      english: 'English'
    }
  };

  // Сигнал для поточної мови
  private languageSignal = signal<Language>('it');
  
  // Публічний сигнал тільки для читання
  currentLanguage$ = this.languageSignal.asReadonly();

  // Сигнал для поточних перекладів (тепер можемо використати this.translations)
  private translationsSignal = signal<Translations>(this.translations.it);
  
  // Публічний сигнал тільки для читання
  translations$ = this.translationsSignal.asReadonly();

  constructor() {
    // Завантажуємо збережену мову при ініціалізації
    this.loadSavedLanguage();
  }

  /**
   * Встановлює поточну мову та оновлює переклади
   * @param lang - Мова для встановлення (uk, it, en)
   */
  setLanguage(lang: Language): void {
    // Оновлюємо сигнал мови
    this.languageSignal.set(lang);
    
    // Оновлюємо переклади відповідно до нової мови
    this.translationsSignal.set(this.translations[lang]);
    
    // Зберігаємо вибір мови в localStorage для наступного відвідування
    this.saveLanguageChoice(lang);
  }

  /**
   * Отримує поточну мову
   * @returns Поточна мова
   */
  getLanguage(): Language {
    return this.languageSignal();
  }

  /**
   * Отримує поточні переклади
   * @returns Об'єкт з усіма перекладами для поточної мови
   */
  getTranslations(): Translations {
    return this.translationsSignal();
  }

  /**
   * Отримує переклад для конкретного ключа
   * @param key - Ключ перекладу
   * @returns Текст перекладу
   */
  get(key: keyof Translations): string {
    return this.translationsSignal()[key];
  }

  /**
   * Зберігає вибір мови в localStorage
   * @param lang - Мова для збереження
   */
  private saveLanguageChoice(lang: Language): void {
    try {
      localStorage.setItem('preferredLanguage', lang);
    } catch (e) {
      console.warn('Cannot save language choice:', e);
    }
  }

  /**
   * Завантажує збережену мову з localStorage
   * Якщо мова не збережена, використовує мову браузера або українську за замовчуванням
   */
  private loadSavedLanguage(): void {
    try {
      // Спочатку намагаємося завантажити мову з localStorage
      const saved = localStorage.getItem('preferredLanguage');
      if (saved && (saved === 'it' || saved === 'en')) {
        this.setLanguage(saved as Language);
        return;
      }

      // Якщо не збережено, намагаємося визначити мову браузера
      const browserLang = navigator.language.substring(0, 2);
      if (browserLang === 'it') {
        this.setLanguage('it');
      } else if (browserLang === 'en') {
        this.setLanguage('en');
      } else {
        // За замовчуванням - українська
        this.setLanguage('it');
      }
    } catch (e) {
      // Якщо сталася помилка, встановлюємо українську за замовчуванням
      this.setLanguage('it');
    }
  }
}
