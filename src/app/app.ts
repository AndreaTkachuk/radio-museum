import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from './core/services/language.service';

/**
 * Головний компонент додатку
 * Містить навігацію, маршрутизацію та селектор мови
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Впровадж сервісу для роботи з мовами
  protected langService = inject(LanguageService);
  
  // Назва додатку (в реактивному сигналі)
  protected readonly title = signal('Radio Museum');

  /**
   * Змінює поточну мову додатку
   * @param lang - Мова для встановлення (uk, it, en)
   */
  changeLanguage(lang: Language): void {
    this.langService.setLanguage(lang);
  }

  /**
   * Отримує поточну мову
   * @returns Код поточної мови
   */
  getCurrentLanguage(): Language {
    return this.langService.getLanguage();
  }
}
