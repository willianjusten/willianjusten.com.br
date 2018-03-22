---
layout: post
title: "Flame War: Por que usar Jekyll?"
date: 2015-01-05 21:18:29
description: "Depois de várias dúvidas, aqui vai uma lista de razões para se utilizar o Jekyll para criação de Blogs de desenvolvimento. "
image: "/assets/img/flame-war/yoda-flame-war.jpg"
main-class: 'jekyll'
color: '#B31917'
tags:
- jekyll
twitter_text: "Por que usar Jekyll?"
introduction: "Alguns motivos para se usar um gerador estático para a criação do seu blog. Mais especificamente sobre o Jekyll, ferramenta usada na criação do meu blog."
---

Olá pessoal, hoje terá um post extra! <s>Não vai se acostumando!</s> E brincadeirinha, não vai rolar flame war aqui, assim espero =o

Bom, como disse no [primeiro post](https://willianjusten.com.br/making-of-parte-1/) e expliquei um pouco melhor no [segundo post](https://willianjusten.com.br/making-of-parte-2/), eu utilizei o [Jekyll](http://jekyllrb.com/), que é um gerador estático, para criar o meu Blog. Algumas pessoas acharam muito legal a ideia, disseram até que já haviam pensado em criar utilizando o Jekyll ou outros geradores estáticos. Mas tiveram algumas pessoas que ficaram ainda com dúvidas de porque utilizar o Jekyll e não fazer na mão ou em um Wordpress. E teve um amigo de um grupo do qual eu participo que fez a seguinte postagem.

> Quero abrir aqui uma discussão sobre o furor gerado em cima do Jekyll.
Gostaria que fosse deixado de lado a paixão e orgulho de ser desenvolvedor e fosse debatido o exato motivo de uso da ferramente e que me dissessem porque vocês a usam, se usam.
Bom, o Jekyll é usado para sites estáticos. Sites estáticos para mim são aqueles que não precisam muito de atualizações de conteúdo nem de inserção de conteúdo em tempo real. Pois bem, então porque eu ao fazer um site estático em html eu usaria o Jekyll, tendo de configurar várias coisas programaticamente e ainda ter de diagramar os conteúdos em Markdown? Tudo sem um respaldo visual.
Se o problema é o reuso de trechos do site e utilização de templates, bom, eu não uso dreamweaver mas sei que lá é possível usar templates. No bracktes também tem uma extensão para isso.
Por outro lado, tenho visto muita gente batendo no peito pra dizer que tem um blog feito em Jekyll. Mas um blog, pra mim, não se enquadra como um site estático. Um blog em Jekyll pra mim só funcionaria para um entusiasta, pois um cliente não ficaria muito confortável em alimentar seu blog via bloco de notas usando Markdown. Não é prático pra mim.
Eu olho o Jekyll e só consigo pensar, "nossa, que legal, esse Ruby compila um site todo escrito em Markdown e YAML para html estático! mas, e ai?" cadê a real praticidade?
Bom, vamos ver as opiniões, quero entender melhor isso de idolatrar Jekyll pra saber se fiz um julgamento errado.

Antes de mais nada, quero deixar claro, que achei a dúvida bastante pertinente e imagino que várias outras pessoas tenham essas mesmas dúvidas. Por isso, eu vou listar aqui, algumas das razões de se utilizar o Jekyll para se criar um blog para desenvolvedores.

`1)` Simplicidade: o jekyll, diferente de outros sistemas, irá te dar somente o mínimo possível para você iniciar um blog, não terão milhares de arquivos em .php, trabalhando em cima de um framework ou um código complicado de se entender inicialmente.

`2)` O Jekyll diferente da maioria dos CMS's não possui banco de dados e com isso elimina a dependência de ter um servidor que suporte o banco necessário. Outro motivo é o loading da página que diminui consideravelmente, visto que não existirá nenhuma requisição do banco.

`3)` O Jekyll é extremamente leve, por ser estático, poucas requisições são feitas e não existe nada processado no servidor, como outras linguagens comuns para blogs.

`4)` Controle no Design, diferente de outros sistemas de blogs, que vem com muita bagunça de temas e plugins, dos quais você precisa até estudar para saber como fazer o layout melhor, o jekyll te dá a liberdade de montar seu próprio html e separá-lo da melhor forma possível.

`5)` Segurança, o jekyll é estático, ou seja, não possui um banco de dados ou administração a ser invadido e as chances de ocorreram hacks são praticamente mínimas.

`6)` Facilidade na hospedagem, por ser estático, ele pode inclusive ser hospedado no Github Pages (o que a maioria dos desenvolvedores fazem)

`7)` Facilidade em se escrever um post, em qualquer lugar você pode digitar Markdown, no celular, no tablet, no pc, basta ter o editor mais porco do mundo e saber a sintaxe (convenhamos que um programador que aprende milhares de tags, aprender a usar coisas tão intuitivas como #(h1), ##(h2), não é nada difícil).

`8)` Possibilidade de aprender uma ferramenta nova, o foco do Jekyll não são os clientes, somos nós programadores, então, quer coisa melhor do que aprender algo novo e legal?

`9)` Possibilidade de utilizar condicionais como if, elseif, else, loops, variáveis e mais um conjunto poderoso de funções. Coisas que não poderia conseguir escrever com html estático ou usando extensões de IDEs. E nada disso sendo processado no servidor.

`10)` Facilidade na transferência de servidor, como você pode definir urls bases no _config.yml, diferente de arquivos estáticos comuns, em que você teria que mudar url em tudo, no jekyll basta mudar a variável.

`11)` Criação de urls amigáveis de modo prático, fácil e automático.

Se você tem mais alguma dúvida ou comentário legal a fazer a respeito disso, só mandar um comentário, discussões são sempre importantes na nossa área, para que possamos abrir mentes e obter mais conhecimento.
