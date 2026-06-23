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
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1920 } },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
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

  const capturePhoto = useCallback((width = 1080, height = 1440): string | null => {
    const video = videoRef.current
    if (!video) return null

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.drawImage(video, 0, 0, width, height)
    return canvas.toDataURL('image/jpeg', 0.95)
  }, [])

  return { videoRef, status, errorMessage, startCamera, stopCamera, capturePhoto }
}
