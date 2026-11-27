// src/components/LabArt.jsx
// Friendly SVG illustrations for the Virtual Science Lab (all decorative, aria-hidden).
import React from 'react';

export const MicroscopeArt = ({ size = 160 }) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 160 184" aria-hidden="true">
    <circle cx="96" cy="84" r="52" fill="#B58CF0" stroke="#1a202c" strokeWidth="5" />
    <g fill="none" stroke="#7C4DEB" strokeWidth="2.5">
      <path d="M62 70l16-10 18 6 16-8 14 12M58 92l18-6 14 8 20-6 14 10M66 112l16-8 16 6 18-8" />
      <path d="M78 60l-2 26M96 66l-6 28M112 58l-4 28" />
    </g>
    <g fill="#5B2FC4"><circle cx="80" cy="76" r="3" /><circle cx="104" cy="82" r="3" /><circle cx="92" cy="104" r="3" /></g>
    <rect x="30" y="156" width="96" height="14" rx="7" fill="#4A90E2" stroke="#1a202c" strokeWidth="4" />
    <path d="M44 156c-6-34 0-66 22-84" fill="none" stroke="#1a202c" strokeWidth="18" strokeLinecap="round" />
    <path d="M44 156c-6-34 0-66 22-84" fill="none" stroke="#4A90E2" strokeWidth="10" strokeLinecap="round" />
    <rect x="52" y="14" width="22" height="46" rx="8" transform="rotate(28 63 37)" fill="#fff" stroke="#1a202c" strokeWidth="4" />
    <rect x="30" y="118" width="50" height="9" rx="4" fill="#FFDE21" stroke="#1a202c" strokeWidth="3" />
    <circle cx="60" cy="168" r="3" fill="#FFDE21" />
  </svg>
);

export const FlaskArt = ({ size = 110 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <path d="M38 10h24v6h-4v22l24 42a8 8 0 0 1-7 12H25a8 8 0 0 1-7-12l24-42V16h-4z" fill="#fff" stroke="#1a202c" strokeWidth="4" strokeLinejoin="round" />
    <path d="M30 66h40l10 18a5 5 0 0 1-4 8H24a5 5 0 0 1-4-8z" fill="#8A4FF0" />
    <circle cx="44" cy="76" r="3.5" fill="#E9D6FF" /><circle cx="58" cy="82" r="2.5" fill="#E9D6FF" />
    <path d="M82 14l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#FFDE21" stroke="#1a202c" strokeWidth="2" />
    <path d="M12 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#FFDE21" stroke="#1a202c" strokeWidth="2" />
  </svg>
);

export const BooksArt = ({ size = 120 }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 120 84" aria-hidden="true">
    <rect x="14" y="52" width="92" height="22" rx="5" fill="#4A90E2" stroke="#1a202c" strokeWidth="4" />
    <rect x="22" y="30" width="80" height="22" rx="5" fill="#FFDE21" stroke="#1a202c" strokeWidth="4" />
    <rect x="8" y="10" width="86" height="20" rx="5" fill="#8A4FF0" stroke="#1a202c" strokeWidth="4" />
    <path d="M24 63h60M32 41h50M18 20h56" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".8" />
  </svg>
);

export const BenchArt = () => (
  <svg viewBox="0 0 300 170" width="100%" aria-hidden="true">
    {/* conical flask */}
    <path d="M30 40h26v8h-4v24l26 46a8 8 0 0 1-7 12H15a8 8 0 0 1-7-12l26-46V48h-4z" fill="#EAF6FF" stroke="#1a202c" strokeWidth="4" strokeLinejoin="round" transform="translate(0 6)" />
    <path d="M18 112h50l10 18a4 4 0 0 1-3 6H11a4 4 0 0 1-3-6z" fill="#2E9BFF" transform="translate(0 -2)" />
    {/* test tubes */}
    <rect x="104" y="108" width="100" height="10" rx="3" fill="#C9772B" stroke="#1a202c" strokeWidth="3" />
    <rect x="104" y="150" width="100" height="10" rx="3" fill="#C9772B" stroke="#1a202c" strokeWidth="3" transform="translate(0 -6)" />
    {[['#F0554F', 112], ['#FFDE21', 138], ['#2BC06C', 164], ['#8A4FF0', 190]].map(([c, x]) => (
      <g key={x}>
        <path d={`M${x} 70v62a9 9 0 0 0 18 0V70z`} fill="#fff" stroke="#1a202c" strokeWidth="3" />
        <path d={`M${x + 1.5} 96v36a7.5 7.5 0 0 0 15 0V96z`} fill={c} />
      </g>
    ))}
    {/* microscope */}
    <g transform="translate(228 36) scale(.5)">
      <rect x="0" y="190" width="100" height="16" rx="8" fill="#fff" stroke="#1a202c" strokeWidth="6" />
      <path d="M20 190c-8-44 0-86 30-106" fill="none" stroke="#1a202c" strokeWidth="26" strokeLinecap="round" />
      <path d="M20 190c-8-44 0-86 30-106" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
      <rect x="44" y="10" width="26" height="64" rx="10" transform="rotate(26 57 42)" fill="#4A90E2" stroke="#1a202c" strokeWidth="6" />
    </g>
  </svg>
);

export const AtomArt = ({ size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
    <g fill="none" stroke="#4A90E2" strokeWidth="3.5">
      <ellipse cx="40" cy="40" rx="34" ry="12" />
      <ellipse cx="40" cy="40" rx="34" ry="12" transform="rotate(60 40 40)" />
      <ellipse cx="40" cy="40" rx="34" ry="12" transform="rotate(120 40 40)" />
    </g>
    <circle cx="40" cy="40" r="7" fill="#F0554F" stroke="#1a202c" strokeWidth="3" />
    <circle cx="72" cy="40" r="4" fill="#FFDE21" stroke="#1a202c" strokeWidth="2" />
  </svg>
);

export const SmallMicroscopeIcon = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect x="8" y="33" width="24" height="4" rx="2" fill="#fff" />
    <path d="M13 33c-3-9 0-17 7-20" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" />
    <rect x="17" y="3" width="7" height="16" rx="2.5" transform="rotate(26 20 11)" fill="#FFDE21" />
  </svg>
);
