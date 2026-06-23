import { type RefObject } from 'react'

interface CameraViewProps {
  videoRef: RefObject<HTMLVideoElement | null>
  photoCount: number
  shotCount: number
}

export function CameraView({ videoRef, photoCount, shotCount }: CameraViewProps) {
  return (
    <div className="camera-view">
      <div className="camera-viewport">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          webkit-playsinline="true"
          muted
        />
        <div className="lens-ring" />
      </div>
      <div className="flash-indicator" data-active={shotCount > 0 && shotCount <= photoCount ? 'true' : undefined} />
      <div className="camera-dots">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="camera-dot" data-filled={i < shotCount ? 'true' : undefined} />
        ))}
      </div>
    </div>
  )
}
