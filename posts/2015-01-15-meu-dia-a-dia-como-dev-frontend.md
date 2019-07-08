---
layout: post
title: "Meu dia a dia como dev frontend"
date: 2015-01-15 18:17:11
description: "Um pouco do meu dia a dia como dev frontend. Minha máquina, meus programas, arquivos, configurações."
main-class: 'misc'
color: '#7AAB13'
tags:
- frontend
categories:
twitter_text: "Meu dia a dia como dev frontend."
introduction: "Um pouco do meu dia a dia como dev frontend. Minha máquina, meus programas, arquivos, configurações."
---

Como alguns devem saber o [Luiz Felipe Tartarotti Fialho](https://github.com/felipefialho) criou um [repositório](https://github.com/felipefialho/1-post-por-dia) no github bastante legal, para que pessoas possam pedir alguns temas.

E teve esse pedido do [Matheus Moraes](https://github.com/matheusmmo):

> Galera, sempre tive muita curiosidade e imagino que outros também tenham, de saber como é o dia a dia de cada dev. Ou seja, como é o seu workflow, qual a estrutura de pastas que o cara usa quando vai fazer uma aplicação x. Qual as ferramentas que usa todos os dias, qual frameworks que gostam de usar esporadicamente. E até saber como funciona os workflows das suas empresas.
Um papo um pouco mais descontraído, sobre experiências.
Eu que sou do interior de SP e não tenho muito contato direto com a galera que não trabalhe em agência sempre tenho curiosidade de saber essas coisas.
Quem já trabalhou em agência sabe que o negócio é correria e na maioria das vezes não fazemos o que precisamos pra deixar um projeto legal.
Enfim, é isso. Fica a dica ai pra quem quiser fazer ^^

O [Fernando Daciuk](https://github.com/fdaciuk) já fez o [post dele](http://blog.da2k.com.br/2015/01/15/como-ser-um-dev-frontend-usando-linux/) e agora farei o meu =)

## Meu cantinho

![Mesa de trabalho](/assets/img/workflow/mesa.jpg)

Eu uso um Macbook Air 13", tanto em casa, quanto no [Queremos!](https://www.queremos.com.br/), não ligo muito para guerrinha Apple x PC, mas dei preferência ao Air por ser bastante leve e fino, como eu ando bastante, é bem melhor carregar uma coisa levinha do que um trambolho gigante e pesado.

Utilizei durante muito tempo notebooks da Dell e meu último foi da Samsung (acho que ele me traumatizou)... Neles eu sempre utilizei Linux, comecei com o [Ubuntu](http://www.ubuntu.com/) e depois fui parar no lindo [Elementary](https://elementaryos.org/) (que inclusive é bastante similar ao Mac OS e facilitou a transição).

Praticamente não consigo trabalhar em uma tela só, então no trabalho eu uso um monitor de 23" FullHD da LG e em casa utilizo um de 25" da Samsung. Não sou altamente crítico com monitor não, contanto que tenha uma resolução e tela grandes, está ótimo.

![Quadro Kanban](/assets/img/workflow/quadro.jpg)

Tenho um quadro em que faço algumas anotações e trabalho com meu [Personal Kanban](http://en.wikipedia.org/wiki/Kanban_board), que nada mais é que uma listinha de tarefas a fazer, sendo feitas e já feitas. Para quem não pode ter um quadro, existem vários apps que permitem fazer essa organização, o que eu mais aconselho é o [Trello](http://trello.com), eu só tenho um quadro mesmo, porque eu acordo e já olho para ele, se fosse aplicativo, acabaria me esquecendo de olhar, sério, eu só não esqueço a cabeça porque está presa no corpo.

## Aplicativos

Como terminal padrão eu uso o [iterm 2](http://iterm2.com/) com umas [configurações](https://github.com/willianjusten/dotfiles) diferentes, para mudar um pouco as cores e também a forma de mostrar as informações.

Para codar, utilizo o [Sublime Text 3](http://www.sublimetext.com/3) com alguns [plugins fundamentais](https://github.com/willianjusten/sublime-preferences) para minha vida.

Meu browser principal é Google Chrome, mas também tenho utilizado bastante do Firefox Developer Edition, até que ele é bem interessante e tem algumas ferramentas bastante úteis.

#### Outras coisinhas que uso

* [Mou](http://25.io/mou/) - para escrever Markdown e ter um preview bonitinho.
* [Vagrant](https://www.vagrantup.com/) - para criar ambientes de desenvolvimento separados.
* [Dropbox](https://www.dropbox.com/) - meu salvador da pátria para guardar todas as minhas coisas.
* [Hipchat](https://www.hipchat.com/) - programa de chat que utilizo no trabalho, ele é integrado ao new relic e a cada deploy ou commit, ele envia uma mensagem para todo o grupo.
* [Spotify](https://www.spotify.com/br/) - sério, ele é muito importante para mim, sem ele, não trabalho direito.

## Workflow

Eu mudo bastante as ferramentas e tecnologias de acordo com os projetos, mas o que não falta nunca:

* [Gulp](http://gulpjs.com/) - meu automatizador de tarefas padrão
* [Stylus](http://learnboost.github.io/stylus/) - meu pre-processador css favorito

Eu tenho um boilerplate que uso bastante e adapto bastante também, que é o [Fast](https://github.com/willianjusten/Fast)

Em alguns projetos gosto de utilizar o MEAN (MongoDB, Express, AngularJS, NodeJS), também curto Python, então já me aventurei um pouco com o [Flask](http://flask.pocoo.org/), [Bottle](http://bottlepy.org/) e o [Django](https://www.djangoproject.com/). No Queremos! tem uma parte rodando o [Symfony](http://symfony.com/), que é um Framework PHP. Enfim, não tenho medo de aprender coisas novas, seja no Frontend, seja no Backend, o importante é se aventurar! \o/
