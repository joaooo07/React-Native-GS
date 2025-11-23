# 📱 CareerLens — React Native + Expo + TypeScript

Aplicativo desenvolvido para a disciplina de Desenvolvimento Mobile, com foco em **gestão de currículos**, **análise de compatibilidade com vagas** e **personalização de experiência**.  
O projeto utiliza **Expo**, **React Native**, **TypeScript**, **React Navigation**, **Axios** e integra com uma **API Java Spring Boot** (autenticação via JWT).

---

## ✨ Funcionalidades principais

### ✅ **1. Autenticação (Login, Signup, Logout)**
- Login via JWT  
- Cadastro de novos usuários  
- Persistência automática do token  
- Rotas protegidas após login  
- Logout com limpeza de sessão  

### ✅ **2. CRUD completo de Currículos**
- Listagem de currículos por usuário  
- Criação de currículo  
- Edição de currículo  
- Remoção de currículo  
- Integração via API Java (Axios)  

### ✅ **3. Tela de Análise de Compatibilidade (IA)**
- Seleção de currículo  
- Preenchimento da vaga  
- Envio para endpoint de IA  
- Exibição de:
  - Pontuação  
  - Barra animada  
  - Gráfico circular  
  - Lista de recomendações (skills e cursos)  

### ✅ **4. Tema Dinâmico + Personalização**
Tela **PersonalizeScreen** permite ajustar:
- Light Mode / Dark Mode  
- Cor primária  
- Estilo dos cards  
- Fonte global  
- Animações  

### ✅ **5. Tela Perfil (Avatar + Logout)**
- Exibe dados do usuário  
- Upload de foto via **ImagePicker**  
- Botão de logout  
- Layout moderno  

### ✅ **6. Tela Sobre o App**
- Nome e versão  
- Repositório GitHub  
- Desenvolvedores (com foto circular)  
- Descrição da disciplina  

---

## 🧭 Navegação

Utilizamos **React Navigation v6+**, com estrutura:

AuthStack
└── Login
└── Signup

AppTabs
├── Home
├── ResumesList
├── Compatibility
├── Profile
└── Personalize

Extra Screens
├── ResumeForm
├── AnalysisResult
└── About


---

## 🗂 Estrutura de Pastas

```plaintext
src/
  components/
    Layout/
      ScreenContainer.tsx
    UI/
      PrimaryButton.tsx
  contexts/
    AuthContext.tsx
    ThemeContext.tsx
  navigation/
    AuthStack.tsx
    AppTabs.tsx
    RootNavigation.tsx
  screens/
    Auth/
      LoginScreen.tsx
      SignupScreen.tsx
    Home/
      HomeScreen.tsx
    Profile/
      ProfileScreen.tsx
    Resumes/
      ResumesListScreen.tsx
      ResumeFormScreen.tsx
    Compatibility/
      CompatibilityScreen.tsx
      AnalysisResultScreen.tsx
    About/
      AboutScreen.tsx
    Personalize/
      PersonalizeScreen.tsx
  services/
    api.ts
    authService.ts
    resumeService.ts
    analysisService.ts
  styles/
    theme.ts
  utils/
    validators.ts
```

--- 
## Integração com API Java

Toda chamada HTTP passa por api.ts (Axios configurado com baseURL).

Exemplo:
const response = await api.get('/resumes', {
  headers: { Authorization: `Bearer ${token}` },
});

---
## 🎨 UI / Estilização

Tema dinâmico global

Dark Mode real

Cores modernas

Componentes reutilizáveis

Layout responsivo

Cards customizáveis

Animações opcionais

## 🧪 Fluxo de Teste Completo (para gravação do vídeo)

Criar usuário pelo Signup

Fazer Login

Criar currículo

Editar currículo

Excluir currículo

Abrir tela de compatibilidade

Selecionar currículo

Preencher vaga e enviar

Ver resultados da análise

Abrir PersonalizeScreen e trocar tema

Abrir Perfil e alterar avatar

Abrir Sobre o App

Logout

## 🧰 Como rodar o projeto
1. Instalar dependências
npm install

2. Rodar o app
npx expo start


Use Expo Go ou emulador.

## 🚀 Publicação (Expo + Firebase App Distribution)

Build gerado via Expo EAS/Classic

Arquivo .apk disponibilizado no Firebase

Professor adicionados como testers

## 🧑‍💻 Desenvolvedores
João Pedro Motta	
Guilherme Cardoso
Hassan Chahine	
