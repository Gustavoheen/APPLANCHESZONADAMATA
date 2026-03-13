import { useState, useCallback } from 'react'

export function useCarrinho() {
  const [itens, setItens] = useState([])

  // variacao = { label, preco } vindo de tamanhos[] ou proteinas[]
  const adicionar = useCallback((item, variacao = null) => {
    const preco = variacao ? variacao.preco : item.preco
    const chave = `${item.id}-${variacao?.label || ''}`

    setItens(prev => {
      const existe = prev.find(i => i.chave === chave)
      if (existe) {
        return prev.map(i => i.chave === chave ? { ...i, qtd: i.qtd + 1 } : i)
      }
      return [...prev, { chave, item, variacao: variacao?.label || null, preco, qtd: 1 }]
    })
  }, [])

  const remover = useCallback((chave) => {
    setItens(prev => {
      const existe = prev.find(i => i.chave === chave)
      if (!existe) return prev
      if (existe.qtd === 1) return prev.filter(i => i.chave !== chave)
      return prev.map(i => i.chave === chave ? { ...i, qtd: i.qtd - 1 } : i)
    })
  }, [])

  const limpar = useCallback(() => setItens([]), [])

  const totalItens = itens.reduce((acc, i) => acc + i.qtd, 0)
  const subtotal   = itens.reduce((acc, i) => acc + i.preco * i.qtd, 0)

  return { itens, adicionar, remover, limpar, totalItens, subtotal }
}
