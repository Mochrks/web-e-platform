'use client';

import React from 'react';

interface TalentAvatarProps {
  color?: string;
  accessoryColor?: string;
  size?: number;
  mood?: 'happy' | 'thinking' | 'serious';
  hasGlasses?: boolean;
  isAnimated?: boolean;
  className?: string;
}

export default function TalentAvatarUI({
  color = '#7c3aed',
  accessoryColor = '#10b981',
  size = 200,
  mood = 'happy',
  hasGlasses = true,
  isAnimated = true,
  className = '',
}: Readonly<TalentAvatarProps>) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] ${isAnimated ? 'animate-float' : ''}`}
      >
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="faceHighlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Body / Head - Roblox Style Rounded Block */}
        <rect
          x="30"
          y="30"
          width="140"
          height="140"
          rx="40"
          fill="url(#bodyGradient)"
        />
        <rect
          x="30"
          y="30"
          width="140"
          height="140"
          rx="40"
          fill="url(#faceHighlight)"
        />

        {/* Face Elements Group */}
        <g
          className={
            isAnimated && mood === 'happy' ? 'animate-bounce-subtle' : ''
          }
        >
          {/* Eyes - Depth Effect */}
          <circle cx="70" cy="85" r="10" fill="white" />
          <circle cx="130" cy="85" r="10" fill="white" />
          <circle cx="72" cy="83" r="4" fill="#1a1a1a" />
          <circle cx="132" cy="83" r="4" fill="#1a1a1a" />

          {/* Glasses - 3D Frames */}
          {hasGlasses && (
            <g transform="translate(0, -5)">
              <rect
                x="50"
                y="75"
                width="40"
                height="25"
                rx="6"
                stroke={accessoryColor}
                strokeWidth="6"
                fill="white"
                fillOpacity="0.1"
              />
              <rect
                x="110"
                y="75"
                width="40"
                height="25"
                rx="6"
                stroke={accessoryColor}
                strokeWidth="6"
                fill="white"
                fillOpacity="0.1"
              />
              <path
                d="M90 85H110"
                stroke={accessoryColor}
                strokeWidth="6"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Expressions */}
          {mood === 'happy' && (
            <path
              d="M75 125C75 125 85 140 100 140C115 140 125 125 125 125"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              className="drop-shadow-sm"
            />
          )}
          {mood === 'thinking' && (
            <g>
              <path
                d="M85 130H115"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <circle
                cx="150"
                cy="110"
                r="5"
                fill="white"
                fillOpacity="0.4"
                className="animate-pulse"
              />
            </g>
          )}
          {mood === 'serious' && (
            <path
              d="M80 135C80 135 90 125 100 125C110 125 120 135 120 135"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
            />
          )}
        </g>

        {/* Decorative 3D Bits */}
        <circle
          cx="165"
          cy="45"
          r="12"
          fill={accessoryColor}
          className={isAnimated ? 'animate-pulse' : ''}
        />
        <path
          d="M100 25V10M175 100H190"
          stroke="white"
          strokeWidth="4"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
      </svg>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
