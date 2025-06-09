import React, { createContext, useState, useContext } from 'react'
import portraitData from '../data/portraits'
import eventsData from '../data/events'
import couplesData from '../data/couples'

const PhotoDataContext = createContext()

export const usePhotoData = () => useContext(PhotoDataContext)

export const PhotoDataProvider = ({ children }) => {
  const [portraits, setPortraits] = useState(portraitData)
  const [events, setEvents] = useState(eventsData)
  const [couples, setCouples] = useState(couplesData)

  // Functions to update data
  const addPortraitSubcategory = (newSubcategory) => {
    setPortraits(prev => ({
      ...prev,
      subcategories: [...prev.subcategories, newSubcategory]
    }))
  }

  const addEventGallery = (newGallery) => {
    setEvents(prev => ({
      ...prev,
      galleries: [...prev.galleries, newGallery]
    }))
  }

  const addCoupleGallery = (newGallery) => {
    setCouples(prev => ({
      ...prev,
      galleries: [...prev.galleries, newGallery]
    }))
  }

  // Function to add photos to a specific gallery
  const addPhotosToGallery = (category, galleryId, newPhotos) => {
    if (category === 'portraits') {
      setPortraits(prev => {
        const updatedSubcategories = prev.subcategories.map(sub => {
          if (sub.id === galleryId) {
            return {
              ...sub,
              photos: [...sub.photos, ...newPhotos]
            }
          }
          return sub
        })
        return {
          ...prev,
          subcategories: updatedSubcategories
        }
      })
    } else if (category === 'events') {
      setEvents(prev => {
        const updatedGalleries = prev.galleries.map(gallery => {
          if (gallery.id === galleryId) {
            return {
              ...gallery,
              photos: [...gallery.photos, ...newPhotos]
            }
          }
          return gallery
        })
        return {
          ...prev,
          galleries: updatedGalleries
        }
      })
    } else if (category === 'couples') {
      setCouples(prev => {
        const updatedGalleries = prev.galleries.map(gallery => {
          if (gallery.id === galleryId) {
            return {
              ...gallery,
              photos: [...gallery.photos, ...newPhotos]
            }
          }
          return gallery
        })
        return {
          ...prev,
          galleries: updatedGalleries
        }
      })
    }
  }

  return (
    <PhotoDataContext.Provider 
      value={{ 
        portraits, 
        events, 
        couples, 
        addPortraitSubcategory,
        addEventGallery,
        addCoupleGallery,
        addPhotosToGallery
      }}
    >
      {children}
    </PhotoDataContext.Provider>
  )
}

export default PhotoDataContext