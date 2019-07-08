---
layout: post
title: "Novidades do React 16"
date: 2017-09-28 17:59:22
image: '/assets/img/react-16/main.png'
description: "Veja o que tem de novo com o novo lançamento do React."
main-class: 'js'
color: '#D6BA32'
tags:
- react
- js
categories:
twitter_text: "Veja o que tem de novo com o novo lançamento do React."
introduction: "Veja o que tem de novo com o novo lançamento do React."
---

## Introdução

Fala pessoal, o post de hoje vai ser bem rapidinho para atualizar a galera sobre as coisas novas do React 16 e mais umas coisinhas que aconteceram no ecosistema React. Como vocês já devem saber, eu gosto bastante de React e já faz um bom tempo que escrevo uma [coisa ou outra](https://willianjusten.com.br/tags/#react). Mas seguramente essa versão foi a que teve mais impacto de todas e vou separar esses detalhes logo mais.

Enquanto escrevo esse post, vou ouvindo o novo album do Foo Fighters chamado [Concrete and Gold](https://open.spotify.com/album/6KMkuqIwKkwUhUYRPL6dUc) que ficou demais!

## Confusão, reclamações e mais sobre a licença do React

Se você esteve um pouco desligado nos últimos tempos, estava rolando uma **treta** sobre a licença que o Facebook usava no React e com isso vieram vários posts falando para as pessoas pararem de usar o React em suas aplicações. Um dos mais famosos era o [If you’re a startup, you should not use React](https://medium.com/@raulk/if-youre-a-startup-you-should-not-use-react-reflecting-on-the-bsd-patents-license-b049d4a67dd2), que só com esse título causou uma confusão generalizada...

Sendo sincero, eu devo ter recebido um monte de emails e mensagens perguntando se então não valia mais a pena estudar React, já que o Facebook ia "roubar" tudo e afins. Muito disso por causa desses posts de títulos bem clickbaits e complicados. O Facebook escreveu até um [post](https://code.facebook.com/posts/112130496157735/explaining-react-s-license/) sobre a escolha da licença e como funciona. Mas isso não colou e muiiiita gente continuou a reclamar sobre a licença.

E bom, o Facebook ouviu a comunidade e resolveu [mudar a licença](https://code.facebook.com/posts/300798627056246/relicensing-react-jest-flow-and-immutable-js/) do React e outras bibliotecas para a licença do MIT.

Então, resumindo, o React continua sendo uma ótima biblioteca para trabalhar e vale muito a pena estudar sim tá! =D

## A completa reescrita do React

> O React vai ser todo reescrito? Ferrou, vou ter que aprender tudo de novo? Tá parecendo Angular isso aí!

Sim, um monte de gente estava com esse discurso quando soube da reescrita. Só que o que eles não imaginavam que essa reescrita seria interna e não iria afetar a API publica do React, ou seja, melhor performance, menor tamanho, mas com os métodos e coisas que usávamos antes!

Essa reescrita recebeu o nome de Fiber e você pode saber mais sobre ela [nesse documento do github](https://github.com/acdlite/react-fiber-architecture) ou então nessa [palestra da Lin Clark](https://www.youtube.com/watch?v=ZCuYPiUIONs). E também esse [post hiper atualizado](https://code.facebook.com/posts/1716776591680069/react-16-a-look-inside-an-api-compatible-rewrite-of-our-frontend-ui-library/) falando um pouco de como foi o processo de desenvolvimento dessa reescrita, sempre objetivando não quebrar o que já existia.

O Fiber é responsável pela maioria das novas features do React 16 como `error boundaries` e `fragments`. Eles também já estão trabalhando com `async rendering`, que você pode ter um preview de como funciona, logo abaixo:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Ever wonder what &quot;async rendering&quot; means? Here&#39;s a demo of how to coordinate an async React tree with non-React work <a href="https://t.co/3snoahB3uV">https://t.co/3snoahB3uV</a> <a href="https://t.co/egQ988gBjR">pic.twitter.com/egQ988gBjR</a></p>&mdash; Andrew Clark (@acdlite) <a href="https://twitter.com/acdlite/status/909926793536094209?ref_src=twsrc%5Etfw">September 18, 2017</a></blockquote>

### Novas features / Mudanças

Seguem então alguns dos detalhes legais dessa nova versão:

### Tamanho reduzido

Apesar de várias adições legais, o React ficou menor! Claro que não se compara com outras bibliotecas extremamente pequenas como o [Preact](https://github.com/developit/preact), mas já é um grande avanço. Os tamanhos ficam então:

- `react` agora 5.3 kb (2.2 kb gzipped), antes 20.7 kb (6.9 kb gzipped).
- `react-dom` agora 103.7 kb (32.6 kb gzipped), antes 141 kb (42.9 kb gzipped).
- `react + react-dom` agora 109 kb (34.8 kb gzipped), antes 161.7 kb (49.8 kb gzipped).

Ou seja, a diminuição foi de cerca de **30%**, isso é muito importante para evitar criar apps gigantescas que demoram muito para carregar. Essa diminuição de tamanho muito ocorreu por causa do uso do [Rollup](https://rollupjs.org/), que melhorou o empacotamento da biblioteca.

### Fragments e Strings

Agora você pode retornar um array de elementos diretamente para o render. Antes precisávamos encapsular os elementos em alguma `<div>` ou outro elemento. Agora não é mais necessário isso =)

```jsx
// antes encapsulando com uma div
render() {
  return (
    <div>
      <h1>Meu Título</h1>
      <p>Meu texto lindo aqui.</p>
    </div>
  )
}

// agora usando como array
render() {
  return [
    <h1 key='header'>Meu Título</h1>,
    <p key='text'>Meu texto lindo aqui.</p>
  ]
}
```

Lembrando de não esquecer de usar o `key` para não receber nenhum warning. No futuro eles planejam fazer uma forma para também não precisar de adicionar o `key` para esses casos. E o mesmo ocorre para strings, que agora são suportadas diretamente:

```jsx
// antes encapsulando com um span
render() {
  return <span>Usando o Span!<span>;
}

// agora usando como string direta
render() {
  return 'Sem Spans!';
}
```

### Melhor error handling

Antes, quando tínhamos algum erro no React, podia acabar prejudicando tanto a renderização da tela atual, como o funcionamento das outras coisas a serem feitas depois. Para evitar esse tipo de erro tão grave, a galera do React pensou que "Uma parte da UI não precisa quebrar o aplicativo todo".

Com o `Error boundaries` nós podemos capturar esses errors em qualquer parte do componente, jogar no console o erro e mostrar um fallback na UI, com uma mensagem mais informativa, por exemplo.

E como isso funciona? É bastante simples! Temos um novo método chamado `componentDidCatch`, que vai ser responsável por fazer o report desse erro para nós e então facilitar para tratarmos. Segue um exemplo básico abaixo:

```jsx
componentDidCatch(error, info) {
  // Adicionamos uma variável no nosso state
  // para tratarmos na nossa UI
  this.setState({ ...state, hasError: true });
  // E você também tem 2 paramêtros para reportar
  console.log(error); // o erro em si
  console.log(info); // contém o Component Stack
}
```

Depois de definido o nosso `componentDidCatch` podemos ir no método `render` do nosso componente e só colocar a validação necessária, para imprimir o componente que queremos ou caso tenha um erro, imprimir nossa mensagem, por exemplo:

```jsx
 render() {
    if (this.state.hasError) {
      // Imprimindo uma mensagem de erro
      return <h1>Ixi, alguma coisa deu errado =(</h1>;
    }
    else {
      // retornando o componente de fato
      ...
    }
  }
```

### Portals

Essa feature permite renderizar um elemento filho num DOM node que existe fora da hierarquia do pai do componente. Como assim? Em geral, quando retornamos um elemento de método `render` de um componente, ele é montado no DOM com filho do nó pai mais próximo. Exemplo:

```jsx
render() {
  // React monta uma nova div e renderiza o filho dentro
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

Mas, as vezes é interessante inserirmos o filho numa posição diferente do DOM:

```jsx
render() {
  // O React não vai criar uma nova div. Ele vai renderizar o filho dentro do `domNode`.
  // `domNode` é qualquer nó válido, independente de sua localização no DOM.
  return ReactDOM.createPortal(
    this.props.children,
    domNode,
  );
}
```

Um caso típico do uso de `portals` é quando um componente pai tem `overflow: hidden` ou `z-index`, mas você precisa que o filho "vaze" do container. Como, por exemplo, `tooltips`, `hovercards` e `dialogs`.

Você pode ler mais sobre nesse [post do Facebook](https://facebook.github.io/react/docs/portals.html).

### Melhor server-side rendering

Graças ao Fiber novamente, toda a forma de server-side rendering foi reescrita e agora está extremamente rápida! Suporta **streaming** e com isso você pode enviar os dados para o client de forma melhor e mais ágil. E graças a [nova forma de empacotamento](https://facebook.github.io/react/blog/#reduced-file-size), que não necessita mais do `process.env`, o processo ficou bem mais rápido.

Tem um [post bem bacana falando bastante sobre isso](https://hackernoon.com/whats-new-with-server-side-rendering-in-react-16-9b0d78585d67), indicando que o React 16 acaba sendo **3x mais rápido** que o React 15.

Você pode ler mais sobre o `ReactDomServer` está funcionando, [nesse post](https://facebook.github.io/react/docs/react-dom-server.html).

### Suporte a DOM Attributes

Antes não era possível criar atributos customizados na nossa tag. Ou seja, se não fosse `camelCase` ou tivesse `data-` ou `aria-`, o React acabava não imprimindo o que queríamos.

```jsx
<div mycustomattribute="something" />

// React 15 iria imprimir
<div />

// React 16 imprime o que desejo
<div mycustomattribute="something" />
```

Essa é uma mudança pequena, mas que pode ser útil para aqueles casos onde necessitamos de atributo para um browser específico ou alguma coisa de API externa. Você pode ler mais sobre essa feature [aqui](https://facebook.github.io/react/blog/2017/09/08/dom-attributes-in-react-16.html).

## Sobre atualização, breaking changes, deprecations...

O primeiro aviso é: **Se você já tem sua aplicação rodando no React 15.6 sem nenhum warning, irá funcionar no React 16.**

### Deprecations

Para hidratar um container server-side agora tem uma API explicita nova. Agora você pode usar `ReactDOM.hydrate` ao invés de `ReactDOM.render`. Continue usando `ReactDOM.render` se estiver fazendo só client-side rendering.

O suporte ao `React Addons` foi descontinuado e com exceção do `react-addons-perf` que terá uma versão nova, os outros addons não terão atualizações.

No momento o `react-addons-perf` não funciona no React 16 e enquanto isso, é encorajado usar [as ferramentas do Browser para medir performance](https://facebook.github.io/react/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab).

### Breaking Changes

Como o objetivo foi não impactar fortemente o ecosistema já existente, as breaking changes são bem pequenas e que só afetam casos bem incomuns.

- React 15 tinha um suporte (sem documentação e bem limitado) para Error Boundaries que era o `unstable_handleError`. Esse método foi renomeado para `componentDidCatch`.
- `ReactDOM.render` e `ReactDOM.unstable_renderIntoCotnainer` agoram retornam `null` se chamados dentro de um método de lifecycle. Para trabalhar com isso, você pode usar [portals](https://github.com/facebook/react/issues/10309#issuecomment-318433235) ou [refs](https://github.com/facebook/react/issues/10309#issuecomment-318434635).
- `setState`:
  - Chamar `setState` com `null` não ativa uma atualização dos estados. Isso permite que você defina uma função para atualizar caso queira renderizar novamente.
  - Chamar `setState` diretamente num `render` vai causar uma atualização dos estados. Lembrando que você não deveria chamar `setState` dentro de um `render`.
  - Os callbacks de `setState` agora ativam imediatamente depois do `componentDidMount`/`componentDidUpdate` ao invés de após todos os componentes serem renderizados.
- Ao trocar `<A />` por `<B />`, `B.componentWillMount` agora vai sempre acontecer antes de `A.componentWillUnmount`. Antes, `A.componentWillUnmount` podia inicializar primeiro em certos casos.
- Antes, mudar o `ref` de um component sempre iria desmontar a `ref` antes que o `render` do componente fosse chamado. Agora, o `ref` é mudado depois, quando aplicadas as mudanças no DOM.
- `componentDidUpdate` lifecycle não recebe mais o parâmetro `prevContex`.
- Shallow Renderer não chama mais o `componentDidUpdate` porque as `refs` do DOM não estão disponíveis. Isso faz ser consistente com o `componentDidMount` que não era chamado nas versões anteriores também.

## Empacotamento

Como dito antes, a forma de empacotamento do React mudou. E não existe mais `react/lib/*` e `react-dom/lib/*`. E os nomes/caminhos mudaram para enfatizar a diferença entre os builds de produção e desenvolvimento:

- `react/dist/react.js` → `react/umd/react.development.js`
- `react/dist/react.min.js` → `react/umd/react.production.min.js`
- `react-dom/dist/react-dom.js` → `react-dom/umd/react-dom.development.js`
- `react-dom/dist/react-dom.min.js` → `react-dom/umd/react-dom.production.min.js`

## Requisitos

O React 16 depende dos collection types [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) e [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). Se você precisa dar suporte para browsers antigos que não suportam nativamente, será necessário incluir um polyfill na aplicação. Você pode ver mais sobre [aqui](https://facebook.github.io/react/blog/#javascript-environment-requirements).

## Site atualizado da Documentação

É isso mesmo, refizeram o site da documentação, ficou mais limpo, mais fácil de acessar os menus e numa linguagem de bem fácil entendimento, dá uma [checada lá](https://reactjs.org/).

## Conclusão

Bom galera, é basicamente isso. O React continua firme e forte e cada vez melhorando mais! Não precisa ter medo de começar a estudar não, porque a biblioteca vai longe ainda. E essas mudanças novas foram mais do que bem vindas!
