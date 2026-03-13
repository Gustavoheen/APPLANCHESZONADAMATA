// ============================================================
//  Google Apps Script — Scooby-Doo Lanches
//  Recebe pedidos do site e salva na planilha
// ============================================================

var NOME_ABA = 'Pedidos' // nome da aba onde os pedidos serão salvos

function doPost(e) {
  try {
    var sheet = obterOuCriarAba()
    var dados = JSON.parse(e.postData.contents)

    sheet.appendRow([
      dados.numeroPedido,
      dados.data,
      dados.hora,
      dados.nomeCliente,
      dados.telefone,
      dados.tipoEntrega,
      dados.endereco,
      dados.itensPedido,
      'R$ ' + dados.subtotal,
      'R$ ' + dados.taxaEntrega,
      'R$ ' + dados.total,
      dados.pagamento,
      dados.observacao || '',
      'Recebido'
    ])

    return resposta({ sucesso: true, mensagem: 'Pedido salvo!' })

  } catch (err) {
    return resposta({ sucesso: false, erro: err.toString() })
  }
}

function doGet(e) {
  return resposta({ status: 'online', servico: 'Scooby-Doo Lanches' })
}

// Cria a aba e o cabeçalho se ainda não existir
function obterOuCriarAba() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var aba = ss.getSheetByName(NOME_ABA)

  if (!aba) {
    aba = ss.insertSheet(NOME_ABA)
    var cabecalho = [
      '# Pedido', 'Data', 'Hora', 'Cliente', 'Telefone',
      'Tipo', 'Endereço', 'Itens',
      'Subtotal', 'Taxa Entrega', 'TOTAL',
      'Pagamento', 'Observações', 'Status'
    ]
    aba.appendRow(cabecalho)

    // Formatar cabeçalho
    var headerRange = aba.getRange(1, 1, 1, cabecalho.length)
    headerRange.setBackground('#8B0000')
    headerRange.setFontColor('#FFD700')
    headerRange.setFontWeight('bold')
    headerRange.setHorizontalAlignment('center')

    // Congelar linha do cabeçalho
    aba.setFrozenRows(1)

    // Ajustar largura das colunas
    aba.setColumnWidth(1, 80)   // # Pedido
    aba.setColumnWidth(2, 100)  // Data
    aba.setColumnWidth(3, 70)   // Hora
    aba.setColumnWidth(4, 150)  // Cliente
    aba.setColumnWidth(5, 130)  // Telefone
    aba.setColumnWidth(6, 90)   // Tipo
    aba.setColumnWidth(7, 200)  // Endereço
    aba.setColumnWidth(8, 300)  // Itens
    aba.setColumnWidth(9, 90)   // Subtotal
    aba.setColumnWidth(10, 100) // Taxa
    aba.setColumnWidth(11, 100) // Total
    aba.setColumnWidth(12, 130) // Pagamento
    aba.setColumnWidth(13, 150) // Observações
    aba.setColumnWidth(14, 100) // Status
  }

  return aba
}

function resposta(obj) {
  var output = ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
  return output
}
