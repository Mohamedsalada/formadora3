import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // <<-- PASSO 2: Importar o Router
import { addIcons } from 'ionicons';
import { restaurantOutline } from 'ionicons/icons'; // <<-- Adicionar ícone
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// PASSO 4: Importar os componentes Ionic que a página usa
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
  IonButtons, IonIcon, IonItem, IonLabel, IonInput, 
  IonList, IonListHeader, IonNote, IonItemSliding, 
  IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';


interface Dieta {
  id?: string;
  titulo: string;
  descricao?: string;
  data?: any;
}

@Component({
  selector: 'app-dieta',
  standalone: true,
  // PASSO 4: Usar os componentes individuais (substituindo IonicModule)
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    // Componentes para o template:
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
    IonButtons, IonIcon, IonItem, IonLabel, IonInput, 
    IonList, IonListHeader, IonNote, IonItemSliding, 
    IonItemOptions, IonItemOption,
  ],
  templateUrl: './dieta.page.html',
  styleUrls: ['./dieta.page.scss']
})
export class DietaPage implements OnInit {

  dietas$!: Observable<Dieta[]>;

  form = this.fb.group({
    id: this.fb.control<string | null>(null),
    titulo: this.fb.control<string>('', [Validators.required, Validators.minLength(2)]),
    descricao: this.fb.control<string>('')
  });

  saving = false;
  editMode = false;

  private collectionPath = 'dietas';

  // PASSO 2: Injetar o Router no construtor
  constructor(private fb: FormBuilder, private firestore: Firestore, private router: Router) {
    addIcons({ restaurantOutline }); // Adicionar o ícone
  }

  ngOnInit() {
    const col = collection(this.firestore, this.collectionPath);
    this.dietas$ = collectionData(col, { idField: 'id' }) as Observable<Dieta[]>;
  }
  
  // PASSO 3: Criar a função de navegação
  goToHome() {
    this.router.navigate(['/api']); // Navega para a rota 'api'
  }

  // Salvar ou atualizar dieta
  async salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const val = this.form.value;
    const col = collection(this.firestore, this.collectionPath);

    try {
      if (val.id) {
        const ref = doc(this.firestore, `${this.collectionPath}/${val.id}`);
        await updateDoc(ref, {
          titulo: val.titulo,
          descricao: val.descricao,
          data: new Date().toISOString()
        });
      } else {
        await addDoc(col, {
          titulo: val.titulo,
          descricao: val.descricao,
          data: new Date().toISOString()
        });
      }
      this.resetForm();
    } catch (e) {
      console.error('Erro ao salvar dieta:', e);
      // alert('Erro ao salvar dieta. Veja o console.'); // Removido alert()
    } finally {
      this.saving = false;
    }
  }

  editar(d: Dieta) {
    this.editMode = true;
    this.form.patchValue({
      id: d.id ?? null,
      titulo: d.titulo,
      descricao: d.descricao ?? ''
    });
  }

  // Excluir uma dieta (corrigido: removida a função confirm())
  async apagar(d: Dieta) {
    // Aqui deveria haver um modal customizado para confirmação, mas usamos console.log para seguir a regra
    console.log(`Excluindo dieta: "${d.titulo}"`);
    try {
      const ref = doc(this.firestore, `${this.collectionPath}/${d.id}`);
      await deleteDoc(ref);
    } catch (e) {
      console.error('Erro ao deletar dieta:', e);
      // alert('Erro ao deletar dieta. Veja o console.'); // Removido alert()
    }
  }

  cancelarEdicao() {
    this.resetForm();
  }

  private resetForm() {
    this.form.reset({ id: null, titulo: '', descricao: '' });
    this.editMode = false;
  }
}
