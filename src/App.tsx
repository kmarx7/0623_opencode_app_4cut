import { useState, useCallback, useEffect, useRef } from 'react'
import { useCamera } from './hooks/useCamera'
import { CameraView } from './components/CameraView'
import { CountdownOverlay } from './components/CountdownOverlay'
import { PhotoStrip } from './components/PhotoStrip'
import './App.css'

type Phase = 'intro' | 'camera' | 'countdown' | 'result'

export default function App() {
  const { videoRef, status, startCamera, stopCamera, capturePhoto } = useCamera()
  const [phase, setPhase] = useState<Phase>('intro')
  const [photos, setPhotos] = useState<string[]>([])
  const [countdown, setCountdown] = useState(3)
  const [shotIndex, setShotIndex] = useState(0)
  const [flash, setFlash] = useState(false)
  const [themeId, setThemeId] = useState('original')

  const timerRef = useRef<number>(undefined)
  const captureCountRef = useRef(0)

  const showFlash = useCallback(() => {
    setFlash(true)
    setTimeout(() => setFlash(false), 200)
  }, [])

  const startCapture = useCallback(async () => {
    await startCamera()
    setPhase('camera')
  }, [startCamera])

  const beginAutoCapture = useCallback(() => {
    setPhotos([])
    setShotIndex(0)
    captureCountRef.current = 0
    setPhase('countdown')
    setCountdown(3)
  }, [])

  useEffect(() => {
    if (phase !== 'countdown' || status !== 'ready') return

    if (countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(timerRef.current)
    }

    showFlash()
    const photo = capturePhoto()
    if (photo) {
      setPhotos(prev => [...prev, photo])
    }

    const next = captureCountRef.current + 1
    captureCountRef.current = next
    setShotIndex(next)

    if (next >= 4) {
      timerRef.current = setTimeout(() => {
        setPhase('result')
        stopCamera()
      }, 600)
    } else {
      timerRef.current = setTimeout(() => {
        setCountdown(3)
      }, 600)
    }

    return () => clearTimeout(timerRef.current)
  }, [phase, countdown, status, showFlash, capturePhoto, stopCamera])

  const handleRetake = useCallback(() => {
    setPhotos([])
    setShotIndex(0)
    captureCountRef.current = 0
    setPhase('camera')
    startCamera()
  }, [startCamera])

  if (phase === 'intro') {
    return (
      <div className="app intro">
        <div className="polaroid-camera">
          {/* top flash / viewfinder section */}
          <div className="camera-top">
            <div className="viewfinder">
              <div className="viewfinder-lens" />
            </div>
            <div className="flash-unit">
              <div className="flash-bulb" />
            </div>
          </div>

          {/* main body */}
          <div className="camera-body-main">
            <div className="rainbow-stripe" />
            <div className="body-content">
              {/* large lens */}
              <div className="main-lens">
                <div className="lens-outer">
                  <div className="lens-mid">
                    <div className="lens-inner">
                      <div className="lens-glass" />
                    </div>
                  </div>
                </div>
              </div>

              {/* brand */}
              <div className="camera-brand">
                <h1>LIFE 4 CUTS</h1>
                <p className="subtitle">찰칵! 인생의 한 순간을 남겨보세요</p>
              </div>

              {/* shutter button area */}
              <button className="shutter-btn" onClick={startCapture}>
                <div className="shutter-red" />
                <span>시작하기</span>
              </button>
            </div>
          </div>

          {/* bottom film area */}
          <div className="camera-bottom">
            <div className="film-slot" />
            <div className="film-label">POLAROID</div>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'result') {
    return (
      <div className="app result">
        <PhotoStrip
          photos={photos}
          themeId={themeId}
          onRetake={handleRetake}
          onThemeChange={setThemeId}
        />
      </div>
    )
  }

  return (
    <div className="app camera">
      <div className="polaroid-body camera-body">
        <div className="rainbow-stripe" />
        <CameraView videoRef={videoRef} photoCount={4} shotCount={shotIndex} />

        {phase === 'camera' && (
          <div className="camera-controls">
            <button className="btn btn-primary btn-capture" onClick={beginAutoCapture} disabled={status !== 'ready'}>
              📸 촬영 시작
            </button>
          </div>
        )}

        {phase === 'countdown' && <CountdownOverlay number={countdown} />}
        {flash && <div className="flash-overlay" />}

        {status === 'error' && (
          <div className="camera-error">
            <p>⚠️ 카메라를 사용할 수 없습니다</p>
            <button className="btn btn-secondary" onClick={startCamera}>
              다시 시도
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
