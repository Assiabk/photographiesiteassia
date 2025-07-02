import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const shimmerText = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    }
  }
};

const shimmerLetter = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100
    }
  }
};

const floatingVariants = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [signatureRef, signatureInView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[200vh] bg-[#FAF9F6] overflow-hidden"
    >
      {/* Parallax Background Layer */}
      <motion.div 
        style={{ y }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
      
        {/* Content */}
        <motion.div 
          style={{ opacity }}
          className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-16 px-8"
        >
          {/* Text Column */}
          <div className="text-[#1A1A1A]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={shimmerText}
              className="overflow-hidden mb-12"
            >
              {"À propos de moi".split("").map((char, i) => (
                <motion.span 
                  key={i} 
                  variants={shimmerLetter}
                  className="inline-block text-5xl md:text-7xl font-bold"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 0.8,
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
              className="space-y-8"
            >
              <p className="text-xl leading-relaxed">
                Je suis <span className="text-[#C4A35A] font-semibold">Assia</span>, photographe passionnée par la lumière naturelle, les émotions sincères et les instants spontanés.
              </p>
              
              <p className="text-xl leading-relaxed">
                À travers chaque cliché, je cherche à raconter une histoire, la vôtre. Mon objectif est de capturer l'essence même de votre être, dans toute son authenticité.
              </p>
              
              <div className="pt-8">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: '100%',
                    transition: {
                      delay: 1.5,
                      duration: 1.8,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }}
                  className="h-[1px] bg-[#C4A35A] mb-6 max-w-md"
                />
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: {
                      delay: 1.8,
                      duration: 0.8
                    }
                  }}
                  className="text-lg italic"
                >
                  "La photographie est l'art de peindre avec la lumière."
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Image Column */}
          <motion.div
            variants={floatingVariants}
            animate="float"
            className="relative h-full flex items-center"
          >
            <div className="relative w-full max-w-lg mx-auto">
              <motion.div
                initial={{ opacity: 0, rotate: -2 }}
                animate={{ 
                  opacity: 1, 
                  rotate: 0,
                  transition: {
                    delay: 0.5,
                    duration: 1.2
                  }
                }}
                className="overflow-hidden rounded-2xl shadow-2xl border-4 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1689083591947-a67106e7841e?w=1000&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Portrait d'Assia"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: {
                    delay: 1.2,
                    duration: 0.8
                  }
                }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-[#EDE6DB]"
              >
                <div className="text-sm text-[#C4A35A] font-medium">Depuis 2015</div>
                <div className="text-lg font-bold">+300 clients</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 2 }
          }}
          className="absolute bottom-12 left-0 right-0 flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, 15, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="w-8 h-12 border-2 border-[#C4A35A] rounded-full flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, 8, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }
              }}
              className="w-1 h-3 bg-[#C4A35A] rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scrolling Content */}
      <div className="relative z-10 bg-[#FAF9F6] pt-[100vh]">
        <div className="max-w-4xl mx-auto px-8 py-24 space-y-24">
          {/* Timeline Section */}
          <section>
            <h3 className="text-3xl font-bold mb-12 text-center">Mon parcours</h3>
            
            <div className="space-y-12 relative before:absolute before:left-6 before:top-0 before:h-full before:w-0.5 before:bg-[#C4A35A] before:bg-opacity-30">
              {timelineItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative pl-16 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}
                >
                  <motion.div 
                    className="absolute left-0 top-1 w-12 h-12 rounded-full bg-[#C4A35A] flex items-center justify-center text-white font-bold"
                    whileInView={{ 
                      scale: [1, 1.2, 1],
                      transition: { duration: 0.6 }
                    }}
                    viewport={{ once: true }}
                  >
                    {item.year}
                  </motion.div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-700">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Signature Reveal */}
          <motion.div
            ref={signatureRef}
            className="flex flex-col items-center pt-24"
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={signatureInView ? { 
                pathLength: 1,
                transition: {
                  duration: 2,
                  ease: "easeInOut"
                }
              } : {}}
              className="w-64 h-32"
            >
              <svg viewBox="0 0 300 100" className="w-full h-full">
                <motion.path
                  d="M20,50 Q50,20 80,50 T140,50 T200,50 T260,50"
                  stroke="#C4A35A"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={signatureInView ? { 
                opacity: 1,
                transition: {
                  delay: 2.2,
                  duration: 0.8
                }
              } : {}}
              className="mt-4 text-gray-600"
            >
              Assia
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const timelineItems = [
  {
    year: '2015',
    title: 'Premier appareil professionnel',
    description: 'Achat de mon premier reflex et début de ma passion pour la photographie'
  },
  {
    year: '2017',
    title: 'Première exposition',
    description: 'Participation à une exposition collective à Paris'
  },
  {
    year: '2019',
    title: 'Spécialisation portrait',
    description: 'Formation avancée en photographie de portrait à Lyon'
  },
  {
    year: '2021',
    title: 'Ouverture du studio',
    description: 'Création de mon espace dédié à la création photographique'
  },
  {
    year: '2023',
    title: 'Reconnaissance internationale',
    description: 'Publication dans National Geographic et Vogue'
  }
];