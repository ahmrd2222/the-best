import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { usePhotoData } from '../context/PhotoDataContext'
import Breadcrumbs from '../components/ui/Breadcrumbs'

const CategoryPage = ({ category }) => {
  const { portraits, events, couples } = usePhotoData()
  const navigate = useNavigate()
  
  // Get category data based on category name
  const getCategoryData = () => {
    switch(category) {
      case 'portraits':
        return portraits
      case 'events':
        return events
      case 'couples':
        return couples
      default:
        navigate('/')
        return null
    }
  }
  
  const categoryData = getCategoryData()
  
  if (!categoryData) return null
  
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [gridRef, gridInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
  
  // Render either subcategories (for portraits) or galleries (for events & couples)
  const renderGalleryItems = () => {
    if (category === 'portraits') {
      return categoryData.subcategories.map((subcategory) => (
        <GalleryItem 
          key={subcategory.id}
          id={subcategory.id}
          title={subcategory.title}
          image={subcategory.coverImage}
          category={category}
          variants={itemVariants}
        />
      ))
    } else {
      return categoryData.galleries.map((gallery) => (
        <GalleryItem 
          key={gallery.id}
          id={gallery.id}
          title={gallery.title}
          image={gallery.coverImage}
          date={gallery.date}
          category={category}
          variants={itemVariants}
        />
      ))
    }
  }
  
  return (
    <>
      <div ref={headerRef} className="pt-32 pb-16 bg-[rgb(var(--color-background))]">
        <div className="container-custom">
          <Breadcrumbs 
            items={[
              { label: 'Home', path: '/' },
              { label: categoryData.title, path: `/${category}` }
            ]}
          />
          
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">{categoryData.title}</h1>
            <p className="text-[rgb(var(--color-text-secondary))] text-lg">{categoryData.description}</p>
          </motion.div>
        </div>
      </div>
      
      <div className="pb-20">
        <div className="container-custom">
          <motion.div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
          >
            {renderGalleryItems()}
          </motion.div>
        </div>
      </div>
    </>
  )
}

const GalleryItem = ({ id, title, image, date, category, variants }) => {
  const path = `/${category}/${id}`
  
  return (
    <motion.div variants={variants}>
      <Link to={path}>
        <div className="category-card group h-80">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10 transition-opacity duration-300 group-hover:opacity-80"></div>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
            <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
            {date && <p className="text-white/80 text-sm mb-2">{date}</p>}
            <span className="inline-block text-white text-sm border-b border-white pb-1 transition-all duration-300 group-hover:border-[rgb(var(--color-primary))] group-hover:text-[rgb(var(--color-primary))]">
              View Gallery
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default CategoryPage