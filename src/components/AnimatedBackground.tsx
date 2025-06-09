
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* World Map Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <pattern id="worldGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
              </path>
            </pattern>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8">
                <animate attributeName="stop-color" values="#3b82f6;#8b5cf6;#06b6d4;#3b82f6" dur="6s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3">
                <animate attributeName="stop-color" values="#8b5cf6;#06b6d4;#3b82f6;#8b5cf6" dur="6s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          
          {/* World Map Grid */}
          <rect width="100%" height="100%" fill="url(#worldGrid)" />
          
          {/* Continent Outlines */}
          <g stroke="url(#lineGradient)" strokeWidth="2" fill="none" opacity="0.4">
            {/* Simplified North America */}
            <path d="M 150 200 Q 200 180 250 200 L 300 250 Q 280 300 250 320 L 200 300 Q 150 280 150 200">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="8s" repeatCount="indefinite" />
            </path>
            {/* Simplified Europe/Africa */}
            <path d="M 450 180 Q 500 160 550 180 L 520 220 Q 530 280 500 350 L 470 320 Q 440 250 450 180">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="6s" repeatCount="indefinite" />
            </path>
            {/* Simplified Asia */}
            <path d="M 600 150 Q 700 140 800 160 L 780 200 Q 750 250 700 280 L 650 250 Q 600 200 600 150">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="7s" repeatCount="indefinite" />
            </path>
          </g>
          
          {/* Network Connection Lines */}
          <g stroke="url(#lineGradient)" strokeWidth="1" fill="none">
            <line x1="100" y1="100" x2="900" y2="200">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="200" y1="300" x2="800" y2="100">
              <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="50" y1="500" x2="950" y2="400">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="300" y1="700" x2="700" y2="600">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3.5s" repeatCount="indefinite" />
            </line>
            <line x1="150" y1="800" x2="850" y2="900">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="4.5s" repeatCount="indefinite" />
            </line>
          </g>
        </svg>
      </div>

      {/* Floating Network Nodes */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Data Flow Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-80 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 1.5}s`
            }}
          />
        ))}
      </div>

      {/* Blockchain Blocks */}
      <div className="absolute top-1/4 right-10 opacity-30">
        <div className="flex flex-col space-y-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 border border-purple-400 bg-purple-400/10 animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Global Connection Hubs */}
      <div className="absolute bottom-20 left-10 opacity-40">
        <div className="grid grid-cols-12 gap-1">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-green-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile Signal Towers */}
      <div className="absolute top-1/3 left-1/4 opacity-25">
        <div className="relative">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-green-400 rounded-full animate-ping"
              style={{
                width: `${(i + 1) * 15}px`,
                height: `${(i + 1) * 15}px`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Satellite Orbits */}
      <div className="absolute top-10 right-1/4 opacity-20">
        <div className="relative w-32 h-32">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-yellow-400 rounded-full"
              style={{
                width: `${(i + 1) * 40}px`,
                height: `${(i + 1) * 40}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: `spin ${10 + i * 5}s linear infinite`,
              }}
            />
          ))}
          <div className="absolute w-2 h-2 bg-yellow-400 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
