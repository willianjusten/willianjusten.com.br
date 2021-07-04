---
layout: post
date: 2020-05-11 10:44:51
image: /assets/img/testing-library-mistakes.jpg
title: Erros comuns com o React Testing Library
description: Aprenda com os erros dos outros e melhore seu código também.
introduction: Aprenda com os erros dos outros e melhore seu código também.
twitter_text: Aprenda com os erros dos outros e melhore seu código também.
main-class: js
color: "#D6BA32"
tags:
  - react
  - testes
  - tdd
---
## Introdução

Fala pessoal, o post de hoje é na realidade uma tradução/adaptação [desse excelente post do Kent C. Dodds](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library), que é o criador da [React Testing Library](https://testing-library.com/).

Há pouco tempo eu fiz um [vídeo/post](https://willianjusten.com.br/criando-um-react-custom-hook-com-testes/) ensinando a criar um custom hook do zero com testes e utilizei essa biblioteca, que para mim é a melhor para o ecossistema React atual.

Bom, vamos lá, enquanto escrevo esse post, vou ouvindo um cara chamado [Malaki](https://open.spotify.com/artist/6DWp3hFGq7c3nyQ3AT7RDF?si=BEE2nTzYTC6jOyNO7mCYhw), um irlandês natural de Dublin (cidade que tenho no coração) que canta um hip-hop misturado com um R&B e outras coisas mais, é um som bom, pode conferir.

## Notas

Cada erro foi organizado pelo seguinte nível de importância:

- `baixa`: é mais da opinião do Kent e você pode ignorar se quiser e não vai ter nenhum problema.
- `média`: você pode começar a ver bugs, perder confiança nos testes ou fazendo trabalho que nem precisa.
- `alta`: definitivamente veja isso. Muito provavelmente você está perdendo confiança dos testes e provavelmente terá testes problemáticos.

### Usar `wrapper` como nome da variável no retorno da função `render`

> Importância: baixa

```javascript
// ❌
const wrapper = render(<Example prop="1" />)
wrapper.rerender(<Example prop="2" />)

// ✅
const {rerender} = render(<Example prop="1" />)
rerender(<Example prop="2" />)
```

O nome `wrapper` é uma coisa velha que vem do `enzyme` e não precisamos disso aqui. O valor do retorno de `render` não está "encapsulando" nada. É simplesmente um conjunto de utilitários (que graças a dica mais abaixo) na maioria das vezes você nem vai precisar mesmo.

**Dica: use destructure do que você precisa do `render` ou então chame de `view`**

### Usar `cleanup`

> Importância: média

```javascript
// ❌
import {render, screen, fireEvent, cleanup} from '@testing-library/react'

afterEach(cleanup)

// ✅
import {render, screen, fireEvent} from '@testing-library/react'
```

Já tem um bom tempo que o `cleanup` acontece automaticamente (suportado pela maioria dos frameworks de teste) e você não precisa se preocupar com isso. Você pode ver [mais aqui](https://testing-library.com/docs/react-testing-library/api#cleanup).

 **Dica: não use `cleanup`**

### Não estar usando `screen`

> Importância: média

```javascript
// ❌
const {getByRole} = render(<Example />)
const errorMessageNode = getByRole('alert')

// ✅
render(<Example />)
const errorMessageNode = screen.getByRole('alert')
```

O `screen` foi adicionado na [versão 6.11.0](https://github.com/testing-library/dom-testing-library/releases/tag/v6.11.0). Ele vem do mesmo import que você pega o `render`:

```javascript
import {render, screen} from '@testing-library/react'
```

O benefício de usar o `screen` é que você não precisa ficar atualizando a chamada do destructuring do `render` para cada query que você precisar. Além disso, basta digitar `screen` e deixar a mágica do autocomplete fazer o resto para você.

A única exceção para isso é se você estiver definindo um `container` ou `baseElement`, o que muito provavelmente você nem deveria estar fazendo.

Você também pode usar `screen.debug` ao invés de `debug`.

**Dica: use `screen` para queries e debug**

### Usar a asserção errada

> Importância: alta

```javascript
const button = screen.getByRole('button', {name: /disabled button/i})

// ❌
expect(button.disabled).toBe(true)
// error message:
//  expect(received).toBe(expected) // Object.is equality
//
//  Expected: true
//  Received: false

// ✅
expect(button).toBeDisabled()
// error message:
//   Received element is not disabled:
//     <button />
```

A asserção `toBeDisabled` vem do [jest-dom](https://github.com/testing-library/jest-dom). É extremamente recomendável usar o `jest-dom` pois ele dá mensagens de erro muito mais claras.

> Dica do Willian: sempre ao escrever um teste, faça a pergunta a você e que resposta você esperaria receber. Quanto mais explicada é a resposta, mais fácil de você entender o problema e corrigir, se você receber só um "esperava `false` e veio `true`" as vezes não vai te ajudar.

### Encapsular tudo no `act` de forma desnecessária

> Importância: média

```javascript
// ❌
act(() => {
  render(<Example />)
})

const input = screen.getByRole('textbox', {name: /choose a fruit/i})
act(() => {
  fireEvent.keyDown(input, {key: 'ArrowDown'})
})

// ✅
render(<Example />)
const input = screen.getByRole('textbox', {name: /choose a fruit/i})
fireEvent.keyDown(input, {key: 'ArrowDown'})
```

Algo bem comum é ver as pessoas usando o `act` em tudo, exatamente para evitar aqueles warnings enormes do React. Mas o `render` e o `fireEvent`, por exemplo, já são encapsulados no `act`, então não faz necessidade encapsular novamente.

E na maioria das vezes, se você está vendo os warnings do `act`, não deve ser só silenciado, mas está provavelmente lhe avisando que algo inesperado está acontecendo no seu teste. Você pode entender mais [sobre isso nesse post](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning).

**Dica: aprenda quando o `act` é necessário e evite encapsular em tudo desnecessariamente**

### Usar queries erradas

> Importância: alta

```javascript
// ❌
// assumindo que você tem este DOM para trabalhar:
// <label>Username</label><input data-testid="username" />
screen.getByTestId('username')

// ✅
// mude o DOM para ser acessível ao associar a label e definindo seu tipo
// <label for="username">Username</label><input id="username" type="text" />
screen.getByRole('textbox', {name: /username/i})
```

Na documentação, existe [uma página sobre qual query usar](https://testing-library.com/docs/guide-which-query), exatamente para que você tente utilizar a que mais faz sentido com o seu teste, para garantir mais confiança.  

### Usar `container` para buscar elementos

Uma sub-seção para "Usar queries erradas" eu quero falar sobre usar query no `container` diretamente.

```javascript
// ❌
const {container} = render(<Example />)
const button = container.querySelector('.btn-primary')
expect(button).toHaveTextContent(/click me/i)

// ✅
render(<Example />)
screen.getByRole('button', {name: /click me/i})
```

Nós queremos garantir que os usuários possam interagir com sua UI e se você usa o `querySelector` nós perdemos muito dessa confiança, o teste fica mais difícil de ler e vai quebrar mais frequentemente. Isso vai de mãos dadas para a próxima seção:

### Não buscar pelo texto

Continuando sobre "Usar queries erradas", quero falar o porquê eu recomendo que você busque pelo *texto atual* (no caso que tiver localização, recomendo usar a linguagem padrão), ao invés de testar IDs ou outros mecanismos.

```javascript
// ❌
screen.getByTestId('submit-button')

// ✅
screen.getByRole('button', {name: /submit/i})
```

Se você não buscar pelo texto de verdade, você vai ter um trabalho extra para garantir que os textos estão sendo aplicados corretamente. A maior reclamação que eu ouço sobre isso é que dessa forma, os editores acabam quebrando os testes. Minha refutação sobre isso é que se o editor muda "Username" para "Email", essa é uma mudança que eu definitivamente vou querer saber (pois provavelmente precisarei mudar na minha implementação). Outra coisa, é que se esse tipo de situação quebra alguma coisa, corrigir esse problema não vai tomar praticamente nenhum tempo, vai ser fácil de achar e corrigir.

Então o custo de fazer dessa forma é muito baixo e o benefício é que você garante que seus textos estão sendo aplicados corretamente e seus testes são mais fáceis de escrever e ler.

Devo mencionar que nem todo mundo concorda comigo, sinta-se a vontade para ler mais [nessa thread no twitter](https://twitter.com/kentcdodds/status/1203179007644012544).

### Não usar `*ByRole` na maior parte do tempo

Nas versões mais recentes, as queries do `*ByRole` foram seriamente melhoradas (graças ao trabalho do [Sebastian Silbermann](https://twitter.com/sebsilbermann)) e agora são a abordagem número um para buscar o componente. Seguem alguns dos meus recursos favoritos.

A opção `name` permite você buscar elementos pelo seu [nome acessível](https://www.w3.org/TR/accname-1.1/), que é o que é lido pelos leitores de tela e funciona até quando o elemento tem seu texto separado em diferentes elementos. Por exemplo:

```javascript
// assumindo que você a seguinte estrutura de DOM para trabalhar
// <button><span>Hello</span> <span>World</span></button>

screen.getByText(/hello world/i)
// ❌ falha com o seguinte erro:
// Unable to find an element with the text: /hello world/i. This could be
// because the text is broken up by multiple elements. In this case, you can
// provide a function for your text matcher to make your matcher more flexible.

screen.getByRole('button', {name: /hello world/i})
// ✅ funciona!
```

Uma das razões para as pessoas não usarem o `*ByRole` é porque elas não estão familiares com os papéis implícitos nos elementos. [Aqui vai uma lista dos papéis na MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles). Outro dos meus recursos favoritos do `*ByRole` é que se você não for capaz de encontrar um elemento com o papel especificado. Além de mostrar no log todo o DOM, que é o normal que você recebe ao usar o `get*` ou `find*`, ele também vai mostrar todos os papéis que você pode buscar!

```javascript
// assumindo que temos essa estrutura de DOM para trabalhar
// <button><span>Hello</span> <span>World</span></button>
screen.getByRole('blah')
```

Isso irá falhar com a seguinte mensagem de erro:

```javascript
TestingLibraryElementError: Unable to find an accessible element with the role "blah"
Here are the accessible roles:
  document:
  Name "":
  <body />
  --------------------------------------------------
  button:
  Name "Hello World":
  <button />
  --------------------------------------------------
<body>
  <div>
    <button>
      <span>
        Hello
      </span>
      <span>
        World
      </span>
    </button>
  </div>
</body>
```

Repare que nem precisamos adicionar `role=button` ao nosso `button`, afinal ele já possui esse papel. É um papel implícito, o que nos leva ao próximo tópico...

### Adicionar `aria-`, `role` e outros atributos incorretamente

> Importância: alta

```javascript
// ❌
render(<button role="button">Click me</button>)

// ✅
render(<button>Click me</button>)
```

Tacando atributos de acessibilidade de qualquer maneira não é somente desnecessário (como o caso acima), como também pode confundir os leitores de tela e os usuários. Os atributos de acessibilidade devem ser utilizados onde realmente precisam, nos casos onde a semântica do HTML não satisfaz o caso de uso (como quando você está criando um elemento não nativo e quer fazê-lo nativo, como um [autocomplete](https://github.com/downshift-js/downshift)).

Se é isso que você está construindo, certifique-se de usar uma biblioteca existente que faça isso de forma acessível ou siga as práticas do WAI-ARIA. Eles geralmente têm [ótimos exemplos](https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html).

**Dica: evite adicionar atributos desnecessários ou incorretos**

### Não usar o `@testing-library/user-event`

> Importância: média

```javascript
// ❌
fireEvent.change(input, {target: {value: 'hello world'}})


// ✅
await userEvent.type(input, 'hello world')
```

O [@testing-library/user-event](https://github.com/testing-library/user-event) é um pacote criado em cima do `fireEvent`, mas ele fornece vários métodos que se assemelham mais às interações do usuário. No exemplo acima, o `fireEvent.change` vai simplesmente disparar um evento de `change` no input. No entanto, o `type` da chamada vai ativar para os eventos de `keyDown`, `keyPress` e `keyUp`, o que é muito mais próximo da interação real de um usuário. Isso pode ser útil para trabalhar com bibiliotecas que talvez não possuam um `listener` para o evento de `change`.

Ainda estamos trabalhando no `@testing-library/user-event` para garantir que ele entrega o que promete: disparar todos os mesmos eventos que um usuário irá fazer em uma específica ação. Não acho que estamos lá ainda e por isso não está dentro da `@testing-library/dom` (mas é possível que estará no futuro). Entretanto, estou confiante o suficiente para recomendar que você dê uma olhada e utilize nos seus testes ao invés do `fireEvent`.

**Dica: use o @testing-library/user-event no lugar do fireEvent sempre que possível.**

### Usar `query*` variantes para tudo exceto checar a não-existência

> Importância: alta

```javascript
// ❌
expect(screen.queryByRole('alert')).toBeInTheDocument()

// ✅
expect(screen.getByRole('alert')).toBeInTheDocument()
expect(screen.queryByRole('alert')).not.toBeInTheDocument()
```

A única razão pela qual a variante da consulta `query*` é exposta é para você ter uma função que você pode chamar, que não gere um erro se nenhum elemento for encontrado para corresponder à consulta (ela retornará `null` se nenhum elemento for encontrado). A única razão pela qual isso é útil é verificar se um elemento não é renderizado na página.

**Dica: só use `query*` variantes para fazer asserções de quando um elemento não deve ser encontrado.**

### Usar o `waitFor` para buscar elementos que podem ser buscados com `find*`

> Importância: alta

```javascript
// ❌
const submitButton = await waitFor(() =>
  screen.getByRole('button', {name: /submit/i}),
)

// ✅
const submitButton = await screen.findByRole('button', {name: /submit/i})
```

Essas duas pequenas partes de código são basicamente equivalentes (`find*` usa o `waitFor` embaixo dos panos), mas o segundo é mais simples e a mensagem de erro que você vai encontrar será melhor.

**Dica: use `find*` sempre que você quiser buscar por algo que talvez não esteja disponível logo de início.**

### Passar uma callback vazia para o `waitFor`

> Importância: alta

```javascript
// ❌
await waitFor(() => {})
expect(window.fetch).toHaveBeenCalledWith('foo')
expect(window.fetch).toHaveBeenCalledTimes(1)

// ✅
await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('foo'))
expect(window.fetch).toHaveBeenCalledTimes(1)
```

O propósito do `waitFor` é permitir que você espera para que alguma coisa específica aconteça. Se você passar uma callback vazia, pode até funcionar, muitas vezes você só precisa de "mais um tick no event loop". Mas fazendo isso, você estará criando um teste frágil que pode facilmente falhar se você refatorar sua lógica assíncrona.

**Dica: espere pela específica asserção dentro do `waitFor`**

### Ter múltiplas asserções para uma mesma `waitFor` callback

> Importância: baixa

```javascript
// ❌
await waitFor(() => {
  expect(window.fetch).toHaveBeenCalledWith('foo')
  expect(window.fetch).toHaveBeenCalledTimes(1)
})

// ✅
await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('foo'))
expect(window.fetch).toHaveBeenCalledTimes(1)
```

Digamos que, no exemplo acima, `window.fetch` foi chamado duas vezes. Portanto, a chamada `waitFor` falhará, no entanto, teremos que aguardar o tempo limite antes de vermos a falha no teste. Ao colocar uma única asserção, podemos esperar que a interface do usuário se estabilize no estado em que queremos verificar e também falhar mais rápido se uma das asserções acabar falhando.

**Dica: use uma asserção por callback**

### Gerando efeitos colaterais com `waitFor`

```javascript
// ❌
await waitFor(() => {
  fireEvent.keyDown(input, {key: 'ArrowDown'})
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
})

// ✅
fireEvent.keyDown(input, {key: 'ArrowDown'})
await waitFor(() => {
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
})
```

O `waitFor` foi feito para coisas onde você não tem determinado o tempo entre uma ação que você fez e a asserção criada. Por esse motivo, o retorno de chamada pode ser chamado (ou verificado quanto a erros) um número não determinístico de vezes e frequência (é chamado tanto em um intervalo quanto em quando há mutações no DOM). Portanto, isso significa que seu efeito colateral pode ser executado várias vezes!

Isso também significa que você não pode usar asserções de `snapshot` com o `waitFor`. Se você deseja usar um `snapshot`, primeiro aguarde uma asserção específica e, em seguida, você pode criar seu `snapshot`.

**Dica: coloque os efeitos colaterais fora da callback do `waitFor` e reserve a callback somente para asserções.**

### Não usar os plugins do ESlint para a Testing Library

> Importância: média

Se você quiser evitar todos esses erros comuns, então esse plugins oficiais irão ajudar muito:

- [eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)
- [eslint-plugin-jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom)


## Conclusão

A grande razão para eu ter traduzido esse artigo, é porque ele é espetacular e quanto mais gente ver, melhor. Eu posso afirmar que aprendi muita coisa no post e inclusive cometia alguns dos erros!
