# Scooby-Doo Lanches — Contexto do Projeto

## O que é
Cardápio digital com pedidos via WhatsApp para a hamburgueria **Scooby-Doo Lanches**.
- Cliente: dono da loja (usa o cardápio e o painel admin)
- Desenvolvedor: Gustavo (mantém e evolui o sistema)

## Stack
- React + Vite + Tailwind CSS
- Vercel (deploy, Serverless Functions, Blob storage)
- Analytics e Speed Insights da Vercel

## URLs
- Produção: `www.scoobydoolanches.com.br` / `scooby-cardapio.vercel.app`
- Admin: `/admin`

## Estrutura de pastas
```
src/
  App.jsx          — página principal do cardápio
  config.js        — configurações centrais (WhatsApp, Pix, horário, entrega)
  data/            — dados do cardápio (categorias e itens)
  components/      — CardItem, CarrinhoSidebar, DrawerCarrinho, ModalPedido, Admin
  pages/           — Admin.jsx
  hooks/           — useCarrinho
  utils/
api/
  pedido.js        — GET/POST pedidos no Vercel Blob
  cardapio-state.js — GET/POST estado do cardápio (preços/desativados)
  change-request.js — POST envia email de solicitação de alteração
public/
  logo-desktop.png, logo-mobile.png, logo-nova.png
```

## Configurações importantes (config.js)
- WhatsApp pedidos: `5532999301657`
- Horário: 18h–23h (pode ser forçado aberto via localStorage `scooby_loja_forcada`)
- Taxa entrega: R$ 5,00
- Chave Pix: `(24) 99999-8888` (Telefone)
- Google Script URL: configurado para planilha de pedidos

## Painel Admin
- Acesso: botão ⚙️ no header → senha `scooby2024` → redireciona para `/admin`
- Aba Pedidos: lista em tempo real, filtros, exportação Excel
- Aba Cardápio: toggle ativo/esgotado, edição de preço (salva no Vercel Blob)
- Toggle abrir/fechar loja manualmente

## Notificações
- Email via Resend (env `RESEND_API_KEY` na Vercel)
- Email destino: `ghenriique30@gmail.com`

## Design
- Tema escuro: `#111111`
- Cores: amarelo `#FFD700`, vermelho `#CC0000`
- Watermark: logo como fundo fixo (7% opacidade desktop, 8% mobile)

## Variáveis de ambiente (Vercel)
- `RESEND_API_KEY` — chave da API de email

## Como rodar localmente
```bash
cd C:/Users/Gustavo/scooby-cardapio
npm run dev
```
