# Configurar Google Sheets para receber pedidos

## 1. Criar a planilha

1. Acesse: https://sheets.google.com
2. Crie uma planilha nova e nomeie: **"Pedidos Scooby-Doo"**
3. Copie o ID da URL (o trecho entre /d/ e /edit):
   - Ex: `https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/edit`

## 2. Criar o Apps Script

1. Na planilha, clique em **Extensões → Apps Script**
2. Apague o código existente e cole o código do arquivo `apps-script.gs`
3. Clique em **Salvar** (ícone de disquete)

## 3. Publicar como Web App

1. Clique em **Implantar → Nova implantação**
2. Tipo: **App da Web**
3. Executar como: **Eu mesmo**
4. Quem tem acesso: **Qualquer pessoa**
5. Clique em **Implantar** e autorize
6. **Copie a URL** gerada (começa com https://script.google.com/macros/s/...)

## 4. Colocar a URL no site

Abra o arquivo `src/config.js` e cole a URL no campo:
```
googleScriptUrl: 'COLE_A_URL_AQUI',
```

Depois republique: `vercel --prod`
