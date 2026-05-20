import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  FirestoreRadioService
} from '../../core/services/firestore-radio.service';

import {
  LanguageService
} from '../../core/services/language.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AsyncPipe
  ],

  template: `
    <div class="min-h-screen bg-stone-100 py-16">

      <div class="container mx-auto px-4">

        <!-- HEADER -->

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">

          <div>

            <h1 class="text-5xl font-bold text-stone-900">
              {{ t.galleryTitle }}
            </h1>

            <p class="mt-3 text-stone-600 text-lg">
              {{ t.galleryDescription }}
            </p>
          </div>

          <a
            routerLink="/"
            class="inline-flex items-center justify-center px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl transition shadow-lg"
          >
            {{ t.backToHome }}
          </a>
        </div>

        <!-- GRID -->

        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          @for (radio of (radios$ | async); track radio.id) {

            <div
              class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-stone-200"
            >

              <!-- IMAGE -->

              <div class="relative overflow-hidden">

                <img
                  [src]="radio.image"
                  [alt]="radio.name"
                  class="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                >

                <div
                  class="absolute top-4 left-4 bg-amber-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg"
                >
                  {{ radio.year }}
                </div>
              </div>

              <!-- CONTENT -->

              <div class="p-7">

                <h2 class="text-2xl font-bold text-stone-900">
                  {{ radio.name }}
                </h2>

                <p class="mt-4 text-stone-600 leading-relaxed">
                  {{ radio.description }}
                </p>

                @if (radio.specs) {

                  <div
                    class="mt-5 inline-flex items-center gap-2 bg-stone-100 text-stone-700 px-4 py-2 rounded-xl text-sm"
                  >
                    📻 {{ radio.specs }}
                  </div>
                }

                <button
                  class="mt-8 w-full bg-amber-700 hover:bg-amber-600 text-white py-4 rounded-2xl font-semibold transition shadow-lg"
                >
                  {{ t.details }}
                </button>
              </div>
            </div>
          }
        </div>

        <!-- EMPTY STATE -->

        @if ((radios$ | async)?.length === 0) {

          <div class="text-center py-32">

            <div class="text-8xl mb-6">
              📻
            </div>

            <h2 class="text-3xl font-bold text-stone-800">
              {{ t.noRadios }}
            </h2>

            <p class="mt-4 text-stone-500">
              {{ t.emptyCollection }}
            </p>
          </div>
        }
      </div>
    </div>
  `,

  styles: []
})
export class GalleryComponent {

  private radioService = inject(FirestoreRadioService);

  private langService = inject(LanguageService);

  radios$ = this.radioService.radios$;

  protected get t() {
    return this.langService.getTranslations();
  }
}