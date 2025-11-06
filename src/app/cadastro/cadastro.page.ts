import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonText } from '@ionic/angular/standalone';

// Importes do Firebase
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonText,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class CadastroPage {
  private auth = inject(Auth);
  private router = inject(Router);
  error = '';

  async register(email: string, password: string, confirm: string) {
    this.error = '';

    if (!email || !password) {
      this.error = 'Preencha email e senha.';
      return;
    }

    if (password.length < 8) {
      this.error = 'A senha precisa de pelo menos 8 caracteres.';
      return;
    }

    if (password !== confirm) {
      this.error = 'As senhas não conferem.';
      return;
    }

    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      await this.router.navigateByUrl('/home'); // Redireciona após cadastrar
    } catch (e: any) {
      console.error(e);
      this.error = e?.code ?? 'Falha ao cadastrar';
    }
  }
}
