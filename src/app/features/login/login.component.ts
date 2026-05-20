import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-stone-950 flex items-center justify-center p-6">

      <div class="bg-stone-900 border border-stone-800 rounded-3xl p-10 w-full max-w-md shadow-2xl">

        <h1 class="text-4xl font-bold text-amber-200 text-center mb-8">
          {{ t.loginTitle }}
        </h1>

        <form
          (ngSubmit)="login()"
          class="space-y-6"
        >

          <input
            [(ngModel)]="email"
            name="email"
            type="email"
            placeholder="{{ t.email }}"
            [disabled]="loginLoading"
            class="w-full px-5 py-4 rounded-xl bg-stone-800 text-white border border-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
          >

          <input
            [(ngModel)]="password"
            name="password"
            type="password"
            placeholder="{{ t.password }}"
            [disabled]="loginLoading"
            class="w-full px-5 py-4 rounded-xl bg-stone-800 text-white border border-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
          >

          <button
            type="submit"
            [disabled]="!canSubmit"
            class="w-full bg-amber-700 hover:bg-amber-600 py-4 rounded-xl text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loginLoading ? t.signingIn : t.loginButton }}
          </button>

          @if (errorMessage) {
            <p class="text-red-400 text-sm text-center">
              {{ errorMessage }}
            </p>
          }
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  private langService = inject(LanguageService);

  email = '';
  password = '';
  loginLoading = false;

  errorMessage = '';

  protected get t() {
    return this.langService.getTranslations();
  }

  get canSubmit() {
    return !this.loginLoading && this.email.trim() !== '' && this.password.trim() !== '';
  }

  async login() {
    if (!this.canSubmit) {
      return;
    }

    try {
      this.loginLoading = true;
      this.errorMessage = '';

      await this.authService.login(
        this.email,
        this.password
      );

      await this.router.navigate(['/admin']);

    } catch (error) {
      this.errorMessage = this.t.invalidCredentials;
    } finally {
      this.loginLoading = false;
    }
  }
}