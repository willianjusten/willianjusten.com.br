---
layout: post
date: 2020-07-08 11:26:49
image: /assets/img/jesse-ramirez-yisd-1ej_1g-unsplash.jpg
title: Como criar e publicar um pacote de extensões do VSCode
description: Um jeito ainda mais fácil de compartilhar seus plugins com os outros.
introduction: Um jeito ainda mais fácil de compartilhar seus plugins com os outros.
twitter_text: Um jeito ainda mais fácil de compartilhar seus plugins com os outros.
main-class: dev
color: "#637a91"
tags:
  - vscode
---
## Introdução

Fala pessoal, o post de hoje vai ser bem simples, mas eu achei super legal de fazer. Tem uns 3 anos que [migrei para o VS Code](https://willianjusten.com.br/migrei-para-o-vscode-e-estou-feliz/) vindo do Sublime e posso dizer que cada dia estou mais feliz com ele.

É um editor super completo e funcional e cada dia eu descubro um plugin novo legal! Hoje eu uso quase sempre os mesmos plugins e gosto bastante, para sincronizar os plugins entre meus computadores, eu sempre usei o [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) que cumpre muito bem o seu papel, mas ele gera um gist feinho, eu queria algo mais legal e é por isso que eu aprendi a criar um pacote de extensões e agora vou mostrar para vocês como é fácil!

Enquanto isso, vamos ouvindo uma banda de rock instrumental vindo diretamente da Irlanda do Norte, que se chama [And so I watch you from afar](https://open.spotify.com/artist/7qKMNwlACMZOUdMG3acwst?si=WGQVbOOwT7CJcIWD3s6Tlw).

## De onde surgiu a ideia

Como a maioria de vocês deve saber eu finalmente lancei o módulo 1 do meu curso de [React Avançado](https://reactavancado.com.br/?blog_post=1), e como é um curso bastante vivo e participativo, um aluno pediu as extensões que eu usava.

![Petrus: @willianjustenqui Você se importaria em listar os plugins que você usa no VSCode para trabalhar com a stack usada no curso? Willian: Opa, eu tenho um gist, mas deixa eu atualizar. Eu na realidade uso bem pouca coisa...    Willian: https://gist.github.com/willianjusten/5d469f31516cda667dba94fa0948f1c3 Esse é o Gist mas verdade, é mó feio, deixa eu fazer uma lista bonitinha. Willian: Tive uma ideia melhor, vou fazer um pack instalável via Marketplace, daqui +ou- 2h eu lanço tá:  Petrus: Esse professor é outro nível! Muito obrigado!](/assets/img/extension-1.png)

E foi assim que eu tive essa ideia legal. Se você já quiser ver o pacote de extensões, o [link está aqui](https://marketplace.visualstudio.com/items?itemName=willianjusten.reactavancado-extension-pack), lá eu descrevo plugin a plugin.

Mas chega de papo furado, vamos ao que interessa.

## Inicializando a estrutura do projeto

O VS Code tem na [documentação explicando](https://code.visualstudio.com/blogs/2017/03/07/extension-pack-roundup) mais ou menos como fazer e eu segui basicamente os passos de lá, com umas pequenas diferenças. 

Ele recomenda usar o [Yeoman](https://yeoman.io/) para iniciar a estrutura, então primeiro de tudo, você precisa instalar na sua máquina.

```bash
$ npm install -g yo generator-code
```

E então é só iniciar:

```bash
yo code
```

E você vai ver uma tela similar a esta:

![Uma tela dizendo bem vindo ao gerador de extensões do vs code e perguntando qual tipo eu desejo criar.](/assets/img/extension-2.png)

E aí nós escolhemos a opção `New Extension Pack`. Depois ele pergunta se deseja importar as extensões que já possui no VS Code, eu escolhi como não, pois como uso algumas extensões do lado local e outras do lado do WSL, no meu caso o gerador fica confuso.

Vão ter mais algumas perguntas e no final ele vai ter criado tudo que é necessário para você.

![Perguntas como qual o nome, identificador e descrição do pacote.](/assets/img/extension-3.png)

## Configurando e instalando localmente

A primeira coisa a fazer, é editar o seu `package.json` na chave `extensionPack` para adicionar os plugins desejados. E como saber o nome dos plugins? É só ir na aba de plugins, pesquisar pelo plugin desejado e ao clicar nele, na parte superior, ele possui o `identifier` dele, segue um exemplo:

![Imagem do plugin com seu identifier circulado em vermelho](/assets/img/inkedextension-4_li.jpg)

No meu caso, depois de adicionar todas as extensões, ficou assim:

```json
"extensionPack": [
    "editorconfig.editorconfig",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag",
    "mrmlnc.vscode-duplicate",
    "patbenatar.advanced-new-file",
    "waderyan.gitblame",
    "ms-vsliveshare.vsliveshare",
    "apollographql.vscode-apollo",
    "jpoissonnier.vscode-styled-components",
    "xabikos.javascriptsnippets",
    "andys8.jest-snippets",
    "skyran.js-jsx-snippets",
    "pulkitgangwar.nextjs-snippets",
    "zhuangtongfa.material-theme",
    "ms-vscode.vscode-typescript-next",
    "VisualStudioExptTeam.vscodeintellicode"
  ]
```

Depois disso, nós precisamos editar alguns detalhes para aparecer na Marketplace, que seriam:

```json
  "publisher": "willianjusten",
  "icon": "logo.png",
  "galleryBanner": {
    "color": "#030518",
    "theme": "dark"
  },
  "keywords": [
    "react",
    "typescript",
    "next",
    "styled-components",
    "graphql",
    "apollo"
  ],
  "repository": {
    "url": "https://github.com/React-Avancado/reactavancado-extension-pack"
  },
  "homepage": "https://github.com/React-Avancado/reactavancado-extension-pack",
  "bugs": {
    "url": "https://github.com/React-Avancado/reactavancado-extension-pack/issues"
  },
```

O `publisher` que é basicamente o seu identificador para o VS Code (nós vamos falar disso já já), o `icon` só para ficar bonitinho, o `galleryBanner` serve para na Marketplace o header ficar com a cor do seu plugin e bom, os outros são o que nome já diz, repositório, lugar para issues e palavras chave.

## Gerando o pacote e instalando

Depois de adicionar todas essas coisas, nós precisamos instalar a dependência que vai empacotar a nossa extensão, que é o `vsce`. Para isso:

```bash
npm install -g vsce
```

Agora para gerar o pacote, basta digitar:

```bash
vsce package
```

E ele vai gerar um pacote da seguinte forma `identifier-do-pacote-x.x.x.vsix`, onde o `x.x.x` é a `version` definida lá no `package.json`.

Para testar localmente, basta que você aperte ctrl+shift+p (ou cmd+shift+p) e escolha a opção `Install from VSIX`:

![Menu mostrando a opção Install from VSIX](/assets/img/extension-5.png)

Escolha o local onde seu pacote foi criado e mande instalar, ele vai demorar um pouquinho dependendo da quantidade de plugins que você tiver instalado e logo após, você poderá ver o seu pacote na lista de plugins instalados. Olha como fica bonitinho:

![Interface do VS Code com o pacote de extensões instalado](/assets/img/extension-6.png)

Bem legal né? Agora vamos aprender a colocar na Marketplace!

## Publicando o pacote na Marketplace

Já foi muito legal criar nosso pacote né, mas ainda mais legal é lançar isso online para que outras pessoas possam também instalar e usar!

Lembra que eu falei que iríamos conversar sobre o `publisher`, então chegou a hora. Primeiro de tudo, para poder publicar na Marketplace oficial, você precisa criar uma conta na [Visual Studio Team Service](https://visualstudio.microsoft.com/team-services/). Logo após criar a conta, você precisa criar um `Access Token` que vai permitir você publicar.

Para isso, lá no seu profile, vá no canto superior direito e escolha a opção `Security` no menu. E aí na página, escolha a opção `Personal Access Tokens` e então crie seu token, com um identifier adequado e um tempo de expiração de acordo.

Logo após criar seu token, você pode conectar na sua máquina e publicar sua extensão, rodando o comando:

```bash
vsce publish -p <token>
```

Feito isso, só aguardar um tempo até que a Marketplace consiga fazer as checagens e pronto! Seu pacote já estará online!

![Interface da Marketplace mostrando o pacote](/assets/img/extension-7.png)

E aí você pode instalar seja pelo botão de `Install` ali no site ou pesquisando dentro do próprio VS Code (esse pode demorar a indexar, então digite o identifier inteiro para achar).

## Conclusão

Espero que tenham gostado do post e agora criem seus próprios e/ou outras extensões também. O processo vai ser muito similar ao que fizemos.

E, momento de jabá, se você se interessou pelo curso e quer um desconto na faixa, [aproveite esse cupom](https://www.udemy.com/course/react-avancado/?couponCode=MODULO1), mas fica ligado, ele só vai até o final do mês! Então aproveite o preço mais barato possível agora!