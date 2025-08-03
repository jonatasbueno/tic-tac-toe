# 🎮 Jogo da Velha - Desafio Frontend

✨ Bem-vindo ao projeto do Jogo da Velha! Este é um desafio de desenvolvimento frontend focado em React puro com JavaScript, boas práticas de arquitetura, gerenciamento de estado e acessibilidade.

## 🚀 Visão Geral

Este projeto implementa o clássico jogo da velha, onde o jogador pode desafiar um bot. O objetivo principal foi demonstrar proficiência em React, aplicando conceitos avançados e garantindo uma experiência de usuário fluida e acessível.

**Funcionalidades:**
*   **Modo Jogador vs. Bot:** Desafie um que utiliza o algoritmo Minimax para uma estratégia otimizada.
*   **Personalização do Jogador:** Altere o nome e a cor do seu marcador.
*   **Design Responsivo:** Jogue em qualquer dispositivo, do desktop ao mobile.
*   **Controle de Turno com Tempo:** O bot joga automaticamente se o jogador não fizer sua jogada em 5 segundos.
*   **Gerenciamento de Estado Global:** Utiliza `Context API` e `useReducer` para um controle de estado eficiente.
*   **Acessibilidade (A11y):** Implementação de atributos ARIA e semântica HTML para garantir que o jogo seja utilizável por todos.
*   **Sistema de Pontuação:** Acompanhe as vitórias do jogador e do bot.

## 📁 Estrutura do Projeto

A organização do código segue uma arquitetura modular e escalável, facilitando a manutenção e a adição de novas funcionalidades.

```
frontend/
├── public/                       # 🌐 Arquivos estáticos (favicon, etc.)
├── src/                          # 📦 Código-fonte principal da aplicação
│   ├── components/               # 🧩 Componentes de UI reutilizáveis
│   │   └── container/            # Componentes que contêm outros componentes
│   ├── hooks/                    # 🎣 Hooks customizados (lógica reutilizável)
│   ├── pages/                    # 📄 Componentes de página (rotas do React Router)
│   ├── providers/                # 🤝 Contextos e Provedores (gerenciamento de estado global)
│   ├── router/                   # 🛣️ Configuração de rotas (React Router)
│   ├── store/                    # 💾 Gerenciamento de estado global (Context API + useReducer)
│   ├── styles/                   # 🎨 Configuração do Tailwind, CSS global
│   ├── utils/                    # 🛠️ Funções utilitárias diversas
│   │   └── functions/            # Funções auxiliares
│   ├── App.jsx                   # ⚛️ Componente raiz da aplicação
│   └── main.jsx                  # 🚀 Ponto de entrada do Vite + ReactDOM
├── .env                          # 🔑 Variáveis de ambiente
├── package.json                  # 📋 Metadados do projeto e dependências
└── README.md                     # 📄 Este arquivo!
```

## 💡 Justificativas Técnicas

As escolhas técnicas foram feitas visando performance, manutenibilidade, escalabilidade e uma boa experiência de desenvolvimento.

*   **React (JavaScript Vanilla):** Utilizado para construir a interface do usuário com componentes funcionais e Hooks nativos (`useState`, `useEffect`, `useContext`), promovendo um código limpo e reativo.
*   **TailwindCSS:** Um framework CSS utilitário que permite estilizar rapidamente os componentes diretamente no JSX, resultando em um design responsivo e consistente.
*   **Context API + `useReducer`:** Para o gerenciamento de estado global, esta combinação oferece uma solução robusta e performática, centralizando a lógica de estado e evitando o "prop drilling".
*   **React Router:** Gerencia a navegação entre as diferentes telas do jogo (`/` para a tela inicial e `/game` para o tabuleiro), proporcionando uma experiência de SPA (Single Page Application).
*   **Algoritmo Minimax:** A inteligência do bot é baseada no algoritmo Minimax, garantindo que ele faça a melhor jogada possível ou, no mínimo, evite a derrota.
*   **Acessibilidade (ARIA):** Atributos ARIA e semântica HTML foram aplicados para tornar o jogo acessível a usuários com deficiência, garantindo compatibilidade com leitores de tela e navegação por teclado.
*   **Vitest:** Escolhido como o framework de testes devido à sua integração nativa com o Vite, oferecendo velocidade e uma experiência de desenvolvimento otimizada para testes unitários e de integração.

## 💻 Instruções de Execução

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/) (versão 22) e o [npm](https://www.npmjs.com/) instalados.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/jonatasbueno/tic-tac-toe
    cd tic-tac-toe
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Execução

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O aplicativo estará disponível em `http://localhost:5173` (ou outra porta disponível).

### Testes

O projeto utiliza o Vitest para testes. Você pode executar os testes com os seguintes comandos:

*   **Executar todos os testes:**
    ```bash
    npm test
    ```
*   **Executar testes em modo de observação (watch mode):**
    ```bash
    npm run test:watch
    ```
*   **Executar testes com interface de usuário (UI):**
    ```bash
    npm run test:ui
    ```
    A interface do Vitest UI estará disponível em `http://localhost:5173/__vitest__/` (ou outra porta).

*   **Executar testes e gerar relatório de cobertura:**
    ```bash
    npm run test:coverage
    ```
    O relatório de cobertura será gerado na pasta `coverage/`.