---
layout: post
date: '2018-03-28 04:49:06'
image: /assets/img/disqus.png
title: Customizando o Disqus
description: Como adaptar esse sistema de comentários para funcionar melhor no seu site.
introduction: Como adaptar esse sistema de comentários para funcionar melhor no seu site.
twitter_text: Como adaptar esse sistema de comentários para funcionar melhor no seu site.
main-class: jekyll
color: '#B31917'
tags:
  - disqus
  - jekyll
categories:
---
## Introdução

Fala pessoal, quem não viu, eu lancei o [Night Mode](https://willianjusten.com.br/adicionando-night-mode-no-seu-site/) no meu blog, basta você clicar ali na lâmpada para mudar entre tela escura e clara, facilitando assim a visualização do blog!

Mas junto a essa mudança, que eu fiz super rápido após conversar com um leitor, veio também uma pequena chateação, o [Disqus](https://disqus.com/), que é o sistema de comentários que uso no meu blog tava ficando uma bela cagada e váaarias pessoas vieram comentar comigo sobre isso. Muito obrigado por me alertar galera, eu já tava ciente desse bug, mas tinha umas coisas que eu não sabia que o Disqus permitia e como agora eu sei, melhor compartilhar né? =)

Vou ouvindo um instrumental muito bom do [David Maxim Mimic](https://open.spotify.com/artist/0wQa1N4q3HmLwxqkpVcYhs?si=UDKr3WVnT0uk9SzXBI2qNA), umas guitarras bem legais e ótimas para dar foco e trabalhar.

## Como o Disqus define os estilos?

Quando você vai na [administração do Disqus](https://willianjusten.disqus.com/admin/settings/general/), lá no final, você vai encontrar a seguinte opção:

![Select box mostrando 3 opções (Auto, Light Backgrounds e Dark Backgrounds)](/assets/img/disqus-appearance.png)

E essas opções são bem simples de entender:

- `Auto`: o próprio Disqus verifica se seu site é claro ou escuro e determina então o estilo que vai aplicar.
- `For light backgrounds`: ele vai entender que seu site é claro e vai aplicar as cores padrões desse modo (era o que eu usava no meu blog).
- `For dark backgrounds`: vai endender que o site é escuro e vai usar branco e cinza claro para contrastar melhor no fundo claro.

Ok, sabendo disso, agora que tem o `Night Mode` no blog bastava eu escolher o `auto` certo? Sim e não...

## Como o Disqus escolhe as cores?

Nós já vimos que o Disqus tem as opções ali para light e dark, mas como ele decide as cores? Onde ele define as cores dos links dos usuários e dos pequenos detalhes?

Tem [um artigo](https://help.disqus.com/customer/portal/articles/545277-disqus-appearance-tweaks) no fórum deles explicando isso bem detalhadamente, então você pode ler lá com mais clareza, mas vou resumir aqui.

O Disqus herda a cor do link diretamente colocado no seu site, então se você tiver um css como:

```css
a {
  color: red;
}
```

O Disqus vai herdar essa cor. Mas se estivesse num seletor mais interno como `.post-content .link` ou algo como `.link`, o Disqus não consegue achar e não vai modificar. Então defina a cor do `a` diretamente como se fosse o seu reset mesmo. Se no resto do site você precisar mudar, é só criar um seletor mais específico.

## E quando o site muda de claro para escuro?

O Disqus tem o seguinte script para iniciar nas páginas:

```js
var disqus_config = function () {
   this.page.url = '{{ site.url }}{{page.url}}';
   this.page.identifier = '{{page.url}}';
};

var d = document, s = d.createElement('script');

s.src = '//willianjusten.disqus.com/embed.js';

s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
```

Ele cria o script, apenda na página e é isso. O disqus vai carregar a partir dali e não vai fazer mais nada.

Só que como fica se o site mudar de claro para escuro? Isso mesmo, o disqus não vai mudar nada, ele vai ter carregado e identificado que era claro e fim. Só que não queremos isso né? Por isso, na trigger onde eu chamo a mudança do tema, eu coloquei a seguinte linha:

```js
const pageUrl = document.location.href;

DISQUS.reset({
  reload: true,
  config: function () {
    this.page.identifier = pageUrl;
    this.page.url = pageUrl;
  }
});
```

Ou seja, assim que a pessoa apertar no botão para mudar de tema, eu forço o Disqus a fazer um reload e com isso, ele vai verificar que a página mudou a cor e tudo vai funcionar lindo! =D

## Conclusão

Bom, é só isso gente, o post foi mais uma forma de pedir perdão pelo vacilo, sim o blog tava bugado, mas agora já tá legal de novo! Obrigado pelos comentários apontando a falha e também fazer um chamado, o blog é **100% open source** e você pode contribuir nesse [link do Github](https://github.com/willianjusten/willianjusten.github.io). Então se você quer começar a ajudar um projeto open source, meu blog tá de braços abertos sempre!
