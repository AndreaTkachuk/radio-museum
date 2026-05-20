import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-stone-100 text-stone-900">

      <!-- HERO SECTION -->
      <section
        class="relative h-[80vh] flex items-center justify-center overflow-hidden"
      >
        <!-- Background image -->
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
          alt="Vintage radio"
          class="absolute inset-0 w-full h-full object-cover"
        />

        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-black/60"></div>

        <!-- Hero content -->
        <div class="relative z-10 text-center px-6 max-w-4xl">
          <div class="text-7xl mb-6"></div>

          <h1
            class="text-5xl md:text-7xl font-bold text-amber-100 tracking-wide"
          >
            {{ t.museumTitle }}
          </h1>

          <p
            class="mt-6 text-xl md:text-2xl text-amber-200 font-light leading-relaxed"
          >
            {{ t.museumSubtitle }}
          </p>

          <!-- Action buttons -->
          <div class="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <a
              routerLink="/gallery"
              class="bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-xl transition duration-300"
            >
              {{ t.viewGallery }}
            </a>

            <a
              routerLink="/contact"
              class="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-10 py-4 rounded-xl text-lg font-semibold transition duration-300"
            >
              {{ t.contact }}
            </a>
          </div>
        </div>
      </section>

      <!-- FEATURED SECTION -->
      <section class="container mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-stone-800">
            {{ t.featuredTitle }}
          </h2>

          <p class="mt-4 text-stone-600 text-lg max-w-2xl mx-auto">
            {{ t.featuredDescription }}
          </p>
        </div>

        <!-- Cards -->
        <div class="grid md:grid-cols-3 gap-8">

          <!-- Card 1 -->
          <div
            class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
          >
            <img
              src="images/main/putera-iskandar-a-khalid-unsplash.jpg"
              alt="Vintage radio"
              class="h-64 w-full object-cover"
            />

            <div class="p-6">
              <div class="text-sm text-amber-700 font-semibold">
                {{ t.card1Year }}
              </div>

              <h3 class="text-2xl font-bold mt-2 text-stone-800">
                {{ t.card1Title }}
              </h3>

              <p class="mt-4 text-stone-600 leading-relaxed">
                {{ t.card1Description }}
              </p>
            </div>
          </div>

          <!-- Card 2 -->
          <div
            class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
          >
            <img
              src="images/main/maximilian-hofer-unsplash.jpg"
              alt="Retro radio"
              class="h-64 w-full object-cover"
            />

            <div class="p-6">
              <div class="text-sm text-amber-700 font-semibold">
                {{ t.card2Year }}
              </div>

              <h3 class="text-2xl font-bold mt-2 text-stone-800">
                {{ t.card2Title }}
              </h3>

              <p class="mt-4 text-stone-600 leading-relaxed">
                {{ t.card2Description }}
              </p>
            </div>
          </div>

          <!-- Card 3 -->
          <div
            class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
          >
            <img
              src="images/main/niklas-bahe-unsplash.jpg"
              alt="Old radio"
              class="h-64 w-full object-cover"
            />

            <div class="p-6">
              <div class="text-sm text-amber-700 font-semibold">
                {{ t.card3Year }}
              </div>

              <h3 class="text-2xl font-bold mt-2 text-stone-800">
                {{ t.card3Title }}
              </h3>

              <p class="mt-4 text-stone-600 leading-relaxed">
                {{ t.card3Description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ABOUT SECTION -->
      <section class="bg-stone-900 text-stone-200 py-24">
        <div class="container mx-auto px-6 max-w-4xl text-center">
          <h2 class="text-4xl font-bold text-amber-200 mb-8">
            {{ t.aboutMuseum }}
          </h2>

          <p class="text-lg leading-9 text-stone-300">
            {{ t.aboutText }}
          </p>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  private langService = inject(LanguageService);

  protected get t() {
    return this.langService.getTranslations();
  }
}