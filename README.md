# 👗 Elegance Shop - Tutorial Completo de React

Um projeto prático e progressivo para aprender React do zero ao deploy, construindo uma loja virtual moderna e responsiva.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ETAPA 8 - Deploy no GitHub Pages

🎯 Objetivos desta etapa

- Entender o problema do prop drilling
- Aprender a usar Context API para estado global
- Criar um Custom Hook (useCart)
- Implementar persistência com localStorage
- Criar o CartDrawer (carrinho lateral)
- Criar o componente Toast para feedback

---

### Desenvolvimento vs Produção

Quando você roda npm run dev, está no modo de desenvolvimento:

- Servidor local (localhost)
- Hot reload (atualiza ao salvar)
- Mensagens de erro detalhadas
- Código não otimizado
- Só você consegue acessar

Para colocar online, precisamos do modo de produção:

- Código minificado (menor tamanho)
- Otimizado para performance
- Sem ferramentas de debug
- Pronto para hospedar em qualquer servidor

O comando npm run build gera a versão de produção na pasta dist/.

### O que é GitHub Pages?

GitHub Pages é um serviço gratuito do GitHub que hospeda sites estáticos diretamente do seu repositório.

#### Vantagens:

- Gratuito
- HTTPS automático
- Fácil de configurar
- URL amigável: seuusuario.github.io/nome-do-repo

#### Limitações:

- Apenas sites estáticos (HTML, CSS, JS)
- Não suporta backend (banco de dados, autenticação real)
- Repositório precisa ser público (no plano gratuito)

## Preparando para o Deploy

### Criar a branch da Etapa 8

```
git switch -c main
```

### Passo 1: Criar o repositório no GitHub

1. Acesse https://github.com
2. Clique em New repository (ou + → New repository)
3. Configure:
    - Repository name: elegance-shop (ou o nome que preferir)

    - Description: Loja virtual desenvolvida com React

    - Public: Marcado (necessário para GitHub Pages gratuito)

    - Add a README: Desmarcado (já temos arquivos)

4. Clique em Create repository

### Passo 2: Conectar o repositório local ao GitHub

No terminal, dentro da pasta do projeto:

```
git remote add origin https://github.com/SEU_USUARIO/elegance-shop.git
```

### Passo 3: Enviar o código para o GitHub

```
git add .
git commit -m "Projeto completo pronto para deploy"
git push origin main
```

### Passo 4: Configurar o Vite para GitHub Pages

Edite o arquivo vite.config.js na raiz do projeto:

```jsx
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    // Base path para GitHub Pages
    // IMPORTANTE: Substitua 'elegance-shop' pelo nome do seu repositório
    base: "/elegance-shop/",
});
```

### Passo 5: Instalar o pacote gh-pages

O gh-pages é uma ferramenta que facilita o deploy para o GitHub Pages:

```
npm install gh-pages --save-dev
```

### Passo 6: Configurar scripts no package.json

Abra o arquivo package.json e adicione dois scripts na seção "scripts":

```json
{
    "name": "elegance-shop",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview",
        "predeploy": "npm run build",
        "deploy": "gh-pages -d dist"
    },
    "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
    },
    "devDependencies": {
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0",
        "@vitejs/plugin-react": "^4.0.0",
        "gh-pages": "^6.1.0",
        "vite": "^5.0.0"
    }
}
```

### Passo 7: Fazer o deploy

Agora é só rodar:

```
npm run deploy
```

### O que acontece:

- O script predeploy executa npm run build
- O Vite gera a pasta dist com os arquivos otimizados
- O script deploy executa gh-pages -d dist
- O gh-pages cria um branch gh-pages e envia os arquivos
- O GitHub detecta e publica o site

Aguarde a mensagem: Published

### Passo 8: Configurar GitHub Pages no repositório

1. Acesse seu repositório no GitHub
2. Clique em Settings (ícone de engrenagem)
3. No menu lateral, clique em Pages
4. Em Source, selecione:


    - Deploy from a branch
    - Branch: gh-pages
    - Folder: / (root)

5. Clique em Save

Aguarde alguns minutos. O GitHub vai mostrar a URL do seu site:

> https://SEU_USUARIO.github.io/elegance-shop/

### Passo 9: Acessar o site publicado

Abra a URL no navegador. Sua loja virtual está online!

### ✅ Checkpoint: Verificando o Deploy

Após o deploy, verifique:

1. URL funciona: Acesse https://SEU_USUARIO.github.io/elegance-shop/
2. CSS carregou: O site está estilizado
3. JS funciona: Clique em um produto, o modal abre
4. Imagens aparecem: Banner e produtos visíveis
5. API funciona: Produtos carregam da MockAPI
6. Carrinho funciona: Adicione e remova itens
7. Responsivo: Teste em diferentes tamanhos de tela
