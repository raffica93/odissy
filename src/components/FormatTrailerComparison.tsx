import { useEffect, useRef, useState } from 'react'

type FormatOption = {
  id: string
  name: string
  ratio: number
  ratioLabel: string
  medium: string
  note: string
}

const FORMATS: FormatOption[] = [
  {
    id: 'imax-70',
    name: 'IMAX 70mm',
    ratio: 1.43,
    ratioLabel: '1.43:1',
    medium: '15 perforazioni · pellicola orizzontale',
    note: 'Il fotogramma più alto: conserva la massima porzione dell’immagine ripresa dalle cineprese IMAX.',
  },
  {
    id: 'imax',
    name: 'IMAX',
    ratio: 1.9,
    ratioLabel: '1.90:1',
    medium: 'presentazione digitale espansa',
    note: 'Più alto dei formati panoramici tradizionali, riempie maggiormente lo schermo in verticale.',
  },
  {
    id: '70mm',
    name: '70mm',
    ratio: 2.2,
    ratioLabel: '2.20:1',
    medium: '5 perforazioni · pellicola verticale',
    note: 'Il classico grande formato su pellicola: panoramico, ma meno stretto del 2.39:1.',
  },
  {
    id: '35mm',
    name: '35mm',
    ratio: 2.39,
    ratioLabel: '2.39:1',
    medium: 'pellicola 35mm · scope',
    note: 'La composizione scope taglia una porzione più ampia sopra e sotto per ottenere un’immagine molto panoramica.',
  },
  {
    id: 'dolby',
    name: 'Dolby Cinema',
    ratio: 1.85,
    ratioLabel: '1.85:1',
    medium: 'digitale · rapporto variabile per sala',
    note: 'Una presentazione digitale alta. In alcune sale il rapporto effettivo può essere 2.39:1.',
  },
  {
    id: 'plf',
    name: 'Premium Large Format',
    ratio: 2.39,
    ratioLabel: '2.39:1',
    medium: 'digitale · grande schermo',
    note: 'Il formato dipende dalla sala: qui è mostrata la variante panoramica 2.39:1.',
  },
]

const MASTER_RATIO = 1.43
const TRAILER_SRC =
  'https://dx35vtwkllhj9.cloudfront.net/universalstudios/the-odyssey/video/imax-fallback-trailer.mp4'
const POSTER_SRC =
  'https://dx35vtwkllhj9.cloudfront.net/universalstudios/the-odyssey/images/compare-formats-trailer-poster.webp'

function formatTime(value: number) {
  if (!Number.isFinite(value)) return '0:00'
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function FormatTrailerComparison() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [selectedId, setSelectedId] = useState(FORMATS[0].id)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const selected =
    FORMATS.find((format) => format.id === selectedId) ?? FORMATS[0]
  const barPercent = Math.max(
    0,
    ((1 - MASTER_RATIO / selected.ratio) / 2) * 100,
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTime = () => setCurrentTime(video.currentTime)
    const onDuration = () => setDuration(video.duration)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    video.addEventListener('timeupdate', onTime)
    video.addEventListener('loadedmetadata', onDuration)
    video.addEventListener('durationchange', onDuration)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onPause)

    return () => {
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('loadedmetadata', onDuration)
      video.removeEventListener('durationchange', onDuration)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onPause)
    }
  }, [])

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      await video.play()
    } else {
      video.pause()
    }
  }

  const seek = (value: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = value
    setCurrentTime(value)
  }

  return (
    <section aria-labelledby="format-comparison-title">
      <div className="format-stage-shell">
        <div className="format-stage" aria-live="polite">
          <video
            ref={videoRef}
            className="format-stage-video"
            src={TRAILER_SRC}
            poster={POSTER_SRC}
            playsInline
            preload="metadata"
            onClick={togglePlayback}
            aria-label="Trailer ufficiale di Odissea"
          />

          <div
            className="format-mask format-mask-top"
            style={{ height: `${barPercent}%` }}
            aria-hidden
          />
          <div
            className="format-mask format-mask-bottom"
            style={{ height: `${barPercent}%` }}
            aria-hidden
          />

          <div className="format-stage-readout" aria-hidden>
            <span>{selected.name}</span>
            <strong>{selected.ratioLabel}</strong>
          </div>

          {!isPlaying && (
            <button
              type="button"
              className="format-stage-play"
              onClick={togglePlayback}
              aria-label={currentTime > 0 ? 'Riprendi il trailer' : 'Riproduci il trailer'}
            >
              <span aria-hidden>▶</span>
            </button>
          )}
        </div>

        <div className="format-controls">
          <button
            type="button"
            onClick={togglePlayback}
            className="format-control-button"
            aria-label={isPlaying ? 'Metti in pausa' : 'Riproduci'}
          >
            {isPlaying ? 'Ⅱ' : '▶'}
          </button>
          <span className="format-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => seek(Number(event.target.value))}
            className="format-timeline"
            aria-label="Posizione nel trailer"
          />
          <span className="format-time">{formatTime(duration)}</span>
          <button
            type="button"
            onClick={() => seek(0)}
            className="format-replay"
          >
            Ricomincia
          </button>
        </div>
      </div>

      <div
        className="format-selector-grid"
        role="radiogroup"
        aria-label="Formato di proiezione"
      >
        {FORMATS.map((format) => {
          const active = format.id === selected.id
          return (
            <button
              key={format.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelectedId(format.id)}
              className={`format-selector ${active ? 'is-active' : ''}`}
            >
              <span className="format-selector-frame" aria-hidden>
                <span style={{ aspectRatio: `${format.ratio}` }} />
              </span>
              <span className="format-selector-copy">
                <strong>{format.name}</strong>
                <small>{format.ratioLabel}</small>
              </span>
            </button>
          )
        })}
      </div>

      <div className="format-explanation">
        <div>
          <p className="format-kicker">Formato selezionato</p>
          <h2 id="format-comparison-title">
            {selected.name} <span>{selected.ratioLabel}</span>
          </h2>
        </div>
        <div>
          <p>{selected.note}</p>
          <span>{selected.medium}</span>
        </div>
      </div>
    </section>
  )
}
