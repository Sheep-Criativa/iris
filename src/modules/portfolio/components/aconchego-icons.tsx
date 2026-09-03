import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}

/**
 * Sol radiante da identidade visual Aconchego (Imagem 03)
 */
export function SunburstIcon({ size = 32, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Central sun disk */}
      <circle cx="24" cy="24" r="7.5" />
      {/* Radiating tapered rays */}
      {/* 0 deg (Top) */}
      <path d="M24 3.5 L25.5 13 L22.5 13 Z" />
      {/* 180 deg (Bottom) */}
      <path d="M24 44.5 L22.5 35 L25.5 35 Z" />
      {/* 90 deg (Right) */}
      <path d="M44.5 24 L35 25.5 L35 22.5 Z" />
      {/* 270 deg (Left) */}
      <path d="M3.5 24 L13 22.5 L13 25.5 Z" />
      {/* 45 deg */}
      <path d="M38.5 9.5 L31.5 16.5 L29.5 14.5 Z" />
      {/* 225 deg */}
      <path d="M9.5 38.5 L16.5 31.5 L14.5 29.5 Z" />
      {/* 135 deg */}
      <path d="M38.5 38.5 L29.5 33.5 L31.5 31.5 Z" />
      {/* 315 deg */}
      <path d="M9.5 9.5 L18.5 14.5 L16.5 16.5 Z" />
      {/* Intermediate rays */}
      <path d="M32 4.5 L30 13.5 L28 12.5 Z" opacity="0.85" />
      <path d="M16 43.5 L18 34.5 L20 35.5 Z" opacity="0.85" />
      <path d="M43.5 16 L34.5 18 L35.5 20 Z" opacity="0.85" />
      <path d="M4.5 32 L13.5 30 L12.5 28 Z" opacity="0.85" />
      <path d="M16 4.5 L20 12.5 L18 13.5 Z" opacity="0.85" />
      <path d="M32 43.5 L28 35.5 L30 34.5 Z" opacity="0.85" />
      <path d="M4.5 16 L12.5 20 L13.5 18 Z" opacity="0.85" />
      <path d="M43.5 32 L35.5 28 L34.5 30 Z" opacity="0.85" />
    </svg>
  )
}

/**
 * Asterisco expressivo e volumoso (Imagem 01 - Daniel Gallego & Imagem 03)
 */
export function RetroAsteriskIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* 8-armed organic asterisk */}
      <g transform="translate(16, 16)">
        <ellipse cx="0" cy="0" rx="2.5" ry="12" />
        <ellipse cx="0" cy="0" rx="2.5" ry="12" transform="rotate(45)" />
        <ellipse cx="0" cy="0" rx="2.5" ry="12" transform="rotate(90)" />
        <ellipse cx="0" cy="0" rx="2.5" ry="12" transform="rotate(135)" />
        <circle cx="0" cy="0" r="3.5" />
      </g>
    </svg>
  )
}

/**
 * Estrela de 4 pontas / Sparkle da Imagem 02 (Han Nguyen) e Imagem 03
 */
export function SparkleStarIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  )
}

/**
 * Coração orgânico da paleta Aconchego (Imagem 03)
 */
export function WarmHeartIcon({ size = 20, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

/**
 * Flor retrô de 6 pétalas da identidade Aconchego (Imagem 03)
 */
export function RetroFlowerIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <g transform="translate(16, 16)">
        <circle cx="0" cy="-8.5" r="5" />
        <circle cx="7.36" cy="-4.25" r="5" />
        <circle cx="7.36" cy="4.25" r="5" />
        <circle cx="0" cy="8.5" r="5" />
        <circle cx="-7.36" cy="4.25" r="5" />
        <circle cx="-7.36" cy="-4.25" r="5" />
        <circle cx="0" cy="0" r="4" fill="#F5D98C" />
      </g>
    </svg>
  )
}

/**
 * Arcos concêntricos Aconchego (Imagem 03 - Padrões e Formas)
 */
export function ArchMotif({
  width = 80,
  height = 100,
  className = '',
  strokeColor = '#C35A38',
}: {
  width?: number
  height?: number
  className?: string
  strokeColor?: string
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer arch */}
      <path
        d="M 10 100 L 10 40 A 30 30 0 0 1 70 40 L 70 100"
        stroke={strokeColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Middle arch */}
      <path
        d="M 22 100 L 22 40 A 18 18 0 0 1 58 40 L 58 100"
        stroke="#E8A76F"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Inner arch */}
      <path
        d="M 34 100 L 34 40 A 6 6 0 0 1 46 40 L 46 100"
        stroke="#7A8456"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Ícones de Hobbies acolhedores (Imagem 02)
 */
export function VinylMusicIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="6" strokeDasharray="3 3" />
    </svg>
  )
}

export function CoffeeCupIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  )
}

export function PlantLeavesIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7Z" />
      <path d="M11 20V10" />
    </svg>
  )
}

export function DigitalArtIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" />
      <path d="M15 13 9 7l4-4 6 6-4 4Z" />
      <path d="m18 10 3 3" />
    </svg>
  )
}

export function CuteCatIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 5c-4 0-7 3-7 7 0 3 2 5 4 6v2l3-1 3 1v-2c2-1 4-3 4-6 0-4-3-7-7-7z" />
      <path d="M7 6 5 2l4 2" />
      <path d="M17 6l2-4-4 2" />
      <circle cx="9.5" cy="11.5" r=".75" fill="currentColor" />
      <circle cx="14.5" cy="11.5" r=".75" fill="currentColor" />
    </svg>
  )
}

/**
 * Ícones oficiais das redes sociais (Instagram, LinkedIn, E-mail)
 */
export function OfficialInstagramIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

export function OfficialLinkedinIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

export function OfficialMailIcon({ size = 18, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )
}
