---
layout: post
date: '2019-03-10 07:29:00'
image: /assets/img/converter-hooks.png
title: Convertendo um Class Based Component para React Hooks
description: Como converter um class based component para o novo React Hooks.
introduction: Como converter um class based component para o novo React Hooks.
twitter_text: Como converter um class based component para o novo React Hooks.
main-class: js
color: '#D6BA32'
tags:
  - react
  - hooks
  - youtube
  - testes
---

## Introdução

Fala pessoal, esse é mais outro post/vídeo, e como o título diz, a ideia será converter um componente para usar o novíssimo hooks. Se você é um leitor assíduo do post, já deve ter visto [meu post sobre hooks](https://willianjusten.com.br/habemus-react-hooks/), lá eu falo o que são, para que servem e outras coisas mais.

O componente escolhido para converter foi o [React-Snakke](https://github.com/diogomoretti/react-snakke/) feito pelo [Diogo Moretti](https://twitter.com/diogomoretti_).

Você pode ver o código todo nesse link do [CodeSandbox](https://codesandbox.io/s/jjyyn9n1vv) e abaixo deixarei o vídeo também.

## Vídeo

<iframe width="560" height="315" src="https://www.youtube.com/embed/hbRKpjgFwPk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Sobre o código e o refactor

Bom, eu vou pontuar as partes mais importantes do código aqui, mas eu aconselho a assistir o vídeo também, já que nele eu explico mais detalhadamente o processo. Certas partes do código serão simplificadas com `...`, mas você pode ver tudo lá no [CodeSandbox](https://codesandbox.io/s/jjyyn9n1vv).

### Transformar de Classe para Função

Bom, a primeira etapa, é transformar o componente que usava classe, para função. Já que os hooks **não funcionam** dentro de classes.

```js
// antes
export default class Snakke extends Component { ... }

// depois
export default function Snakke(props) { ... }
```

### Remover o this e usar as variáveis diretamente

Feito isso, a outra coisa é que todos os lugares que tiverem referências ao `this`, ou seja, o objeto da classe, não existem mais e você precisa usar ou direto do `props` ou a variável direta se for o caso. E variáveis dentro das funções precisam ser assinaladas como tal, usando `let` ou `const`.

```js
// antes
styles = {
  ...
  height: this.props.height,
  opacity: this.props.opacity,
  zIndex: this.props.zIndex,
  ...
}

// depois
const styles = {
  ...
  height: props.height,
  opacity: props.opacity,
  zIndex: props.zIndex,
  ...
}
```

### Substituir state pelo useState

Depois dessas duas mudanças, nós começamos a procurar locais onde tenham definições e mudanças de `state`.

E no caso do código inicial, nós tínhamos a variável `progress` que possuía um valor inicial e também recebia uma atualização através do `this.setState`

```js
state = {
  progress: 0
}

this.setState({
  progress: total
})
```

Dentro do React Hooks, para trabalhar com estados, nós temos o método [useState](https://willianjusten.com.br/habemus-react-hooks/#usando-o-hook-de-estados-usestate). E ele funciona da seguinte forma:

```js
import React, { useState } from 'react'

const [progress, setProgress] = useState(0)
```

Nós criamos um array que recebe 2 valores, o primeiro é a variável que queremos mexer com os valores dela (nosso estado) e o segundo parâmetro é o método que vai ser responsável por atualizar esse estado, no caso o `setProgress`.

O último detalhe sobre o `useState` é que ele recebe um parâmetro, que é o estado inicial da variável, no nosso caso, é o valor `0`.

### Substituir métodos lifecycle por useEffect

Dentro desse componente inicial, nós usávamos o `componentDidMount` e `componentWillUnmount`, que serviam para adicionar/remover o listener de scroll no momento que o componente era montado/desmontado.

Nos hooks, nós podemos substituir essa parte pelo `useEffect`, ficando dessa forma:

```js
// antes
componentDidMount() {
  window.addEventListener('scroll', this.setProgress)
}

componentWillUnmount() {
  window.removeEventListener('scroll', this.setProgress)
}

// depois
useEffect(() => {
  window.addEventListener('scroll', handleScroll)
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [])
```

Como funciona isso? No momento que o componente renderiza na tela, o `useEffect` é chamado e com ele, o listener é adicionado. O mesmo método possui um `cleanup` que é chamado sempre quando o componente desmonta e para indicar isso, basta que você retorne uma função, que é exatamente o que fazemos, dentro do nosso `return` nós passamos o `removeListener`, assim garantimos que o listener vai ser desmontado junto do componente, sem causar problemas de memory leak/performance.

Um último detalhe do `useEffect` é que ele recebe como segundo parâmetro, um array, onde podemos indicar quais propriedades queremos ficar vigiando, para que o `useEffect` execute toda vez que essas propriedades sejam atualizadas. Se não passarmos nenhum array, o `useEffect` vai ser chamado em cada rerender, para evitar isso, já que só queremos adicionar o listener uma vez, nós passamos um array vazio `[]`, isso garante que o `useEffect` será chamado só quando for montado e o cleanup só quando desmontado.

### Substituir setState para o método criado no useState

Vimos acima que nós criamos o método `setProgress` certo? Ele vai servir para atualizar o `progress` quando desejarmos, assim como o `setState` fazia. Então, para que tenha essa mudança de estado, falta chamar esse método no seu devido lugar, passando o novo valor.

```js
// antes
...
this.setState({
  progress: total,
})

// depois
...
setProgress((window.scrollY / bodyHeight) * 100)
```

Após ter feito essas mudanças, é possível que já esteja tudo funcionando certinho. Caso não esteja, verifique se todos os `this` foram removidos e se onde estava usando `state` já está atualizado para a variável escolhida.

Viu só? Não é tão difícil fazer essa conversão não é mesmo? =D

### Antes/depois

Vamos fazer uma comparação (antes e depois) dos componentes. Abaixo segue o componente utilizando classe (antes das nossas alterações):

```jsx
import React, { Component } from 'react'

export default class Snakke extends Component {
  constructor(props) {
    super(props)
    this.setProgress = this.setProgress.bind(this)
    this.getPercentageScroll = this.getPercentageScroll.bind(this)
  }

  state = {
    progress: 0
  }

  styles = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: this.props.height,
    opacity: this.props.opacity,
    zIndex: this.props.zIndex,
    filter: this.props.shadow ? `drop-shadow(0 0 .1em ${this.props.color})` : 'none',
    background: `linear-gradient(to right, ${this.props.color} var(--scroll), transparent 0)`
  }

  getPercentageScroll (scrollPos) {
    const bodyHeight = document.body.clientHeight - document.documentElement.clientHeight
    return (scrollPos / bodyHeight) * 100
  }

  setProgress () {
    let total = this.getPercentageScroll(window.scrollY)

    this.setState({
      progress: total
    })
  }

  componentDidMount () {
    window.addEventListener('scroll', this.setProgress)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.setProgress)
  }

  render () {
    return (
      <div className='snakke-progress' style={'--scroll': `${this.state.progress}%`, ...this.styles }></div>
    )
  }
}

Snakke.defaultProps = {
  color: '#000',
  height: '5px',
  opacity: '1',
  zIndex: '9999',
  shadow: false
}
```

Veja abaixo o componente, já com as nossas alterações, utilizando hooks:

```jsx
import React, { useState, useEffect } from 'react'

export default function Snakke(props) {
  const styles = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: props.height,
    opacity: props.opacity,
    zIndex: props.zIndex,
    filter: props.shadow ? `drop-shadow(0 0 .1em ${props.color})` : 'none',
    background: `linear-gradient(to right, ${props.color} var(--scroll), transparent 0)`,
  }

  const [progress, setProgress] = useState(0)

  function handleScroll() {
    const bodyHeight = document.body.clientHeight - document.documentElement.clientHeight
    setProgress((window.scrollY / bodyHeight) * 100)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return <div className="snakke-progress" style={'--scroll': `${progress}%`, ...styles} />
}

Snakke.defaultProps = {
  color: '#000',
  height: '5px',
  opacity: '1',
  zIndex: '9999',
  shadow: false,
}
```

## Conclusão

A mudança não é enorme, mas dá para ver que o código foi simplificado, não precisamos mais ficar preocupados em entender de onde o `this` tá vindo e para onde tá indo, qual o seu contexto. Podemos também diminuir métodos e ~~pelo menos para mim~~, o código ficou bem melhor.

Lembrando que não é errado usar Classes para os componentes, a própria equipe do React diz [para não sairmos convertendo tudo sem necessidade](https://reactjs.org/docs/hooks-faq.html#do-i-need-to-rewrite-all-my-class-components). A ideia do post é mais para mostrar como é o funcionamento de um e outro, para que caso você pegue um código em hooks, não se sinta perdido.

Se você ficou com alguma dúvida, só falar nos comentários ou me mandar mensagem, que eu ajudo =)
