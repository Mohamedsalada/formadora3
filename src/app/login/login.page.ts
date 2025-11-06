import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonText } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonText, CommonModule, RouterLink, FormsModule]
})
export class LoginPage {
  private auth = inject(Auth);
  private router = inject(Router);
  error = '';

  // 🔹 Login com email e senha
  async loginEmail(email: string, password: string) {
    this.error = '';

    if (!email || !password) {
      this.error = 'Preencha email e senha.';
      return;
    }

    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      await this.router.navigateByUrl('/home');
    } catch (e: any) {
      this.error = this.traduzErro(e.code);
    }
  }

  // 🔹 Login com Google
  async loginGoogle() {
    this.error = '';
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      await this.router.navigateByUrl('/home');
    } catch (e: any) {
      this.error = this.traduzErro(e.code);
    }
  }

  // 🔹 Função para traduzir mensagens de erro
  private traduzErro(code: string): string {
    switch (code) {
      case 'auth/invalid-email': return 'Email inválido.';
      case 'auth/user-not-found': return 'Usuário não encontrado.';
      case 'auth/wrong-password': return 'Senha incorreta.';
      case 'auth/popup-closed-by-user': return 'Login cancelado.';
      default: return 'Erro ao entrar. Tente novamente.';
    }
  }
}
