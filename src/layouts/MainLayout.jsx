import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ui/ScrollToTop'

const MainLayout = () => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate page loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    // Always scroll to top on route change
    window.scrollTo(0, 0)
  }, [location.pathname])
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loader"
            className="flex-grow flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loader">
              <div className="w-16 h-16 border-4 border-t-[rgb(var(--color-primary))] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
          </motion.div>
        ) : (
          <motion.main 
            key="content"
            className="flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.main>
        )}
      </AnimatePresence>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default MainLayout