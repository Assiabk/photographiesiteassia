import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const shimmerText = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    }
  }
}

const shimmerLetter = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100
    }
  }
}

const floatingVariants = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full font-[Playfair] bg-[#FAF9F6] text-[#1A1A1A] overflow-hidden" ref={containerRef}>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              transition: { 
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
              } 
            }}
            className="absolute inset-0 z-50 bg-[#1A1A1A] text-white flex items-center justify-center flex-col"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={shimmerText}
              className="overflow-hidden"
            >
              {"Photographie".split("").map((char, index) => (
                <motion.span 
                  key={index} 
                  variants={shimmerLetter}
                  className="inline-block text-6xl md:text-8xl font-bold"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 1.2,
                  type: 'spring',
                  stiffness: 100
                }
              }}
              className="mt-8 text-xl tracking-widest text-[#C4A35A] font-light"
            >
              L'art de capturer l'émotion
            </motion.p>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: '100%',
                transition: {
                  delay: 1.8,
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
              className="h-[2px] bg-[#C4A35A] mt-12 max-w-md"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <div className="relative h-[200vh]">
          <motion.section
            style={{ y }}
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1504198266285-165a06b90afd?auto=format&fit=crop&w=1400&q=80')",
              }}
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 0.5 }}
                className="absolute inset-0 bg-black"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 0.8,
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
              className="relative z-10 bg-white/80 backdrop-blur-lg p-8 rounded-xl text-center shadow-2xl border border-white/20 max-w-2xl mx-4"
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                variants={shimmerText}
                initial="hidden"
                animate="visible"
              >
                {"Bienvenue dans mon univers".split(" ").map((word, wordIndex) => (
                  <motion.span 
                    key={wordIndex} 
                    className="inline-block mr-2"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: 'spring',
                          damping: 12,
                          stiffness: 100,
                          delay: 0.8 + wordIndex * 0.1
                        }
                      }
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: {
                    delay: 1.4,
                    duration: 0.8
                  }
                }}
                className="text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed"
              >
                Des images pleines de lumière, de douceur et d'authenticité.
              </motion.p>
              
              <motion.div
                variants={floatingVariants}
                animate="float"
              >
            <a href="#portfolio">
  <motion.button 
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(196, 163, 90, 0.4)"
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    className="bg-[#C4A35A] text-white px-8 py-4 rounded-full shadow-lg text-lg font-medium relative overflow-hidden"
  >
    <motion.span
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: { delay: 1.6 }
      }}
      className="relative z-10"
    >
      Voir le portfolio
    </motion.span>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        transition: { delay: 1.8 }
      }}
      className="absolute inset-0 rounded-full border-2 border-[#C4A35A]"
    />
  </motion.button>
</a>

              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 2 }
                }}
                className="mt-12 text-sm text-[#555]"
              >
                <motion.div
                  animate={{
                    rotate: 360,
                    transition: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                  className="w-8 h-8 border-t-2 border-[#C4A35A] border-opacity-60 rounded-full mx-auto mb-2"
                />
                Scroll to explore
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { delay: 1.2 }
              }}
              className="absolute bottom-8 left-0 right-0 flex justify-center"
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
              >
                <motion.div
                  animate={{
                    y: [0, 5, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }
                  }}
                  className="w-1 h-2 bg-white rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </motion.section>
          
          {/* Additional content that appears when scrolling */}
          <div className="h-screen w-full bg-[#FAF9F6] flex items-center justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-5xl font-bold text-center max-w-2xl px-4"
            >
              Découvrez des moments capturés avec passion et précision
            </motion.h2>
          </div>
        </div>
      )}
    </div>
  );
}