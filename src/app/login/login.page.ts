import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  fazerLogin() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      this.authService.login(email, senha).subscribe((user: User | null) => {
        if (user) {
          this.showAlert('Sucesso', 'Login bem-sucedido!').then(() => {
            this.router.navigate(['/tabs/tab1']);
          });
        } else {
          this.showAlert('Erro', 'Credenciais inválidas.');
        }
      });
    } else {
      this.showAlert('Atenção', 'Preencha o formulário.');
      this.loginForm.markAllAsTouched();
    }
  }
  
  get e() { return this.loginForm.get('email'); }
  get s() { return this.loginForm.get('senha'); }
}