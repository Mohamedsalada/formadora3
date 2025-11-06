import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Dieta {
  id?: string;
  titulo: string;
  descricao?: string;
  data?: any;
}

@Component({
  selector: 'app-dieta',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './dieta.page.html',
  styleUrls: ['./dieta.page.scss']
})
export class DietaPage implements OnInit {

  // Lista de dietas observável
  dietas$!: Observable<Dieta[]>;

  // Formulário com tipagem corrigida
  form = this.fb.group({
    id: this.fb.control<string | null>(null),
    titulo: this.fb.control<string>('', [Validators.required, Validators.minLength(2)]),
    descricao: this.fb.control<string>('')
  });

  saving = false;
  editMode = false;

  private collectionPath = 'dietas'; // nome da coleção no Firestore

  constructor(private fb: FormBuilder, private firestore: Firestore) {}

  ngOnInit() {
    // Carrega os dados da coleção "dietas"
    const col = collection(this.firestore, this.collectionPath);
    this.dietas$ = collectionData(col, { idField: 'id' }) as Observable<Dieta[]>;
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
        // Atualizar dieta existente
        const ref = doc(this.firestore, `${this.collectionPath}/${val.id}`);
        await updateDoc(ref, {
          titulo: val.titulo,
          descricao: val.descricao,
          data: new Date().toISOString()
        });
      } else {
        // Criar nova dieta
        await addDoc(col, {
          titulo: val.titulo,
          descricao: val.descricao,
          data: new Date().toISOString()
        });
      }
      this.resetForm();
    } catch (e) {
      console.error('Erro ao salvar dieta:', e);
      alert('Erro ao salvar dieta. Veja o console.');
    } finally {
      this.saving = false;
    }
  }

  // Editar uma dieta existente
  editar(d: Dieta) {
    this.editMode = true;
    this.form.patchValue({
      id: d.id ?? null,
      titulo: d.titulo,
      descricao: d.descricao ?? ''
    });
  }

  // Excluir uma dieta
  async apagar(d: Dieta) {
    const ok = confirm(`Deseja excluir "${d.titulo}"?`);
    if (!ok) return;
    try {
      const ref = doc(this.firestore, `${this.collectionPath}/${d.id}`);
      await deleteDoc(ref);
    } catch (e) {
      console.error('Erro ao deletar dieta:', e);
      alert('Erro ao deletar dieta. Veja o console.');
    }
  }

  // Cancelar modo de edição
  cancelarEdicao() {
    this.resetForm();
  }

  // Limpar formulário e sair do modo de edição
  private resetForm() {
    this.form.reset({ id: null, titulo: '', descricao: '' });
    this.editMode = false;
  }
}
