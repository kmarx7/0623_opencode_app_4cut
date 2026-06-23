export interface PhotoTheme {
  id: string
  name: string
  slotBg: string
  slotBorderColor: string
  slotBorderWidth: number
  slotRadius: number
  showCorners: boolean
  renderBackground: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
  renderForeground: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
}

export const themes: PhotoTheme[] = [
  {
    id: 'original',
    name: '오리지널',
    slotBg: '#ffffff',
    slotBorderColor: '#e0e0e0',
    slotBorderWidth: 1,
    slotRadius: 6,
    showCorners: true,
    renderBackground(ctx, w, h) {
      ctx.fillStyle = '#f8f8f8'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = '#ffffff'
      roundRect(ctx, 20, 20, w - 40, h - 40, 12)
      ctx.fill()
      ctx.strokeStyle = '#eee'
      ctx.lineWidth = 1
      roundRect(ctx, 20, 20, w - 40, h - 40, 12)
      ctx.stroke()
    },
    renderForeground(ctx, w, h) {
      ctx.fillStyle = '#1a1a1a'
      ctx.font = '700 22px "Playfair Display", serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('LIFE 4 CUTS', w / 2, h - 58)
      ctx.fillStyle = '#999'
      ctx.font = '11px "Inter", sans-serif'
      ctx.fillText('@ life4cuts', w / 2, h - 30)
      const now = new Date()
      ctx.fillStyle = '#ccc'
      ctx.font = '10px "Courier New", monospace'
      ctx.textAlign = 'left'
      ctx.fillText(`${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`, 36, h - 14)
    },
  },
  {
    id: 'film',
    name: '필름',
    slotBg: '#1a120a',
    slotBorderColor: '#d4b87a',
    slotBorderWidth: 2,
    slotRadius: 2,
    showCorners: false,
    renderBackground(ctx, w, h) {
      ctx.fillStyle = '#2a1f14'
      ctx.fillRect(0, 0, w, h)
      for (let y = 0; y < h; y += 18) {
        ctx.fillStyle = '#3d2e1e'
        ctx.beginPath()
        ctx.arc(28, y + 5, 5, 0, Math.PI * 2)
        ctx.arc(w - 28, y + 5, 5, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = '#1a120a'
      ctx.fillRect(0, 0, w, 24)
      ctx.fillRect(0, h - 50, w, 50)
      ctx.fillStyle = '#6a5a3a'
      ctx.font = '400 14px "Courier New", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('──  exposures  ──', w / 2, 13)
    },
    renderForeground(ctx, w, h) {
      ctx.fillStyle = '#d4b87a'
      ctx.font = '400 20px "Courier New", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('FILM 4', w / 2, h - 22)
    },
  },
  {
    id: 'heart',
    name: '하트',
    slotBg: '#ffffff',
    slotBorderColor: '#ffb6c1',
    slotBorderWidth: 2,
    slotRadius: 10,
    showCorners: false,
    renderBackground(ctx, w, h) {
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, '#fff0f5')
      grad.addColorStop(1, '#ffe0ec')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
      ctx.strokeStyle = '#ffb6c1'
      ctx.lineWidth = 3
      ctx.setLineDash([8, 6])
      roundRect(ctx, 18, 18, w - 36, h - 36, 20)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.strokeStyle = '#ffc0cb'
      ctx.lineWidth = 1
      roundRect(ctx, 24, 24, w - 48, h - 48, 16)
      ctx.stroke()
      const drawHeart = (cx: number, cy: number, s: number, color: string) => {
        ctx.save(); ctx.fillStyle = color; ctx.globalAlpha = 0.2
        ctx.beginPath()
        ctx.moveTo(cx, cy + s * 0.3)
        ctx.bezierCurveTo(cx - s * 0.5, cy - s * 0.3, cx - s, cy + s * 0.3, cx, cy + s)
        ctx.bezierCurveTo(cx + s, cy + s * 0.3, cx + s * 0.5, cy - s * 0.3, cx, cy + s * 0.3)
        ctx.fill(); ctx.restore()
      }
      drawHeart(60, 60, 28, '#ff8fab')
      drawHeart(w - 60, 60, 28, '#ff8fab')
    },
    renderForeground(ctx, w, h) {
      ctx.fillStyle = '#d6336c'
      ctx.font = '600 22px "Playfair Display", serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Sweet Cut ♡', w / 2, h - 48)
      ctx.font = '11px "Playfair Display", serif'
      ctx.fillText('♡ love yourself ♡', w / 2, h - 22)
    },
  },
  {
    id: 'starlight',
    name: '별빛',
    slotBg: 'rgba(255,255,255,0.06)',
    slotBorderColor: 'rgba(255,215,0,0.35)',
    slotBorderWidth: 1,
    slotRadius: 8,
    showCorners: false,
    renderBackground(ctx, w, h) {
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, '#0d0d2b')
      grad.addColorStop(1, '#1a1a3e')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
      const stars: [number, number, number][] = [
        [50, 40, 2], [120, 80, 1], [w - 60, 50, 1.5], [w - 100, 100, 1],
        [80, h - 80, 1.5], [w - 80, h - 60, 2], [w / 2, 30, 1], [40, h - 40, 1],
        [w - 40, h / 2, 1.5], [w / 2, h - 100, 1],
      ]
      stars.forEach(([sx, sy, size]) => {
        ctx.save(); ctx.fillStyle = '#ffd700'; ctx.globalAlpha = 0.3
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
          const r = i % 2 === 0 ? size : size * 0.4
          const px = sx + r * Math.cos(angle)
          const py = sy + r * Math.sin(angle)
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.closePath(); ctx.fill(); ctx.restore()
      })
      ctx.strokeStyle = '#ffd700'
      ctx.lineWidth = 2
      roundRect(ctx, 16, 16, w - 32, h - 32, 16)
      ctx.stroke()
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)'
      ctx.lineWidth = 1
      roundRect(ctx, 22, 22, w - 44, h - 44, 12)
      ctx.stroke()
    },
    renderForeground(ctx, w, h) {
      ctx.fillStyle = '#ffd700'
      ctx.font = '600 24px "Playfair Display", serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('STARLIGHT', w / 2, h - 46)
      ctx.font = '11px "Inter", sans-serif'
      ctx.fillStyle = '#b8a040'
      ctx.fillText('★  shine bright  ★', w / 2, h - 20)
    },
  },
  {
    id: 'neon',
    name: '네온',
    slotBg: '#14141e',
    slotBorderColor: '#ff2d78',
    slotBorderWidth: 1.5,
    slotRadius: 8,
    showCorners: false,
    renderBackground(ctx, w, h) {
      ctx.fillStyle = '#0a0a12'
      ctx.fillRect(0, 0, w, h)
      const glow = (color: string, blur: number) => {
        ctx.save()
        ctx.shadowColor = color; ctx.shadowBlur = blur
        ctx.strokeStyle = color; ctx.lineWidth = 3
        roundRect(ctx, 14, 14, w - 28, h - 28, 18)
        ctx.stroke(); ctx.restore()
      }
      glow('#ff2d78', 25); glow('#ff2d78', 8)
      glow('#00d4ff', 20)
      ctx.strokeStyle = '#00d4ff'
      ctx.lineWidth = 1
      roundRect(ctx, 20, 20, w - 40, h - 40, 14)
      ctx.stroke()
    },
    renderForeground(ctx, w, h) {
      ctx.save()
      ctx.shadowColor = '#ff2d78'; ctx.shadowBlur = 20
      ctx.fillStyle = '#ff2d78'
      ctx.font = '800 28px "Inter", sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('NEON', w / 2, h - 44)
      ctx.restore()
      ctx.fillStyle = '#00d4ff'
      ctx.font = '11px "Inter", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('✦  POP  ✦', w / 2, h - 18)
    },
  },
  {
    id: 'dotted',
    name: '도트',
    slotBg: '#f5f0e8',
    slotBorderColor: '#d0c8b8',
    slotBorderWidth: 1,
    slotRadius: 4,
    showCorners: true,
    renderBackground(ctx, w, h) {
      ctx.fillStyle = '#faf8f5'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = '#e8e0d0'
      for (let x = 0; x < w; x += 12) {
        for (let y = 0; y < h; y += 12) {
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.fillStyle = '#ffffff'
      roundRect(ctx, 10, 10, w - 20, h - 20, 16)
      ctx.fill()
      ctx.fillStyle = '#333'
      ctx.fillRect(16, 16, w - 32, 3)
      ctx.fillRect(16, h - 19, w - 32, 3)
    },
    renderForeground(ctx, w, h) {
      ctx.fillStyle = '#333'
      ctx.font = '500 18px "Inter", sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('DOTTED', w / 2, h - 36)
      ctx.fillStyle = '#888'
      ctx.font = '10px "Inter", sans-serif'
      ctx.fillText('···  vintage  ···', w / 2, h - 14)
    },
  },
  {
    id: 'polaroid',
    name: '폴라로이드',
    slotBg: '#f5f5f5',
    slotBorderColor: '#ddd',
    slotBorderWidth: 1,
    slotRadius: 3,
    showCorners: false,
    renderBackground(ctx, w, h) {
      ctx.fillStyle = '#f5f0e8'
      ctx.fillRect(0, 0, w, h)
      ctx.save()
      ctx.shadowColor = 'rgba(0,0,0,0.08)'
      ctx.shadowBlur = 20; ctx.shadowOffsetY = 6
      ctx.fillStyle = '#ffffff'
      roundRect(ctx, 14, 14, w - 28, h - 28, 20)
      ctx.fill()
      ctx.restore()
      ctx.strokeStyle = '#e8e0d0'
      ctx.lineWidth = 1
      roundRect(ctx, 14, 14, w - 28, h - 28, 20)
      ctx.stroke()
    },
    renderForeground(ctx, w, h) {
      ctx.fillStyle = '#2c2c2c'
      ctx.font = '700 18px "Playfair Display", serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('POLAROID', w / 2, h - 108)
      ctx.fillStyle = '#888'
      ctx.font = '10px "Courier New", monospace'
      ctx.fillText('@ life4cuts', w / 2, h - 82)

      const now = new Date()
      ctx.fillStyle = '#bbb'
      ctx.font = '9px "Courier New", monospace'
      ctx.textAlign = 'left'
      ctx.fillText(`${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`, 36, h - 56)
      ctx.textAlign = 'right'
      ctx.fillText('No. 001', w - 36, h - 56)

      ctx.fillStyle = '#f5f0e8'
      ctx.fillRect(0, h - 38, w, 38)
    },
  },
  {
    id: 'ribbon',
    name: '리본',
    slotBg: '#ffffff',
    slotBorderColor: '#e1bee7',
    slotBorderWidth: 2,
    slotRadius: 12,
    showCorners: false,
    renderBackground(ctx, w, h) {
      const grad = ctx.createLinearGradient(0, 0, w, 0)
      grad.addColorStop(0, '#fce4ec'); grad.addColorStop(0.5, '#f3e5f5'); grad.addColorStop(1, '#e8eaf6')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
      const drawRibbon = (cx: number, cy: number, color: string, flip: boolean) => {
        ctx.save(); ctx.translate(cx, cy)
        if (flip) ctx.scale(-1, 1)
        ctx.fillStyle = color
        ctx.beginPath(); ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(15, -10, 30, 0)
        ctx.quadraticCurveTo(15, 10, 0, 0); ctx.fill()
        ctx.beginPath(); ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(15, -5, 20, 20)
        ctx.quadraticCurveTo(10, 10, 0, 0); ctx.fill()
        ctx.restore()
      }
      drawRibbon(50, 32, '#e91e63', false); drawRibbon(w - 50, 32, '#e91e63', true)
      drawRibbon(50, h - 34, '#9c27b0', false); drawRibbon(w - 50, h - 34, '#9c27b0', true)
      ctx.strokeStyle = '#ce93d8'; ctx.lineWidth = 2; ctx.setLineDash([6, 4])
      roundRect(ctx, 18, 18, w - 36, h - 36, 16); ctx.stroke()
      ctx.setLineDash([])
    },
    renderForeground(ctx, w, h) {
      ctx.fillStyle = '#7b1fa2'
      ctx.font = '600 22px "Playfair Display", serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('Ribbon', w / 2, h - 36)
      ctx.fillStyle = '#9c27b0'
      ctx.font = '10px "Inter", sans-serif'
      ctx.fillText('~  pretty  ~', w / 2, h - 14)
    },
  },
  {
    id: 'gold',
    name: '골드',
    slotBg: 'rgba(255,255,255,0.04)',
    slotBorderColor: 'rgba(212,175,55,0.35)',
    slotBorderWidth: 1,
    slotRadius: 6,
    showCorners: false,
    renderBackground(ctx, w, h) {
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, '#1a1410'); grad.addColorStop(1, '#0d0a08')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
      ctx.save()
      ctx.shadowColor = '#d4af37'; ctx.shadowBlur = 10
      ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 2
      roundRect(ctx, 14, 14, w - 28, h - 28, 14)
      ctx.stroke(); ctx.restore()
      ctx.strokeStyle = 'rgba(212,175,55,0.2)'; ctx.lineWidth = 1
      roundRect(ctx, 20, 20, w - 40, h - 40, 10); ctx.stroke()
      ;[[22, 22], [w - 22, 22], [22, h - 22], [w - 22, h - 22]].forEach(([cx, cy]) => {
        ctx.save(); ctx.translate(cx, cy)
        ctx.fillStyle = '#d4af37'
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 16); ctx.lineTo(16, 0); ctx.closePath(); ctx.fill()
        ctx.restore()
      })
    },
    renderForeground(ctx, w, h) {
      ctx.fillStyle = '#d4af37'
      ctx.font = '700 24px "Playfair Display", serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('GOLDEN', w / 2, h - 46)
      ctx.font = '10px "Playfair Display", serif'
      ctx.fillStyle = '#8a7536'
      ctx.fillText('✦  timeless  ✦', w / 2, h - 20)
    },
  },
]
