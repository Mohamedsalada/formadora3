import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// 🔹 Firebase Imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

// 🔹 Import do environment (com firebaseConfig)
import { environment } from './environments/environment';

// 🔹 Modo de produção
if (environment.production) {
  enableProdMode();
}

// 🔹 Bootstrap principal unificado
bootstrapApplication(AppComponent, {
  providers: [
    // Estratégia de rotas do Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // Ionic
    provideIonicAngular(),

    // Router com pré-carregamento de módulos
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Módulos HTTP
    importProvidersFrom(HttpClientModule),

    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics()),

    // Serviços adicionais do Firebase Analytics
    ScreenTrackingService,
    UserTrackingService,
  ],
});
