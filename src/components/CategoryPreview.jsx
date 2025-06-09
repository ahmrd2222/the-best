import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CategoryPreview = ({ title, description, image, link }) => {
  return (
    <Link to={link}>
      <motion.div 
        className="category-card group h-96"
        whileHover={{ y: -5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10 transition-opacity duration-300 group-hover:opacity-80"></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
          <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
          <p className="text-white/80 mb-4">{description}</p>
          <span className="inline-block text-white border-b border-white pb-1 transition-all duration-300 group-hover:border-[rgb(var(--color-primary))] group-hover:text-[rgb(var(--color-primary))]">
            View Gallery
          </span>
        </div>
      </motion.div>
    </Link>
  )
}

export default CategoryPreview