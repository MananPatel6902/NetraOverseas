import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ShipPreloaderProps {
  onComplete: () => void;
}

const containerColors = [
  '#dc2626', // Red
  '#0052a3', // Navy Blue
  '#166534', // Green
  '#b45309', // Brown
  '#7c3aed', // Purple
];

export function ShipPreloader({ onComplete }: ShipPreloaderProps) {
  const [phase, setPhase] = useState<'loading' | 'sailing' | 'complete'>('loading');
  const [droppedContainers, setDroppedContainers] = useState(0);

  useEffect(() => {
    const dropInterval = setInterval(() => {
      setDroppedContainers((prev) => {
        if (prev >= 5) {
          clearInterval(dropInterval);
          setTimeout(() => setPhase('sailing'), 600);
          return prev;
        }
        return prev + 1;
      });
    }, 350);

    return () => clearInterval(dropInterval);
  }, []);

  useEffect(() => {
    if (phase === 'sailing') {
      setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 1800);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #e0f2fe 0%, #bae6fd 40%, #7dd3fc 100%)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Clouds */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/60 rounded-full"
                style={{
                  width: `${120 + Math.random() * 100}px`,
                  height: `${40 + Math.random() * 30}px`,
                  left: `${-20 + i * 20}%`,
                  top: `${5 + Math.random() * 25}%`,
                }}
                animate={{
                  x: ['0%', '150%'],
                }}
                transition={{
                  duration: 25 + Math.random() * 15,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 3,
                }}
              />
            ))}
          </div>

          {/* Sun */}
          <motion.div
            className="absolute top-12 right-24 w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #fef08a, #fbbf24)',
              boxShadow: '0 0 80px rgba(251, 191, 36, 0.5)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Ocean waves - back layer */}
          <div className="absolute bottom-0 left-0 right-0 h-56 overflow-hidden">
            <svg
              className="absolute bottom-8 w-[200%] h-full"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <motion.path
                fill="rgba(3, 105, 161, 0.3)"
                d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                animate={{
                  d: [
                    'M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
                    'M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,170.7C960,149,1056,139,1152,154.7C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              />
            </svg>
          </div>

          {/* Ship Container */}
          <motion.div
            className="relative z-10"
            animate={phase === 'sailing' ? { x: '150vw' } : {}}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          >
            {/* Falling Containers */}
            <div className="absolute -top-28 left-1/2 -translate-x-1/2 flex gap-1">
              {containerColors.map((color, index) => (
                <motion.div
                  key={index}
                  className="w-12 h-8 rounded-sm shadow-xl"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 8px 25px ${color}50`,
                  }}
                  initial={{ y: -250, opacity: 0 }}
                  animate={
                    droppedContainers > index
                      ? {
                          y: 76,
                          opacity: 1,
                          transition: {
                            type: 'spring',
                            stiffness: 250,
                            damping: 18,
                            delay: index * 0.08,
                          },
                        }
                      : {}
                  }
                >
                  {/* Container details - realistic shipping container look */}
                  <div className="w-full h-full relative overflow-hidden rounded-sm border border-black/10">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
                    {/* Corrugated lines */}
                    <div className="absolute inset-0 flex flex-col justify-evenly">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-px bg-black/20" />
                      ))}
                    </div>
                    {/* Container number */}
                    <div className="absolute bottom-0.5 left-0.5 right-0.5 text-[6px] text-white/70 font-mono truncate">
                      NETU{100000 + index * 1111}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Realistic Cargo Ship SVG */}
            <svg
              width="400"
              height="200"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              {/* Ship hull - realistic red bottom */}
              <defs>
                <linearGradient id="hullRed" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#b91c1c" />
                  <stop offset="100%" stopColor="#7f1d1d" />
                </linearGradient>
                <linearGradient id="hullBlack" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="100%" stopColor="#1f2937" />
                </linearGradient>
                <linearGradient id="deck" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9ca3af" />
                  <stop offset="50%" stopColor="#d1d5db" />
                  <stop offset="100%" stopColor="#9ca3af" />
                </linearGradient>
              </defs>

              {/* Hull bottom (red anti-fouling) */}
              <path
                d="M10 110 Q15 150 30 165 L350 165 Q380 150 390 110 Z"
                fill="url(#hullRed)"
              />
              
              {/* Hull top (black) */}
              <path
                d="M10 85 L390 85 L390 110 Q380 115 350 115 L30 115 Q15 115 10 110 Z"
                fill="url(#hullBlack)"
              />
              
              {/* Waterline */}
              <rect x="10" y="108" width="380" height="4" fill="#1f2937" />

              {/* Main deck */}
              <rect x="25" y="75" width="350" height="10" fill="url(#deck)" />
              
              {/* Container bay area */}
              <rect x="35" y="55" width="240" height="20" fill="#4b5563" />
              
              {/* Container guides */}
              {[...Array(6)].map((_, i) => (
                <rect key={i} x={45 + i * 40} y="50" width="2" height="25" fill="#6b7280" />
              ))}

              {/* Bridge/Superstructure */}
              <rect x="290" y="25" width="80" height="50" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
              <rect x="295" y="30" width="70" height="40" fill="#e5e7eb" />
              
              {/* Bridge windows */}
              <rect x="300" y="35" width="60" height="12" fill="#1e3a5f" rx="1" />
              <line x1="315" y1="35" x2="315" y2="47" stroke="#374151" strokeWidth="1" />
              <line x1="330" y1="35" x2="330" y2="47" stroke="#374151" strokeWidth="1" />
              <line x1="345" y1="35" x2="345" y2="47" stroke="#374151" strokeWidth="1" />
              
              {/* Lower bridge windows */}
              <rect x="305" y="52" width="20" height="10" fill="#1e3a5f" rx="1" />
              <rect x="330" y="52" width="20" height="10" fill="#1e3a5f" rx="1" />

              {/* Mast */}
              <rect x="325" y="5" width="4" height="20" fill="#6b7280" />
              
              {/* Radar */}
              <ellipse cx="327" cy="8" rx="8" ry="3" fill="#fbbf24" />
              
              {/* Antennas */}
              <line x1="335" y1="15" x2="335" y2="5" stroke="#6b7280" strokeWidth="2" />
              <circle cx="335" cy="5" r="2" fill="#ef4444" />

              {/* Funnel */}
              <path d="M280 30 L275 55 L305 55 L300 30 Z" fill="#dc2626" />
              <ellipse cx="290" cy="30" rx="10" ry="3" fill="#991b1b" />
              
              {/* Funnel stripe */}
              <rect x="278" y="40" width="24" height="6" fill="#f3f4f6" />

              {/* Smoke */}
              <motion.ellipse
                cx="290"
                cy="20"
                rx="6"
                ry="4"
                fill="#9ca3af"
                opacity="0.5"
                animate={{
                  cy: [20, 5, -5],
                  rx: [6, 12, 18],
                  opacity: [0.5, 0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />

              {/* Anchor */}
              <circle cx="45" cy="125" r="6" fill="#4b5563" />
              <path d="M45 131 L45 145 M38 140 Q45 148 52 140" stroke="#4b5563" strokeWidth="3" fill="none" />

              {/* Bow detail */}
              <path d="M10 85 Q5 100 10 110" fill="none" stroke="#6b7280" strokeWidth="2" />
              
              {/* Ship name */}
              <text
                x="200"
                y="100"
                textAnchor="middle"
                fill="#e5e7eb"
                fontSize="11"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
                letterSpacing="3"
              >
                NETRA OVERSEAS
              </text>
              
              {/* Port of registry */}
              <text
                x="200"
                y="130"
                textAnchor="middle"
                fill="#9ca3af"
                fontSize="7"
                fontFamily="Inter, sans-serif"
                letterSpacing="1"
              >
                MUMBAI
              </text>

              {/* Deck markings */}
              <line x1="60" y1="80" x2="250" y2="80" stroke="#fbbf24" strokeWidth="2" strokeDasharray="10 5" />
              
              {/* Lifeboat */}
              <rect x="260" y="60" width="25" height="10" rx="3" fill="#f97316" />
              
              {/* Railing */}
              <line x1="25" y1="70" x2="375" y2="70" stroke="#9ca3af" strokeWidth="1" />
              {[...Array(15)].map((_, i) => (
                <line key={i} x1={30 + i * 23} y1="70" x2={30 + i * 23} y2="75" stroke="#9ca3af" strokeWidth="1" />
              ))}
            </svg>
          </motion.div>

          {/* Ocean waves - front layer */}
          <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
            <svg
              className="absolute bottom-0 w-[200%] h-full"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <motion.path
                fill="rgba(2, 132, 199, 0.6)"
                d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                animate={{
                  d: [
                    'M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
                    'M0,192L48,208C96,224,192,256,288,261.3C384,267,480,245,576,229.3C672,213,768,203,864,213.3C960,224,1056,256,1152,256C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              />
            </svg>
          </div>

          {/* Loading text */}
          <motion.div
            className="absolute bottom-28 left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'loading' ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-slate-600 text-sm tracking-[0.25em] uppercase font-semibold">
              Loading NetraOverseas
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-600 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
