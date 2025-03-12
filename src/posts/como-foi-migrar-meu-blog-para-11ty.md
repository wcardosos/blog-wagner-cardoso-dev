---
title: Como foi migrar meu blog para 11ty
date: 2025-05-02
summary: Minha experiência com o primeiro projeto em 11ty
---

Nos últimos dias eu decidi reestruturar minha presença online. Eu reestruturei meu [**site pessoal**](https://www.notion.so/Como-foi-migrar-o-meu-blog-para-11ty-1b0979c1b318803f92aec3437b8d3b99?pvs=21) e também meu [**blog**](https://www.notion.so/Como-foi-migrar-o-meu-blog-para-11ty-1b0979c1b318803f92aec3437b8d3b99?pvs=21). No caso do blog, eu migrei do poderosíssimo [***Next.js***](https://nextjs.org) para o simplista (mas também muito poderoso) [***11ty***](https://11ty.dev). O 11ty (pronuncia-se *eleventy*) é um gerador de sites estáticos simples, que você pode facilmente criar algo muito rapidamente (eu mesmo fiz o blog inteiro em cerca de 3h, aprendendo tudo do zero). Neste post irei falar sobre como foi essa migração.

# Por que migrar o meu blog?

Eu desenvolvi o meu blog no final de 2023. Naquele momento eu estava buscando uma nova oportunidade no mercado como desenvolvedor e achei que seria uma boa escrever sobre os meus estudos e ainda ter um projeto para adicionar no portfólio. Eu decidi desenvolver em *Next.js* pois era o framework frontend que eu me sentia mais confortável naquele momento. Os posts eram feitos via arquivos ***Markdown***, pois eu não queria ter possíveis custos com um *CMS* (*Content Management System*). Essa foi de longe a parte mais complexa de desenvolver, deixar a aplicação bem estruturada para ler e transformar em HTML os arquivos Markdown. Demorou uns dias mas deu certo, desenvolvi, coloquei no ar e fiz alguns posts. E parei por aí.

Os últimos meses têm sido de muita evolução na ZRP, então achei que eu devia escrever sobre o avanço da minha carreira e decidi fazer isso voltando com o meu blog pessoal. Reestruturei o design do blog e quis aplicar o que eu mais aprendi durante esse tempo na ZRP: simples é melhor que complexo e feito é melhor que perfeito. Portanto, eu quis fazer isso da maneira mais simples e eficiente que eu encontrasse. Gosto de escrever em Markdown, então decidi seguir com essa abordagem para a escrita do conteúdo, uma forma simples e direta para a leitura. Alguns dias antes eu estava procurando uma ferramenta no ecossistema JavaScript que me permitisse desenvolver sites simples sem recorrer a todo o poderio do Next.js. Encontrei algumas opções e mesmo não se aplicando ao contexto que eu queria naquele momento, o 11ty me surpreendeu pela sua simplicidade e ficou no meu radar para utilizar em projetos futuros. Dias depois veio essa necessidade de reestruturar meu blog.

# Por que sair do Next.js?

Eu já trabalhei em diversos projetos com Next.js, dos mais simples como um site de uma loja de carros até uma plataforma administrativa de um grande player do mercado livre de energia. Com essas experiências fui tendo um feeling mais aguçado em relação a qual tipo de projeto o Next.js se encaixa melhor. Pensando mais especificamente na aplicação do meu blog, os principais pontos que me fizeram considerar abandonar o projeto com Next.js foram:

- Overhead de funcionalidades que não usava
- Build mais pesado
- Necessidade de runtime JS
- Manutenção de dependências
- Complexidade para algo essencialmente estático

A partir desses pontos eu decidi que deveria migrar meu blog para outra tecnologia, uma que fosse mais simples, mais rápida e que tivesse uma boa DX (*developer experience*).

# Por que 11ty?

Como eu falei no início do post, o 11ty é simples. O Next.js sem dúvida é uma das melhores opções para desenvolver aplicações web atualmente, mas para um blog estático simples eu acho um certo exagero. Pensando nisso, lembrei do 11ty e decidi dar uma chance. No processo de tomada de decisão para seguir ou não o desenvolvimento do blog com o 11ty considerei principalmente os seguintes pontos:

- Performance: o 11ty gera arquivos HTML puros sem necessidade de um runtime pesado (na própria doc deles tem um comparativo do tempo de build com os principais frameworks de SSG que você pode ver [aqui](https://www.11ty.dev/#why-should-you-use-eleventy)), com zero JS necessário no lado do cliente e builds super rápidos.
- Melhor compatibilidade com markdown: o 11ty possui suporte nativo muito flexível para Markdown e permite mais controle sobre a geração dos posts
- Simplicidade: o 11ty oferece templates leves e controle total sobre o HTML gerado de forma muito simples
- Facilidade de deploy: pode ser implantado em diversas plataformas, como *Netlify*, Vercel e GitHub Pages)

Esses pontos me fizeram tomar a decisão de seguir com o projeto em 11ty, possibilitando uma nova experiência com um framework totalmente novo.

# Como foi a migração

## Organização de arquivos e templates

O 11ty nos deixa bem livres para escolher a estrutura de pastas. Com isso eu escolhi a seguinte estrutura:

```
eleventy.config.cjs
package-lock.json
package.json
src/
├── _includes/
│     ├── layout.html
│     ├── post.html
│   ├── index.html
├── assets/
└── posts/
```

O principal objetivo foi deixar claro o que cada pasta faz. Criei a pasta `/src` como diretório principal do projeto. Dentro dela, deixei a pasta `/posts` para armazenar os artigos em Markdown. Cada arquivo `.md` ali representa um post, com seu front matter no topo para definir título, data e resumo.

Para os layouts e componentes reutilizáveis, o 11ty utiliza a pasta `/_includes`. É nela que ficam os templates usados para montar o layout das páginas. No meu caso, defini um `layout.html` como layout principal e o `post.html` responsável pelos estilos de um post.

Criei ainda a pasta `/assets` para guardar os arquivos estáticos, como imagens.

## Como o 11ty lê os posts

Toda vez que um arquivo Markdown é adicionado em `/posts`, o 11ty interpreta o front matter YAML no início do arquivo para capturar informações como título e data. Na configuração (`eleventy.config.cjs`), defini um collection chamada `posts`, que basicamente lê todos os arquivos dessa pasta.

Isso me permite exibir os posts no index ou em qualquer outro template de forma bem flexível.

## Estilização com Tailwind CSS

Para manter o visual limpo e moderno, integrei o Tailwind CSS ao projeto. Tentei fazer de algumas maneiras, mas o que foi mais eficiente foi via CDN. Abaixo como foi a configuração do Tailwind CSS via CDN e personalização do tema.

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
	  ...
	  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
	  ...
	  <style type="text/tailwindcss">
      @theme {
        --color-brand-black: #262525;
        --color-brand-black-light: #2A2A2C;
        --color-brand-red: #E53E3E;

        --font-sans: 'Montserrat', sans-serif;
      }

      body {
        @apply bg-brand-black text-zinc-50;
      }
    </style>
  </head>
  ...
</html>
```

Defini as cores da minha marca pessoal e adicionei um estilo global. Simples. Rápido. Eficiente.

## Configuração do 11ty

Para desenvolver o blog eu segui a documentação oficial do 11ty e o tutorial oficial deles no YouTube. Isso foi o suficiente para desenvolver o projeto, com pesquisas pontuais em alguns cenários específicos que me deparei (adicionar o TailwindCSS ao projeto, por exemplo).

### Como instalar

Não é necessário instalar o 11ty para utilizar no seu projeto, mas eu decidi instalar para deixar mais definido o projeto e mais fácil de rodar via script. Para instalar o 11ty no seu projeto basta rodar o comando abaixo no seu terminal:

```bash
npm install @11ty/eleventy
```

Com isso, eu configurei os scripts do arquivo `package.json` da seguinte forma:

```json
"scripts": {
  "start": "eleventy --serve"
}
```

Para executar o projeto basta rodar o comando `npm run start`.

### Páginas no 11ty

Criei um arquivo `index.html` e comecei a escrever a estrutura da página. Simples assim. Ao final do projeto esse arquivo ficou da seguinte maneira:

```html
---
layout: layout.html
---

<head>
  <title>Wagner Cardoso - Blog</title>
</head>

<section class="grid lg:grid-cols-2 gap-4 lg:gap-6 mt-6 lg:mt-10">
  {% for post in collections.post %}
  <article class="flex flex-col gap-4 p-6 rounded-lg border border-zinc-500">
    <a href="{{ post.url }}" class="w-fit">
      <h2 class="text-xl font-bold text-brand-red hover:text-brand-red/90">{{ post.data.title }}</h2>
    </a>
    <span class="text-sm text-zinc-300">{{ post.data.date | formatDate }}</span>
    <p>{{ post.data.summary }}</p>
    <a href="{{ post.url }}" class="text-brand-red font-semibold hover:text-brand-red/90 w-fit">Ler mais</a>
  </article>
  {% endfor %}
</section>
```

Aqui vou explicar alguns conceitos do 11ty para que você possa entender 100% desse código.

Primeiramente, temos a utilização de [*Front Matter*](https://www.11ty.dev/docs/data-frontmatter/) para adicionar metadados ao nosso HTML.

```html
---
layout: layout.html
---
```

Estamos dizendo para o 11ty que estamos utilizando o layout presente em `src/_includes/layout.html`. Layouts são uma parte importante dos projetos em 11ty, pois nos possibilita reutilizar HTML em diversas páginas sem precisar repetir uma linha de código em nossos arquivos. Para adicionar um layout na sua aplicação você precisa criar o arquivo HTML na pasta `_includes/` (saiba mais sobre *layouts* no 11ty [aqui](https://www.11ty.dev/docs/layouts/)) e então dizer ao 11ty que quer utilizar esse layout no arquivo HTML que você desejar utilizando *Front Matter*. O meu arquivo de layout ficou da seguinte forma:

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/ico" href="/assets/favicon.ico" />
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <style type="text/tailwindcss">
      @theme {
        --color-brand-black: #262525;
        --color-brand-black-light: #2A2A2C;
        --color-brand-red: #E53E3E;

        --font-sans: 'Montserrat', sans-serif;
      }

      body {
        @apply bg-brand-black text-zinc-50;
      }
    </style>
  </head>
  <body>
    <main class="max-w-5xl mx-auto px-6 pt-6 pb-6 md:pt-10 xl:px-0">
      <header class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img src="https://github.com/wcardosos.png" alt="Wagner Cardoso" class="w-12 h-12 rounded-full">
          <a href="/"><strong class="hover:text-brand-red">Wagner Cardoso</strong></a>
          <div class="flex items-center gap-1">
            <a href="https://github.com/wcardosos">
              <img src="/assets/github.svg" alt="GitHub" class="h-4 w-4">
            </a>
            <a href="https://linkedin.com/in/wagner-cardoso-dev">
              <img src="/assets/linkedin.svg" alt="GitHub" class="h-4 w-4">
            </a>
          </div>
        </div>

        <img src="/assets/logo.png" alt="Logo" class="h-12 w-12">
      </header>

      {{ content }}

      <footer class="flex flex-col-reverse lg:flex-row lg:justify-center gap-4 mt-16">
        <div class="flex items-center gap-2">
          <img src="/assets/logo.png" class="w-12 h-12 md:w-16 md:h-16" alt="Wagner Cardoso Dev Logo" />
          <span>Wagner Cardoso</span>
        </div>
        
        <div class="flex flex-col gap-2">
          <strong>Contato</strong>
          <div class="flex gap-2">
            <a href="https://github.com/wcardosos" target="_blank" rel="noopener noreferrer" class="hover:text-brand-red">Github</a>
            <span>/</span>
            <a href="https://www.linkedin.com/in/wagner-cardoso-dev/" target="_blank" rel="noopener noreferrer" class="hover:text-brand-red">LinkedIn</a>
            <span>/</span>
            <a href="mailto:wagnerdev01@gmail.com" class="hover:text-brand-red">E-mail</a>
          </div>
        </div>

        <a href="https://blog.wagnercardoso.dev" target="_blank" rel="noopener noreferrer" class="hover:text-brand-red font-bold">Blog</a>
      </footer>
    </main>
  </body>
</html>
```

Como é o layout principal da aplicação, esse arquivo HTML contém:

- design padrão da aplicação com o header e o footter ao redor do conteúdo principal
- importação da fonte utilizada no branding da minha marca pessoal
- importação do TailwindCSS via CDN
- configuração do tema do TailwindCSS com as cores da minha marca pessoal

Outro ponto importante do 11ty é utilizar sintaxe *Nunjucks* para poder estender o HTML. No meu caso eu criei um `for` para listar todos os posts do meu blog:

```html
{% for post in collections.post %}
  <article class="flex flex-col gap-4 p-6 rounded-lg border border-zinc-500">
    <a href="{{ post.url }}" class="w-fit">
      <h2 class="text-xl font-bold text-brand-red hover:text-brand-red/90">{{ post.data.title }}</h2>
    </a>
    <span class="text-sm text-zinc-300">{{ post.data.date | formatDate }}</span>
    <p>{{ post.data.summary }}</p>
    <a href="{{ post.url }}" class="text-brand-red font-semibold hover:text-brand-red/90 w-fit">Ler mais</a>
  </article>
{% endfor %}
```

Basicamente estou dizendo que para cada postagem presente na collection de posts vai renderizar uma tag `article` estilizada da forma que o meu design precisa ser. A sintaxe para adicionar valores no HTML é `{{ expressão }}`. Pronto. Agora só é preciso adicionar os posts na pasta correta e já teremos uma página para o post. Não foi difícil, né?

# Criando posts para o blog

Como eu falei anteriormente, utilizo arquivos markdown para gerar o conteúdo do blog. O 11ty já tem integração nativa para isso. Só precisei criar uma pasta `posts` e adicionar os arquivos necessários. Acessando `/posts/nome-do-arquivo-md` no navegador é possível ver o conteúdo do arquivo Markdown estruturado de acordo com os estilos da sua página.

## Migração dos posts do blog antigo para o novo

A migração foi super simples. Só precisei adicionar os arquivos markdown do blog antigo na pasta dos posts, atualizar as tags do front matter e pronto. Meus posts estavam prontos.

# O que eu ganhei com a migração

Os resultados foram bem positivos. Eu consegui um blog mais leve, com zero dependência de JS para navegar, além de uma simplicidade no deploy e na manutenção, mas talvez o mais importante tenha sido aumentar a facilidade para escrever e publicar. No blog antigo eu tinha toda a responsabilidade de tratar o markdown, precisava fazer muitas coisas manuais. Agora eu transferi a responsabilidade da transformação do markdown para HTML para o 11ty. Isso pode ser bom e pode ser ruim dependendo do contexto, mas para o meu projeto e os objetivos que tenho com ele supre muito bem as minhas necessidades.

Um ponto que eu também gostaria de falar é que eles cumprem o que prometem em relação ao build: são bem mais rápidos que os concorrentes. Veja nas imagens abaixo

### Último deploy com Next.js

![image.png](/assets/posts/como-foi-migrar-meu-blog-para-11ty/build-next.png)

### Primeiro deploy com 11ty

![image.png](/assets/posts/como-foi-migrar-meu-blog-para-11ty/build-11ty.png)

O tempo de deploy saiu de 48s para 6s, ficando **8 vezes mais rápido** que o Next.js. Imagens falam mais que mil palavras né.

# Valeu a pena?

Com certeza que sim. Agora eu não tenho preocupações em relação às dependências, em ter uma tecnologia onde muitas de suas funcionalidades não eram utilizadas, tenho uma manutenção muito mais simples e gostei de trabalhar com o 11ty. Tem sido uma experiência muito positiva.

## Para quem indico o 11ty

O 11ty é uma excelente escolha para quem quer construir sites simples, rápidos e com controle total sobre o HTML gerado. Se o seu projeto é estático — como blogs pessoais, portfólios ou documentações— e você prefere escrever em Markdown, usar templates leves e evitar JavaScript no cliente sempre que possível, o 11ty entrega tudo isso com uma curva de aprendizado muito baixa.

## Para quem indico o Next.js

O Next.js continua sendo a melhor escolha para projetos que exigem interatividade no cliente, rotas dinâmicas, autenticação, integração com APIs em tempo real ou qualquer forma de renderização híbrida (SSR/ISR).

Se o seu blog, site ou sistema precisa de funcionalidades como login, painel administrativo, carregamento dinâmico de dados ou experiências altamente interativas com React, o Next.js vai te entregar uma estrutura mais robusta, além de uma comunidade enorme, plugins prontos e suporte direto da Vercel.

# Considerações finais

Troquei o Next.js pelo 11ty por uma necessidade do meu contexto. O 11ty não substitui o Next.js. Eles possuem objetivos diferentes. Se você precisa de um site simples e estático, o 11ty é uma ótima opção. Já se a sua necessidade é de uma aplicação mais robusta, o Next.js talvez seja hoje a melhor opção do mercado. O importante é você entender a aplicabilidade de cada tecnologia que você está ponderando utilizar para poder tomar decisões de arquitetura de forma mais assertiva.