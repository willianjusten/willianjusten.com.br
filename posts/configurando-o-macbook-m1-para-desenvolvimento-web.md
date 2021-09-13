---
layout: post
date: 2021-09-13 09:46:46
title: Configurando o Macbook M1 para Desenvolvimento Web
description: Alguns passos dicas de como configurar o seu Macbook M1 para
  desenvolver na web.
main-class: dev
color: "#637a91"
tags:
  - macbook
  - m1
---
## Introdução

Fala povo, recentemente eu [fiz um vídeo](https://youtu.be/9Rp39orl1DM) falando sobre minhas impressões do Macbook Air M1 e no vídeo mesmo eu havia comentado que iria fazer um post falando um pouquinho sobre como configurar as coisas e tudo mais, então aqui estou.

Enquanto escrevo esse post, vou ouvindo uma banda chamada [The American Dollar](https://open.spotify.com/artist/5r4OqYJL7JrtZlffx7FJlb?si=8PYvbk6GRHiAbn3qGHbagw&dl_branch=1) que é um Post-rock bem calmo e bom para ouvir trabalhando e/ou relaxando, super recomendo.

### O que roda no M1?

Como a arquitetura do M1 é diferente, no início muita coisa não tinha suporte, o que já está bem diferente de agora (pouco mais de 1 ano depois de lançado), mas se você ainda tiver dúvida se algo roda ou não, existe um site bem legal que indica o suporte de tudo, se chama [isapplesiliconready.com](https://isapplesiliconready.com/). Lá você pode pesquisar se determinada aplicação vai rodar ou não. É até bom para decidir na hora da compra, vai que você necessita de uma aplicação bem específica e ela ainda não roda.

### Xcode - command line tools

Por mais que você nem vá programar no Xcode ou coisas mobile é super importante instalar o xcode / command line tools no Mac, pois várias outras ferramentas utilizam de alguns pacotes dali de dentro. Para instalar, basta rodar no terminal:

```bash
xcode-select --install
```

### Rosetta 2

Com essa mudança de arquitetura, assim como aconteceu dos Powerbook para Intel, a Apple lançou o Rosetta 2, que é uma espécie de emulador do x86 para o Arm. Então caso algo não rode nativamente, você vai precisar ter o Rosetta para te ajudar. Para instalar é bem simples, basta abrir o terminal e digitar:

```bash
/usr/sbin/softwareupdate --install-rosetta --agree-to-license
```

### Homebrew

Outra ferramenta quase que obrigatória no Mac para quem programa é o [Homebrew](https://brew.sh/), que é um Package Manager, permitindo instalar vários outros programas diretamente do terminal, para quem vem do Linux, já está acostumado com ferramentas como `apt get`, `yum`, `pacman`, o funcionamento é bem similar.

Para instalar, só rodar no terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### iTerm2

Depois de instalar as 3 partes mais fundamentais para o funcionamento das outras aplicações no Mac, agora vamos aos programas. Lembrando que são escolhas minhas e não necessariamente você precisa instalar no seu Mac, mas eu aconselho fortemente.

A primeira ferramenta não poderia deixar de ser um terminal melhorado e na minha opinião, não existe melhor terminal no Mac que o iTerm, ele está aí há tantos anos e continua sempre adicionando pequenas melhorias.

Como já temos o brew instalado, basta rodar:

```bash
brew install --cask iterm2
```

#### Configurando o iTerm2 com Rosetta 2

Após isso, já teremos um terminal melhorado e também vamos poder configurar para ter 2 terminais separados, um para rodar as coisas necessárias com o Rosetta e outro para rodar as coisas normais. Para fazer isso é bem simples, abra o finder e vá em `Applications`, procure pelo `iTerm`, clique com botão direito e escolha a opção de `duplicar`. 

![Imagem do finder do Mac com varias aplicacoes, incluindo o iTerm](/assets/img/iterm-finder.png)

Ao duplicar, mude o nome da aplicação para algo como `iTerm-Rosetta` ou qualquer outra coisa que te facilite a identificar qual é qual. 

Depois disso, clique com o botão direito no app novo e escolha a opção `get info` para abrir a seguinte tela:

![Tela com informacoes do iTerm e uma opcao de abrir usando o Rosetta marcado](/assets/img/iterm-rosetta.png)

Note que a opção de `Open using Rosetta` precisa estar marcada para poder funcionar de fato. Uma outra coisa que eu fiz foi mudar o ícone para me facilitar a entender qual é qual ainda mais rápido. Para isso eu baixei um ícone [nesse repositório](https://github.com/dhanishgajjar/terminal-icons) e com o arquivo em mãos é só arrastar a imagem para cima do ícone ali no header que ele automaticamente já vai trocar.

E prontinho, com essa configuração se existir qualquer programa que você precisar usar e ainda não for compativel com Arm você vai conseguir rodar usando o Rosetta.

### Zsh / Oh my Zsh

Continuando com as configurações do terminal, vamos instalar agora o Oh my Zsh para deixar o terminal turbinado. Gosto também de usar o Oh my Zsh pois é o mesmo que utilizo no Windows/WSL, então fica tudo muito igual e não me confundo com alias/autocomplete nem nada.

Para instalar, é só rodar:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Depois disso, eu costumo configurar alguns plugins, novamente, isso não é obrigatório, mas se quiser usar minhas indicações =)

#### Syntax highlighting

Esse plugin serve para o terminal identificar os comandos e colorir facilitando a leitura de tudo. Para isso, rode primeiro:

```bash
# Aqui é a pasta onde devem estar seus plugins
cd $HOME/.oh-my-zsh/plugins

# clone o repositório
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git

# adicione o plugin no seu arquivo de configuração
echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

Para garantir que o plugin vai funcionar, você também deve adicionar na lista de plugins no arquivo `.zshrc`, procure pela linha de plugins e adicione:

```bash
plugins=(
  zsh-syntax-highlighting
)
```

#### Autosuggestions

Esse plugin é perfeito para quem esquece sempre como se escreve aquele comando X, que já usou mil vezes, mas ainda assim esquece. O terminal vai auto completar as coisas baseado no seu histórico, o que é super útil. Para instalar, basta rodar:

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

E depois, assim como no plugin acima, precisa editar o arquivo `.zshrc`:

```bash
plugins=( 
  zsh-autosuggestions
)
```

### NVM

Para quem trabalha com frontend, uma outra ferramenta indispensável é o `nvm` que permite instalar diferentes versões do Node sem dificuldades. E aqui já tem um **detalhe importante**, se você tentar instalar via Homebrew, ele vai ficar demorando infinitos e não vai funcionar. Para evitar esse problema, vamos instalar com o comando dado por eles no repositório oficial:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Depois de instalado, vamos adicionar as seguintes linhas ao **final** do `.zshrc`:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### VsCode

Com tudo instalado, falta só nosso querido editor né? Eu utilizo o VsCode, para instalar via Homebrew é só rodar:

```bash
brew install --cask visual-studio-code
```

E se você quiser usar as mesmas extensões que eu utilizo, tenho um [pacote](https://marketplace.visualstudio.com/items?itemName=willianjusten.reactavancado-extension-pack) que criei para o curso [React Avançado](https://reactavancado.com.br/).

### Conclusão

Bom, das partes essenciais para desenvolvimento web, essas são as ferramentas mais importantes. É claro que existem milhares de outros Apps por aí, mas eu confesso que gosto de partir do simples e necessário e conforme eu vou precisando, aí instalo mais coisas. Se tiver alguma coisa que você acha que faltou ou precisa falar, manda [um tweet para mim](https://twitter.com/Willian_justen).