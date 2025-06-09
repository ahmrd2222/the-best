import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiX } from 'react-icons/fi'
import { usePhotoData } from '../context/PhotoDataContext'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import PhotoGrid from '../components/PhotoGrid'
import Lightbox from '../components/Lightbox'

const SubcategoryPage = ({ category }) => {
  const { subcategory } = useParams()
  const { portraits } = usePhotoData()
  const navigate = useNavigate()
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  // Find the subcategory data
  const subcategoryData = portraits.subcategories.find(sub => sub.id === subcategory)
  
  // If subcategory not found, redirect to category page
  if (!subcategoryData) {
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
              { label: portraits.title, path: `/${category}` },
              { label: subcategoryData.title, path: `/${category}/${subcategory}` }
            ]}
          />
          
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">{subcategoryData.title}</h1>
            <p className="text-[rgb(var(--color-text-secondary))] text-lg">{subcategoryData.description}</p>
          </motion.div>
        </div>
      </div>
      
      <div className="pb-20">
        <div className="container-custom">
          <PhotoGrid 
            photos={subcategoryData.photos} 
            onPhotoClick={openLightbox}
          />
        </div>
      </div>
      
      <Lightbox 
        isOpen={!!selectedPhoto}
        onClose={closeLightbox}
        photo={selectedPhoto}
        photos={subcategoryData.photos}
        setSelectedPhoto={setSelectedPhoto}
      />
    </>
  )
}

export default SubcategoryPage