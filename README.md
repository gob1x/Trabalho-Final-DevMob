App de Gestão de Tarefas (Ionic + Angular)

Este projeto é um aplicativo móvel desenvolvido para a disciplina de Desenvolvimento Mobile. O objetivo foi criar uma aplicação completa com autenticação, navegação e um CRUD (Create, Read, Update, Delete) de tarefas, utilizando a arquitetura moderna de Standalone Components do Angular com Ionic.

Funcionalidades:

Autenticação Simples: Tela de login com validação de campos (E-mail e Senha).

CRUD de Tarefas:

Criar: Adicionar novas tarefas com título e descrição.

Ler: Visualização separada de tarefas Pendentes e Concluídas.

Atualizar: Edição de tarefas existentes.

Excluir: Remoção de tarefas (com confirmação de segurança).

Navegação por Abas (Tabs): Menu inferior para alternar facilmente entre listas.

Persistência de Dados: As tarefas são salvas no localStorage do navegador, mantendo os dados mesmo após atualizar a página.

Interface Moderna: Botão de ação flutuante (FAB) estendido e feedback visual com Alertas.

Tecnologias Utilizadas

Framework: Ionic 7+

Lógica: Angular 17+ (Standalone Components)

Estilização: SCSS (Sass)

Linguagem: TypeScript

Como Executar o Projeto:

Para rodar este projeto localmente, siga os passos abaixo:

Pré-requisitos

Certifique-se de ter o Node.js e o Ionic CLI instalados.

npm install -g @ionic/cli


Passo a Passo:

Clone o repositório:

git clone [https://github.com/gob1x/Trabalho-Final-DevMob.git](https://github.com/gob1x/Trabalho-Final-DevMob.git)
cd Trabalho-Final-DevMob


Instale as dependências:

npm install


Execute o servidor de desenvolvimento:

ionic serve


Acesse no navegador:
O aplicativo abrirá automaticamente em http://localhost:8100/.

Credenciais de Acesso (Teste)

Para acessar o aplicativo, utilize os seguintes dados na tela de login:

E-mail: 209826@upf.br

Senha: 123456

Estrutura do Projeto

src/app/login: Página de autenticação.

src/app/tabs: Layout principal com menu inferior.

tab1: Lista de Tarefas Pendentes.

tab2: Lista de Tarefas Concluídas.

src/app/pages/tarefa-form: Formulário para criar e editar tarefas.

src/app/services: Lógica de negócios (AuthService e TarefasService).

src/app/models: Definições de tipos (Interfaces TypeScript).


Desenvolvido por: Felipe Gobi
