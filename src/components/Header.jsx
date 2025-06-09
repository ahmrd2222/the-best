import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { darkMode, toggleTheme } = useTheme()
  const location = useLocation()
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])
  
  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[rgb(var(--color-surface))] shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold transition-all duration-300">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            The Elegant Lens
          </motion.span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
        </div>
        
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleTheme}
            className="mr-4 p-2 rounded-full hover:bg-[rgb(var(--color-border)_/_0.3)] transition-colors duration-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-[rgb(var(--color-border)_/_0.3)] transition-colors duration-200"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[rgb(var(--color-surface))] shadow-md"
          >
            <div className="container-custom py-4">
              <nav className="flex flex-col space-y-4">
                <MobileNavLinks />
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const NavLinks = () => {
  return (
    <nav className="flex items-center space-x-8">
      <NavLink 
        to="/portraits" 
        className={({ isActive }) => 
          `relative hover:text-[rgb(var(--color-primary))] transition-colors duration-200 ${
            isActive ? 'text-[rgb(var(--color-primary))]' : ''
          }`
        }
      >
        {({ isActive }) => (
          <>
            Portraits
            {isActive && (
              <motion.span 
                layoutId="underline"
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-[rgb(var(--color-primary))]"
              />
            )}
          </>
        )}
      </NavLink>
      <NavLink 
        to="/events" 
        className={({ isActive }) => 
          `relative hover:text-[rgb(var(--color-primary))] transition-colors duration-200 ${
            isActive ? 'text-[rgb(var(--color-primary))]' : ''
          }`
        }
      >
        {({ isActive }) => (
          <>
            Events
            {isActive && (
              <motion.span 
                layoutId="underline"
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-[rgb(var(--color-primary))]"
              />
            )}
          </>
        )}
      </NavLink>
      <NavLink 
        to="/couples" 
        className={({ isActive }) => 
          `relative hover:text-[rgb(var(--color-primary))] transition-colors duration-200 ${
            isActive ? 'text-[rgb(var(--color-primary))]' : ''
          }`
        }
      >
        {({ isActive }) => (
          <>
            Couples
            {isActive && (
              <motion.span 
                layoutId="underline"
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-[rgb(var(--color-primary))]"
              />
            )}
          </>
        )}
      </NavLink>
    </nav>
  )
}

const MobileNavLinks = () => {
  return (
    <>
      <NavLink 
        to="/portraits" 
        className={({ isActive }) => 
          `block py-2 ${isActive ? 'text-[rgb(var(--color-primary))]' : ''}`
        }
      >
        Portraits
      </NavLink>
      <NavLink 
        to="/events" 
        className={({ isActive }) => 
          `block py-2 ${isActive ? 'text-[rgb(var(--color-primary))]' : ''}`
        }
      >
        Events
      </NavLink>
      <NavLink 
        to="/couples" 
        className={({ isActive }) => 
          `block py-2 ${isActive ? 'text-[rgb(var(--color-primary))]' : ''}`
        }
      >
        Couples
      </NavLink>
    </>
  )
}

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-[rgb(var(--color-border)_/_0.3)] transition-colors duration-200"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={darkMode ? 'dark' : 'light'}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}

export default Header