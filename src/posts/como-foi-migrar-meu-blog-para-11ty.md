---
title: Como foi migrar meu blog para 11ty
date: 2025-03-13
summary: Minha experiência com o primeiro projeto em 11ty
---

Nos últimos dias eu decidi reestruturar minha presença online. Eu reestruturei meu site pessoal e também meu blog pessoal. No caso do blog, eu migrei do poderosíssimo [***Next.js***](https://nextjs.org) para o simplista (mas também muito poderoso) [***11ty***](https://11ty.dev). O *11ty* (pronuncia-se *eleventy*) é um gerador de sites estáticos simples, que você pode facilmente criar algo muito rapidamente, eu mesmo fiz o blog inteiro em cerca de 3h, aprendendo tudo do zero. Vou mostrar nesta postagem como é simples criar um projeto como um blog usando o *11ty*.

# Por que migrar o meu blog?

Eu desenvolvi o meu blog no final de 2023. Naquele momento eu estava buscando uma nova oportunidade como desenvolvedor e achei que seria uma boa escrever sobre os meus estudos e ainda ter um projeto para adicionar no portfólio. Eu decidi desenvolver em Next.js pois era o framework frontend que eu me sentia mais confortável naquele momento. Os posts eram feitos via arquivos markdown, pois eu não queria ter possíveis custos com um CMS (Content Management System). Essa foi de longe a parte mais complexa de desenvolver, deixar a aplicação bem estruturada para ler e transformar em HTML os arquivos markdown. Demorou uns dias mas deu certo, desenvolvi, coloquei no ar e fiz alguns posts. E parei por aí.

Os últimos meses têm sido de muita evolução na ZRP, então achei que eu devia escrever sobre o avanço da minha carreira e decidi fazer isso voltando com o meu blog pessoal. Reestruturei o design do blog e quis aplicar o que eu mais aprendi durante esse tempo na ZRP: simples é melhor que complexo e feito é melhor que perfeito. Portanto, eu quis fazer isso da maneira mais simples e eficiente que eu encontrasse. Gosto de escrever em markdown, então decidi seguir com essa abordagem para a escrita do conteúdo, uma forma simples e direta para a leitura. Alguns dias antes eu estava procurando uma ferramenta no ecossistema JavaScript que me permitisse desenvolver sites simples sem recorrer a todo o poderio do Next.js. Encontrei algumas opções e mesmo não se aplicando ao contexto que eu queria naquele momento, o 11ty me surpreendeu pela sua simplicidade e ficou no meu radar para utilizar em projetos futuros. Dias depois veio essa necessidade de reestruturar meu blog.

# Por que *11ty*?

Como eu falei no início do post, o *11ty* é simples. O Next.js sem dúvida é uma das melhores opções para desenvolver aplicações web atualmente, mas para um blog estático simples eu acho um certo exagero. Pensando nisso, lembrei do *11ty* e decidi dar uma chance. No processo de tomada de decisão para seguir ou não o desenvolvimento do blog com o 11ty considerei principalmente os seguintes pontos:

- Performance: o *11ty* gera arquivos HTML puros sem necessidade de um runtime pesado (na própria doc deles tem um comparativo do tempo de build com os principais frameworks de SSG que você pode ver [aqui](https://www.11ty.dev/#why-should-you-use-eleventy))
- Menos dependências: o projeto do *11ty* tem um footprint menor e menos dependências para gerenciar
- Melhor compatibilidade com markdown: o 11ty possui suporte nativo muito flexível para Markdown e permite mais controle sobre a geração dos posts

Esses pontos me fizeram tomar a decisão de seguir com o projeto em *11ty*, possibilitando uma nova experiência com um framework totalmente novo.

# Como foi a migração

## Configuração do *11ty*

Para desenvolver o blog eu segui a documentação oficial do 11ty e o tutorial oficial deles no YouTube. Isso foi o suficiente para desenvolver o projeto, com pesquisas pontuais em alguns cenários específicos que me deparei (adicionar o TailwindCSS ao projeto, por exemplo).

### Como instalar

Não é necessário instalar o *11ty* para utilizar no seu projeto, mas eu decidi instalar para deixar mais definido o projeto e mais fácil de rodar via script. Para instalar o 11ty no seu projeto basta rodar o comando abaixo no seu terminal:

```bash
npm install @11ty/eleventy
```

Com isso, eu configurei os scripts do arquivo `package.json` da seguinte forma:

```json
"scripts": {
  "start": "eleventy --serve"
}
```

Com isso, conseguimos rodar o projeto apenas com `npm run start`.

### Páginas no *11ty*

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

Aqui vou explicar alguns conceitos do *11ty* para que você possa entender 100% desse código.

Primeiramente, temos a utilização de [*Front Matter*](https://www.11ty.dev/docs/data-frontmatter/) para adicionar metadados ao nosso HTML.

```html
---
layout: layout.html
---
```

Estamos dizendo para o 11ty que estamos utilizando o layout presente em `layout.html`. Layouts são uma parte importante dos projetos em 11ty, pois nos possibilita reutilizar HTML em diversas páginas sem precisar repetir uma linha de código em nossos arquivos. Para adicionar um layout na sua aplicação você precisa criar o arquivo HTML na pasta `_includes/` e então dizer ao 11ty que quer utilizar esse layout no arquivo HTML que você desejar utilizando *Front Matter*. O meu arquivo de layout ficou da seguinte forma:

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

Outro ponto importante do 11ty é utilizar sintaxe *Nunjucks* para poder extender o HTML. No meu caso eu criei um `for` para listar todos os posts do meu blog:

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

Basicamente estou dizendo que para cada postagem presente na collection de posts vai renderizar uma tag `article` estilizada da forma que o meu design precisa ser. A sintaxe para adicionar valores no HTML é {% raw %}`{{ expressao }}`{% endraw %}. Vou te falar como os posts são estruturados e você vai entender como consegui acessar o post aqui.

### Criando posts para o blog

### Migração dos posts do blog antigo para o novo