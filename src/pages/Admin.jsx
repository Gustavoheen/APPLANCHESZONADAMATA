import { useState, useEffect, useCallback } from 'react'
import * as XLSX from 'xlsx'
import { categorias } from '../data/cardapio'

const SENHA = 'scooby2024'
const WHATSAPP_DEV = '5532999301657'

function hoje() {
  return new Date().toLocaleDateString('pt-BR')
}

function ontem() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toLocaleDateString('pt-BR')
}

function filtrarPedidos(pedidos, dataFiltro, pagamentoFiltro) {
  return pedidos.filter(p => {
    if (dataFiltro && p.data !== dataFiltro) return false
    if (pagamentoFiltro && p.pagamento !== pagamentoFiltro) return false
    return true
  })
}

function CardStat({ label, valor, sub, cor }) {
  return (
    <div className="bg-scooby-card border border-scooby-borda rounded-2xl p-4">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className={`font-bold text-2xl ${cor}`}>{valor}</p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
    </div>
  )
}

function CardPedido({ pedido }) {
  const [expandido, setExpandido] = useState(false)

  const corPagamento = {
    'Pix': 'bg-blue-900 text-blue-300',
    'Dinheiro': 'bg-green-900 text-green-300',
    'Cartão de Débito': 'bg-purple-900 text-purple-300',
    'Cartão de Crédito': 'bg-purple-900 text-purple-300',
  }[pedido.pagamento] || 'bg-gray-800 text-gray-300'

  const corTipo = pedido.tipoEntrega === 'Entrega'
    ? 'bg-orange-900/50 text-orange-300'
    : 'bg-teal-900/50 text-teal-300'

  return (
    <div className="bg-scooby-card border border-scooby-borda rounded-2xl overflow-hidden">
      {/* Linha principal */}
      <button
        onClick={() => setExpandido(e => !e)}
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-scooby-borda/30 transition"
      >
        {/* Número e hora */}
        <div className="flex-shrink-0 text-center w-14">
          <p className="text-scooby-amarelo font-bold text-sm">{pedido.hora}</p>
          <p className="text-gray-600 text-xs">{pedido.numeroPedido?.split('-').pop() || '—'}</p>
        </div>

        <div className="w-px h-10 bg-scooby-borda flex-shrink-0" />

        {/* Cliente */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">{pedido.nomeCliente}</p>
          <p className="text-gray-500 text-xs truncate">{pedido.endereco}</p>
        </div>

        {/* Itens resumidos */}
        <div className="hidden md:block flex-1 min-w-0">
          <p className="text-gray-300 text-xs truncate">{pedido.itensPedido}</p>
        </div>

        {/* Total */}
        <div className="flex-shrink-0 text-right">
          <p className="text-scooby-amarelo font-bold">R$ {pedido.total}</p>
          <div className="flex gap-1 mt-1 justify-end">
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${corPagamento}`}>
              {pedido.pagamento === 'Cartão de Débito' ? 'Débito' : pedido.pagamento === 'Cartão de Crédito' ? 'Crédito' : pedido.pagamento}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${corTipo}`}>
              {pedido.tipoEntrega}
            </span>
          </div>
        </div>

        <span className="text-gray-500 text-sm flex-shrink-0">{expandido ? '▲' : '▼'}</span>
      </button>

      {/* Detalhes expandidos */}
      {expandido && (
        <div className="border-t border-scooby-borda bg-scooby-escuro px-5 py-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Itens do pedido</p>
              <div className="space-y-1">
                {pedido.itensPedido.split(' | ').map((item, i) => (
                  <p key={i} className="text-gray-200 text-sm">• {item}</p>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Cliente</p>
                <p className="text-white text-sm">{pedido.nomeCliente}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">
                  {pedido.tipoEntrega === 'Entrega' ? 'Endereço' : 'Tipo'}
                </p>
                <p className="text-white text-sm">{pedido.endereco}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Pagamento</p>
                <p className="text-white text-sm">{pedido.pagamento}</p>
              </div>
              {pedido.observacao && (
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">Observação</p>
                  <p className="text-yellow-300 text-sm">{pedido.observacao}</p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-scooby-borda pt-3 flex gap-6 text-sm">
            <span className="text-gray-400">Subtotal: <span className="text-white">R$ {pedido.subtotal}</span></span>
            <span className="text-gray-400">Entrega: <span className="text-white">R$ {pedido.taxaEntrega}</span></span>
            <span className="text-gray-400">Total: <span className="text-scooby-amarelo font-bold">R$ {pedido.total}</span></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false)
  const [senha, setSenha] = useState('')
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [dataFiltro, setDataFiltro] = useState('')
  const [filtroRapido, setFiltroRapido] = useState('hoje')
  const [pagamentoFiltro, setPagamentoFiltro] = useState('')
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null)
  const [lojaForcada, setLojaForcada] = useState(
    localStorage.getItem('scooby_loja_forcada') === 'true'
  )
  const [abaAtiva, setAbaAtiva] = useState('pedidos')
  const [buscaCliente, setBuscaCliente] = useState('')

  // ── Estado da aba Cardápio ─────────────────────────────────
  const [cardapioState, setCardapioState] = useState({ precos: {}, desativados: [] })
  const [precosEditados, setPrecosEditados] = useState({})
  const [desativadosEditados, setDesativadosEditados] = useState([])
  const [salvandoCardapio, setSalvandoCardapio] = useState(false)
  const [msgCardapio, setMsgCardapio] = useState('')
  const [solicitacaoTexto, setSolicitacaoTexto] = useState('')
  const [precosVariacoesEditados, setPrecosVariacoesEditados] = useState({})
  const [taxaEntregaEditada, setTaxaEntregaEditada] = useState(CONFIG.taxaEntrega)

  function toggleLoja() {
    const novoValor = !lojaForcada
    setLojaForcada(novoValor)
    if (novoValor) {
      localStorage.setItem('scooby_loja_forcada', 'true')
    } else {
      localStorage.removeItem('scooby_loja_forcada')
    }
  }

  const buscarPedidos = useCallback(async () => {
    try {
      const res = await fetch('/api/pedido')
      if (res.ok) {
        const dados = await res.json()
        setPedidos(dados.reverse())
        setUltimaAtualizacao(new Date().toLocaleTimeString('pt-BR'))
      }
    } catch (err) {
      console.error('Erro ao buscar pedidos:', err)
    }
  }, [])

  useEffect(() => {
    const salvo = sessionStorage.getItem('admin_auth')
    if (salvo === SENHA) setAutenticado(true)
  }, [])

  useEffect(() => {
    if (!autenticado) return
    setCarregando(true)
    buscarPedidos().finally(() => setCarregando(false))
    const interval = setInterval(buscarPedidos, 15000)
    return () => clearInterval(interval)
  }, [autenticado, buscarPedidos])

  useEffect(() => {
    if (!autenticado) return
    fetch('/api/cardapio-state')
      .then(r => r.json())
      .then(estado => {
        setCardapioState(estado)
        setPrecosEditados(estado.precos || {})
        setDesativadosEditados(estado.desativados || [])
        setPrecosVariacoesEditados(estado.precosVariacoes || {})
        setTaxaEntregaEditada(estado.taxaEntrega ?? CONFIG.taxaEntrega)
      })
      .catch(() => {})
  }, [autenticado])

  function toggleDesativado(id) {
    setDesativadosEditados(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function handlePrecoChange(id, valor) {
    setPrecosEditados(prev => ({ ...prev, [String(id)]: valor }))
  }

  function handlePrecoVariacaoChange(itemId, label, valor) {
    setPrecosVariacoesEditados(prev => ({ ...prev, [`${itemId}-${label}`]: valor }))
  }

  async function salvarCardapio() {
    setSalvandoCardapio(true)
    setMsgCardapio('')
    try {
      const precosFinal = {}
      Object.entries(precosEditados).forEach(([id, val]) => {
        const num = parseFloat(String(val).replace(',', '.'))
        if (!isNaN(num) && num > 0) precosFinal[id] = num
      })
      const res = await fetch('/api/cardapio-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          precos: precosFinal,
          desativados: desativadosEditados,
          precosVariacoes: precosVariacoesEditados,
          taxaEntrega: parseFloat(String(taxaEntregaEditada).replace(',', '.')) || CONFIG.taxaEntrega,
        }),
      })
      if (res.ok) {
        const taxaFinal = parseFloat(String(taxaEntregaEditada).replace(',', '.')) || CONFIG.taxaEntrega
        setCardapioState({ precos: precosFinal, desativados: desativadosEditados, precosVariacoes: precosVariacoesEditados, taxaEntrega: taxaFinal })
        setMsgCardapio('Alterações salvas com sucesso!')
      } else {
        setMsgCardapio('Erro ao salvar. Tente novamente.')
      }
    } catch {
      setMsgCardapio('Erro de conexão.')
    } finally {
      setSalvandoCardapio(false)
      setTimeout(() => setMsgCardapio(''), 4000)
    }
  }

  function enviarSolicitacao() {
    if (!solicitacaoTexto.trim()) return
    fetch('/api/change-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: 'alteracao_estrutural', descricao: solicitacaoTexto }),
    }).catch(() => {})
    const mensagem = encodeURIComponent(
      `🍔 *SOLICITAÇÃO DE ALTERAÇÃO — Scooby-Doo Lanches*\n` +
      `${'─'.repeat(28)}\n\n` +
      `${solicitacaoTexto}\n\n` +
      `_Enviado pelo painel administrativo_`
    )
    window.location.href = `whatsapp://send?phone=${WHATSAPP_DEV}&text=${mensagem}`
    setSolicitacaoTexto('')
  }

  function handleLogin(e) {
    e.preventDefault()
    if (senha === SENHA) {
      sessionStorage.setItem('admin_auth', SENHA)
      setAutenticado(true)
    } else {
      alert('Senha incorreta!')
    }
  }

  // ── Dados calculados ──────────────────────────────────────────
  const dataAtiva = filtroRapido === 'hoje' ? hoje()
    : filtroRapido === 'ontem' ? ontem()
    : dataFiltro

  const pedidosFiltrados = filtrarPedidos(pedidos, dataAtiva, pagamentoFiltro)
  const pedidosHoje = pedidos.filter(p => p.data === hoje())

  const totalHoje = pedidosHoje.reduce((acc, p) => acc + parseFloat(p.total || 0), 0)
  const ticketMedio = pedidosHoje.length > 0 ? totalHoje / pedidosHoje.length : 0
  const totalGeral = pedidosFiltrados.reduce((acc, p) => acc + parseFloat(p.total || 0), 0)

  const countPix     = pedidosFiltrados.filter(p => p.pagamento === 'Pix').length
  const countDinheiro = pedidosFiltrados.filter(p => p.pagamento === 'Dinheiro').length
  const countCartao  = pedidosFiltrados.filter(p => p.pagamento?.includes('Cartão')).length

  // ── Clientes únicos agrupados por telefone ──────────────────
  const clientesMap = {}
  pedidos.forEach(p => {
    const chave = p.telefone || p.nomeCliente
    if (!clientesMap[chave]) {
      clientesMap[chave] = {
        nome: p.nomeCliente,
        telefone: p.telefone || '—',
        endereco: p.endereco,
        pedidos: [],
        totalGasto: 0,
      }
    }
    clientesMap[chave].pedidos.push(p)
    clientesMap[chave].totalGasto += parseFloat(p.total || 0)
    // Atualiza endereço com o mais recente
    if (p.endereco && p.endereco !== 'Retirar no local') {
      clientesMap[chave].endereco = p.endereco
    }
  })
  const clientes = Object.values(clientesMap)
    .sort((a, b) => b.pedidos.length - a.pedidos.length)
    .filter(c =>
      !buscaCliente ||
      c.nome.toLowerCase().includes(buscaCliente.toLowerCase()) ||
      c.telefone.includes(buscaCliente)
    )

  function exportarExcel() {
    const lista = pedidosFiltrados.map(p => ({
      'Nº Pedido':    p.numeroPedido || p.id,
      'Data':         p.data,
      'Hora':         p.hora,
      'Cliente':      p.nomeCliente,
      'Tipo':         p.tipoEntrega,
      'Endereço':     p.endereco,
      'Itens':        p.itensPedido,
      'Subtotal':     p.subtotal,
      'Taxa Entrega': p.taxaEntrega,
      'TOTAL':        p.total,
      'Pagamento':    p.pagamento,
      'Observações':  p.observacao || '',
    }))
    const ws = XLSX.utils.json_to_sheet(lista)
    ws['!cols'] = [
      { wch: 18 }, { wch: 12 }, { wch: 8 }, { wch: 20 },
      { wch: 10 }, { wch: 30 }, { wch: 50 }, { wch: 12 },
      { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 20 },
    ]
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Pedidos')
    const nome = dataAtiva
      ? `pedidos-${dataAtiva.replace(/\//g, '-')}.xlsx`
      : `pedidos-todos.xlsx`
    XLSX.writeFile(wb, nome)
  }

  // ── TELA DE LOGIN ─────────────────────────────────────────────
  if (!autenticado) {
    return (
      <div className="min-h-screen bg-scooby-escuro flex items-center justify-center p-4">
        <div className="bg-scooby-card border border-scooby-borda rounded-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain mx-auto mb-3 rounded-full" />
            <h1 className="text-scooby-amarelo font-bold text-xl">Painel Administrativo</h1>
            <p className="text-gray-400 text-sm">Scooby-Doo Lanches</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              className="w-full bg-scooby-escuro border border-scooby-borda text-white rounded-xl px-4 py-3 focus:outline-none focus:border-scooby-amarelo"
            />
            <button className="w-full bg-scooby-vermelho hover:bg-red-700 text-white font-bold py-3 rounded-xl transition">
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── PAINEL ADMIN ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-scooby-escuro text-white">
      {/* Header */}
      <header className="bg-scooby-vermelho border-b-4 border-scooby-amarelo px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full object-contain" />
          <div>
            <h1 className="text-scooby-amarelo font-bold text-lg">Painel Administrativo</h1>
            <p className="text-yellow-200 text-xs flex items-center gap-1.5">
              {ultimaAtualizacao ? `Atualizado às ${ultimaAtualizacao}` : 'Carregando...'}
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLoja}
            className={`flex items-center gap-2 font-bold text-sm px-4 py-2 rounded-xl border-2 transition ${
              lojaForcada
                ? 'bg-green-600 border-green-400 text-white hover:bg-green-700'
                : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${lojaForcada ? 'bg-green-300 animate-pulse' : 'bg-gray-500'}`}></span>
            {lojaForcada ? 'Loja Aberta' : 'Loja Fechada'}
          </button>
          <a href="/" className="text-gray-300 hover:text-white text-sm transition">← Voltar ao site</a>
        </div>
      </header>

      {/* Abas */}
      <div className="bg-scooby-card border-b border-scooby-borda">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 pt-3">
          {[
            { id: 'pedidos', label: '📋 Pedidos' },
            { id: 'clientes', label: '👥 Clientes' },
            { id: 'cardapio', label: '🍔 Cardápio' },
          ].map(aba => (
            <button
              key={aba.id}
              onClick={() => setAbaAtiva(aba.id)}
              className={`px-5 py-2.5 rounded-t-xl font-semibold text-sm transition border-b-2 ${
                abaAtiva === aba.id
                  ? 'bg-scooby-escuro text-scooby-amarelo border-scooby-amarelo'
                  : 'text-gray-400 hover:text-white border-transparent hover:bg-scooby-borda'
              }`}
            >
              {aba.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── ABA PEDIDOS ── */}
      {abaAtiva === 'pedidos' && (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">

          {/* Stats do dia */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <CardStat
              label="🛒 Pedidos hoje"
              valor={pedidosHoje.length}
              sub={`${pedidosHoje.filter(p => p.tipoEntrega === 'Entrega').length} entregas · ${pedidosHoje.filter(p => p.tipoEntrega === 'Retirada').length} retiradas`}
              cor="text-white"
            />
            <CardStat
              label="💰 Total hoje"
              valor={`R$ ${totalHoje.toFixed(2).replace('.', ',')}`}
              sub={`Ticket médio: R$ ${ticketMedio.toFixed(2).replace('.', ',')}`}
              cor="text-scooby-amarelo"
            />
            <CardStat
              label="📱 Pix hoje"
              valor={pedidosHoje.filter(p => p.pagamento === 'Pix').length}
              sub={`R$ ${pedidosHoje.filter(p => p.pagamento === 'Pix').reduce((a, p) => a + parseFloat(p.total || 0), 0).toFixed(2).replace('.', ',')}`}
              cor="text-blue-400"
            />
            <CardStat
              label="💵 Dinheiro hoje"
              valor={pedidosHoje.filter(p => p.pagamento === 'Dinheiro').length}
              sub={`R$ ${pedidosHoje.filter(p => p.pagamento === 'Dinheiro').reduce((a, p) => a + parseFloat(p.total || 0), 0).toFixed(2).replace('.', ',')}`}
              cor="text-green-400"
            />
          </div>

          {/* Filtros */}
          <div className="bg-scooby-card border border-scooby-borda rounded-2xl p-4 flex flex-wrap gap-3 items-end">
            {/* Filtro rápido */}
            <div>
              <p className="text-gray-500 text-xs mb-1.5">Período</p>
              <div className="flex gap-1.5">
                {[['hoje', 'Hoje'], ['ontem', 'Ontem'], ['todos', 'Todos']].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => { setFiltroRapido(val); setDataFiltro('') }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                      filtroRapido === val
                        ? 'bg-scooby-amarelo text-black'
                        : 'bg-scooby-escuro text-gray-400 hover:text-white border border-scooby-borda'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Data manual */}
            <div>
              <p className="text-gray-500 text-xs mb-1.5">Data específica</p>
              <input
                type="text"
                placeholder="dd/mm/aaaa"
                value={dataFiltro}
                onChange={e => { setDataFiltro(e.target.value); setFiltroRapido('') }}
                className="bg-scooby-escuro border border-scooby-borda text-white rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-scooby-amarelo w-32"
              />
            </div>

            {/* Pagamento */}
            <div>
              <p className="text-gray-500 text-xs mb-1.5">Pagamento</p>
              <select
                value={pagamentoFiltro}
                onChange={e => setPagamentoFiltro(e.target.value)}
                className="bg-scooby-escuro border border-scooby-borda text-white rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-scooby-amarelo"
              >
                <option value="">Todos</option>
                <option value="Pix">Pix</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de Débito">Débito</option>
                <option value="Cartão de Crédito">Crédito</option>
              </select>
            </div>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={buscarPedidos}
                className="bg-scooby-borda hover:bg-scooby-vermelho text-white px-4 py-2 rounded-xl text-sm transition"
              >
                🔄 Atualizar
              </button>
              <button
                onClick={exportarExcel}
                disabled={pedidosFiltrados.length === 0}
                className="bg-green-700 hover:bg-green-600 disabled:opacity-40 text-white font-bold px-4 py-2 rounded-xl text-sm transition"
              >
                📥 Excel ({pedidosFiltrados.length})
              </button>
            </div>
          </div>

          {/* Resumo filtro atual */}
          {pedidosFiltrados.length > 0 && (
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 px-1">
              <span><strong className="text-white">{pedidosFiltrados.length}</strong> pedidos</span>
              <span>Total: <strong className="text-scooby-amarelo">R$ {totalGeral.toFixed(2).replace('.', ',')}</strong></span>
              {countPix > 0 && <span>Pix: <strong className="text-blue-400">{countPix}</strong></span>}
              {countDinheiro > 0 && <span>Dinheiro: <strong className="text-green-400">{countDinheiro}</strong></span>}
              {countCartao > 0 && <span>Cartão: <strong className="text-purple-400">{countCartao}</strong></span>}
            </div>
          )}

          {/* Lista de pedidos */}
          {carregando ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3 animate-pulse">⏳</p>
              <p>Carregando pedidos...</p>
            </div>
          ) : pedidosFiltrados.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-5xl mb-4">📋</p>
              <p className="font-semibold text-lg text-gray-400">Nenhum pedido encontrado</p>
              <p className="text-sm mt-1">
                {filtroRapido === 'hoje' ? 'Nenhum pedido recebido hoje ainda.' : 'Tente outro filtro.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {pedidosFiltrados.map((p, i) => (
                <CardPedido key={p.id || i} pedido={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── ABA CLIENTES ── */}
      {abaAtiva === 'clientes' && (
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-scooby-amarelo font-bold text-lg">Base de Clientes</h2>
              <p className="text-gray-500 text-sm">{clientes.length} clientes cadastrados</p>
            </div>
            <input
              type="text"
              placeholder="Buscar por nome ou telefone..."
              value={buscaCliente}
              onChange={e => setBuscaCliente(e.target.value)}
              className="bg-scooby-escuro border border-scooby-borda text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-scooby-amarelo w-64"
            />
          </div>

          {clientes.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-5xl mb-4">👥</p>
              <p className="font-semibold text-gray-400">Nenhum cliente encontrado</p>
              <p className="text-sm mt-1">Os clientes aparecerão aqui conforme fizerem pedidos.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {clientes.map((c, i) => (
                <div key={i} className="bg-scooby-card border border-scooby-borda rounded-2xl px-5 py-4 flex flex-wrap gap-4 items-center">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-scooby-vermelho flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
                    {c.nome.charAt(0).toUpperCase()}
                  </div>

                  {/* Info principal */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold">{c.nome}</p>
                    <div className="flex flex-wrap gap-3 mt-0.5">
                      {c.telefone !== '—' && (
                        <a
                          href={`https://wa.me/55${c.telefone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-400 text-xs hover:underline"
                        >
                          📱 {c.telefone}
                        </a>
                      )}
                      {c.endereco && c.endereco !== 'Retirar no local' && (
                        <p className="text-gray-500 text-xs truncate max-w-xs">📍 {c.endereco}</p>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 flex-shrink-0 text-center">
                    <div>
                      <p className="text-white font-bold text-lg">{c.pedidos.length}</p>
                      <p className="text-gray-500 text-xs">pedidos</p>
                    </div>
                    <div>
                      <p className="text-scooby-amarelo font-bold text-lg">R$ {c.totalGasto.toFixed(2).replace('.', ',')}</p>
                      <p className="text-gray-500 text-xs">total gasto</p>
                    </div>
                    <div>
                      <p className="text-gray-300 font-bold text-lg">R$ {(c.totalGasto / c.pedidos.length).toFixed(2).replace('.', ',')}</p>
                      <p className="text-gray-500 text-xs">ticket médio</p>
                    </div>
                  </div>

                  {/* Último pedido */}
                  <div className="text-xs text-gray-500 flex-shrink-0">
                    <p>Último pedido</p>
                    <p className="text-gray-300">{c.pedidos[0]?.data} {c.pedidos[0]?.hora}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── ABA CARDÁPIO ── */}
      {abaAtiva === 'cardapio' && (
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">

          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-scooby-amarelo font-bold text-lg">Gerenciar Cardápio</h2>
            <div className="flex items-center gap-3">
              {msgCardapio && (
                <span className={`text-sm font-semibold px-3 py-1 rounded-xl ${msgCardapio.includes('sucesso') ? 'bg-green-800 text-green-300' : 'bg-red-900 text-red-300'}`}>
                  {msgCardapio}
                </span>
              )}
              <button
                onClick={salvarCardapio}
                disabled={salvandoCardapio}
                className="bg-scooby-vermelho hover:bg-red-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
              >
                {salvandoCardapio ? 'Salvando...' : '💾 Salvar alterações'}
              </button>
            </div>
          </div>

          {/* Taxa de entrega */}
          <div className="bg-scooby-card border border-scooby-borda rounded-2xl p-5">
            <h3 className="text-scooby-amarelo font-bold text-sm mb-3">🚗 Taxa de Entrega</h3>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">R$</span>
              <input
                type="number"
                step="0.50"
                min="0"
                value={taxaEntregaEditada}
                onChange={e => setTaxaEntregaEditada(e.target.value)}
                className="w-28 bg-scooby-escuro border border-scooby-borda text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-scooby-amarelo"
              />
              <span className="text-gray-500 text-xs">por entrega (atual: R$ {Number(taxaEntregaEditada).toFixed(2).replace('.', ',')})</span>
            </div>
          </div>

          {categorias.map(cat => (
            <div key={cat.id} className="bg-scooby-card border border-scooby-borda rounded-2xl overflow-hidden">
              <div className="bg-scooby-borda px-5 py-3">
                <h3 className="text-scooby-amarelo font-bold text-sm">{cat.nome}</h3>
              </div>
              <div className="divide-y divide-scooby-borda">
                {cat.itens.map(item => {
                  const ativo = !desativadosEditados.includes(item.id)
                  const temVariacao = !!(item.proteinas || item.tamanhos)
                  const precoAtual = precosEditados[String(item.id)] !== undefined
                    ? precosEditados[String(item.id)]
                    : (item.preco !== undefined ? item.preco : '')
                  return (
                    <div key={item.id} className="px-5 py-3">
                      {/* Linha principal */}
                      <div className="flex items-center gap-4 flex-wrap">
                        <button
                          onClick={() => toggleDesativado(item.id)}
                          className={`flex-shrink-0 w-12 h-6 rounded-full transition-colors relative ${ativo ? 'bg-green-600' : 'bg-gray-600'}`}
                          title={ativo ? 'Clique para marcar como esgotado' : 'Clique para reativar'}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${ativo ? 'right-1' : 'left-1'}`}></span>
                        </button>

                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-sm ${ativo ? 'text-white' : 'text-gray-500'}`}>
                            {item.nome}
                          </p>
                          <p className="text-gray-500 text-xs truncate">{item.descricao}</p>
                        </div>

                        {!temVariacao && (
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-gray-500 text-xs">R$</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={precoAtual}
                              onChange={e => handlePrecoChange(item.id, e.target.value)}
                              className="w-24 bg-scooby-escuro border border-scooby-borda text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-scooby-amarelo text-right"
                            />
                          </div>
                        )}

                        <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${ativo ? 'bg-green-900 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
                          {ativo ? 'Ativo' : 'Esgotado'}
                        </span>
                      </div>

                      {/* Preços das variações */}
                      {temVariacao && (
                        <div className="mt-2 ml-14 flex flex-wrap gap-x-4 gap-y-2">
                          {(item.proteinas || item.tamanhos).map(v => {
                            const chave = `${item.id}-${v.label}`
                            const precoV = precosVariacoesEditados[chave] !== undefined
                              ? precosVariacoesEditados[chave]
                              : v.preco
                            return (
                              <div key={v.label} className="flex items-center gap-1.5">
                                <span className="text-gray-400 text-xs whitespace-nowrap">{v.label}:</span>
                                <span className="text-gray-500 text-xs">R$</span>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  value={precoV}
                                  onChange={e => handlePrecoVariacaoChange(item.id, v.label, e.target.value)}
                                  className="w-20 bg-scooby-escuro border border-scooby-borda text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-scooby-amarelo text-right"
                                />
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Solicitar alteração */}
          <div className="bg-scooby-card border border-scooby-borda rounded-2xl p-6 space-y-4">
            <h3 className="text-scooby-amarelo font-bold text-base">Solicitar alteração ao desenvolvedor</h3>
            <p className="text-gray-400 text-sm">
              Para alterações estruturais (novos itens, categorias, alteração de nome, etc.), envie uma solicitação via WhatsApp.
            </p>
            <textarea
              value={solicitacaoTexto}
              onChange={e => setSolicitacaoTexto(e.target.value)}
              placeholder="Ex: Adicionar novo hamburguer 'Scooby Especial' por R$ 35,00 com pão brioche, bife artesanal, cheddar e bacon."
              rows={4}
              className="w-full bg-scooby-escuro border border-scooby-borda text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-scooby-amarelo resize-none"
            />
            <button
              onClick={enviarSolicitacao}
              disabled={!solicitacaoTexto.trim()}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-600 disabled:opacity-40 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
            >
              <span>📲</span>
              Enviar via WhatsApp
            </button>
          </div>

        </div>
      )}
    </div>
  )
}
