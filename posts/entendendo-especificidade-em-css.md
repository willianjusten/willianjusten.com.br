---
layout: post
date: '2020-04-06 02:43:00'
image: /assets/img/css-rules.jpg
title: Entendendo especificidade em CSS
description: >-
  O CSS não é difícil, mas é fundamental entender suas regras para não ficar
  tentando as coisas na sorte.
introduction: >-
  O CSS não é difícil, mas é fundamental entender suas regras para não ficar
  tentando as coisas na sorte.
twitter_text: >-
  O CSS não é difícil, mas é fundamental entender suas regras para não ficar
  tentando as coisas na sorte.
main-class: css
color: '#2DA0C3'
tags:
  - css
  - ''
---
## Introdução

Fala meu povo, espero que todos estejam bem nesses tempos de quarentena. Faz muito tempo que não escrevo, estava cheio de trabalho e outras coisas, mas agora pretendo voltar com tudo! 

Irei escrever vários posts de diferentes assuntos, o de hoje é um assunto comum, mas que ainda confunde muita gente e não só os iniciantes. Já vi muita gente "tentando na sorte" para ver se funcionava e acho que não deveria ser assim, então vamos descomplicar isso.

A ideia desse post veio porque eu fiz alguns questionários na Pluralsight, que [abriu os cursos de graça em Abril](https://www.pluralsight.com/offer/2020/free-april-month), e algumas das perguntas eram sobre isso.

Enquanto escrevo, vou ouvindo o álbum [Triumph & Disaster](https://open.spotify.com/album/5VbiQX9WB7ZDNvFOy3pY7J?si=t1I5SJAhRlycG352f4VKSg) de uma banda chamada [We Lost the Sea](https://open.spotify.com/artist/7GVByFFfFJYCzK4d8ZyL6s?si=MseOnVrwSU-BuXfYCVexzA). Um som instrumental bom demais, perfeito para escrever posts, programar e estudar!

### Antes de tudo, um resumo de seletores CSS

Eu tenho um [post sobre seletores CSS](https://willianjusten.com.br/alguns-seletores-css-importantes-para-aprender/) onde explico cada um em detalhes, mas aqui vamos falar só dos tipos que existem, que são:

* **Seletores de Tipo**: onde marcamos diretamente as tags que queremos selecionar, exemplo `p` para selecionar todo `<p>`.
* **Pseudo-elementos**: como o nome sugere, eles não são elementos em si, mas servem para selecionar parte do html relativo a outro seletor. Por exemplo, `p::first-letter`.
* **Seletores de Classe**: um dos que mais utilizamos, podemos atribuir classes para diferentes elementos e então selecionar essas classes. Exemplo: `<p class="text">` pode ser selecionado com `.text`.
* **Seletores de atributo**: selecionamos elementos com um tipo específico de atributo. Por exemplo, `input[type='number']`. Aqui estamos selecionando todos os inputs que tiverem `type=number` como atributo.
* **Pseudo-classes**: selecionamos elementos baseados em seus estados CSS. Por exemplo `:hover`, `:active`, `:checked` e outros.
* **Seletores de Id**: selecionamos um elemento pela sua Id única. Só pode existir um único elemento para cada id. Exemplo: `<h1 id="header">` seria selecionado com `#header`.
* **Estilos inline**: são estilos aplicados diretamente ao elemento, através do atributo `style`. Por exemplo, `<h1 style="font-size: 16px">`

### Os pesos de cada seletor

* **Peso mais baixo**: seletores de tipo e pseudo-elementos
* **Peso baixo**: classe, atributo e pseudo-classes
* **Peso médio**: seletores de id
* **Peso alto**: estilos inline

### Regras de estilo aplicados

**1.** Se estilos de diferentes pesos são aplicados a um mesmo elemento, o estilo que tiver o maior peso será o aplicado. Se os estilos tiverem o mesmo peso, os estilos que vierem mais abaixo, serão os aplicados. Isso é devido ao "efeito cascata" que dá exatamente o nome do CSS (Cascading Style Sheets).

```scss
// <h1 class="foo bar">

.foo {
  color: green;
}

.bar {
  color: red; // essa será a cor aplicada
}
```

**2.** Quando dois seletores de mesmo peso são aplicados a um elemento, é contado como 2x o peso. Por exemplo, elementos com duas classes aplicadas terão um peso maior do que um elemento com só uma classe.

```scss
.foo.bar {
  color: blue; // essa será a cor aplicada
}

.bar {
  color: red;
}
```

**3.** Estilos de peso maior **sempre** irão prevalecer, não importa quantos elementos você colocar. 

Exemplo com id:

```scss
#footer {
  background: red; // essa será a cor aplicada
}

div.class1.class2.class3.class4 {
  background: blue;
}
```

Exemplo com inline:

```html
#title {
  color: blue;
}

<!-- por mais que tenha id, o inline sobrepõe, a cor será red -->
<h1 id="title" style="color:red">Eu terei a cor Vermelha</h1>
```

**4.** Uma regra para ganhar de todos, o famigerado (famoso) `!important`. Essa regra _basicamente_ ignora qualquer outra regra, até mesmo um estilo inline!

```html
#title {
  color: green;
}

h1 {
  color: blue !important;
}

<h1 id="title" style="color: red">Eu terei a cor Azul =)</h1>
```

Por favor, **~~não use~~ evite usar** !important. A única maneira de sobrepor uma regra com _important_ é adicionando ainda mais especificidade somado a outro `!important`, o que torna o código ainda mais dificil de sobreescrever e complexo durante a manutenção.

Caso tenha algum estilo sobreescrevendo o seu, dê uma olhada no nível de especificidade e suba um, seja através do `id` ou uma classe a mais. Mas evite o `!important` o máximo que puder.

**5**. O seletor universal e os combinadores **não** impactam no peso dos seletores. Os combinadores são `>`, `~` e `+`. Por exemplo, se tivermos o seguinte markup:

```html
<div id="block">
  <p class="text">Foo</p>
  <p class="text">Bar</p>
</div>
```

E tivéssemos a seguinte regra css:

```scss
#block > .text {
  color: red;
}

#block .text {
  color: green; // essa será a cor aplicada
}
```

As duas regras possuem exatamente a mesma especificidade (id + classe), portanto, a regra mais embaixo será aplicada.

### Momento do teste

Como eu falei, a ideia do post foi devido a umas perguntas disso no questionário da Pluralsight, então vou deixar aqui para vocês responderem =)

**Pergunta 1**

![Qual vai ser a cor final do background? rect fill="red" style="fill: blue; color: green" Opções: black, green, blue, red](/assets/img/css-question-1.jpeg)

**Pergunta 2**

![Qual a regra vai ter mais especificidade? 1) seletor universal * 2) div > strong 3) .footer h2 span 4) #footer](/assets/img/css-question-2.jpeg)

Se você respondeu `blue` para a pergunta 1 e `#footer` na segunda pergunta, meus parabéns! Se você errou alguma delas, tente ler de novo as regras a cima e descobrir o porquê das respostas.

### Conclusão

Espero que o post tenha sido útil e se você tiver dúvidas e/ou sugestão de assuntos, me manda também! Quero voltar a escrever mais e é sempre bom saber sobre o que escrever.
