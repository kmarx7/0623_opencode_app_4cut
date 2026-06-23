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

    let cancelled = false

    async function render() {
      const c = canvas
      const cx = ctx
      if (!c || !cx) return

      c.width = CANVAS_WIDTH
      c.height = CANVAS_HEIGHT

      const t = theme
      const { margin, spacing, bgColor, photoBorderRadius, photoBorderColor, photoBorderWidth, photoShadow } = t
      const logoArea = LOGO_HEIGHT + 24

      cx.fillStyle = bgColor
      cx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      if (t.renderDecorations) {
        t.renderDecorations(cx, CANVAS_WIDTH, CANVAS_HEIGHT)
      }

      const photoArea = CANVAS_HEIGHT - margin * 2 - logoArea
      const photoHeight = (photoArea - spacing * 3) / 4
      const photoWidth = CANVAS_WIDTH - margin * 2

      const loadImage = (src: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve(img)
          img.onerror = reject
          img.src = src
        })

      try {
        for (let i = 0; i < photos.length; i++) {
          if (cancelled) return
          const img = await loadImage(photos[i])

          const sx = (img.width - img.height * (photoWidth / photoHeight)) / 2
          const sy = 0
          const sWidth = img.height * (photoWidth / photoHeight)
          const sHeight = img.height

          const y = margin + i * (photoHeight + spacing)

          cx.save()
          cx.beginPath()
          cx.roundRect(margin, y, photoWidth, photoHeight, photoBorderRadius)
          cx.clip()
          cx.drawImage(img, sx, sy, sWidth, sHeight, margin, y, photoWidth, photoHeight)
          cx.restore()

          if (photoBorderWidth > 0) {
            cx.strokeStyle = photoBorderColor
            cx.lineWidth = photoBorderWidth
            cx.beginPath()
            cx.roundRect(margin, y, photoWidth, photoHeight, photoBorderRadius)
            cx.stroke()
          }

          if (photoShadow) {
            cx.save()
            cx.shadowColor = 'rgba(0,0,0,0.12)'
            cx.shadowBlur = 12
            cx.shadowOffsetY = 4
            cx.strokeStyle = 'transparent'
            cx.beginPath()
            cx.roundRect(margin, y, photoWidth, photoHeight, photoBorderRadius)
            cx.stroke()
            cx.restore()
          }
        }

        if (cancelled) return

        const logoY = CANVAS_HEIGHT - margin - 10
        cx.fillStyle = t.logoColor
        cx.font = t.logoFont
        cx.textAlign = 'center'
        cx.textBaseline = 'middle'
        cx.fillText(t.logoText, CANVAS_WIDTH / 2, logoY)

        cx.fillStyle = t.subColor
        cx.font = '11px "Inter", sans-serif'
        cx.textBaseline = 'middle'
        cx.fillText('@ life4cuts', CANVAS_WIDTH / 2, logoY + 30)

        if (t.renderExtra) {
          t.renderExtra(cx, CANVAS_WIDTH, CANVAS_HEIGHT)
        }
      } catch {
        // image load failed
      }
    }

    render()

    return () => {
      cancelled = true
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
