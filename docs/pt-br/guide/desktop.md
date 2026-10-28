# App de desktop

O app de desktop ([Tauri](https://v3.tauri.app) `3.0.0-alpha.5`) executa o mesmo servidor que o `rooftop serve` em uma porta
`127.0.0.1` aleatória, e o mostra em uma janela nativa.

| Plataforma | Instalação |
|---|---|
| macOS | `brew install --cask irooftop/tap/irooftop`, ou o `.dmg` para [Apple Silicon](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_aarch64.dmg) ou [Intel](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64.dmg) |
| Windows 10 e 11 | [Instalador (.exe)](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64-setup.exe) ou [.msi](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_x64_en-US.msi) |
| Linux (x86-64) | [AppImage](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.AppImage) (qualquer distribuição), [.deb](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top_amd64.deb) (Debian, Ubuntu) ou [.rpm](https://github.com/irooftop/rooftop/releases/latest/download/iRoof.top.x86_64.rpm) (Fedora) |

Os links de download sempre apontam para a versão mais recente.

::: warning Os instaladores ainda não são assinados
No macOS, abra o app uma vez e depois **Ajustes do Sistema → Privacidade e Segurança → Abrir Mesmo Assim**. No Windows, escolha
**Mais informações → Executar mesmo assim** no SmartScreen. Passo a passo, com animação: [Abrir um app não assinado](./unsigned-apps).
:::

## Primeiro uso

O app não lê o seu shell nem o seu `.env`, então ele te recebe com **Conectar um modelo**: abra **Configurações**, informe
o endpoint, a chave e o modelo, e clique em **Testar**. Se `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL` ou
`OPENAI_TEMPERATURE` estiverem definidas, elas viram os valores iniciais.

| | |
|---|---|
| Dados | a pasta de dados de aplicativos do sistema, por exemplo `~/Library/Application Support/top.iroof.desktop` no macOS |
| Links de compartilhamento | na mesma rede Wi‑Fi ou pela internet: [Abrir links em outros dispositivos](../features/share-links#open-links-on-other-devices) |
| Outros sites | links como `t.me` abrem no seu navegador |
| Janela no macOS | sem barra de título do sistema: os cabeçalhos do app continuam sob os semáforos e arrastam a janela |
| Importação | o app lê a exportação por conta própria: **Escolher pasta…** abre o seletor do sistema, e uma pasta, `.zip` ou `.txt` solta é importada de onde está. Nada é enviado, o original permanece intacto, e no APFS a mídia é clonada em vez de copiada, então até uma exportação de 13 GB ocupa quase nenhum espaço extra |

## Compile você mesmo {#build-it-yourself}

Você precisa de Rust ≥ 1.95 e Node.js, e no Linux dos [pré-requisitos do Tauri](https://v3.tauri.app/start/prerequisites/).

```sh
cd desktop
npm ci
npm run build                          # instaladores em desktop/target/release/bundle/
npm run build -- --debug --no-bundle   # só o binário
```

No macOS, o `npm run build` também gera o `.dmg`, e pula o AppleScript do Finder que apenas organiza a janela do DMG
(ele falha sem a permissão *Automação*). Defina `ROOFTOP_DMG_FINDER=1` para manter o layout do Finder, como
nos DMGs publicados: o fundo de `desktop/dmg/` com uma seta do app para *Aplicativos*, e os arquivos ocultos do volume
fora de vista. Depois de editar `desktop/dmg/background.svg`, execute `desktop/dmg/make-background.sh`.
