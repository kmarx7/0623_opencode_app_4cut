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
]
