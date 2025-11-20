import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TarefasService } from '../../services/tarefas.service';
import { Tarefa } from '../../models/tarefa.model';

@Component({
  selector: 'app-tarefa-form',
  templateUrl: './tarefa-form.page.html',
  styleUrls: ['./tarefa-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class TarefaFormPage implements OnInit {
  formTarefa!: FormGroup;
  isEdicao = false;
  idTarefa: number | null = null;

  constructor(
    private fb: FormBuilder,
    private tarefasService: TarefasService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.formTarefa = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      concluida: [false]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdicao = true;
      this.idTarefa = Number(id);
      const tarefa = this.tarefasService.getTarefa(this.idTarefa);
      if (tarefa) {
        this.formTarefa.patchValue({
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          concluida: tarefa.concluida
        });
      }
    }
  }

  async excluir() {
    if (!this.idTarefa) return;
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      message: 'Deseja excluir esta tarefa?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Excluir', 
          role: 'destructive',
          handler: () => {
            this.tarefasService.remover(this.idTarefa!);
            this.router.navigate(['/tabs/tab1']);
          }
        }
      ]
    });
    await alert.present();
  }

  async salvar() {
    if (this.formTarefa.invalid) return;

    const dados = this.formTarefa.value;

    if (this.isEdicao && this.idTarefa) {
      const original = this.tarefasService.getTarefa(this.idTarefa);
      if (original) {
        this.tarefasService.atualizar({ ...original, ...dados });
      }
    } else {
      this.tarefasService.adicionar(dados);
    }

    const alert = await this.alertController.create({ header: 'Sucesso', message: 'Salvo!', buttons: ['OK'] });
    await alert.present();
    await alert.onDidDismiss();
    this.router.navigate(['/tabs/tab1']);
  }
}