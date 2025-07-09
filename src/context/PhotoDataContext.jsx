import React, { createContext, useState, useContext } from 'react'
import portraitData from '../data/portraits'
import eventsData from '../data/events'
import commercialData from '../data/commercial'

const PhotoDataContext = createContext()

export const usePhotoData = () => useContext(PhotoDataContext)

export const PhotoDataProvider = ({ children }) => {
  const [portraits, setPortraits] = useState(portraitData)
  const [events, setEvents] = useState(eventsData)
  const [commercial, setCommercial] = useState(commercialData)

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

  const addCommercialGallery = (newGallery) => {
    setCommercial(prev => ({
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
    } else if (category === 'commercial') {
      setCommercial(prev => {
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
        commercial, 
        addPortraitSubcategory,
        addEventGallery,
        addCommercialGallery,
        addPhotosToGallery
      }}
    >
      {children}
    </PhotoDataContext.Provider>
  )
}

export default PhotoDataContext