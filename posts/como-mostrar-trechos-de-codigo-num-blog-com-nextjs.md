---
layout: post
date: 2021-09-16 11:16:42
title: Como mostrar trechos de código num blog com NextJS
description: Aprenda a usar um syntax highlighter para mostrar trechos de código
  mais bonitos no seu blog
main-class: js
color: "#D6BA32"
tags:
  - nextjs
categories:
  - NextJS
---
## Introdução

Continuando com os [posts sobre NextJS](https://willianjusten.com.br/series#nextjs), o de hoje vai ser super rápido, mas vivem me perguntando. Como fazer para colocar os trechos de código no blog para ficarem bonitinhos com a sintaxe colorida. Vocês vão ver que é molezinha!

Enquanto eu escrevo esse post, vou ouvindo outra banda que gosto demais que é [Alice in Chains](https://open.spotify.com/artist/64tNsm6TnZe2zpcMVMOoHL?si=F1VYqFDsR6e7-6xHf2uRDg&dl_branch=1), esse post vai ser tão pequeno, que se depender não vai dar para ouvir nem uma música completa.

## Instalando e configurando

Para poder ter os blocos de código bonitos vamos usar um **Syntax Highlighter** chamado [PrismJS](https://prismjs.com/), que é super simples de usar e funciona para praticamente todas as linguagens.

Para isso você primeiro vai ter que instalar o pacote e também para nos facilitar, também vamos instalar um plugin do babel para facilitar a carregar só as linguagens que desejamos:

```bash
yarn add prismjs babel-plugin-prismjs
```

Depois de instalado, podemos configurar o pacote no nosso `.babelrc`, algo como por exemplo:

```json
{
  "plugins": [
    ["prismjs", {
        "languages": ["javascript", "css", "markup"],
        "plugins": ["line-numbers"],
        "theme": "twilight",
        "css": true
    }]
  ]
}
```

Para mais detalhes e configurações, vale olhar o [repositório oficial](https://github.com/mAAdhaTTah/babel-plugin-prismjs).

## Fazendo funcionar

Depois de instalado o Prism e o plugin do babel, basta ir na página/componente de Post para configurar. É muito importante que você configure **somente** na página do Post para que você não carregue coisas desnecessárias em páginas que não forem utilizar o highlighter.

Para configurar, é só importar e mandar carregar:

```jsx
import { useEffect } from 'react'
import Prism from 'prismjs'

useEffect(() => {
  Prism.highlightAll()
}, [post]) // note que eu atualizo sempre que o post muda já que meu layout é fixo
```

E aí sempre que for escrever um bloco de código, só lembrar de usar a sintaxe padrão do markdown que é usar 3 vezes o símbolo de crase seguido da linguagem que vai escrever e fechando com as mesmas 3 crases:

```markdown

` ` `js

` ` `

```

## Conclusão

Como falei, foi um post super super rápido e prático, mas que funciona super bem. Aí vai caber a você usar um tema padrão e/ou editar suas próprias cores, assim como que plugins quiser usar também, mas a estrutura será sempre a mesma. Se você curtiu esse post, fica atento nos [posts sobre NextJS](https://willianjusten.com.br/series#nextjs) que eu tenho feito.