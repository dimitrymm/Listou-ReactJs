# Listou - Gerenciador de Compras

## 📝 Sobre
O Listou é uma aplicação web para gerenciar suas compras de forma simples e rápida. Com ele, você pode:

- Adicionar produtos com quantidade e categoria
- Acompanhar o histórico de compras
- Filtrar compras por mês
- Organizar produtos por categorias
- Visualizar estatísticas de consumo

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Vite](https://vitejs.dev/)

## 💻 Pré-requisitos

Antes de começar, verifique se você tem os seguintes requisitos:

- Node.js instalado (versão 18 ou superior)
- npm ou yarn instalado


## 🗂️ Organização de Diretórios
- 📂 `src/`: Código-fonte principal
  - 🧩 `components/`: Componentes reutilizáveis
    - 📅 `DataPicker/`: Seletor de data personalizado
    - 👣 `Footer/`: Rodapé com informações do desenvolvedor
    - 🗺️ `Header/`: Navegação com breadcrumb
    - 🔲 `Modal/`: Modal de confirmação
    - 📝 `ProductForm/`: Formulário de produtos
    - 🎨 `ui/`: Componentes do Shadcn/UI
  
  - 📄 `pages/`: Páginas da aplicação
    - 🏠 `home/`: Página inicial
      - 📄 `index.tsx`
    - 🛍️ `products/`: Cadastro de produtos
      - 📄 `index.tsx`
    - 📊 `statistics/`: Estatísticas e listagem
      - 📄 `index.tsx`
  
  - 🔧 `services/`: Serviços e APIs
    - 📡 `utils/`: Utilitários para serviços
      - 🌐 `HttpClient.tsx`
    - 📦 `CategoriesService.ts`
    - 🛍️ `ProductService.ts`
  
  - 🎣 `hooks/`: Hooks personalizados
    - 🔔 `use-toast.ts`
  
  - 📚 `lib/`: Funções e utilidades
    - 🛠️ `utils.ts`
    - 🎠 `sliderData.ts`
  
  - 🔧 `utils/`: Funções auxiliares
    - 📅 `FormatDate.ts`



1. Clone o repositório:

2. ## 🎯 Funcionalidades

- Cadastro de produtos com:
  - Nome
  - Quantidade
  - Categoria
  - Data da compra
- Listagem de produtos
- Filtragem por mês
- Exclusão de produtos
- Interface responsiva
- Feedback visual com toasts
- Validação de formulários

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Feito por Dimitry Machado Marinho

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/dimitrymm)](https://www.linkedin.com/in/dimitrymm)
[![GitHub](https://img.shields.io/badge/-GitHub-black?style=flat-square&logo=Github&logoColor=white&link=https://github.com/dimitrymm)](https://github.com/dimitrymm)
