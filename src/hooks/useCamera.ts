import { useRef, useCallback, useState } from 'react'

type CameraStatus = 'idle' | 'requesting' | 'ready' | 'error'

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [status, setStatus] = useState<CameraStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const startCamera = useCallback(async () => {
    setStatus('requesting')
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 1080 },
          height: { ideal: 1440 },
        },
        audio: false,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      const video = videoRef.current
      if (!video) throw new Error('Video element not found')

      video.srcObject = stream

      await video.play()

      await new Promise<void>((resolve) => {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          resolve()
          return
        }
        video.onloadedmetadata = () => resolve()
      })

      setStatus('ready')
    } catch (err) {
      const msg = err instanceof Error ? err.message : '카메라를 사용할 수 없습니다'
      setErrorMessage(msg)
      setStatus('error')
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setStatus('idle')
  }, [])

  const capturePhoto = useCallback((): string | null => {
    const video = videoRef.current
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) return null

    const vw = video.videoWidth
    const vh = video.videoHeight

    const outW = 1080
    const outH = 1440
    const canvas = document.createElement('canvas')
    canvas.width = outW
    canvas.height = outH
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const srcAspect = vw / vh
    const dstAspect = outW / outH

    let sx = 0, sy = 0, sw = vw, sh = vh
    if (srcAspect > dstAspect) {
      sw = vh * dstAspect
      sx = (vw - sw) / 2
    } else {
      sh = vw / dstAspect
      sy = (vh - sh) / 2
    }

    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, outW, outH)
    return canvas.toDataURL('image/jpeg', 0.92)
  }, [])

  return { videoRef, status, errorMessage, startCamera, stopCamera, capturePhoto }
}
