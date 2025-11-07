import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para standalone components
import { Router } from '@angular/router'; // <<-- ESSENCIAL: Importe o Router
import { addIcons } from 'ionicons';
import { restaurantOutline } from 'ionicons/icons'; // Ícone usado no botão

// Importe APENAS os componentes Ionic que o home.page.html usa
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonIcon, 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true, // Adicionando standalone: true, padrão em projetos modernos
  imports: [
    CommonModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonIcon, 
    // Removidos os imports IonListHeader e outros que geravam warnings
  ],
})
export class HomePage {

  constructor(
    private router: Router // <<-- CORRIGIDO: Injeção de dependência no constructor
  ) {
    addIcons({ restaurantOutline });
  }

  /**
   * FUNÇÃO PARA NAVEGAR PARA A PÁGINA API
   * Usa a rota configurada como 'api'
   */
  goToApi() {
    this.router.navigate(['/api']); 
  }
}