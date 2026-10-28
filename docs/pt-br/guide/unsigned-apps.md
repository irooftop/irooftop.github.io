# Abrir um app não assinado

Os instaladores de desktop ainda não são assinados nem notarizados, então o primeiro uso mostra um aviso no macOS e no Windows.
É um passo único: depois que você permite o app uma vez, ele abre normalmente, inclusive após atualizações instaladas do mesmo jeito.

::: tip Prefere evitar?
[Compile o app você mesmo](./desktop#build-it-yourself), ou rode o [servidor](./getting-started#install) e use no
navegador: `brew install irooftop/tap/rooftop`, `cargo install rooftop` ou [Docker](./docker).
:::

## macOS

![Abrir um app não verificado no macOS: o aviso "Não Aberto", OK, Ajustes do Sistema, Privacidade e Segurança, Abrir Mesmo Assim, a senha, e o app abre](/how-to-open-an-unsigned-app-on-macos.svg)

No macOS 15 Sequoia e posteriores:

1. Abra o **iRoof.top**. O macOS diz *"iRoof.top" não aberto: a Apple não pôde verificar…*. Clique em **OK**.
2. Abra o **menu Apple → Ajustes do Sistema… → Privacidade e Segurança**.
3. Role até **Segurança**: *"iRoof.top" foi bloqueado para proteger seu Mac*. Clique em **Abrir Mesmo Assim**.
4. Confirme com **Abrir Mesmo Assim**, e digite sua senha ou use o Touch ID.

O botão **Abrir Mesmo Assim** só aparece depois que você tentou abrir o app, por cerca de uma hora. Se ele não estiver lá,
abra o app de novo e volte a Privacidade e Segurança.

No macOS 14 Sonoma e anteriores, clique com o botão direito (ou Control-clique) no app no Finder, escolha **Abrir** e depois **Abrir** de novo.

### Pelo Terminal

Remover a marca de quarentena que o navegador colocou no download também funciona:

```sh
xattr -r -d com.apple.quarantine /Applications/iRoof.top.app
```

Nem sempre funciona: em macOS recentes, o Terminal pode precisar de **Gerenciamento de Apps** (ou **Acesso Total ao Disco**) em
Privacidade e Segurança para alterar apps em `/Applications`, e falha com `Operation not permitted` sem isso. Os
passos acima sempre funcionam.

::: details "iRoof.top está danificado e não pode ser aberto"
Essa mensagem também significa a marca de quarentena, não um download quebrado. Clique em **Cancelar** (não em **Mover para o Lixo**) e rode
o comando `xattr` acima, ou siga os passos dos Ajustes do Sistema.
:::

## Windows

O SmartScreen mostra **O Windows protegeu o seu PC** para o instalador:

1. Clique em **Mais informações**.
2. Clique em **Executar mesmo assim**.

Se o navegador segurar o download (*não é baixado com frequência*), abra a lista de downloads, escolha **⋯ → Manter**,
depois **Mostrar mais → Manter mesmo assim**. Para o `.msi`, você também pode clicar com o botão direito → **Propriedades** → marcar **Desbloquear** →
**OK** antes de executá-lo.

No Windows 11 com o **Controle Inteligente de Aplicativos** ativo, apps não assinados são bloqueados sem um botão **Executar mesmo assim**. Use o
[servidor](./getting-started#install) no lugar, ou desative o Controle Inteligente de Aplicativos em **Segurança do Windows → Controle de aplicativos
e do navegador → Configurações do Controle Inteligente de Aplicativos**.

## Linux

O Linux não bloqueia apps não assinados, mas um AppImage precisa de permissão para rodar:

```sh
chmod +x iRoof.top_amd64.AppImage    # ou: Propriedades → Permissões → Permitir executar arquivo como programa
./iRoof.top_amd64.AppImage
```

Se ele reclamar do FUSE (`dlopen(): error loading libfuse.so.2`), instale o `libfuse2` (Ubuntu 24.04:
`sudo apt install libfuse2t64`) ou rode com `--appimage-extract-and-run`.

Os pacotes são instalados pelo gerenciador de pacotes, que aceita pacotes locais não assinados:

```sh
sudo apt install ./iRoof.top_amd64.deb     # Debian, Ubuntu
sudo dnf install ./iRoof.top.x86_64.rpm    # Fedora
```
