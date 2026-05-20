import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from './core/services/language.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Main application component
 * Contains navigation, routing, and language selector
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Inject language service for managing languages
  protected langService = inject(LanguageService);
  protected router = inject(Router);
  
  protected adminLoading = signal(false);
  mobileMenuOpen = false;

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url === '/admin') {
        this.adminLoading.set(true);
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.adminLoading.set(false);
      }
    });
  }

  protected get t() {
    return this.langService.getTranslations();
  }

  /**
   * Changes the current application language
   * @param lang - Language to set (it, en)
   */
  changeLanguage(lang: Language): void {
    this.langService.setLanguage(lang);
  }

  /**
   * Gets the current language
   * @returns Current language code
   */
  getCurrentLanguage(): Language {
    return this.langService.getLanguage();
  }
}
