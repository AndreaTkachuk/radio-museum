import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CloudinaryService } from '../../core/services/cloudinary.service';

import {
  FirestoreRadioService,
  Radio
} from '../../core/services/firestore-radio.service';

import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AsyncPipe
  ],

  template: `
    <div class="min-h-screen bg-stone-950 text-stone-100 py-12">

      <div class="container mx-auto px-4">

        <div class="flex items-center justify-between mb-10">

          <div>
            <h1 class="text-4xl font-bold text-amber-200">
              {{ t.adminTitle }}
            </h1>

            <p class="text-stone-400 mt-2">
              {{ t.adminDescription }}
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button
              (click)="logout()"
              [disabled]="logoutLoading()"
              class="px-5 py-3 bg-red-700 hover:bg-red-600 disabled:opacity-50 rounded-xl transition"
            >
              {{ logoutLoading() ? t.signingOut : t.logout }}
            </button>

            <a
              routerLink="/"
              class="px-5 py-3 bg-stone-800 hover:bg-stone-700 rounded-xl transition"
            >
              {{ t.back }}
            </a>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">

          <!-- FORM -->

          <div class="bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl">

            <h2 class="text-2xl font-bold text-amber-100 mb-8">
              {{ t.addNewRadio }}
            </h2>

            <form
              (ngSubmit)="addRadio()"
              class="space-y-6"
            >

              <div>
                <label class="block text-sm mb-2 text-stone-300">
                  {{ t.radioName }}
                </label>

                <input
                  [(ngModel)]="form.name"
                  name="name"
                  type="text"
                  class="w-full px-5 py-4 rounded-2xl bg-stone-800 border border-stone-700 text-white"
                  [placeholder]="t.radioName"
                >
              </div>

              <div>
                <label class="block text-sm mb-2 text-stone-300">
                  {{ t.year }}
                </label>

                <input
                  [(ngModel)]="form.year"
                  name="year"
                  type="number"
                  class="w-full px-5 py-4 rounded-2xl bg-stone-800 border border-stone-700 text-white"
                  placeholder="1952"
                >
              </div>

              <div>
                <label class="block text-sm mb-2 text-stone-300">
                  {{ t.description }}
                </label>

                <textarea
                  [(ngModel)]="form.description"
                  name="description"
                  rows="5"
                  class="w-full px-5 py-4 rounded-2xl bg-stone-800 border border-stone-700 text-white"
                  [placeholder]="t.description"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm mb-2 text-stone-300">
                  {{ t.photoUrl }}
                </label>

                  <input
                    type="file"
                    accept="image/*"
                    (change)="onFileSelected($event)"
                    class="w-full px-5 py-4 rounded-2xl bg-stone-800 border border-stone-700 text-white"
                  >
              </div>

              <div>
                <label class="block text-sm mb-2 text-stone-300">
                  {{ t.specs }}
                </label>

                <input
                  [(ngModel)]="form.specs"
                  name="specs"
                  type="text"
                  class="w-full px-5 py-4 rounded-2xl bg-stone-800 border border-stone-700 text-white"
                  [placeholder]="t.specs"
                >
              </div>

              <button
                type="submit"
                class="w-full py-4 bg-amber-700 hover:bg-amber-600 rounded-2xl text-white font-semibold shadow-xl transition"
              >
                {{ t.addButton }}
              </button>
            </form>
          </div>

          <!-- RADIO LIST -->

          <div class="bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl">

            <div class="flex items-center justify-between mb-8">

              <h2 class="text-2xl font-bold text-amber-100">
                {{ t.radioList }}
              </h2>

              <div class="text-sm text-stone-400">
                {{ (radios$ | async)?.length || 0 }} {{ t.items }}
              </div>
            </div>

            <div class="space-y-4 max-h-[700px] overflow-y-auto pr-2">

              @for (radio of (radios$ | async); track radio.id) {

                <div class="bg-stone-800 border border-stone-700 rounded-2xl p-5 flex gap-4">

                  <img
                    [src]="radio.image"
                    [alt]="radio.name"
                    class="w-24 h-24 rounded-xl object-cover"
                  >

                  <div class="flex-1">

                    <div class="flex items-start justify-between gap-4">

                      <div>

                        <h3 class="text-xl font-bold text-white">
                          {{ radio.name }}
                        </h3>

                        <p class="text-amber-400 text-sm mt-1">
                          {{ radio.year }}
                        </p>
                      </div>

                      <button
                        (click)="deleteRadio(radio.id!)"
                        class="bg-red-700 hover:bg-red-600 px-3 py-2 rounded-xl transition"
                      >
                        ❌
                      </button>
                    </div>

                    <p class="text-stone-300 text-sm mt-4 leading-relaxed">
                      {{ radio.description }}
                    </p>

                    @if (radio.specs) {
                      <div class="mt-4 text-xs text-stone-400">
                        📻 {{ radio.specs }}
                      </div>
                    }
                  </div>
                </div>
              }

              @if ((radios$ | async)?.length === 0) {

                <div class="text-center py-20 text-stone-500">

                  <div class="text-6xl mb-4">
                    📻
                  </div>

                  <p>
                    {{ t.noRadios }}
                  </p>
                </div>
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
  private radioService = inject(FirestoreRadioService);
  private langService = inject(LanguageService);
  private authService = inject(AuthService);
  private router = inject(Router);

  radios$ = this.radioService.radios$;
  protected logoutLoading = signal(false);

  protected get t() {
    return this.langService.getTranslations();
  }
  private cloudinaryService = inject(CloudinaryService);
  selectedFile: File | null = null;


  form = {
    name: '',
    year: new Date().getFullYear(),
    description: '',
    image: 'images/radios/default.jpg',
    specs: ''
  };

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  async addRadio() {
    if (!this.form.name.trim()) {
      alert(this.t.nameRequired);
      return;
    }

    let imageUrl = '';
    if (this.selectedFile) {
      imageUrl = await this.cloudinaryService.uploadImage(
        this.selectedFile
      );
    }

    await this.radioService.addRadio({
      name: this.form.name,
      year: this.form.year,
      description: this.form.description,
      image: imageUrl,
      specs: this.form.specs
    });

    this.form = {
      name: '',
      year: new Date().getFullYear(),
      description: '',
      image: '',
      specs: ''
    };

    this.selectedFile = null;

    alert(this.t.addSuccess);
  }

  async deleteRadio(id: string) {
    if (confirm(this.t.deleteConfirm)) {
      await this.radioService.deleteRadio(id);
    }
  }

  async logout() {
    try {
      this.logoutLoading.set(true);
      await this.authService.logout();
      await this.router.navigate(['/login']);
    } finally {
      this.logoutLoading.set(false);
    }
  }
}