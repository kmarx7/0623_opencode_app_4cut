import { useEffect, useRef } from 'react'
import { themes } from '../themes'

interface PhotoStripProps {
  photos: string[]
  themeId?: string
  layout?: '1x4' | '2x2'
  onDownload?: () => void
  onRetake?: () => void
  onThemeChange?: (id: string) => void
  onLayoutChange?: (layout: '1x4' | '2x2') => void
}

const W = 1080
const H = 1920
const CORNER_SIZE = 18

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

function drawCorner(ctx: CanvasRenderingContext2D, x: number, y: number, flipX: boolean, flipY: boolean) {
  ctx.save()
  ctx.translate(x, y)
  if (flipX) ctx.scale(-1, 1)
  if (flipY) ctx.scale(1, -1)
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0, CORNER_SIZE)
  ctx.lineTo(CORNER_SIZE, 0)
  ctx.closePath()
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.strokeStyle = 'rgba(0,0,0,0.1)'
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.restore()
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function centerCrop(img: HTMLImageElement, tw: number, th: number) {
  const srcAspect = img.width / img.height
  const dstAspect = tw / th
  let sx = 0, sy = 0, sw = img.width, sh = img.height
  if (srcAspect > dstAspect) {
    sw = img.height * dstAspect
    sx = (img.width - sw) / 2
  } else {
    sh = img.width / dstAspect
    sy = (img.height - sh) / 2
  }
  return { sx, sy, sw, sh }
}

type SlotInfo = { x: number; y: number; w: number; h: number }

function getSlots(layout: '1x4' | '2x2'): SlotInfo[] {
  const gap = 14
  const mx = 36
  const my = 24
  const banner = 110

  if (layout === '1x4') {
    const area = H - my - banner
    const ph = (area - gap * 3) / 4
    const pw = W - mx * 2
    return Array.from({ length: 4 }, (_, i) => ({
      x: mx,
      y: my + i * (ph + gap),
      w: pw,
      h: ph,
    }))
  }

  const cols = 2
  const rows = 2
  const area = H - my - banner
  const ph = (area - gap * (rows - 1)) / rows
  const pw = (W - mx * 2 - gap * (cols - 1)) / cols
  const slots: SlotInfo[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      slots.push({
        x: mx + c * (pw + gap),
        y: my + r * (ph + gap),
        w: pw,
        h: ph,
      })
    }
  }
  return slots
}

export function PhotoStrip({
  photos,
  themeId = 'original',
  layout = '1x4',
  onDownload,
  onRetake,
  onThemeChange,
  onLayoutChange,
}: PhotoStripProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const theme = themes.find(t => t.id === themeId) ?? themes[0]

  useEffect(() => {
    const c = canvasRef.current
    if (!c || photos.length !== 4) return

    const cx = c.getContext('2d')
    if (!cx) return

    let cancelled = false

    async function render() {
      const cc = c!
      const ccx = cx!
      cc.width = W
      cc.height = H

      const t = theme
      const slots = getSlots(layout)

      t.renderBackground(ccx, W, H)

      try {
        for (let i = 0; i < 4; i++) {
          if (cancelled) return
          const img = await loadImage(photos[i])
          const { x, y, w, h } = slots[i]
          const { sx, sy, sw, sh } = centerCrop(img, w, h)

          ccx.save()
          roundRect(ccx, x, y, w, h, t.slotRadius)
          ccx.clip()
          ccx.drawImage(img, sx, sy, sw, sh, x, y, w, h)
          ccx.restore()

          if (t.slotBorderWidth > 0) {
            ccx.strokeStyle = t.slotBorderColor
            ccx.lineWidth = t.slotBorderWidth
            roundRect(ccx, x, y, w, h, t.slotRadius)
            ccx.stroke()
          }

          if (t.showCorners) {
            drawCorner(ccx, x, y, false, false)
            drawCorner(ccx, x + w, y, true, false)
            drawCorner(ccx, x, y + h, false, true)
            drawCorner(ccx, x + w, y + h, true, true)
          }
        }

        if (!cancelled) {
          t.renderForeground(ccx, W, H)
        }
      } catch {
        // skip failed frame
      }
    }

    render()
    return () => { cancelled = true }
  }, [photos, theme, layout])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `life4cuts_${layout}_${theme.id}.png`
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
              <span className="theme-swatch" style={{ background: t.slotBorderColor }} />
              {t.name}
            </button>
          ))}
        </div>

        <div className="layout-tabs">
          <button
            className={`layout-tab${layout === '1x4' ? ' active' : ''}`}
            onClick={() => onLayoutChange?.('1x4')}
          >
            ⟐ 1×4
          </button>
          <button
            className={`layout-tab${layout === '2x2' ? ' active' : ''}`}
            onClick={() => onLayoutChange?.('2x2')}
          >
            ⊞ 2×2
          </button>
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
