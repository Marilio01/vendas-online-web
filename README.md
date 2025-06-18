
# Vendas Online - Frontend

Este é o frontend da aplicação **Vendas Online**, uma plataforma de e-commerce desenvolvida com tecnologias modernas para oferecer uma experiência de usuário fluida e responsiva.

## 🚀 Principais Funcionalidades

O sistema foi projetado para ser uma solução completa de e-commerce, atendendo tanto a clientes quanto a administradores.

### Autenticação de Usuário
- Cadastro e login de usuários.
- Gerenciamento de perfis com diferentes níveis de acesso: **User**, **Admin** e **Root**.

### Gerenciamento de Produtos e Categorias
- Inserção, edição e remoção de produtos e categorias (admin).
- Exibição organizada de produtos por categoria (cliente).

### Carrinho de Compras
- Adição, remoção e ajuste de quantidades de produtos.
- Carrinho persistente, mesmo ao recarregar a página.

### Checkout e Pagamento
- Processo de checkout com seleção de endereço.
- Pagamentos via **PIX** ou **Cartão de Crédito**.

### Gerenciamento de Pedidos
- Visualização de histórico e detalhes de pedidos (cliente).
- Acompanhamento geral de pedidos (admin).

### Painel do Cliente
- Edição de dados pessoais.
- Alteração de senha.

### Painel Administrativo
- Gerenciamento de usuários.
- Criação de novos administradores (apenas usuário Root).

## 🧠 Backend

O backend desta aplicação está hospedado em um repositório separado. Ele é responsável pela lógica de negócio, gerenciamento de banco de dados e pela API que serve o frontend.

🔗 [Acessar Repositório do Backend](https://github.com/Marilio01/vendas-online-backend.git)

## 🖼️ Imagens do Projeto

Abaixo estão algumas imagens que ilustram a estrutura e funcionalidades do projeto:

**Exemplo da Tela de Login:**
![image](https://github.com/user-attachments/assets/be1ef1ed-2573-4b5f-a140-2a3ca2ed1b19)

**Exemplo da Tela do Cliente:**
![image](https://github.com/user-attachments/assets/0b4efa57-1b31-4cf2-bcf6-dfd07acb31f5)

**Exemplo da Tela do Administrador:**
![image](https://github.com/user-attachments/assets/435a6b9b-d0b2-4f17-99e6-f77fe4a9c34d)

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface de usuário.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Vite**: Ferramenta moderna e rápida de build.
- **Redux Toolkit**: Gerenciamento eficiente de estado global.
- **Ant Design**: Componentes de UI elegantes e acessíveis.
- **styled-components**: Estilização com escopo de componente.
- **Axios**: Cliente HTTP para comunicação com o backend.
- **React Router DOM**: Gerenciamento de rotas SPA.

## Arquitetura

- Estrutura modular por funcionalidades.
- Arquitetura baseada em componentes reutilizáveis.
- Estado global centralizado com **Redux**.
- Uso de **hooks personalizados** (como `useRequests`) para requisições à API.
- Organização de código visando legibilidade e manutenibilidade.

## Qualidade de Código

- **ESLint** e **Prettier** para padronização e qualidade.
- Regras específicas para **TypeScript**, **React** e organização automática de imports.

## Instruções de Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou Yarn

### Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/vendas-online-web.git
```

Navegue até o diretório do projeto:

```bash
cd vendas-online-web
```

Instale as dependências:

```bash
npm install
# ou
yarn
```

### Configuração

Certifique-se de que o **backend** está em execução e que as URLs em `src/shared/constants/urls.ts` estão corretas.

### Execução

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Abra o navegador em `http://localhost:5173` (ou a porta indicada no terminal).

## Outros Comandos

### Gerar build para produção:

```bash
npm run build
```

### Visualizar build de produção:

```bash
npm run preview
```

### Executar o linter:

```bash
npm run lint
```