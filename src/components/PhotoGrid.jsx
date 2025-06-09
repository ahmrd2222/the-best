import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const PhotoGrid = ({ photos, onPhotoClick }) => {
  const [gridRef, gridInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  }
  
  return (
    <motion.div 
      ref={gridRef}
      className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate={gridInView ? "visible" : "hidden"}
    >
      {photos.map((photo) => (
        <motion.div 
          key={photo.id} 
          className="photo-card aspect-[4/5]"
          variants={itemVariants}
          onClick={() => onPhotoClick(photo)}
        >
          <img 
            src={photo.src} 
            alt={photo.alt} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default PhotoGrid