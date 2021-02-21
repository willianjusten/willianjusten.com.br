---
layout: post
date: 2021-02-21 05:18:25
image: /assets/img/browser-falar.png
title: Fazendo o browser falar por você - Web Speech API
description: Nesse post eu vou mostrar como utilizei a Web Speech API para meu
  projeto Japanese Words.
introduction: Nesse post eu vou mostrar como utilizei a Web Speech API para meu
  projeto Japanese Words.
twitter_text: Nesse post eu vou mostrar como utilizei a Web Speech API para meu
  projeto Japanese Words.
main-class: js
color: "#D6BA32"
tags:
  - Dica
categories:
  - Dicas rápidas
---
## Introdução

Fala pessoal, eu recentemente comecei uma [série de vídeos com dicas bem rápidas](https://www.youtube.com/watch?v=1dNNL95BsJE&list=PLlAbYrWSYTiOviR_zL01FMa-kWEMDIjeO) lá no meu canal do YouTube, mas como eu também gosto de texto e também quero facilitar a busca seja pelo Google ou pelo YouTube, vou portar os vídeos para cá também. Espero que dê certo =)

## Vídeo

<iframe width="560" height="315" src="https://www.youtube.com/embed/SOgN69e9-Uc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Apresentando o Japanese Words

Atualmente eu estou estudando japonês e pensando nisso, eu resolvi fazer um projetinho para me ajudar no vocabulário e pronúncia. Tem um site chamado [mainichi](https://mainichi.me/) que tem uma extensão com várias palavras, então parti dali. Como pode notar, meu card é uma cópia descarada deles xD

Mas para o projeto ficar mais interessante e diferente, resolvi aplicar a Web Speech API para fazer o browser falar as palavras.

## Web Speech API

Você pode ver o projeto inteiro no [repositório oficial](https://github.com/willianjusten/japanese-words), mas vou me ater somente as partes que utilizei da Web Speech, que é bastante simples.

Os passos são:

- Primeiro pegamos as vozes disponíveis no device/browser usando o método [SpeechSynthesis.getVoices()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices)

```javascript
const voices = window.speechSynthesis?.getVoices()
```

- Depois nós filtramos essa lista para encontrar a voz que tenha a pronúncia da língua desejada, no nosso caso, o japonês.

```javascript
const jpVoice = voices?.find((voice) => /ja-JP/.test(voice.lang))
```

- Com as vozes, nós definimos o [Utterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance), que seriam as configurações da leitura.

```javascript
const utterance = new SpeechSynthesisUtterance()


utterance.text = word // word é a palavra que desejamos pronunciar
utterance.lang = 'ja-JP' // língua a pronunciar
utterance.voice = voice // voz defina acima
utterance.rate = 0.8 // velocidade de fala
```

- Já com a voz determinada e as configurações de voz, agora é só usar o método para falar, que é o [speechSynthesis.speak](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak)

```javascript
window.speechSynthesis.speak(utterance)
```

## Conclusão

E aí, gostou da dica? Se curtiu, não deixa de se inscrever lá no [canal do YouTube](https://www.youtube.com/WillianJustenCursos/) para essa e mais outras dicas.