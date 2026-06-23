export interface PhotoTheme {
  id: string
  name: string
  bgColor: string
  photoBorderRadius: number
  photoBorderColor: string
  photoBorderWidth: number
  photoShadow: boolean
  logoText: string
  logoColor: string
  logoFont: string
  subColor: string
  spacing: number
  margin: number
  renderDecorations?: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
  renderExtra?: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
}

export const themes: PhotoTheme[] = [
  {
    id: 'original',
    name: '오리지널',
    bgColor: '#ffffff',
    photoBorderRadius: 20,
    photoBorderColor: '#ffffff',
    photoBorderWidth: 4,
    photoShadow: true,
    logoText: 'LIFE 4 CUTS',
    logoColor: '#2c2c2c',
    logoFont: '600 28px "Playfair Display", serif',
    subColor: '#999999',
    spacing: 16,
    margin: 48,
  },
  {
    id: 'retro',
    name: '레트로 필름',
    bgColor: '#3a2a1a',
    photoBorderRadius: 0,
    photoBorderColor: '#e8d5a3',
    photoBorderWidth: 6,
    photoShadow: false,
    logoText: 'RETRO FILM',
    logoColor: '#e8d5a3',
    logoFont: '400 26px "Courier New", monospace',
    subColor: '#b8a57a',
    spacing: 20,
    margin: 64,
    renderDecorations(ctx, w, h) {
      ctx.fillStyle = '#e8d5a3'
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath()
        ctx.arc(24, y + 6, 4, 0, Math.PI * 2)
        ctx.arc(w - 24, y + 6, 4, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = 'rgba(0,0,0,0.25)'
      ctx.fillRect(0, 0, w, 30)
      ctx.fillRect(0, h - 60, w, 60)
    },
    renderExtra(ctx, w, h) {
      ctx.fillStyle = '#e8d5a3'
      ctx.font = '10px "Courier New", monospace'
      ctx.textAlign = 'center'
      ctx.fillText('---  4  ---', w / 2, 20)
      ctx.fillText('---  exposures  ---', w / 2, h - 20)
    },
  },
  {
    id: 'modern',
    name: '모던 블랙',
    bgColor: '#1a1a1a',
    photoBorderRadius: 8,
    photoBorderColor: '#ffffff',
    photoBorderWidth: 2,
    photoShadow: false,
    logoText: 'L4C',
    logoColor: '#ffffff',
    logoFont: '300 48px "Inter", sans-serif',
    subColor: '#666666',
    spacing: 12,
    margin: 36,
  },
  {
    id: 'neon',
    name: '네온 팝',
    bgColor: '#0d0d1a',
    photoBorderRadius: 16,
    photoBorderColor: '#ff2d78',
    photoBorderWidth: 4,
    photoShadow: false,
    logoText: 'NEON',
    logoColor: '#ff2d78',
    logoFont: '800 36px "Inter", sans-serif',
    subColor: '#00d4ff',
    spacing: 14,
    margin: 44,
    renderDecorations(ctx, w, h) {
      ctx.save()
      ctx.shadowColor = '#ff2d78'
      ctx.shadowBlur = 20
      ctx.fillStyle = '#ff2d78'
      ctx.font = 'bold 14px "Inter", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('✦  POP  ✦', w / 2, h - 56)
      ctx.restore()

      ctx.save()
      ctx.shadowColor = '#00d4ff'
      ctx.shadowBlur = 15
      ctx.strokeStyle = '#00d4ff'
      ctx.lineWidth = 2
      ctx.strokeRect(16, 16, w - 32, h - 32)
      ctx.restore()
    },
  },
  {
    id: 'sweet',
    name: '스위트',
    bgColor: '#fff0f5',
    photoBorderRadius: 28,
    photoBorderColor: '#ffb6c1',
    photoBorderWidth: 6,
    photoShadow: false,
    logoText: 'Sweet Cut ♡',
    logoColor: '#d6336c',
    logoFont: '600 28px "Playfair Display", serif',
    subColor: '#ff8fab',
    spacing: 18,
    margin: 50,
    renderDecorations(ctx, w, h) {
      const drawHeart = (cx: number, cy: number, size: number, color: string) => {
        ctx.save()
        ctx.fillStyle = color
        ctx.globalAlpha = 0.3
        ctx.beginPath()
        ctx.moveTo(cx, cy + size * 0.3)
        ctx.bezierCurveTo(cx - size * 0.5, cy - size * 0.3, cx - size, cy + size * 0.3, cx, cy + size)
        ctx.bezierCurveTo(cx + size, cy + size * 0.3, cx + size * 0.5, cy - size * 0.3, cx, cy + size * 0.3)
        ctx.fill()
        ctx.restore()
      }

      drawHeart(60, 60, 30, '#ffb6c1')
      drawHeart(w - 60, 60, 30, '#ffb6c1')

      ctx.fillStyle = '#ffb6c1'
      ctx.font = '14px "Playfair Display", serif'
      ctx.textAlign = 'center'
      ctx.fillText('♡  love yourself  ♡', w / 2, h - 18)
    },
  },
  {
    id: 'cinema',
    name: '시네마',
    bgColor: '#1a0f0f',
    photoBorderRadius: 4,
    photoBorderColor: '#c9a84c',
    photoBorderWidth: 4,
    photoShadow: false,
    logoText: 'CINEMA',
    logoColor: '#c9a84c',
    logoFont: '600 34px "Playfair Display", serif',
    subColor: '#8b0000',
    spacing: 16,
    margin: 48,
    renderDecorations(ctx, w, h) {
      ctx.fillStyle = '#8b0000'
      ctx.fillRect(0, 0, w, 8)
      ctx.fillRect(0, h - 8, w, 8)

      ctx.fillStyle = 'rgba(139, 0, 0, 0.3)'
      ctx.fillRect(0, 0, 16, h)
      ctx.fillRect(w - 16, 0, w, h)

      for (let i = 0; i < 12; i++) {
        const x = 20 + i * ((w - 40) / 12)
        ctx.fillStyle = '#c9a84c'
        ctx.fillRect(x, h - 48, 4, 20)
      }

      ctx.fillStyle = '#c9a84c'
      ctx.font = '10px "Courier New", monospace'
      ctx.textAlign = 'center'
      ctx.fillText('✦  NOW SHOWING  ✦', w / 2, h - 56)
    },
  },
  {
    id: 'bohemian',
    name: '보헤미안',
    bgColor: '#f5e6d3',
    photoBorderRadius: 12,
    photoBorderColor: '#c4956a',
    photoBorderWidth: 4,
    photoShadow: false,
    logoText: 'Bohemian',
    logoColor: '#8b5e3c',
    logoFont: '400 32px "Playfair Display", serif',
    subColor: '#c4956a',
    spacing: 16,
    margin: 50,
    renderDecorations(ctx, w, h) {
      const colors = ['#c4956a', '#d4a574', '#e8c9a0', '#8b5e3c']
      ctx.save()
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
          const cx = 24 + col * ((w - 48) / 3)
          const cy = 24 + row * ((h - 48) / 2)
          ctx.globalAlpha = 0.15
          ctx.fillStyle = colors[(row + col) % colors.length]
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6
            const r = i % 2 === 0 ? 14 : 7
            if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle))
            else ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle))
          }
          ctx.closePath()
          ctx.fill()
        }
      }
      ctx.restore()

      ctx.fillStyle = '#8b5e3c'
      ctx.font = '12px "Playfair Display", serif'
      ctx.textAlign = 'center'
      ctx.fillText('~ free spirit ~', w / 2, h - 14)
    },
  },
  {
    id: 'ocean',
    name: '오션',
    bgColor: '#e8f4f8',
    photoBorderRadius: 16,
    photoBorderColor: '#4a90d9',
    photoBorderWidth: 4,
    photoShadow: false,
    logoText: 'OCEAN',
    logoColor: '#1a5276',
    logoFont: '300 36px "Inter", sans-serif',
    subColor: '#4a90d9',
    spacing: 14,
    margin: 46,
    renderDecorations(ctx, w, h) {
      const drawWave = (y: number, color: string, alpha: number) => {
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.moveTo(0, y)
        for (let x = 0; x <= w; x += 20) {
          ctx.lineTo(x, y + Math.sin((x / w) * Math.PI * 4) * 6)
        }
        ctx.lineTo(w, h)
        ctx.lineTo(0, h)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      drawWave(h - 60, '#4a90d9', 0.1)
      drawWave(h - 50, '#357abd', 0.08)

      for (let i = 0; i < 8; i++) {
        const x = 30 + i * ((w - 60) / 7)
        ctx.save()
        ctx.globalAlpha = 0.08
        ctx.fillStyle = '#4a90d9'
        ctx.beginPath()
        ctx.arc(x, h - 30, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      ctx.fillStyle = '#4a90d9'
      ctx.font = '11px "Inter", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('~ dive into the moment ~', w / 2, h - 18)
    },
  },
  {
    id: 'golden',
    name: '골든',
    bgColor: '#1c1410',
    photoBorderRadius: 12,
    photoBorderColor: '#d4af37',
    photoBorderWidth: 5,
    photoShadow: false,
    logoText: 'GOLDEN',
    logoColor: '#d4af37',
    logoFont: '700 32px "Playfair Display", serif',
    subColor: '#8b7536',
    spacing: 18,
    margin: 50,
    renderDecorations(ctx, w, h) {
      ctx.save()
      ctx.shadowColor = '#d4af37'
      ctx.shadowBlur = 8
      ctx.strokeStyle = '#d4af37'
      ctx.lineWidth = 1
      ctx.strokeRect(12, 12, w - 24, h - 24)
      ctx.restore()

      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8
        const cx = w / 2 + Math.cos(angle) * 40
        const cy = h - 36 + Math.sin(angle) * 0
        ctx.save()
        ctx.globalAlpha = 0.2
        ctx.fillStyle = '#d4af37'
        ctx.beginPath()
        for (let j = 0; j < 4; j++) {
          const a = (j * Math.PI * 2) / 4 + Math.PI / 4
          const r = j % 2 === 0 ? 6 : 3
          const sx = cx + (i * 25) + r * Math.cos(a)
          const sy = cy + r * Math.sin(a)
          if (j === 0) ctx.moveTo(sx, sy)
          else ctx.lineTo(sx, sy)
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      ctx.fillStyle = '#d4af37'
      ctx.font = '11px "Playfair Display", serif'
      ctx.textAlign = 'center'
      ctx.fillText('✦  timeless  ✦', w / 2, h - 16)
    },
  },
  {
    id: 'graffiti',
    name: '그래피티',
    bgColor: '#1a1a2e',
    photoBorderRadius: 0,
    photoBorderColor: '#ff6b35',
    photoBorderWidth: 3,
    photoShadow: false,
    logoText: 'GRAFFITI',
    logoColor: '#ff6b35',
    logoFont: '900 40px "Inter", sans-serif',
    subColor: '#e71d36',
    spacing: 12,
    margin: 42,
    renderDecorations(ctx, w, h) {
      ctx.save()
      ctx.globalAlpha = 0.15
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        const colors = ['#ff6b35', '#e71d36', '#ffd700', '#00d4ff', '#7a4a9a']
        ctx.fillStyle = colors[i % colors.length]
        ctx.font = `${16 + Math.random() * 20}px "Inter", sans-serif`
        ctx.fillText(['✪', '✧', '✦', '⬡', '●', '◆', '▲'][i % 7], x, y)
      }
      ctx.restore()

      ctx.save()
      ctx.globalAlpha = 0.2
      ctx.strokeStyle = '#ff6b35'
      ctx.lineWidth = 2
      ctx.setLineDash([8, 8])
      ctx.strokeRect(14, 14, w - 28, h - 28)
      ctx.restore()

      ctx.fillStyle = '#ff6b35'
      ctx.font = 'bold 12px "Inter", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('✧  STREET  ✧', w / 2, h - 14)
    },
  },
]
