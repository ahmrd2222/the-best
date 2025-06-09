import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Lightbox = ({ isOpen, onClose, photo, photos, setSelectedPhoto }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Update the current index when photo changes
  useEffect(() => {
    if (photo) {
      const index = photos.findIndex(p => p.id === photo.id)
      setCurrentIndex(index)
    }
  }, [photo, photos])
  
  const handlePrev = (e) => {
    e.stopPropagation()
    const newIndex = (currentIndex - 1 + photos.length) % photos.length
    setSelectedPhoto(photos[newIndex])
  }
  
  const handleNext = (e) => {
    e.stopPropagation()
    const newIndex = (currentIndex + 1) % photos.length
    setSelectedPhoto(photos[newIndex])
  }
  
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev(e)
      } else if (e.key === 'ArrowRight') {
        handleNext(e)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handlePrev, handleNext, onClose])
  
  if (!photo) return null
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute top-4 right-4 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button 
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
              onClick={onClose}
              aria-label="Close lightbox"
            >
              <FiX size={24} />
            </button>
          </motion.div>
          
          <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute left-4 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 z-20"
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              <FiChevronLeft size={24} />
            </button>
            
            <motion.div
              key={photo.id}
              className="w-[90%] h-[90%] flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative max-w-full max-h-[80vh]">
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
              
              <div className="text-white mt-4 text-center">
                {photo.description && (
                  <p className="text-lg">{photo.description}</p>
                )}
                <p className="text-sm text-white/70 mt-2">
                  {currentIndex + 1} of {photos.length}
                </p>
              </div>
            </motion.div>
            
            <button 
              className="absolute right-4 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 z-20"
              onClick={handleNext}
              aria-label="Next photo"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Lightbox