import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RadioService } from '../../core/services/radio.service';
import { LanguageService } from '../../core/services/language.service';

/**
 * Компонент для відображення галереї радіо
 * Показує карточки з радіоприймачами та їхніми характеристиками
 */
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <!-- Заголовок сторінки -->
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-12">
          {{ t.galleryTitle }}
        </h1>

        <!-- Кнопка повернення на головну -->
        <div class="mb-6">
          <a routerLink="/" class="inline-block px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
            {{ t.backToHome }}
          </a>
        </div>

        <!-- Сітка карточок з радіо -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Цикл по всіх радіоприймачах -->
          @for (radio of radios(); track radio.id) {
            <!-- Карточка радіо -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <!-- Зображення радіо -->
              <img [src]="radio.image" [alt]="radio.name" class="w-full h-48 object-cover">
              
              <!-- Інформація про радіо -->
              <div class="p-6">
                <!-- Назва радіо -->
                <h2 class="text-xl font-bold text-gray-800">{{ radio.name }}</h2>
                
                <!-- Рік випуску -->
                <p class="text-amber-600 font-semibold">{{ radio.year }}</p>
                
                <!-- Опис радіо -->
                <p class="text-gray-600 mt-2">{{ radio.description }}</p>
                
                <!-- Технічні характеристики (якщо є) -->
                @if (radio.specs) {
                  <p class="text-sm text-gray-500 mt-2">📋 {{ radio.specs }}</p>
                }
                
                <!-- Кнопка для перегляду деталей -->
                <button class="mt-4 w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded transition">
                  {{ t.details }}
                </button>
              </div>
            </div>
          }
        </div>

        <!-- Повідомлення коли нема радіо -->
        @if (radios().length === 0) {
          <div class="text-center text-gray-500 mt-12">
            <p class="text-lg">{{ t.noRadios }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class GalleryComponent {
  // Впровадж сервісу радіо для отримання даних
  private radioService = inject(RadioService);
  
  // Впровадж сервісу мов для перекладів
  private langService = inject(LanguageService);
  
  // Отримуємо сигнал з радіо
  radios = this.radioService.radios$;
  
  // Отримуємо поточні переклади
  protected t = this.langService.getTranslations();
}
