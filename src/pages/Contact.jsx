import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiSend, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[150vh] bg-[#FAF9F6] overflow-hidden"
      id="contact"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
         
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="absolute inset-0 bg-black mix-blend-multiply"
          />
        </div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: 1,
            transition: {
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 w-full max-w-7xl mx-auto px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50 }}
              whileInView={{ 
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#1A1A1A]">
                  Let's Create Together
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Ready to capture your story? Get in touch for bookings and inquiries.
                </p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <input
                        id="name"
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C4A35A] focus:ring-2 focus:ring-[#C4A35A]/50 transition"
                      />
                    </motion.div>
                    {errors.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <input
                        id="email"
                        type="email"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C4A35A] focus:ring-2 focus:ring-[#C4A35A]/50 transition"
                      />
                    </motion.div>
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <textarea
                        id="message"
                        rows={5}
                        {...register("message", { required: "Message is required" })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C4A35A] focus:ring-2 focus:ring-[#C4A35A]/50 transition"
                      />
                    </motion.div>
                    {errors.message && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.message.message}
                      </motion.p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 10px 25px -5px rgba(196, 163, 90, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#C4A35A] text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <FiSend className="text-lg" />
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ x: 50 }}
              whileInView={{ 
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-3xl font-bold text-white mb-8">
                Contact Information
              </h3>
              
              <div className="space-y-8">
                {/* Address */}
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                
                </motion.div>

                {/* Phone */}
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-[#C4A35A] p-3 rounded-full text-white">
                    <FiPhone className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Phone</h4>
                    <p className="text-white/80">
                      +213 6 12 34 56 78<br />
                      Mon-Fri: 9am-6pm
                    </p>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-[#C4A35A] p-3 rounded-full text-white">
                    <FiMail className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Email</h4>
                    <p className="text-white/80">
                      contact@assiaphotography.com<br />
                      Response within 24 hours
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h4 className="text-white font-medium mb-4">Follow My Work</h4>
                <div className="flex gap-4">
                  {['Instagram', 'Twitter', ].map((social, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ 
                        y: -5,
                        color: '#C4A35A'
                      }}
                      className="text-white/80 hover:text-[#C4A35A] transition-colors"
                    >
                      {social}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Success Message */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 500,
                  damping: 15
                }
              }}
              className="bg-white shadow-xl rounded-lg p-6 flex items-center gap-4"
            >
              <motion.div
                animate={{
                  rotate: [0, 20, -20, 10, -10, 5, -5, 0],
                  transition: { duration: 1 }
                }}
              >
                <FaPaperPlane className="text-2xl text-[#C4A35A]" />
              </motion.div>
              <div>
                <h4 className="font-bold text-gray-900">Message Sent!</h4>
                <p className="text-sm text-gray-600">I'll get back to you soon</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;