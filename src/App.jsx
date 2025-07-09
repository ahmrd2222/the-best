import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import SubcategoryPage from './pages/SubcategoryPage'
import GalleryPage from './pages/GalleryPage'
import NotFound from './pages/NotFound'

// Context
import { ThemeProvider } from './context/ThemeContext'
import { PhotoDataProvider } from './context/PhotoDataContext'

function App() {
  const location = useLocation()
  
  return (
    <ThemeProvider>
      <PhotoDataProvider>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="portraits" element={<CategoryPage category="portraits" />} />
              <Route path="portraits/:subcategory" element={<SubcategoryPage category="portraits" />} />
              <Route path="events" element={<CategoryPage category="events" />} />
              <Route path="events/:galleryId" element={<GalleryPage category="events" />} />
              <Route path="commercial" element={<CategoryPage category="commercial" />} />
              <Route path="commercial/:galleryId" element={<GalleryPage category="commercial" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </PhotoDataProvider>
    </ThemeProvider>
  )
}

export default App