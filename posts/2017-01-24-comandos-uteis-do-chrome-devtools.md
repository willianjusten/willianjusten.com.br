---
layout: post
title: "Comandos úteis do Chrome DevTools"
date: 2017-01-24 22:30:59
image: '/assets/img/dev-tools/main.png'
description: "Aumente sua produtividade em poucos minutos aprendendo esses comandos."
main-class: 'dev'
color: '#637a91'
tags:
- frontend
- tip
- devtools
categories:
twitter_text: "Aumente sua produtividade em minutos."
introduction: "Aumente sua produtividade em poucos minutos aprendendo esses comandos."
---

## Introdução

Fala galera, para quebrar um pouquinho com os posts não técnicos, o post de hoje será técnico! Será um post leve, porém de extrema importância para o nosso dia-a-dia. Você, como eu, deve passar boa parte do tempo escrevendo código, mas uma outra grande parte debugando e usando o Chrome DevTools para descobrir e inclusive testar coisas de forma rápida e prática.

Pensando nisso, a Google desenvolveu vários comandos super úteis, que agilizam bastante o nosso processo de desenvolvimento. E eu vou abordar alguns deles aqui. Será basicamente uma tradução adaptada da [documentação do Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/console/command-line-reference).

A banda que me segue durante esse post será [God is an Astronaut](https://open.spotify.com/artist/079svMEXkbT5nGU2kfoqO2), mais uma banda instrumental incrível e que é da [Irlanda](https://willianjusten.com.br/vindo-morar-e-estudar-na-irlanda/)! Mas se você pensa que é um folk, tá enganado, é um rock regado de guitarras, confere!

Bom, chega de papo e vamos lá!

### Notinha importante, leia =)

Antes que muita gente fale que não funciona, se você estiver usando bibliotecas como `jQuery` que utilizam o `$`, a funcionalidade do DevTools será sobreescrita.

### $_

> `$_` retorna o valor do último código executado

No seguinte exemplo, rodamos a expressão `2 + 2`. E a propriedade `$_` quando chamada retorna o mesmo valor.

![Funcionamento do $_](https://developers.google.com/web/tools/chrome-devtools/console/images/recently-evaluated-expression-1.png)

No próximo exemplo, a expressão executada inicialmente contém um `array` de nomes. Portando o nosso `$_` receberá esse array como seu valor inicial. Sabendo que o `$_` é um array podemos realizar as operações normais de um array, como, por exemplo, usar `$_.length` para descobrir o seu tamanho. E tendo este código executado, o valor de `$_` deixará de ser o array, para ser o tamanho do mesmo, conforme código abaixo.

![Funcionamento do $_ usando propriedade](https://developers.google.com/web/tools/chrome-devtools/console/images/recently-evaluated-expression-2.png)

### $0 - $4

> Os valores `$0`, `$1`, `$2`, `$3` e `$4` funcionam como uma referência do histórico dos cinco últimos elementos inspecionados no DOM. `$0` retorna o elemento mais recente, `$1` o segundo mais recente e por aí vai.

Nosso exemplo abaixo, o elemento com a classe `medium` é selecionado no painel. E no console, no momento que executarmos `$0`, iremos mostrar o mesmo elemento:

![Exemplo de $0](https://developers.google.com/web/tools/chrome-devtools/console/images/element-0.png)

A imagem abaixo mostra um elemento diferente sendo selecionado na mesma página. O `$0` agora vai se referir ao elemento mais novo, enquanto o `$1` vai retornar o item previamente selecionado:

![Exemplo de $0 - $1](https://developers.google.com/web/tools/chrome-devtools/console/images/element-1.png)

### $(seletor)

> O `$(seletor)` retorna a referência do primeiro elemento no DOM com o seletor CSS especificado. Essa função é um alias do método `document.querySelector()`.

![Funcionamento do $(seletor)](https://developers.google.com/web/tools/chrome-devtools/console/images/selector-img.png)

Lembrando que assim como o `$_`, você é capaz de buscar todas as propriedades da variável, como no exemplo abaixo, onde pegamos a propriedade `src` da imagem previamente buscada.

![Funcionamento do $(seletor) com propriedade](https://developers.google.com/web/tools/chrome-devtools/console/images/selector-img-src.png)

### $$(seletor)

> O `$$(seletor)` retorna um array de elementos que batem com o seletor CSS espeficificado. O comando é equivalente ao método `document.querySelectorAll()`.

O seguinte exemplo mostra o uso do `$$()` para criar um array de todos os elementos `<img>` na página atual e através de um loop mostrar o valor da `src` de cada elemento.

![Funcionamento do $$()](https://developers.google.com/web/tools/chrome-devtools/console/images/all-selector.png)

### $x(path)

> O `$x(path)` retorna um `array dos elementos do DOM que batem com o `XPath` passado.

Por exemplo, o seguinte código retorna todos os elementos `<p>` de uma página:

![Funcionamento do $x(path)](https://developers.google.com/web/tools/chrome-devtools/console/images/xpath-p-example.png)

E o seguinte código mostra todos os elementos `<p>` que possuem `<a>` internamente.

![Funcionamento do $x(path) com elementos internos](https://developers.google.com/web/tools/chrome-devtools/console/images/xpath-p-a-example.png)

### clear()

> Limpa o console do DevTools.

### copy(objeto)

> Copia a representação em string do objeto selecionado para o clipboard (teu famoso ctrl+V / cmd+V).

Por exemplo, `copy($0)`, copia a string que representa o último elemento selecionado no DOM. 

### debug(função)

> Quando a função especificada é chamada, o `debugger` será chamado e irá parar dentro daquela função no painel de Sources e vai te permitir ver passo a passo o código e então debugar.

Por exemplo, executando o código `debug(jQuery.Animation)` e ela sendo chamada depois:

![Funcionamento do debug](https://developers.google.com/web/tools/chrome-devtools/console/images/debug.png)

Para remover o breakpoint utilize o `undebug(função)` ou use a UI para desabilitar. Para mais informações sobre como usar breakpoints, veja [esse link](https://developers.google.com/web/tools/chrome-devtools/javascript/add-breakpoints).

### dir(objeto)

> O `dir(objeto)` mostra uma lista de todas as propriedades do objeto especificado. Esse método é um alias para o `console.dir()`.

O seguinte exemplo mostra o `dir()` em funcionamento:

![Funcionamento do dir()](https://developers.google.com/web/tools/chrome-devtools/console/images/dir.png)

### dirxml(objeto)

> O `dirxml(objeto)` mostra uma representação XML do objeto especificado, como vemos na aba Elementos. Esse método é equivalente ao `console.dirxml()`.


### inspect(objeto/função)

> O `inspect(objeto/função)` abre e seleciona o elemento ou objeto especificado no painel apropriado: seja no Painel de Elementos para elementos do DOM no P{inel de Profile para objetos do Javascript.

O seguinte exemplo abre o `document.body` no Painel de Elementos:

![Funcionamento do inspect()](https://developers.google.com/web/tools/chrome-devtools/console/images/inspect.png)

### getEventListeners(objeto)

> O `getEventListeners(objeto)` returna os eventos registrados no objeto especificado. O valor retornado é um objeto que contém um array para cada tipo de evento registrado ("click" ou "keydown", por exemplo). Os membros de cada array são objetos que descrevem o `listener` registrado para cada tipo. Por exemplo, o código abaixo lista todos os eventos registrados no objeto `document`.

![Funcionamento do getEventListeners()](https://developers.google.com/web/tools/chrome-devtools/console/images/get-event-listeners.png)

Se mais de um `listener` for registrado para o objeto selecionado, o array então irá conter um membro para cada `listener`. No seguinte exemplo, existem dois `listeners` registrados para o elemento `#scrollingList` para o evento de `mousedown`:

![Funcionamento do getEventListeners com 2 listeners](https://developers.google.com/web/tools/chrome-devtools/console/images/scrolling-list.png)

Você pode expandir esses objetos para explorar suas propriedades:

![Funcionamento do getEventListeners com 2 listeners](https://developers.google.com/web/tools/chrome-devtools/console/images/scrolling-list-expanded.png)

### keys(objeto)

> O `keys(objeto)` retorna um array contendo o nome de todas as propriedades pertencentes ao objeto especificado. Para pegar os valores associados as propriedades, use `values()`.

Por exemplo, supondo uma aplicação definida com o seguinte objeto:

```js
var player1 = { "name": "Ted", "level": 42 }
```

Assumindo que o player1 está definido no namespace global (para simplificar), digitando `keys(player1)` e `values(player1)` no console, os resultados seriam:

![Funcionamento de keys() e values()](https://developers.google.com/web/tools/chrome-devtools/console/images/keys-values.png)

### monitor(função)

> Quando uma função especificada é chamada, uma messagem é mostrada no console indicando que a função foi chamada e quais argumentos foram passados. Utilize `unmonitor()` para cancelar o monitoramento.

![Funcionamento de monitor()](https://developers.google.com/web/tools/chrome-devtools/console/images/monitor.png)

### monitorEvents(objeto[, eventos])

> Quando um dos eventos especificados ocorre no objeto selecionado, o `Event Object` é mostrado no console. Você pode especificar um simples evento para o monitor, um array de eventos ou um tipo de evento genérico mapeado para ser a coleção pré-definida de eventos.

O seguinte código monitora todos os eventos de `resize` no objeto `window`.

![Funcionamento do monitorEvents()](https://developers.google.com/web/tools/chrome-devtools/console/images/monitor-events.png)

Se você desejasse os eventos de `resize` e `scroll`, o código ficaria assim: `monitorEvents(window, ["resize", "scroll"])`.

Você pode, por exemplo, ao especificar só o tipo genérico, pegar tudo relacionado a aquele evento. Por exemplo, ao definir o tipo `key`, você consegue descobrir o valor da tecla pressionada.

![Funcionamento do monitorEvents com tipo genérico](https://developers.google.com/web/tools/chrome-devtools/console/images/monitor-key.png)

### profile([nome]) and profileEnd([nome])

> O `profile()` inicia uma sessão de profiling do Javascript com o nome definido. E o `profileEnd()` completa o profile e mostra os resultados no painel de Profile. Para entender melhor como funcionam os profiles, veja [esse link](https://developers.google.com/web/tools/chrome-devtools/rendering-tools/js-execution).

Para começar um profiling, `profile("Meu profile")` e para finalizar só usar `profileEnd("Meu profile")`. Lembrando que profiles podem ser executados aninhados. Por exemplo:

```js
    profile('A');
    profile('B');
    profileEnd('A');
    profileEnd('B');
```

Resultaria no seguinte painel:

![Resultado do profiling](https://developers.google.com/web/tools/chrome-devtools/console/images/grouped-profiles.png)

### table(data[, colunas])

> Imprime o objeto data no formato de tabela, passando um cabeçalho para as colunas opcional.

![Funcionamento do table()](https://developers.google.com/web/tools/chrome-devtools/console/images/table.png)

## Conclusão

Bom galera, é isso aí, o Chrome DevTools é bem importante e pode se tornar uma ferramenta ainda melhor com a ajuda desses pequenos comandinhos. Espero que eles sejam tão úteis para vocês, como eles são úteis no meu dia-a-dia. 
E aí, tem algum comando legal que você utiliza e não tá na lista? Ou uma curiosidade do DevTools que acha legal mencionar? Manda aí nos comentários =D
