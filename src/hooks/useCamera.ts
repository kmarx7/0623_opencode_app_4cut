import { useRef, useCallback, useState } from 'react'

type CameraStatus = 'idle' | 'requesting' | 'ready' | 'error'

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [status, setStatus] = useState<CameraStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const startCamera = useCallback(async () => {
    setStatus('requesting')
    setErrorMessage('')

    try {
      const video = videoRef.current
      if (!video) throw new Error('Video element not found')

      let stream: MediaStream | null = null

      const tryConstraints = async (constraints: MediaStreamConstraints): Promise<MediaStream> => {
        return navigator.mediaDevices.getUserMedia(constraints)
      }

      try {
        stream = await tryConstraints({
          video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1440 } },
          audio: false,
        })
      } catch {
        try {
          stream = await tryConstraints({
            video: { facingMode: 'user' },
            audio: false,
          })
        } catch {
          stream = await tryConstraints({ video: true, audio: false })
        }
      }

      streamRef.current = stream
      video.srcObject = stream

      await video.play()

      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (video.readyState >= 2) {
            resolve()
          } else {
            resolve()
          }
        }, 3000)

        if (video.readyState >= 2) {
          clearTimeout(timeout)
          resolve()
          return
        }

        video.oncanplay = () => {
          clearTimeout(timeout)
          resolve()
        }
        video.onerror = () => {
          clearTimeout(timeout)
          reject(new Error('Video playback error'))
        }
      })

      setStatus('ready')
    } catch (err) {
      let msg = '카메라를 사용할 수 없습니다'
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') msg = '카메라 권한이 거부되었습니다'
        else if (err.name === 'NotFoundError') msg = '카메라를 찾을 수 없습니다'
        else if (err.name === 'NotReadableError') msg = '카메라를 사용할 수 없습니다 (다른 앱이 사용 중)'
        else msg = err.message
      } else if (err instanceof Error) {
        msg = err.message
      }
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
