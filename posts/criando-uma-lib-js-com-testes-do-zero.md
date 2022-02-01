---
layout: post
date: '2019-03-06 04:23:39'
image: /assets/img/lib-js-testes.jpg
title: Criando uma lib JS com testes do Zero
description: >-
  Uma mini-série de vídeos no Youtube onde eu ensino a criar uma lib JS simples
  usando testes do zero.
introduction: >-
  Uma mini-série de vídeos no Youtube onde eu ensino a criar uma lib JS simples
  usando testes do zero.
twitter_text: >-
  Uma mini-série de vídeos no Youtube onde eu ensino a criar uma lib JS simples
  usando testes do zero.
main-class: js
color: '#D6BA32'
tags:
  - youtube
  - testes
  - js
  - tdd
---

## Introdução

Fala pessoal, o post de hoje é mais um link para o meu [Canal no Youtube](https://www.youtube.com/WillianJustenCursos?sub_confirmation=1). Eu fiz uma pequena série de vídeos exatamente com o mesmo título desse post.

Tive uma demanda na Toptal para criação de um modal com vários comportamentos e notei que eles poderiam ser desacoplados do componente e reutilizados onde quisesse. Para isso criei umas pequenas bibliotecas e vi que seria interessante mostrar para vocês o processo da criação de uma delas.

## Videos

<iframe width="560" height="315" src="https://www.youtube.com/embed/nrNvUDPKcBk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Você pode também assistir a playlist inteira, diretamente no [Youtube](https://www.youtube.com/watch?v=nrNvUDPKcBk&list=PLlAbYrWSYTiPR9DhcL9-22W-E-p8LmDOJ).

Abaixo vou colocar os links e comandos utilizados no curso.

## Estrutura utilizada

Para a formatação do código e regras, eu utilizei:

- [Eslint](https://eslint.org/)
- [StandardJS](https://standardjs.com/)
- [Prettier](https://prettier.io/)

Para os testes, utilizei o [Jest](https://jestjs.io/) e na compilação/server exemplo, utilizei o [Webpack](https://webpack.js.org/)

Sei que pode parecer um monstro de coisas, mas confesso que a maioria são coisas que uso sempre, então é só um copy/paste, no final tu nem precisa se preocupar com isso.

### Instalação do Babel e suas dependências

Para poder usar features novas do JS e poder depois transpilar para funcionar em todos os browsers, eu precisei do Babel e por isso instalei a versão mais nova que é a 7, abaixo segue o comando:

```bash
yarn add --dev @babel/core@7.3.4 @babel/plugin-proposal-class-properties@7.3.4 @babel/preset-env@7.3.4 babel-loader@8.0.5
```

Depois disso, é só criar um arquivo `.babelrc` na raiz do projeto com o seguinte:

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

Lembrando que você pode utilizar o `npm install` se desejar.

### Eslint + StandardJS + Prettier

O Eslint e o StandardJS são fundamentais para manter o meu código padronizado, evitando formatações erradas, variáveis não utilizadas e outras coisas mais. Para tudo funcionar, precisei instalar os seguintes pacotes:

```bash
yarn add --dev babel-eslint@10.0.1 eslint@5.15.0 eslint-config-standard@12.0.0 eslint-plugin-import@2.16.0 eslint-plugin-node@8.0.1 eslint-plugin-promise@4.0.1 eslint-plugin-standard@4.0.0
```

Depois de instalado é só criar um arquivo `.eslintrc.json` na raiz do sistema com o seguinte conteúdo:

```json
{
  "parser": "babel-eslint",
  "env": {
    "jest": true,
    "browser": true
  },
  "extends": ["standard"],
  "rules": {
    "space-before-function-paren": "off",
    "comma-dangle": "off"
  }
}
```

Repare que eu sobrescrevo duas regras que são o espaço antes da função (não curto muito esse monte de espaço, mas na real, quem usa `function` hoje em dia? xD). A outra é para usar a vírgula na última propriedade, isso facilita e muito no diff do git.

Depois do eslint+standardjs instalados, foi a vez do prettier:

```bash
yarn add --dev prettier@1.16.4
```

Se você utilizar o VSCode como eu, é só configurar o `formatOnSave` e fica lindo, aqui [como configurar](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

### Jest e Babel-Jest

Para rodar nossos testes, eu resolvi utilizar o Jest, que tá começando a me conquistar, apesar de eu ainda amar o Mocha+Chai. Para isso, também precisa instalar o `babel-jest` para ele entender tudo certinho e ler nosso `.babelrc`.

```bash
yarn add --dev jest@24.1.0 babel-jest@24.1.0
```

### Webpack

Para gerar a biblioteca e também a página de exemplo, eu utilizei o Webpack nas configurações mais simples, sem fazer quase nada na configuração, só instalei o necessário:

```bash
yarn add --dev webpack@4.29.6 webpack-cli@3.2.3 webpack-dev-server@3.2.1
```

A configuração ficou assim:

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'on-leave-intent.min.js',
    libraryTarget: 'umd',
    library: 'OnLeaveIntent'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: [path.join(__dirname, 'example'), path.join(__dirname, 'lib')]
  }
}
```

### Código / Pacote

Bom, eu não vou colar todo o código aqui, até porque acho que seria legal você assistir e tentar fazer também. Mas se você quiser ver já pronto, [aqui está o repositório](https://github.com/willianjusten/on-leave-intent).

Se você quiser utilizar em algum projeto, o [pacote está no npm](https://www.npmjs.com/package/on-leave-intent). E você pode instalar com:

```bash
yarn add on-leave-intent
```

## Conclusão e Jabá

Espero que vocês tenham curtido esses vídeos e se você tem interesse em entender um pouco mais da teoria e também outros tipos de testes, eu tenho um curso chamado [JS com TDD na Prática](https://www.udemy.com/js-com-tdd-na-pratica/?couponCode=PROMOFEV22) e se você usar esse link, vai com um super-hiper-mega desconto.
