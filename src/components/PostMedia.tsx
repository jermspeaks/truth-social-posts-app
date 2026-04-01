import { useState } from 'react'

interface Props {
  media: string[]
}

export function PostMedia({ media }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [failed, setFailed] = useState<Set<string>>(new Set())

  const visible = media.filter((src) => !failed.has(src))
  if (visible.length === 0) return null

  const gridClass =
    visible.length === 1
      ? 'grid-cols-1'
      : visible.length === 2
        ? 'grid-cols-2'
        : 'grid-cols-2'

  return (
    <>
      <div className={`grid ${gridClass} gap-1.5 mt-3 rounded-xl overflow-hidden`}>
        {visible.map((src) => (
          <button
            key={src}
            onClick={() => setLightboxSrc(src)}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="View full image"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-48 object-cover hover:opacity-90 transition-opacity cursor-zoom-in"
              onError={() => setFailed((prev) => new Set([...prev, src]))}
            />
          </button>
        ))}
      </div>

      {lightboxSrc && (
        <dialog
          open
          className="fixed inset-0 z-50 w-full h-full bg-black/85 flex items-center justify-center p-4 m-0 max-w-none max-h-none"
          onClick={() => setLightboxSrc(null)}
          onKeyDown={(e) => e.key === 'Escape' && setLightboxSrc(null)}
          aria-label="Image lightbox"
        >
          <img
            src={lightboxSrc}
            alt=""
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-9 h-9 flex items-center justify-center hover:bg-black/70 transition-colors"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close lightbox"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </dialog>
      )}
    </>
  )
}
