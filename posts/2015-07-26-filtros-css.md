---
layout: post
title: "Filtros CSS"
date: 2015-07-26 17:30:23
image: '/assets/img/filtros-css/main.png'
description: 'Transforme o seu browser no seu próprio photoshop e aplique filtros somente com css.'
main-class: 'css'
color: '#2DA0C3'
tags:
- css
- tutorial
categories:
twitter_text: "Transforme o seu browser no seu próprio photoshop e aplique filtros somente com css."
introduction: "Transforme o seu browser no seu próprio photoshop e aplique filtros somente com css."
---

## Introdução

Antes de mais nada, quero agradecer a todos que acessam meu blog, hoje eu alcancei a marca de **+200 mil acessos** em pouco mais de 6 meses que escrevo, isso pode não parecer nada, mas para mim é muito importante. Fico feliz de saber que tanta gente lê meu blog e que de vez em quando eu ajudo alguém =)

Já que eu subi a serra ontem, hoje estou descendo e nada melhor que aproveitar esse tempo para escrever um post. Está fazendo um friozinho bacana e está super nublado aqui, para acompanhar esse tempo, continuo na vibe de jazz, ouvindo uma playlist chamada [Pure Mellow Jazz](https://open.spotify.com/playlist/37i9dQZF1DWSBRKlyNxSuy?si=bEQu8_38Twq39uoRtABu_Q), muito boa.

O post não pode ser muito extenso, até porque só tenho cerca de 1:30 de viagem, para isso resolvi falar sobre uma paradinha bem bacana que são os filtros CSS.

## Filtros

Cada vez eu me apaixono mais pelo CSS e o poder de se fazer várias coisas só com código. E uma das coisas que eu acho mais legais no css são os filtros, isso me evita um bom trabalho de ter que ficar editando imagens no photoshop, por mais que eu goste dele, não quero ficar abrindo sempre.

## Compatibilidade

Os filtros em CSS já são compatíveis com a maioria dos browsers e você pode ver no [can i use](http://caniuse.com/#feat=css-filters) sobre isso. Porém seu uso deve ser feito com o prefixo `-webkit` para Chrome, Safari, Android e Opera. Somente o Firefox aceita sem o uso de prefixos. E o IEca...bom, ele não aceita nada, mas eu também não aceito ele, então tudo bem =p

## Como utilizar os filtros?

Para usar é bastante fácil, basta escolher a imagem que deseja aplicar o filtro e definir a propriedade de filtro que deseja aplicar, segue um exemplo:

```css
.minha-imagem {
    -webkit-filter: grayscale(100%); // suporte Chrome, Safari, Android, Opera
            filter: grayscale(100%); // suporte para Firefox
}
```

Mais de um filtro pode ser aplicado numa mesma imagem também, ficando assim:

```css
.minha-imagem {
    -webkit-filter: grayscale(100%) blur(5px); 
            filter: grayscale(100%) blur(5px); 
}
```

## Diferentes tipos de filtros

No momento já existe um número bem legal de filtros e com expectativa de criação de mais alguns, vamos ver a aplicação de cada um deles:

---

### Grayscale

Serve para aplicar um filtro preto e branco nas imagens e pode ir de `0` a `1` ou de `0%` a `100%`.

```css
.imagem-1 {
    -webkit-filter: grayscale(100%); 
            filter: grayscale(100%); 
}

.imagem-2 {
    -webkit-filter: grayscale(.7); 
            filter: grayscale(.7); 
}
```

<style type="text/css">
img {
    display: inline-block !important;
    margin: 10px !important;
}
 .gray-1 {
    -webkit-filter: grayscale(100%); 
            filter: grayscale(100%); 
}

.gray-2 {
    -webkit-filter: grayscale(.7); 
            filter: grayscale(.7); 
}   
</style>

<img class="gray-1" alt="Imagem com escala de cinza 100%" src="/assets/img/filtros-css/imagem-exemplo.jpg"/>
<img class="gray-2" alt="Imagem com escala de cinza 70%" src="/assets/img/filtros-css/imagem-exemplo.jpg"/>

---

### Sepia

Para dar aquele aspecto de foto envelhecida, o funcionamento é o mesmo do `grayscale`.

```css
.imagem-1 {
    -webkit-filter: sepia(100%); 
            filter: sepia(100%); 
}

.imagem-2 {
    -webkit-filter: sepia(.7); 
            filter: sepia(.7); 
}
```

<style type="text/css">
.sepia-1 {
    -webkit-filter: sepia(100%); 
            filter: sepia(100%); 
}

.sepia-2 {
    -webkit-filter: sepia(.7); 
            filter: sepia(.7); 
}
</style>

<img class="sepia-1" alt="Imagem com escala de sepia 100%" src="/assets/img/filtros-css/imagem-exemplo.jpg">
<img class="sepia-2" alt="Imagem com escala de sepia 70%" src="/assets/img/filtros-css/imagem-exemplo.jpg">

---

### Blur

Eu adoro esse efeito! Ele funciona similar ao filtro de gausiano do Photoshop e serve para deixar a foto desfocada. Ele funciona recebendo valores em `px` como parâmetro. Quanto maior o valor, mais desfocado fica.

```css
.imagem-1 {
    -webkit-filter: blur(3px); 
            filter: blur(3px); 
}

.imagem-2 {
    -webkit-filter: blur(30px); 
            filter: blur(30px); 
}
```

<style type="text/css">
 .blur-1 {
    -webkit-filter: blur(3px); 
            filter: blur(3px); 
}

.blur-2 {
    -webkit-filter: blur(30px); 
            filter: blur(30px); 
}   
</style>

<img class="blur-1" alt="Imagem com blur de 3px" src="/assets/img/filtros-css/imagem-exemplo.jpg">
<img class="blur-2" alt="Imagem com blur de 30px" src="/assets/img/filtros-css/imagem-exemplo.jpg">

---

### Saturate

A saturação define a intensidade de uma cor numa imagem. Quanto maior o valor de `saturate`, mais intensa será a cor da imagem. Ele recebe valores em porcentagem.

```css
.imagem-1 {
    -webkit-filter: saturate(50%); 
            filter: saturate(50%); 
}

.imagem-2 {
    -webkit-filter: saturate(500%); 
            filter: saturate(500%); 
}
```

<style type="text/css">
.saturate-1 {
    -webkit-filter: saturate(50%); 
            filter: saturate(50%); 
}

.saturate-2 {
    -webkit-filter: saturate(500%); 
            filter: saturate(500%); 
}
</style>

<img class="saturate-1" alt="Imagem com saturação de 50%" src="/assets/img/filtros-css/imagem-exemplo.jpg">
<img class="saturate-2" alt="Imagem com saturação de 500%" src="/assets/img/filtros-css/imagem-exemplo.jpg">


---

### Contrast

Bem parecido com o `saturate`, ele também recebe valores em `%` e quanto maior o seu valor, mais intensas são as cores.

```css
.imagem-1 {
    -webkit-filter: contrast(50%); 
            filter: contrast(50%); 
}

.imagem-2 {
    -webkit-filter: contrast(500%); 
            filter: contrast(500%); 
}
```

<style type="text/css">
.contrast-1 {
    -webkit-filter: contrast(50%); 
            filter: contrast(50%); 
}

.contrast-2 {
    -webkit-filter: contrast(500%); 
            filter: contrast(500%); 
}
</style>

<img class="contrast-1" alt="Imagem com contraste de 50%" src="/assets/img/filtros-css/imagem-exemplo.jpg">
<img class="contrast-2" alt="Imagem com constraste de 500%" src="/assets/img/filtros-css/imagem-exemplo.jpg">

---

### Brightness

Essa propriedade como o nome já diz, aumenta ou diminui o brilho da imagem e recebe valores em `%`.

```css
.imagem-1 {
    -webkit-filter: brightness(50%); 
            filter: brightness(50%); 
}

.imagem-2 {
    -webkit-filter: brightness(500%); 
            filter: brightness(500%); 
}
```

<style type="text/css">
.brightness-1 {
    -webkit-filter: brightness(50%); 
            filter: brightness(50%); 
}

.brightness-2 {
    -webkit-filter: brightness(500%); 
            filter: brightness(500%); 
}
</style>

<img class="brightness-1" alt="Imagem com brilho de 50%" src="/assets/img/filtros-css/imagem-exemplo.jpg">
<img class="brightness-2" alt="Imagem com brilho de 500%" src="/assets/img/filtros-css/imagem-exemplo.jpg">

---

### Hue-rotation

Como sabemos, a distrubuição das cores pode ser feita numa escala dentro de um círculo, o que essa propriedade faz é "rodar" essa paleta e com isso obter cores diferentes. Essa propriedade, portanto, aceita valores em `deg`, podendo ir de `0deg` até `360deg`.

```css
.imagem-1 {
    -webkit-filter: hue-rotate(45deg); 
            filter: hue-rotate(45deg); 
}

.imagem-2 {
    -webkit-filter: hue-rotate(120deg); 
            filter: hue-rotate(120deg); 
}
```

<style type="text/css">
.hue-1 {
    -webkit-filter: hue-rotate(45deg); 
            filter: hue-rotate(45deg); 
}

.hue-2 {
    -webkit-filter: hue-rotate(120deg); 
            filter: hue-rotate(120deg); 
}
</style>

<img class="hue-1" alt="Imagem com hue-rotate(45)" src="/assets/img/filtros-css/imagem-exemplo.jpg">
<img class="hue-2" alt="Imagem com hue-rotate(120)" src="/assets/img/filtros-css/imagem-exemplo.jpg">

---

### Invert 

Aquele filtro engraçado que quem for das antigas vai lembrar imediatamente daqueles negativos que a gente levava para revelar as fotos. Essa propriedade inverte as cores, pegando sempre o inverso da cor real. Aceita valore de `0%` até `100%`.

```css
.imagem-1 {
    -webkit-filter: invert(100%); 
            filter: invert(100%); 
}
```

<style type="text/css">
.invert-1 {
    -webkit-filter: invert(100%); 
            filter: invert(100%); 
}
</style>

<img class="invert-1" alt="Imagem com invert(100)" src="/assets/img/filtros-css/imagem-exemplo.jpg">

---

### Opacity

Serve para aplicar uma transparência na imagem, indo dos valores de `0` até `1`ou de `0%` até `100%`. Essa propriedade é similar a `opacity` do css, a diferença é que em alguns browsers, eles usam aceleração via hardware, o que deixa a performance melhor.

```css
.imagem-1 {
    -webkit-filter: opacity(50%); 
            filter: opacity(50%); 
}
```

---

<style type="text/css">
.opacity-1 {
    -webkit-filter: opacity(50%); 
            filter: opacity(50%); 
}
</style>

<img class="opacity-1" alt="Imagem com opacidade de 50%" src="/assets/img/filtros-css/imagem-exemplo.jpg">


### Drop-shadow

Também similar a propriedade `box-shadow` do css, ela tem a diferença de também receber aceleração via hardware e ser mais performática. Outra diferença é que ela se aplica ao entorno do elemento, ao invés de criar uma caixa, como o `box-shadow` faz. Os valores que recebe são `drop-shadow(eixoX eixoY dispersão cor)`.

```css
.imagem-1 {
    -webkit-filter: drop-shadow(10px 10px 5px #000); 
            filter: drop-shadow(10px 10px 5px #000); 
}
```

<style type="text/css">
.drop-1 {
    -webkit-filter: drop-shadow(10px 10px 5px #000); 
            filter: drop-shadow(10px 10px 5px #000); 
}
</style>

<img class="drop-1" alt="Imagem com drop-shadow" src="/assets/img/filtros-css/imagem-exemplo.jpg">

---

## Ah, mas eu prefiro Photoshop...

Então, o photoshop é legal e com certeza é uma mão na roda para esse tipo de coisa. Mas e se eu quiser tornar isso interativo ao invés de estático? Se eu quiser ter uma imagem com um filtro e quando der `:hover` esse filtro sumir? E se eu quiser aplicar filtros via Javascript? Enfim, existe uma gama de interações que podemos fazer com filtros css e que o photoshop não nos permitiria, segue abaixo um simples exemplo usando o `:hover`.

<style type="text/css">
.gray {
    cursor: pointer;
    transition: all .5s;
    -webkit-filter: blur(5px) grayscale(1); 
            filter: blur(5px) grayscale(1); 
}
.gray:hover {
    -webkit-filter: blur(0) grayscale(0);
            filter: blur(0) grayscale(0);    
}
</style>

<img class="gray" alt="Imagem com cinza e blur" src="/assets/img/filtros-css/imagem-exemplo.jpg">

## Conclusão

Esse foi mais um post rapidinho, mas mostrando uma paradinha bem legal que você já pode começar a aplicar em seus projetos. Espero que tenha sido útil e se tiverem qualquer dúvida, só comentar aqui abaixo.








