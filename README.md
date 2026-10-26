# 🌸 MoodBloom — Diário de Humor

Um espaço digital para acolher cada fase, registrar sentimentos e acompanhar o próprio bem-estar ao longo do tempo. 💜

## ✨ Sobre o projeto

O **MoodBloom** é meu primeiro projeto de portfólio na área de tecnologia. Desenvolvi a aplicação com uma interface delicada e intuitiva, pensada para tornar o registro diário de humor uma experiência simples e acolhedora.

O projeto faz parte da minha jornada de aprendizado em programação, unindo desenvolvimento web, Python, JavaScript e organização de dados.

## 🌷 Funcionalidades

- 😊 Registro de humor com nove opções de sentimentos.
- 📝 Campo para adicionar anotações pessoais, sem preenchimento obrigatório.
- 📚 Histórico dos registros realizados.
- 📅 Consulta dos registros por mês.
- 📊 Resumo mensal com visualização gráfica dos humores.
- 💾 Armazenamento persistente dos registros em banco de dados SQLite.
- 🔌 API para consultar e salvar registros.
- 🎨 Interface com cores pastel, tons de rosa e lilás.

## 🛠️ Tecnologias utilizadas

- **Python** — linguagem utilizada no backend.
- **Flask** — framework web para servir a aplicação e disponibilizar a API.
- **SQLite** — banco de dados para armazenar os registros de humor.
- **HTML5** — estrutura da página.
- **CSS3** — estilos e identidade visual.
- **JavaScript** — interatividade, comunicação com a API e atualização do histórico e do gráfico.

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/smarttag-digital/MoodBloom.git
```

### 2. Acesse a pasta do projeto

```bash
cd MoodBloom
```

### 3. Crie um ambiente virtual

```bash
python -m venv .venv
```

### 4. Ative o ambiente virtual

No Windows, usando o Prompt de Comando (CMD):

```cmd
.venv\Scripts\activate.bat
```

### 5. Instale as dependências

```bash
python -m pip install -r requirements.txt
```

### 6. Execute a aplicação

```bash
python app.py
```

### 7. Abra no navegador

Acesse: http://127.0.0.1:5000/

Para encerrar o servidor, pressione `Ctrl + C` no terminal.

## 📌 Armazenamento dos dados

O MoodBloom utiliza o banco de dados SQLite para armazenar os registros de humor. O banco é criado automaticamente na pasta `instance/` quando a aplicação é iniciada.

Os registros permanecem salvos no banco local entre as execuções da aplicação. O arquivo do banco de dados local não é enviado ao GitHub.

## 🔗 API

- `GET /api/registros` — consulta os registros armazenados.
- `POST /api/registros` — valida e salva um novo registro de humor.

## 🎯 Objetivos de aprendizado

- Praticar lógica de programação com JavaScript.
- Desenvolver uma aplicação web com Flask.
- Criar e utilizar uma API para comunicação entre frontend e backend.
- Aprender a armazenar e consultar dados com SQLite.
- Trabalhar com manipulação de elementos HTML.
- Organizar arquivos e pastas de um projeto.
- Aprender a documentar e versionar código com Git e GitHub.

## 👩🏻‍💻 Desenvolvido por

**Letícia | Tech, IA & SmartTag**

Projeto de aprendizado e evolução contínua em desenvolvimento web.

---

🌸 *Cada sentimento tem seu espaço. Cada dia é uma nova oportunidade de florescer.*
