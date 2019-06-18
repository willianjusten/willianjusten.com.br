---
layout: post
title: "Como ter Domínio Proprio no Github Pages"
date: 2015-01-29 04:16:36
image: '/assets/img/dominio/ogimage.png'
description: 'O passo a passo para deixar seu blog com seu domínio.'
main-class: 'dev'
color: '#637a91'
tags:
- github pages
- jekyll
- tutorial
categories:
twitter_text: 'Como ter Domínio Proprio no Github Pages'
introduction: "Um tutorial passo a passo de como colocar um domínio próprio no Github Pages e já sair com seu blog personalizado."
---

Como já disse no [Making of - Parte 1](https://willianjusten.com.br/making-of-parte-1/) e no [Making of - Parte 2](https://willianjusten.com.br/making-of-parte-2/), o meu blog é hospedado no github pages. E não é só o meu, mas vários, um que está fazendo muito sucesso agora é o blog do [Fernando Daciuk](http://blog.da2k.com.br/), que é feito no [Hexo](https://hexo.io/), mas também hospedado no github pages.

**Ou seja, esse processo é para qualquer tipo de site feito no github pages, através de qualquer ferramenta!!**

O processo engloba 3 etapas muito fáceis e rápidas:

## 1 - Subindo para o Github Pages

Para subir os arquivos para o Github é bastante simples, mas para isso você precisa ter o [Git](http://git-scm.com/) instalado na sua máquina. Teste o comando `git` na sua máquina, se ele disser que o comando não existe, faça o download e instale, se ele mostrar a possibilidade de comandos, quer dizer que está instalado =)

Outra dependência é que você cadastre uma conta no [Github](https://github.com/). Tendo isso pronto, é só seguir os seguintes passos:

#### Passo 1: Crie um repositório

![Imagem mostrando como se cria um repositório](/assets/img/making-of-parte-2/criar-repo.png)

Para que funcione no branch `master`, você precisa criar utilizando o `seunomedeusuario.github.io`, no meu caso ficou `willianjusten.github.io`.

![Imagem mostrando como se cria um repositório](/assets/img/making-of-parte-2/nome-repo.png)

#### Passo Final:

```bash
# Iniciar um repositório git na pasta do projeto
git init

# Adicionar todos os arquivos
git add -A

# Commitar os arquivos
git commit -m "Commit Inicial"

# Adicionar o repositório remoto
git remote add origin https://github.com/seunomedeusuario/seunomedeusuario.github.io.git

# Subir seu lindo blog
git push -u origin master
```

Com esses passos o seu Blog já está no Github Pages e se tudo estiver certinho em 20-30 minutos você já pode acessar através da url `seunomedeusuario.github.io`.

## 2 - Comprando um domínio e direcionando o DNS

Existem vários lugares para se comprar domínio, principalmente dependendo do domínio que você queira comprar. Aqui eu irei falar do mais comum, que é o domínio `.com.br`.

Para comprar um domínio `.com.br` você pode utilizar o [Registro.br](http://registro.br/). Abrindo o site, você tem uma ferramenta para verificar se o domínio desejado está livre ou não.

![Imagem mostrando a Home Page com a ferramenta de analise de domínios](/assets/img/dominio/dominio-livre.png)

Tendo o domínio livre, basta fazer o registro do domínio e aí lhe serão dadas algumas opções de pagamento, quanto mais anos, maior o desconto no valor final. Após seguir todos os passos, você terá acesso ao painel daquele domínio e poderá ir nas opções de DNS.

![Imagem indicando a opção de DNS](/assets/img/dominio/dns.png)

Clicando para editar a zona de DNS, você terá que criar 2 `A record` e um `CNAME`, conforme a imagem abaixo. Caso tenha alguma outra dúvida, existe o [link oficial do github](https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider/) falando sobre.

![Zona de DNS](/assets/img/dominio/zona.png)

**Lembrando que onde está o meu domínio, você precisa mudar para o seu domínio desejado e o CNAME precisa ser o link do repositório do github.**

Feito isso fica faltando somente mais uma etapa.

## 3 - Criação do arquivo CNAME

Esse é molezinha, basta criar um arquivo CNAME **(precisar estar maiúsculo)**. E dentro deste arquivo, você irá colocar o seu domínio próprio. **Lembre-se de não colocar protocolo e nem www.**

Feito tudo isso, basta esperar um tempinho até o DNS propagar e tudo show de bola =)
