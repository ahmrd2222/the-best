import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { usePhotoData } from '../context/PhotoDataContext'
import CategoryPreview from '../components/CategoryPreview'

const Home = () => {
  const { portraits, events, couples } = usePhotoData()
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [categoriesRef, categoriesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }
  
  return (
    <>
      <section 
        ref={heroRef}
        className="h-screen relative flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
          <motion.img
            src="https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Hero background"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: heroInView ? 1 : 1.1 }}
            transition={{ duration: 1.5 }}
          />
        </div>
        
        <div className="container-custom relative z-20 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Capturing Life's Beautiful Moments</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Professional photography services for portraits, events, and couples.
            </p>
            <a 
              href="#categories"
              className="btn-primary text-lg inline-block"
            >
              Explore My Work
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ 
                y: [0, 8, 0],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5
              }}
            />
          </div>
        </motion.div>
      </section>
      
      <section id="categories" className="py-20 scroll-mt-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              Photography Categories
            </motion.h2>
            <motion.p 
              className="text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore my different photography services and see examples of my work.
            </motion.p>
          </div>
          
          <motion.div 
            ref={categoriesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={categoriesInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <CategoryPreview 
                title={portraits.title}
                description={portraits.description}
                image={portraits.coverImage}
                link="/portraits"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <CategoryPreview 
                title={events.title}
                description={events.description}
                image={events.coverImage}
                link="/events"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <CategoryPreview 
                title={couples.title}
                description={couples.description}
                image={couples.coverImage}
                link="/couples"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home