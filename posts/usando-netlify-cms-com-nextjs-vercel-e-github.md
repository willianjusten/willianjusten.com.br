---
layout: post
date: 2021-10-06 12:52:58
title: Usando Netlify CMS com NextJS, Vercel e GitHub
description: Como utilizar um CMS super simples como criar Pull Requests no GitHub
main-class: js
color: "#D6BA32"
tags:
  - cms
  - netlify
  - vercel
  - nextjs
categories:
  - NextJS
---
## Introdução

Fala povo, continuando com posts sobre [NextJS](https://willianjusten.com.br/series#nextjs), o de hoje é para ensinar como eu fiz para utilizar um CMS super simples para o meu blog, continuando com o mesmo workflow simples de criar um arquivo Markdown, dar push para o GitHub e pronto, post no ar!

Enquanto eu vou escrevendo esse post, vou ouvindo o album [Transatlanticism - Death Cab for Cutie](https://open.spotify.com/album/4jQW2mhMH3TxtAOol3Djuf?si=tCh29sjbToudu7sUnWGLLw&dl_branch=1), que é bem calminho e legal.

## Netlify CMS

Mas o que é esse tal de Netlify CMS? Bom, como você talvez já saiba, a sigla `CMS` significa `Content Management System` ou de forma prática para entender, aquele admin maroto para editar coisas (no nosso caso, posts de um blog).

E o [Netlify CMS](https://www.netlifycms.org/) no caso é um CMS open source criado pelo pessoal da Netlify com o intuito de fazer esse controle de conteúdo mas sem precisar de um servidor, banco de dados e outras coisas mais. Ele foi feito para funcionar em cima do que nós programadores já usamos, que é o Git! =)

O legal é que ele é simples de configurar e já te dá interfaces bem simples para poder utilizar. Seguem abaixo alguns screenshots da interface:

* Interface mostrando a lista de posts
  ![Interface mostrando a lista de posts](/assets/img/netlify-cms-interface.png)
* Interface do workflow com rascunhos, em review, ready
  ![Interface do workflow com rascunhos, em review](/assets/img/netlify-workflow.png)
* Interface da criação de post com campos customizados
  ![Interface da criação de post com campos customizados](/assets/img/netlify-post.png)

## Curti esse bagulho, como faço?

Então, como o nome já diz, ele foi feito mais pensado na plataforma do [Netlify](https://www.netlify.com/), mas isso não impede de usar na [Vercel](https://vercel.com/). E o mais legal é que ele é agnóstico ao framework/lib/linguagem que você vai usar para criar os posts, para você ter noção, eu venho usando esse CMS no meu blog desde quando ele era feito em Jekyll (Ruby), depois passei para o Gatsby e agora NextJS e continua funcionando perfeitamente, lindo não?

### Configurando os arquivos

Para fazer funcionar no NextJS em específico, você precisa criar uma pasta `admin` ou `cms`, o que desejar na url lá na pasta `public`. Por exemplo, se você criou uma pasta `admin`, o acesso vai ser `suaurl.com.br/admin`.

Lá dentro você precisa colocar 2 arquivos muito importantes, o primeiro é o `index.html` que é basicamente o que vai inicializar o CMS. Abaixo vou deixar o snippet do arquivo, mas sempre recomendo pegar a última versão [na documentação oficial](https://www.netlifycms.org/docs/add-to-your-site/).

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

Depois você precisa do arquivo `config.yml`, ele quem vai ser responsável por definir qual backend você vai usar (seja GitHub, Gitlab, Bitbucket, etc) e também vai servir para definir onde subir as imagens e até campos customizados que caso você queira criar, um arquivo básico e usando o GitHub ficaria assim:

```yaml
backend:
  name: github
  repo: willianjusten/willianjusten.com.br
  base_url: https://willianjusten.com.br/
  auth_endpoint: api/auth/ # Essa rota vai ser muito importante mais para frente

media_folder: public/assets/img
public_folder: /assets/img

publish_mode: editorial_workflow # Isso permite ter aquele workflow com drafts e tudo

slug:
  encoding: 'ascii'
  clean_accents: true

collections:
  - name: posts 
    label: posts 
    folder: posts # A pasta onde ficarão os posts
    create: true # Permite criar um post novo
    slug: '{{slug}}' # Estrutura do nome arquivo, exemplo: title.md
    fields: # Os campos do seu frontmatter
      - { label: 'Layout', name: 'layout', widget: 'hidden', default: 'post' }
      - {
          label: 'Date',
          name: 'date',
          widget: 'datetime',
          format: 'YYYY-MM-DD hh:mm:ss'
        }
      - { label: 'Post Image', name: 'image', widget: 'image', required: false }
      - { label: 'Title', name: 'title', widget: 'string' }
      - { label: 'Description', name: 'description', widget: 'string' }

      - { label: 'Body', name: 'body', widget: 'markdown' }
      
```

Lembrando que essas configurações todas e explicações mais detalhadas você encontra [na documentação oficial](https://www.netlifycms.org/docs/add-to-your-site/). Depois disso configurado, vamos precisar começar a parte "diferenciada" que é configurar a parte de autenticação para você conseguir de fato logar no CMS e criar as coisas.

### Configurando os arquivos da Autenticação

Essa aqui que era a parte "tricky" para funcionar na Vercel. Na Netlify bastava configurar o OAuth do GitHub e conectar na Netlify e fim, mas na Vercel/NextJS é necessário fazer isso e mais um detalhezinho. Mas fique tranquilo, estou aqui para ajudar!

A primeira coisa que você precisa fazer é instalar o pacote [@openlab/vercel-netlify-cms-github](https://www.npmjs.com/package/@openlab/vercel-netlify-cms-github), ele que vai ajudar nessa parte da autenticação para funcionar.

Depois de instalado, você vai precisar criar uma pasta `api` dentro de `src/pages`. E nessa pasta, também iremos criar dois arquivos. 

Primeiro crie um arquivo `auth.js` com o seguinte conteúdo:

```js
export { auth as default } from '@openlab/vercel-netlify-cms-github'
```

E o outro arquivo será o `callback.js` com o conteúdo:

```js
export { callback as default } from '@openlab/vercel-netlify-cms-github'
```

E aí lembra do arquivo `config.yml` que criamos? Se certifica que você está com o `auth_endpoint: api/auth/` definido, ele é necessário exatamente para essa autenticação.

### Gerando as chaves no GitHub

Com tudo configurado, agora é só criar uma aplicação dentro do GitHub para poder controlar a autenticação. Para isso vá até [https://github.com/settings/developers](https://github.com/settings/developers) e clique na opção `New OAuth App`. Nas configs faça:

- Em `Homapage URL` coloque a do seu site
- Em `Authorization callback URL` coloque exatamente a rota que criamos `https://seusite/api/callback`
- Após isso você receber 2 chaves que são `client_id` e `client_secret`

Agora com essas chaves, vá lá no painel da Vercel, entre no seu projeto e vá em `Settings > Environment Variables` e crie as duas chaves como:

- `OAUTH_CLIENT_ID` que é o `client_id` da sua aplicação do GitHub
- `OAUTH_CLIENT_SECRET` que é o `client_secret` da sua aplicação do GitHub

Feito isso, só fazer um novo deploy e tentar acessar seu `https://seusite/admin`, ele vai mostrar uma tela para autenticar com o GitHub, só logar e prontinho!

## Conclusão

Espero que tenham curtido o post e que seja útil para vocês! Se estiver usando, manda um salve lá no [Twitter](https://twitter.com/Willian_justen).
