
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Network Lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8">
                <animate attributeName="stop-color" values="#3b82f6;#8b5cf6;#06b6d4;#3b82f6" dur="6s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3">
                <animate attributeName="stop-color" values="#8b5cf6;#06b6d4;#3b82f6;#8b5cf6" dur="6s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          
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
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float${i % 3} ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Blockchain Blocks */}
      <div className="absolute top-1/4 right-10 opacity-30">
        <div className="flex flex-col space-y-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 border border-purple-400 bg-purple-400/10"
              style={{
                animation: `slideDown 2s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* World Map Dots */}
      <div className="absolute bottom-20 left-10 opacity-40">
        <div className="grid grid-cols-8 gap-1">
          {[...Array(32)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile Signal Waves */}
      <div className="absolute top-1/3 left-1/4 opacity-25">
        <div className="relative">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-green-400 rounded-full"
              style={{
                width: `${(i + 1) * 20}px`,
                height: `${(i + 1) * 20}px`,
                animation: `ripple 3s ease-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(-10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(5px); }
        }
        @keyframes slideDown {
          0% { transform: translateY(-10px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
