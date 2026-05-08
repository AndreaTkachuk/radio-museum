import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

/**
 * Інтерфейс для об'єкту радіоприймача
 * Містить основну інформацію про радіо та його технічні характеристики
 */
export interface Radio {
  id: string;           // Унікальний ідентифікатор
  name: string;         // Назва моделі
  year: number;         // Рік випуску
  description: string;  // Опис радіо
  image: string;        // Посилання на фото
  specs?: string;       // Технічні характеристики (необов'язково)
}

/**
 * Сервіс для управління радіоприймачами
 * Використовує IndexDB для постійного зберігання даних у браузері
 */
@Injectable({
  providedIn: 'root'
})
export class RadioService {
  // Сигнал для реактивного управління списком радіо
  private radiosSignal = signal<Radio[]>([]);
  
  // Публічний сигнал тільки для читання
  radios$ = this.radiosSignal.asReadonly();

  // Налаштування для IndexDB
  private dbName = 'RadioMuseumDB';      // Назва бази даних
  private storeName = 'radios';          // Назва об'єктового сховища
  private dbVersion = 1;                 // Версія бази даних

  constructor() {
    // Ініціалізуємо базу даних та завантажуємо дані при запуску
    this.initializeDatabase();
  }

  /**
   * Ініціалізує IndexDB та завантажує дані
   * Створює базу даних та сховище, якщо вони не існують
   */
  private initializeDatabase(): void {
    // Отримуємо IndexDB (з підтримкою браузерів, які мають webkit префікс)
    const indexedDB = window.indexedDB || (window as any).webkitIndexedDB;
    
    // Якщо IndexDB недоступна, виводимо попередження
    if (!indexedDB) {
      console.warn('IndexDB не підтримується вашим браузером');
      // Завантажуємо дані за замовчуванням
      this.loadDefaultRadios();
      return;
    }

    // Відкриваємо або створюємо базу даних
    const request = indexedDB.open(this.dbName, this.dbVersion);

    // Виконується при оновленні версії бази даних
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      
      // Створюємо сховище, якщо його ще немає
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: 'id' });
      }
    };

    // Виконується, якщо база даних успішно відкрита
    request.onsuccess = () => {
      this.loadFromIndexDB();
    };

    // Обробка помилок при роботі з базою даних
    request.onerror = () => {
      console.error('Помилка при ініціалізації IndexDB, завантажую дані за замовчуванням');
      this.loadDefaultRadios();
    };
  }

  /**
   * Отримує всі радіо з сигналу
   * @returns Масив усіх радіоприймачів
   */
  getRadios(): Radio[] {
    return this.radiosSignal();
  }

  /**
   * Отримує конкретне радіо за його ID
   * @param id - Унікальний ідентифікатор радіо
   * @returns Радіо або undefined, якщо не знайдено
   */
  getRadioById(id: string): Radio | undefined {
    return this.radiosSignal().find(r => r.id === id);
  }

  /**
   * Додає нове радіо в базу даних та IndexDB
   * @param radio - Об'єкт радіо без ID (ID генерується автоматично)
   */
  addRadio(radio: Omit<Radio, 'id'>): void {
    // Генеруємо унікальний ID на основі поточного часу
    const newRadio: Radio = {
      ...radio,
      id: Date.now().toString()
    };
    
    // Оновлюємо реактивний сигнал (для миттєвого оновлення UI)
    this.radiosSignal.update(radios => [...radios, newRadio]);
    
    // Зберігаємо нове радіо в IndexDB (для постійного збереження)
    this.saveToIndexDB(newRadio);
  }

  /**
   * Оновлює існуюче радіо за його ID
   * @param id - ID радіо для оновлення
   * @param radio - Частково об'єкт радіо з новими даними
   */
  updateRadio(id: string, radio: Partial<Radio>): void {
    // Оновлюємо сигнал (знаходимо радіо та об'єднуємо нові дані)
    this.radiosSignal.update(radios =>
      radios.map(r => r.id === id ? { ...r, ...radio } : r)
    );
    
    // Отримуємо оновлене радіо та зберігаємо його в IndexDB
    const updated = this.getRadioById(id);
    if (updated) {
      this.saveToIndexDB(updated);
    }
  }

  /**
   * Видаляє радіо за його ID
   * @param id - ID радіо для видалення
   */
  deleteRadio(id: string): void {
    // Видаляємо із сигналу (з UI)
    this.radiosSignal.update(radios => radios.filter(r => r.id !== id));
    
    // Видаляємо з IndexDB (з постійного збереження)
    this.deleteFromIndexDB(id);
  }

  /**
   * Зберігає одне радіо в IndexDB
   * Якщо радіо з таким ID вже існує, воно буде оновлено
   * @param radio - Об'єкт радіо для збереження
   */
  private saveToIndexDB(radio: Radio): void {
    const indexedDB = window.indexedDB || (window as any).webkitIndexedDB;
    
    if (!indexedDB) return; // Якщо IndexDB недоступна, виходимо

    const request = indexedDB.open(this.dbName, this.dbVersion);

    // Коли база успішно відкрита
    request.onsuccess = () => {
      const db = request.result;
      // Відкриваємо транзакцію з правом писати в сховище
      const transaction = db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      
      // Додаємо або оновлюємо запис (put замінює старий запис, якщо він існує)
      objectStore.put(radio);
    };
  }

  /**
   * Завантажує всі дані з IndexDB
   * Якщо база порожня, завантажує дані за замовчуванням
   */
  private loadFromIndexDB(): void {
    const indexedDB = window.indexedDB || (window as any).webkitIndexedDB;
    
    if (!indexedDB) {
      this.loadDefaultRadios();
      return;
    }

    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onsuccess = () => {
      const db = request.result;
      // Відкриваємо транзакцію тільки для читання
      const transaction = db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const getAllRequest = objectStore.getAll(); // Отримуємо всі записи

      getAllRequest.onsuccess = () => {
        const radios = getAllRequest.result;
        
        // Якщо база порожня, завантажуємо приклади за замовчуванням
        if (radios.length === 0) {
          this.loadDefaultRadios();
        } else {
          // Інакше встановлюємо завантажені дані в сигнал
          this.radiosSignal.set(radios);
        }
      };
    };

    request.onerror = () => {
      console.error('Помилка при завантаженні даних з IndexDB');
      this.loadDefaultRadios();
    };
  }

  /**
   * Видаляє радіо з IndexDB за його ID
   * @param id - ID радіо для видалення
   */
  private deleteFromIndexDB(id: string): void {
    const indexedDB = window.indexedDB || (window as any).webkitIndexedDB;
    
    if (!indexedDB) return;

    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      
      // Видаляємо запис за ID
      objectStore.delete(id);
    };
  }

  /**
   * Завантажує дані за замовчуванням (приклади радіо)
   * Виконується при першому завантаженні або якщо IndexDB порожня
   */
  private loadDefaultRadios(): void {
    const defaultRadios: Radio[] = [
      {
        id: '1',
        name: 'Старий приймач 1960s',
        year: 1960,
        description: 'Класичний радіоприймач з дерева',
        image: 'https://via.placeholder.com/300x200?text=Radio+1960s',
        specs: 'AM/FM, 5W'
      },
      {
        id: '2',
        name: 'Портативний радіо 1980s',
        year: 1980,
        description: 'Портативний приймач з батарейками',
        image: 'https://via.placeholder.com/300x200?text=Radio+1980s',
        specs: 'FM, 3W'
      }
    ];

    // Додаємо кожне радіо в IndexDB для постійного збереження
    defaultRadios.forEach(radio => this.saveToIndexDB(radio));
    
    // Оновлюємо сигнал щоб показати дані на сторінці
    this.radiosSignal.set(defaultRadios);
  }
}
