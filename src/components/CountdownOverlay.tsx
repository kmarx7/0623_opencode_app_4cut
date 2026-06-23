export function CountdownOverlay({ number, onComplete }: { number: number; onComplete?: () => void }) {
  return (
    <div className="countdown-overlay">
      <div className="countdown-number" key={number} onAnimationEnd={onComplete}>
        {number === 0 ? '📸' : number}
      </div>
    </div>
  )
}
