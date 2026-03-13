module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).end()

  const hookUrl = process.env.DEPLOY_HOOK_URL
  if (!hookUrl) return res.status(500).json({ erro: 'Deploy hook não configurado' })

  try {
    const r = await fetch(hookUrl, { method: 'POST' })
    const data = await r.json()
    return res.status(200).json({ sucesso: true, job: data.job?.id || null })
  } catch (err) {
    return res.status(500).json({ erro: err.message })
  }
}
