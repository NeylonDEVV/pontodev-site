# ponto dev — site

Site institucional da ponto dev. HTML, CSS e JavaScript puros, sem build: pronto para a Vercel.

## Estrutura

```
index.html      → página
styles.css      → estilos (cores no topo, em :root)
main.js         → menu mobile, animações e formulário
config.js       → SEUS CONTATOS (e-mail, WhatsApp, Instagram)
vercel.json     → cache e cabeçalhos de segurança
assets/         → imagens, favicon e imagem de compartilhamento
```

## 1. Configure seus contatos

Abra `config.js` e preencha `email`, `whatsapp` (só números, com 55 + DDD) e `instagram`.
O formulário abre o WhatsApp (ou o e-mail) com a mensagem do cliente já escrita.

## 2. Publicar na Vercel

**Opção A — pelo GitHub (recomendado, atualiza sozinho a cada alteração)**
1. Crie um repositório no GitHub e envie esta pasta.
2. Em https://vercel.com/new, clique em **Import** no repositório.
3. Framework Preset: **Other**. Não precisa de build command. Clique em **Deploy**.

**Opção B — pela linha de comando**
```bash
npm i -g vercel
vercel          # primeira vez: faz login e cria o projeto
vercel --prod   # publica em produção
```

## 3. Domínio próprio

Na Vercel: Project → Settings → Domains → adicione `seudominio.com.br` e siga as instruções de DNS.

## Testar localmente

```bash
npx serve .
```
