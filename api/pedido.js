const { put, list } = require('@vercel/blob')

const KEY = 'pedidos.json'

async function lerPedidos() {
  try {
    const { blobs } = await list({ prefix: KEY })
    if (!blobs.length) return []
    const res = await fetch(blobs[0].url + '?t=' + Date.now(), {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    })
    return await res.json()
  } catch {
    return []
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    if (req.method === 'GET') {
      const pedidos = await lerPedidos()
      return res.status(200).json(pedidos)
    }

    if (req.method === 'POST') {
      const pedidos = await lerPedidos()
      const novo = { ...req.body, id: Date.now() }
      pedidos.push(novo)
      await put(KEY, JSON.stringify(pedidos), {
        access: 'private',
        contentType: 'application/json',
        allowOverwrite: true,
      })
      return res.status(200).json({ sucesso: true })
    }
  } catch (err) {
    return res.status(500).json({ erro: err.message })
  }

  return res.status(405).end()
}
