import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // 1. Importamos o BehaviorSubject
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private STORAGE_KEY = 'minhas_tarefas_ionic';
  private tarefas: Tarefa[] = [];

  // 2. Criamos um "canal de notícias" que sempre tem o valor atual da lista
  private tarefasSubject = new BehaviorSubject<Tarefa[]>([]);

  constructor() {
    this.carregarDoStorage();
  }

  // 3. Método para a Tab1 se inscrever e ouvir mudanças
  getTarefasObservable() {
    return this.tarefasSubject.asObservable();
  }

  private carregarDoStorage() {
    const dados = localStorage.getItem(this.STORAGE_KEY);
    if (dados) {
      this.tarefas = JSON.parse(dados);
    } else {
      this.tarefas = [];
    }
    // Avisa os inscritos que carregou
    this.notificarMudanca();
  }

  private salvar() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tarefas));
    // Avisa os inscritos que salvou
    this.notificarMudanca();
  }

  private notificarMudanca() {
    // Envia uma CÓPIA da lista para quem estiver ouvindo
    this.tarefasSubject.next([...this.tarefas]);
  }

  getTarefas(): Tarefa[] {
    return [...this.tarefas];
  }

  getTarefa(id: number): Tarefa | undefined {
    return this.tarefas.find(t => t.id === id);
  }

  adicionar(tarefa: any) {
    const id = this.tarefas.length > 0 ? Math.max(...this.tarefas.map(t => t.id)) + 1 : 1;
    const novaTarefa: Tarefa = {
      id,
      ...tarefa,
      concluida: false,
      dataCriacao: new Date().toISOString()
    };
    this.tarefas.push(novaTarefa);
    this.salvar(); 
  }

  atualizar(tarefa: Tarefa) {
    const index = this.tarefas.findIndex(t => t.id === tarefa.id);
    if (index > -1) {
      this.tarefas[index] = tarefa;
      this.salvar();
    }
  }

  remover(id: number) {
    this.tarefas = this.tarefas.filter(t => t.id !== id);
    this.salvar();
  }
}