import { useEffect, useRef } from 'react'
import { themes } from '../themes'

interface PhotoStripProps {
  photos: string[]
  themeId?: string
  onDownload?: () => void
  onRetake?: () => void
  onThemeChange?: (id: string) => void
}

const CANVAS_WIDTH = 1080
const CANVAS_HEIGHT = 1920
const LOGO_HEIGHT = 100

export function PhotoStrip({ photos, themeId = 'original', onDownload, onRetake, onThemeChange }: PhotoStripProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const theme = themes.find(t => t.id === themeId) ?? themes[0]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || photos.length !== 4) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT

    const t = theme
    const { margin, spacing, bgColor, photoBorderRadius, photoBorderColor, photoBorderWidth, photoShadow } = t
    const logoArea = LOGO_HEIGHT + 24

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    if (t.renderDecorations) {
      t.renderDecorations(ctx, CANVAS_WIDTH, CANVAS_HEIGHT)
    }

    const photoArea = CANVAS_HEIGHT - margin * 2 - logoArea
    const photoHeight = (photoArea - spacing * 3) / 4
    const photoWidth = CANVAS_WIDTH - margin * 2

    photos.forEach((photo, i) => {
      const y = margin + i * (photoHeight + spacing)
      const img = new Image()
      img.src = photo

      const sx = (img.width - img.height * (photoWidth / photoHeight)) / 2
      const sy = 0
      const sWidth = img.height * (photoWidth / photoHeight)
      const sHeight = img.height

      ctx.save()

      ctx.beginPath()
      ctx.roundRect(margin, y, photoWidth, photoHeight, photoBorderRadius)
      ctx.clip()
      ctx.drawImage(img, sx, sy, sWidth, sHeight, margin, y, photoWidth, photoHeight)
      ctx.restore()

      if (photoBorderWidth > 0) {
        ctx.strokeStyle = photoBorderColor
        ctx.lineWidth = photoBorderWidth
        ctx.beginPath()
        ctx.roundRect(margin, y, photoWidth, photoHeight, photoBorderRadius)
        ctx.stroke()
      }

      if (photoShadow) {
        ctx.save()
        ctx.shadowColor = 'rgba(0,0,0,0.12)'
        ctx.shadowBlur = 12
        ctx.shadowOffsetY = 4
        ctx.strokeStyle = 'transparent'
        ctx.beginPath()
        ctx.roundRect(margin, y, photoWidth, photoHeight, photoBorderRadius)
        ctx.stroke()
        ctx.restore()
      }
    })

    const logoY = CANVAS_HEIGHT - margin - 10
    ctx.fillStyle = t.logoColor
    ctx.font = t.logoFont
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(t.logoText, CANVAS_WIDTH / 2, logoY)

    ctx.fillStyle = t.subColor
    ctx.font = '11px "Inter", sans-serif'
    ctx.textBaseline = 'middle'
    ctx.fillText('@ life4cuts', CANVAS_WIDTH / 2, logoY + 30)

    if (t.renderExtra) {
      t.renderExtra(ctx, CANVAS_WIDTH, CANVAS_HEIGHT)
    }
  }, [photos, theme])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `life4cuts_${theme.id}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    onDownload?.()
  }

  if (photos.length !== 4) return null

  return (
    <div className="photo-strip">
      <div className="strip-wrapper">
        <div className="theme-selector">
          {themes.map(t => (
            <button
              key={t.id}
              className={`theme-chip${t.id === themeId ? ' active' : ''}`}
              onClick={() => onThemeChange?.(t.id)}
              title={t.name}
            >
              <span className="theme-swatch" style={{ background: t.bgColor }} />
              {t.name}
            </button>
          ))}
        </div>
        <canvas ref={canvasRef} style={{ width: '100%', maxWidth: 400, borderRadius: 12 }} />
        <div className="strip-actions">
          <button className="btn btn-primary" onClick={handleDownload}>
            📥 저장하기
          </button>
          <button className="btn btn-secondary" onClick={onRetake}>
            🔄 다시 찍기
          </button>
        </div>
      </div>
    </div>
  )
}
