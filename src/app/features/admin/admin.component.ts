import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RadioService, Radio } from '../../core/services/radio.service';
import { LanguageService } from '../../core/services/language.service';

/**
 * Адмін-панель для управління радіоприймачами
 * Дозволяє додавати, редагувати та видаляти радіо
 */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <!-- Заголовок -->
        <h1 class="text-4xl font-bold mb-6">{{ t.adminTitle }}</h1>

        <!-- Кнопка повернення -->
        <div class="mb-6">
          <a routerLink="/" class="inline-block px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">
            {{ t.back }}
          </a>
        </div>

        <!-- Основний контейнер з двома колонками -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- ЛІВА КОЛОНКА: Форма додавання -->
          <div class="bg-gray-800 rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-6">{{ t.addNewRadio }}</h2>
            
            <!-- Форма для додавання нового радіо -->
            <form (ngSubmit)="addRadio()" class="space-y-4">
              <!-- Поле для назви радіо -->
              <div>
                <label class="block text-sm font-medium mb-2">{{ t.radioName }}</label>
                <input 
                  [(ngModel)]="form.name" 
                  name="name"
                  type="text" 
                  class="w-full px-4 py-2 bg-gray-700 rounded text-white"
                  [placeholder]="t.radioName"
                >
              </div>

              <!-- Поле для року -->
              <div>
                <label class="block text-sm font-medium mb-2">{{ t.year }}</label>
                <input 
                  [(ngModel)]="form.year" 
                  name="year"
                  type="number" 
                  class="w-full px-4 py-2 bg-gray-700 rounded text-white"
                  placeholder="2024"
                >
              </div>

              <!-- Поле для опису -->
              <div>
                <label class="block text-sm font-medium mb-2">{{ t.description }}</label>
                <textarea 
                  [(ngModel)]="form.description" 
                  name="description"
                  rows="4"
                  class="w-full px-4 py-2 bg-gray-700 rounded text-white"
                  [placeholder]="t.description"
                ></textarea>
              </div>

              <!-- Поле для посилання на фото -->
              <div>
                <label class="block text-sm font-medium mb-2">{{ t.photoUrl }}</label>
                <input 
                  [(ngModel)]="form.image" 
                  name="image"
                  type="text" 
                  class="w-full px-4 py-2 bg-gray-700 rounded text-white"
                  [placeholder]="t.photoUrl"
                >
              </div>

              <!-- Поле для технічних характеристик -->
              <div>
                <label class="block text-sm font-medium mb-2">{{ t.specs }}</label>
                <input 
                  [(ngModel)]="form.specs" 
                  name="specs"
                  type="text" 
                  class="w-full px-4 py-2 bg-gray-700 rounded text-white"
                  [placeholder]="t.specs"
                >
              </div>

              <!-- Кнопка для додавання -->
              <button 
                type="submit"
                class="w-full px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded transition"
              >
                {{ t.addButton }}
              </button>
            </form>
          </div>

          <!-- ПРАВА КОЛОНКА: Список радіо -->
          <div class="bg-gray-800 rounded-lg p-6">
            <!-- Заголовок з кількістю -->
            <h2 class="text-2xl font-bold mb-6">
              {{ t.radioList }} ({{ radios.length }})
            </h2>
            
            <!-- Список радіо (з можливістю прокрутки) -->
            <div class="space-y-4 max-h-96 overflow-y-auto">
              @for (radio of radios; track radio.id) {
                <!-- Карточка радіо у списку -->
                <div class="bg-gray-700 p-4 rounded flex justify-between items-start">
                  <!-- Інформація про радіо -->
                  <div class="flex-1">
                    <h3 class="font-bold">{{ radio.name }}</h3>
                    <p class="text-sm text-gray-300">{{ radio.year }}</p>
                    <p class="text-xs text-gray-400 mt-1">{{ radio.description }}</p>
                  </div>
                  
                  <!-- Кнопка видалення -->
                  <button 
                    (click)="deleteRadio(radio.id)"
                    class="ml-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                    [title]="'Видалити ' + radio.name"
                  >
                    ❌
                  </button>
                </div>
              }
              
              <!-- Повідомлення коли список порожній -->
              @if (radios.length === 0) {
                <p class="text-gray-400 text-center py-8">{{ t.noRadios }}</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminComponent {
  // Впровадж сервісу для роботи з радіо
  private radioService = inject(RadioService);
  
  // Впровадж сервісу для роботи з мовами
  private langService = inject(LanguageService);
  
  // Список всіх радіо (оновлюється при змінах)
  radios: Radio[] = [];
  
  // Об'єкт форми для введення даних
  form = {
    name: '',
    year: new Date().getFullYear(),
    description: '',
    image: 'https://via.placeholder.com/300x200?text=Radio',
    specs: ''
  };

  // Отримуємо поточні переклади
  protected t = this.langService.getTranslations();

  constructor() {
    // Завантажуємо дані при створенні компонента
    this.loadRadios();
  }

  /**
   * Завантажує список всіх радіо з сервісу
   */
  loadRadios(): void {
    this.radios = this.radioService.getRadios();
  }

  /**
   * Додає нове радіо в базу даних
   * Перевіряє валідність даних перед додаванням
   */
  addRadio(): void {
    // Перевіряємо, чи введена назва
    if (!this.form.name.trim()) {
      alert(this.t.nameRequired);
      return;
    }

    // Додаємо радіо через сервіс (дані автоматично зберігаються в IndexDB)
    this.radioService.addRadio({
      name: this.form.name,
      year: this.form.year,
      description: this.form.description,
      image: this.form.image,
      specs: this.form.specs
    });

    // Очищуємо форму для наступного введення
    this.form = {
      name: '',
      year: new Date().getFullYear(),
      description: '',
      image: 'https://via.placeholder.com/300x200?text=Radio',
      specs: ''
    };

    // Оновлюємо список
    this.loadRadios();
    
    // Показуємо повідомлення про успіх
    alert(this.t.addSuccess);
  }

  /**
   * Видаляє радіо за його ID
   * Перед видаленням запитує підтвердження користувача
   * @param id - ID радіо для видалення
   */
  deleteRadio(id: string): void {
    // Запитуємо підтвердження
    if (confirm(this.t.deleteConfirm)) {
      // Видаляємо через сервіс (дані автоматично видаляються з IndexDB)
      this.radioService.deleteRadio(id);
      
      // Оновлюємо список
      this.loadRadios();
    }
  }
}
