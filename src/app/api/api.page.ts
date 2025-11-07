import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { addIcons } from 'ionicons';
// Ícones usados no HTML
import { add, restaurantOutline } from 'ionicons/icons'; 
import { Router } from '@angular/router';


import {
  // === TODOS OS IMPORTS DE COMPONENTES IONIC USADOS NO TEMPLATE ===
  IonHeader, 
  IonToolbar, 
  IonTitle,
  IonLabel,
  IonListHeader, 
  IonContent,
  IonSearchbar,
  IonChip,
  IonImg,
  IonButton,
  IonIcon, 
} from '@ionic/angular/standalone';

import { NutricaoService, ItemAlimento } from '../services/nutricao';

@Component({
  selector: 'app-api',
  templateUrl: 'api.page.html',
  styleUrls: ['api.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 

    // COMPONENTES IONIC USADOS NO TEMPLATE:
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonContent,
    IonSearchbar,
    IonChip,
    IonImg,
    IonButton,
    IonIcon, 
    IonListHeader,
  ],
})
export class ApiPage implements OnInit {

  public alimentos: ItemAlimento[] = [];
  public isLoading = false;
  public errorMessage: string | null = null;
  public termoBusca: string = '';

  constructor(
    private nutricaoService: NutricaoService,
    private router: Router // <<-- ESSENCIAL: Injeção do Router para navegação
  ) {
    // Adicionando os ícones usados
    addIcons({ add, restaurantOutline }); 
  }

  ngOnInit() {
    
  }

  /**
   * FUNÇÃO PARA NAVEGAR PARA A DIETA.
   * Chamada pelo botão (click)="goToDieta()"
   */
  goToDieta() {
    this.router.navigate(['/dieta']); 
  }

  carregarAlimentos(termo?: string) {
    if (termo !== undefined) {
      this.termoBusca = termo;
    }

    if (!this.termoBusca.trim()) {
      this.alimentos = [];
      this.errorMessage = null;
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.nutricaoService.buscarAlimentos(this.termoBusca)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (dados: ItemAlimento[]) => {
          this.alimentos = dados;

          if (dados.length === 0) {
            this.errorMessage = `Nenhum alimento encontrado para o termo "${this.termoBusca}".`;
          } else {
            this.errorMessage = null;
          }
        },
        error: (err: any) => {
          console.error('Erro de Rede/Servidor:', err);
          this.errorMessage = 'Falha crítica ao carregar dados da API. Verifique sua chave ou o console.';
          this.alimentos = [];
        }
      });
  }
}