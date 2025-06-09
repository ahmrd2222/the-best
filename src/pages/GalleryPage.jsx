import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCalendar } from 'react-icons/fi'
import { usePhotoData } from '../context/PhotoDataContext'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import PhotoGrid from '../components/PhotoGrid'
import Lightbox from '../components/Lightbox'

const GalleryPage = ({ category }) => {
  const { galleryId } = useParams()
  const { events, couples } = usePhotoData()
  const navigate = useNavigate()
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  // Determine which data source to use based on category
  const categoryData = category === 'events' ? events : couples
  
  // Find the gallery data
  const galleryData = categoryData.galleries.find(gallery => gallery.id === galleryId)
  
  // If gallery not found, redirect to category page
  if (!galleryData) {
    navigate(`/${category}`)
    return null
  }
  
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  
  const openLightbox = (photo) => {
    setSelectedPhoto(photo)
  }
  
  const closeLightbox = () => {
    setSelectedPhoto(null)
  }
  
  return (
    <>
      <div ref={headerRef} className="pt-32 pb-16 bg-[rgb(var(--color-background))]">
        <div className="container-custom">
          <Breadcrumbs 
            items={[
              { label: 'Home', path: '/' },
              { label: categoryData.title, path: `/${category}` },
              { label: galleryData.title, path: `/${category}/${galleryId}` }
            ]}
          />
          
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-2">{galleryData.title}</h1>
            
            <div className="flex items-center justify-center text-[rgb(var(--color-text-secondary))] mb-4">
              <FiCalendar className="mr-2" />
              <span>{galleryData.date}</span>
            </div>
            
            <p className="text-[rgb(var(--color-text-secondary))] text-lg">{galleryData.description}</p>
          </motion.div>
        </div>
      </div>
      
      <div className="pb-20">
        <div className="container-custom">
          <PhotoGrid 
            photos={galleryData.photos} 
            onPhotoClick={openLightbox}
          />
        </div>
      </div>
      
      <Lightbox 
        isOpen={!!selectedPhoto}
        onClose={closeLightbox}
        photo={selectedPhoto}
        photos={galleryData.photos}
        setSelectedPhoto={setSelectedPhoto}
      />
    </>
  )
}

export default GalleryPage