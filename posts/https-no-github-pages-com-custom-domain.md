---
layout: post
title: "HTTPS no Github Pages com Custom Domain"
date: 2016-06-11 16:07:32
image: '/assets/img/https/main.png'
description: "Aprenda a colocar a sua página do Github Pages com Custom Domain e HTTPS"
main-class: 'dev'
color: '#637a91'
tags:
- github pages
- tutorial
- https
categories:
twitter_text: "Tenha https no seu domínio próprio dentro do Github Pages"
introduction: "Aprenda a colocar a sua página do Github Pages com Custom Domain e HTTPS"
---

## Introdução

**Update:** O Github agora já dá suporte a `https` em Custom Domain, você pode ler [nesse post do Github](https://blog.github.com/2018-05-01-github-pages-custom-domains-https/), ou seja, não é mais necessário utilizar os passos que digo abaixo.

Fala pessoal, o post de hoje será para falar sobre uma notícia boa, uma notícia triste e uma solução para isso. Alguns de vocês devem ter visto que o [Github liberou HTTPS para o Github Pages](https://github.com/blog/2186-https-for-github-pages), essa é a notícia boa! A notícia ruim é que não aceita para quem usa Custom Domain, ou seja, um domínio próprio, assim como o meu **willianjusten.com.br**.

Mas não fique triste, resolvi usar meu próprio blog de cobaia para tentar uma solução, funciona muito bem e é bem fácil de fazer. Só ter paciência (eu num tenho nenhuma) de esperar o DNS propagar direitinho e seguir os passos certinhos.

Vou ouvindo uma playlist que tem combinado um pouco com meus últimos dias, [Life Sucks](https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634?si=1g34PdUdTIa-NX6TCxi3cQ).

## Por que usar HTTPS? Isso num era só para ecommerce?

Primeiro de tudo, precisamos entender o que é HTTPS. O **HTTPS** é uma implementação do protocolo HTTP já conhecido, sobre uma camada adicional de segurança que utiliza o protocolo **SSL/TLS**. Essa camada adicional permite que os dados sejam transmitidos por meio de uma conexão criptografada e também é feita uma verificação de autenticidade do servidor e do cliente por meio de certificados digitais.

Esse protocolo ficou mais famoso inicialmente em ecommerces, pois esse tipo de serviço é o mais importante para se ter segurança e passou a ser obrigatório para quase todos gateways de pagamento.

Mas você pode ter esse protocolo em qualquer site, inclusive, a [Google fez um post](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html) falando que irá utilizar o HTTPS como um elemento para pontuação nas buscas, então vale bastante a pena.

## Como fazer?

Bom, o primeiro de tudo é, você sabe como fazer uma página no Github Pages? Caso não saiba, dá uma olhada nesse [meu curso de Jekyll](https://www.udemy.com/criando-sites-estaticos-com-jekyll/), lá eu ensino a criar um blog do zero e subir no Github Pages.

A segunda pergunta é, você sabe como fazer um Custom Domain? Não? Então dá uma olhada [nesse post sobre como ter domínio próprio no Github Pages](https://willianjusten.com.br/dominio-proprio-no-github-pages/). Tendo isso feito, só partir para a real tarefa do dia =)

### Cadastro na Cloudflare

A Cloudflare é uma CDN que promete otimizar a entrega do seu site, garantindo segurança, proteção contra DDoS e outras várias coisas. Para se cadastrar é bem fácil, só [entrar no site deles](https://www.cloudflare.com/a/sign-up).

Assim que você se cadastra, deve ver uma tela parecida com a de baixo, pedindo para inserir seu domínio para ele começar a escanear.

![Tela para escanear novo site](/assets/img/https/add-site.png)

Coloque a sua url do github pages e deixe ele escaneando, após o processo, ele ira mostrar uma tela listando o DNS do seu domínio e os apontamentos, similar a tela abaixo:

![Tela do DNS](/assets/img/https/dns.png)

Ele também vai te passar 2 nameservers que você precisará mudar onde comprou seu domínio.

![Tela do nameserver](/assets/img/https/nameservers.png)

Em posse desses dois nameservers, vamos lá para o [Registro.br](https://registro.br/), que é onde comprei meu domínio. Lá na parte de DNS tem uma opção para **Alterar Servidores DNS**, que ao clicar, vai te pedir um Master e um Slave, conforme a imagem:

![Tela do registrobr](/assets/img/https/registrobr.png)

Feito isso, vem a parada chatinha, **ter paciência** para o DNS propagar...

### Adicionando SSL via Cloudflare

Bom, eu sei que certificados pagos são melhores que gratuitos, mas como tudo no Github Pages é estático, já sabemos o quanto ele é seguro não é mesmo? Então não tem problema utilizar o gratuito que a Cloudflare provê não.

Para isso, você precisa ir na seção **Crypto** no Cloudflare assim que já tiver tudo propagado e então em SSL defina a opção **Flexible**, conforme imagem abaixo:

![Tela do SSL](/assets/img/https/crypto.png)

Feito isso, já temos o nosso certificado ativado, só esperar mais um pouquinho (sim, chatão isso)... E então você já poderá acessar seu site com **https** e ver o cadeadinho verde na frente. Mas só isso não adianta, pois as pessoas vão continuar podendo acessar sem o https na frente.

### Redirecionando para HTTPS

Para garantir que todo mundo que acesse o site, acesse como https, devemos fazer um redirecionamento **301**, onde queremos que todos os links acessados sem https sejam jogados para o link com o protocolo certo. Para isso, é só ir na parte de **Crypto** e definir essa regra, semelhante a imagem abaixo:

![Tela de Redirect](/assets/img/https/redirect.png)

### Links Canônicos

Tá faltando pouquinho, mas não podemos deixar passar uma coisa **muito importante**, que é dizer para os buscadores que os conteúdos com e sem https são iguais, para eles não caracterizarem isso como cópia. Para isso, basta utilizarmos a seguinte tag:

```html
<link rel="canonical" href="https://www.seudominio.com.br/url_da_pagina">
```

Se você estiverem utilizando um gerador estático como o Jekyll, vocês deixam a parte da `url_da_pagina` dinâmica.

### Disqus

Se for um blog que vocês estão mudando e utilizarem o disqus, vocês vão precisar só fazer uma migração do `http` para o `https`, para isso é só criar um arquivo csv, de um lado a url antiga e do outro a url nova, bem fácil, aqui [nesse link](https://help.disqus.com/customer/en/portal/articles/912757-url-mapper) tem o processo.

## Conclusão

Bom pessoal, foi um post bem simples, fiz mais até para salvar o procedimento, vai que no futuro eu precise fazer de novo né? Eu tinha ficado feliz quando vi que teria https no Github Pages, mas quando vi que não funcionaria em Custom Domain, fiquei tristinho e por isso fui ver como resolver o problema. Se você passou pelo mesmo que eu, só seguir aí, que vai funcionar beleza =)
