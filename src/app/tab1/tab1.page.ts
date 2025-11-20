import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TarefasService } from '../services/tarefas.service';
import { Tarefa } from '../models/tarefa.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class Tab1Page implements OnInit {
  tarefas: Tarefa[] = [];
  tarefaSubscription!: Subscription;

  constructor(
    private tarefasService: TarefasService,
    private router: Router,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.tarefaSubscription = this.tarefasService.getTarefasObservable().subscribe((listaAtualizada) => {
      // Filtra tarefas NÃO concluídas
      this.tarefas = listaAtualizada.filter(t => !t.concluida);
      this.cdr.detectChanges();
    });
  }

  criarNova() {
    this.router.navigate(['/form']);
  }

  editar(id: number) {
    this.router.navigate(['/form', id]);
  }

  async confirmarExclusao(id: number) {
    const alert = await this.alertController.create({
      header: 'Excluir',
      message: 'Apagar esta tarefa?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Excluir', 
          handler: () => {
            this.tarefasService.remover(id);
          }
        }
      ]
    });
    await alert.present();
  }
}