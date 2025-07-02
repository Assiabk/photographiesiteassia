import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const gallery = [
    {
      id: 1,
      title: "Golden Hour Portraits",
      category: "portrait",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      aspect: "portrait"
    },
    {
      id: 2,
      title: "Urban Landscapes",
      category: "landscape",
      src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80",
      aspect: "landscape"
    },
    {
      id: 3,
      title: "Wedding Emotions",
      category: "wedding",
      src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
      aspect: "portrait"
    },
    {
      id: 4,
      title: "Street Moments",
      category: "street",
      src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      aspect: "landscape"
    },
    {
      id: 5,
      title: "Night Cityscapes",
      category: "landscape",
      src: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?auto=format&fit=crop&w=1200&q=80",
      aspect: "landscape"
    }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [ref, inView] = useInView({ threshold: 0.1 });

  const filteredGallery = activeFilter === 'all'
    ? gallery
    : gallery.filter(item => item.category === activeFilter);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'portrait', name: 'Portraits' },
    { id: 'landscape', name: 'Landscapes' },
    { id: 'wedding', name: 'Weddings' },
    { id: 'street', name: 'Street' },
  ];

  return (
    <div   id="portfolio" ref={containerRef} className="relative min-h-[300vh] bg-[#FAF9F6] overflow-hidden">
      {/* Header Section with Parallax */}
      <motion.div style={{ y }} className="sticky top-0 h-screen w-full flex items-center justify-center">
        <motion.div
          className="relative z-10 text-center px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-[#1A1A1A] mb-6">
            My Visual Journey
          </h1>
          <p className="text-xl md:text-2xl text-[#1A1A1A] max-w-2xl mx-auto">
            Each image tells a unique story, captured through my lens with passion and precision.
          </p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-0 right-0 flex justify-center"
        >
          <div className="text-[#1A1A1A] text-sm flex flex-col items-center">
            <span>Scroll to explore</span>
            <svg className="w-6 h-6 mt-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Gallery Section */}
      <div className="relative z-10 bg-[#FAF9F6] pt-[100vh] pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-4 mb-16 sticky top-24 z-20 bg-[#FAF9F6] py-6"
          >
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === category.id
                    ? 'bg-[#C4A35A] text-white'
                    : 'bg-white text-[#1A1A1A] hover:bg-gray-100'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                onClick={() => setSelectedImage(item)}
                className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer group ${
                  item.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/40 flex items-end p-6"
                >
                  <div>
                    <h3 className="text-white text-xl font-bold">{item.title}</h3>
                    <p className="text-white/80 text-sm mt-1">
                      {categories.find(c => c.id === item.category)?.name}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 text-white text-2xl"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
              <div className="relative w-full h-full">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full max-h-[80vh] object-contain"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                >
                  <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
                  <p className="text-white/80 mt-1">
                    {categories.find(c => c.id === selectedImage.category)?.name}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
