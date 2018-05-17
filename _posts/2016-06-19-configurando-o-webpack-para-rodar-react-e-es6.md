---
layout: post
title: "Configurando o Webpack para rodar React e ES6"
date: 2016-06-19 3:00:46
image: '/assets/img/webpack/webpack.png'
description: "Aprenda como utilizar esse module bundler para facilitar sua vida nos projetos com ES6 e React."
main-class: 'js'
color: '#D6BA32'
tags:
- react
- es6
- tutorial
categories:
- "Aprendendo ReactJS"
twitter_text: "Facilite sua vida com esse module bundler."
introduction: "Aprenda como utilizar esse module bundler para facilitar sua vida nos projetos com ES6 e React."
---

## Introdução

O post de hoje é para falar de mais uma forma de se trabalhar com módulos e automatizar algumas tarefas, dessa vez com o `webpack`. Aí você vem e fala: "pxxxx mais um automatizador e module loader? Essa galera do Front tá louca". E eu nem vou discordar de você não, porque é quase isso. Mas assim como o React se popularizou bastante, o webpack também e, com isso, precisamos aprender como ele funciona. O alívio é que é muito fácil de aprender.

Enquanto escrevo esse post, vou ouvindo o novo album do Red Hot Chili Peppers, que se chama [The Getaway](https://open.spotify.com/album/43otFXrY0bgaq5fB3GrZj6) e está muito bom! Acabou que enrolei pacas, o album do RHCP acabou e eu fui então ouvir a trilha sonora do filme [Warcraft](https://open.spotify.com/album/1sPM7Tn95VHElwAs8Cwp10), que também ficou demais!

Se você quiser pular tudo e ver o código final, só [abrir aqui](https://github.com/willianjusten/webpack-example).

## O que é webpack?

Bom, eu falei que o webpack é um `module loader`, mas que desgraça é essa? Foi-se o tempo que escrevíamos todo o nosso código num grande arquivo javascript e chamávamos de `script.js`. Com o tempo, fomos aprendendo que é importante separar as responsabilidades e criar arquivos menores. Esses arquivos menores, nada mais são, que `módulos` da nossa aplicação. E o webpack é responsável por empacotar esses módulos e entregá-los para a web.

Existem outros do gênero como o [Browserify](http://browserify.org/), que trabalha com a estrutura de CommonJS para requerer novos módulos, por exemplo.

Os criadores do webpack fizeram [uma página](https://webpack.js.org/concepts/manifest/) explicando as motivações para a criação desse projeto, se você estiver interessado em saber mais um pouquinho, vai lá.

## Instalando o webpack

Sua máquina obviamente precisa ter o [Node.js](https://nodejs.org/en/) instalado e funcionando. Quanto mais atualizado, melhor também hein =)

### Instalando o webpack globalmente

Para instalar globalmente, basta ir no terminal e digitar:

```bash
sudo npm install webpack -g
```

Lembrando que a necessidade do sudo pode variar de sistema para sistema.

### Iniciando o webpack em um projeto

É sempre importante ter o webpack como dependência dentro do projeto, para que você possa usar via local ao invés de só globalmente. Para isso, primeiro inicie um projeto:

```bash
npm init
```

E então instale o webpack salvando o mesmo no `package.json` criado.

```bash
npm install webpack --save-dev
```

### Dev Tools

Se você quiser usar coisas como `hot reload`, levantar um servidor automaticamente, mapsource e outras coisinhas, você precisa instalar esse também.

```bash
npm install webpack-dev-server --save-dev
```

## Começando a trabalhar

Você pode usar só a ferramenta do webpack pelo terminal, mas como, em geral, você vai utilizá-lo só em projetos um pouquinho mais detalhados, é legal criar um arquivo de configuração. Então, para isso, crie um arquivo `webpack.config.js`. E as primeiras configurações podem ser:

```js
module.exports = {
    entry: './app/App.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    }
}
```

Encapsulamos tudo dentro do `module.exports`, porque nosso arquivo não deixa de ser também um módulo. Na linha `2`, determinamos qual é o arquivo principal que irá carregar toda nossa aplicação. Depois definimos no `output`, na linha `4` onde vamos jogar o arquivo e na linha `5`, qual será o nome do arquivo.

Agora crie seu arquivo `App.js` na pasta `app` e escreva dentro dele:

```js
console.log('webpack está funcionando');
```

Crie seu `index.html` na pasta `public` e coloque a seguinte linha:

```html
<script src="bundle.js"></script>
```

Agora se você rodar `webpack` dentro da pasta raiz, ele irá criar o arquivo `bundle.js` dentro de public e se você abrir o `index.html`, vai estar lá a mensagem no seu console =)

## Criando um servidor com Hot Reload

Como já instalamos o `webpack-dev-server` lá no início, a única coisa que precisamos é configurar para tudo funcionar certinho. Então vamos adicionar ao `webpack.config.js` mais o seguinte trecho:

```js
devServer: {
    inline: true,
    contentBase: './public',
    port: 3333
}
```

Utilizamos o `inline: true` para ele colocar um runner do webpack dentro do arquivo temporariamente, que vai servir para nosso hot reload. O `contentBase` é de onde queremos que ele leia, em geral, vai ser onde seu `index.html` estiver. Por fim, escolha uma porta não utilizada e pronto. Para rodar digite `webpack-dev-server` no terminal e ele irá levantar um servidor local para você.

## Brincando com ES6

O ES6 está aí e hoje em dia quem não escreve com ele, está perdendo muita produtividade, pois a linguagem ganhou muitas coisas legais, que facilitam bastante, então vamos configurar para usar. Para isso, iremos utilizar o [Babel](https://babeljs.io/), que irá compilar o nosso código para funcionar em todos os browsers.

Precisamos primeiro instalar todas as coisinhas necessárias:

```bash
npm install --save-dev babel-core babel-loader babel-preset-es2015
```

O `babel-core` e `babel-loader` são os pacotes principais do babel para o funcionamento do mesmo, enquanto o `babel-preset-es2015`, como o nome já diz, será responsável pelas coisas do es6 (aka es2015).

Com tudo instalado, precisamos colocar mais algumas linhas no nosso `webpack.config.js`, para avisar dessa compilação.

```js
module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015']
        }
    }]
}
```

Na linha `3` eu defino que quero que ele leia qualquer arquivo `.js`, na `4` eu garanto que ele não vai ler os `node_modules` (muito importante hein!), na `5` eu defino o babel como meu loader e da `6-8`, eu defino que o preset que vou usar é do `es2015` para ele compilar meus códigos novos.

Feito isso, para testar, vamos lá no nosso arquivo `App.js` e escrever:

```js
const hey = 'Heyyy';
console.log(`${hey} webpack funcionando!`);
```

Se mandarmos rodar agora o `webpack-dev-server`, ele vai entender coisas novas como o `const` e o template literal. Bastante legal né? Se você queria só o es6, é só parar por aí e está tudo ok.

## Colocando o React

Como disse para vocês, o webpack se popularizou muito devido ao React, pois a maioria dos devs passaram a preferir ele ao browserify. Então, vamos aprender a usar o React junto =)

Para isso é bem fácil, primeiro vamos instalar as coisinhas do nosso React queridão:

```bash
npm install react react-dom --save
```

Depois precisamos também instalar o preset do react, para o nosso Babel conseguir compilar o JSX.

```bash
npm install babel-preset-react --save-dev
```

Feito isso, é só adicionar esse novo preset na configuração do `webpack.config.js`.

```js
query: {
    presets: ['es2015', 'react']
}
```

## Vendo o React em ação

Agora que já temos tudo montadinho, vamos só criar uma bobeirinha em React para ver se está tudo ok. Primeiro vá no index e crie uma div com o id `app`.

```html
<div id="app"></div>
```

Depois, dentro da pasta `app`, vamos criar uma nova pasta chamada `components` e nela criar um arquivo `Home.js`, com o seguinte conteúdo:

```js
import React from 'react';

const Home = () => <h1>Hello World!</h1>

export default Home;

```

Só estou importando o React e criando uma stateless function de um componente chamado Home e exportando ele.

Depois disso, vamos ao nosso arquivo `App.js`, apagar o que tinha lá e escrever:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';

ReactDOM.render(<Home />, document.getElementById('app'));
```

Importo as coisas do React, o nosso novo componente da Home e então mando renderizar. Se tudo estiver configurado certinho, você verá um belo `Hello World!` na tela =D

Se quiser dar uma olhada no código final do que fizemos, só [abrir aqui](https://github.com/willianjusten/webpack-example).

## Conclusão

Bom gente, é basicamente esse o start para configurar o webpack para es6 e react. Existem várias configurações que vocês podem adicionar depois, como um uglify do código para quando for levar para produção, carregar css direto por ali, enfim, um mundo de coisinhas legais, mas a base está aí =D
