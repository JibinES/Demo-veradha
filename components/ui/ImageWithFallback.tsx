'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackColor?: string
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackColor,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // Generate a color based on the alt text if no fallback color provided
  const getColorFromString = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    const colors = [
      ['#667eea', '#764ba2'],
      ['#f093fb', '#f5576c'],
      ['#4facfe', '#00f2fe'],
      ['#43e97b', '#38f9d7'],
      ['#fa709a', '#fee140'],
      ['#30cfd0', '#330867'],
      ['#a8edea', '#fed6e3'],
      ['#ff9a9e', '#fecfef'],
      ['#ffecd2', '#fcb69f'],
      ['#ff6e7f', '#bfe9ff'],
    ]

    return colors[Math.abs(hash) % colors.length]
  }

  const [color1, color2] = fallbackColor
    ? [fallbackColor, fallbackColor]
    : getColorFromString(alt)

  if (error || !src || src.includes('unsplash.com')) {
    return (
      <div
        className={className}
        style={{
          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          fontWeight: '500',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        {alt.split(' ').slice(0, 2).join(' ')}
      </div>
    )
  }

  return (
    <>
      {loading && (
        <div
          className={className}
          style={{
            background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
            position: 'absolute',
            inset: 0,
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        className={className}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
        {...props}
      />
    </>
  )
}
