---
layout: post
date: 2021-09-17 01:40:37
title: Usando o Preact no NextJS para mais performance
description: Diminua ainda mais o bundle do seu projeto NextJS usando o Preact
main-class: js
color: "#D6BA32"
tags:
  - nextjs
  - performance
categories:
  - NextJS
---
## Introdução

Fala pessoal, continuando com os [posts sobre NextJS](https://willianjusten.com.br/series#nextjs), o de hoje será outro bem rápido, mas muito eficaz. 

Enquanto vou escrevendo esse post vou ouvindo uma das bandas que deu origem ao Grunge, nope não é Nirvana e muito menos Pearl Jam, mas sim [Mudhoney](https://open.spotify.com/artist/7LuYiSXiWs86rwWJjEEgB9?si=_J0qSuo_SDOaqiChRCcTQw&dl_branch=1).

## Vidrado em performance

Eu sou vidrado em performance, então quando fui migrar do Gatsby para o NextJS eu queria deixar o site tão rápido ou até mais rápido que antes. E como o NextJS é muito mais fácil de editar/customizar as coisas, pensei, por que não tentar substituir o React pelo Preact que é quase a mesma coisa, só que menor?

Bastou uma simples busca pelo Google/GitHub da vida que encontrei esse exemplo do [Lee Robinson](https://github.com/leerob/leerob.io/blob/main/next.config.js#L18-L30) que inclusive hoje trabalha na Vercel, testei e super funciona! Segue o snippet abaixo que deve ser adicionado no `next.config.js`

```js
module.exports = {
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      })
    }

    return config
  }
}
```

Depois de adicionar isso, também precisamos lembrar de instalar as dependências necessárias:

```bash
yarn add preact preact-render-to-string
```

E aí é só rodar o `yarn build && yarn start` e você verá tudo funcionando!

Vale lembrar que o **Preact não é 100% igual ao React**, então é **muito importante** que você veja [as diferenças](https://preactjs.com/guide/v8/differences-to-react/) e também teste tudo dentro do seu site para ter certeza que não tem nada quebrando.

## Mas e muda muito?

Como o Preact é menor que o React, a mudança vai ser principalmente no tamanho do bundle e geração. Vou deixar aqui embaixo as imagens usando React padrão e depois com o Preact na comparação do meu blog.

### Utilizando React padrão

![Resultado do build com React, durando 24s e a app com 112Kb](/assets/img/blog-react.png)

### Utilizando Preact

![Resultado do build com React, durando 9s e a app com 73Kb](/assets/img/blog-preact.png)

Como você pode notar, eu tive uma diminuição considerável em todas as páginas de cerca ~40kB. Pode não parecer grandes coisas, mas para mim é um ganho enorme!

## Conclusão

Como falei, foi um post super super rápido e prático, mas que funciona super bem e ajuda a limar aqueles kB extras do seu site! Se você está afim de ver mais posts como esse, fica atento nos [posts sobre NextJS](https://willianjusten.com.br/series#nextjs) que eu tenho feito.
