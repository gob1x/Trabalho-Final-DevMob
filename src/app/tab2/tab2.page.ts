import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TarefasService } from '../services/tarefas.service';
import { Tarefa } from '../models/tarefa.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab2Page implements OnInit {
  tarefasConcluidas: Tarefa[] = [];
  sub!: Subscription;

  constructor(
    private tarefasService: TarefasService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.tarefasService.getTarefasObservable().subscribe(lista => {
      this.tarefasConcluidas = lista.filter(t => t.concluida);
      this.cdr.detectChanges();
    });
  }

  editar(id: number) {
    this.router.navigate(['/form', id]);
  }
}