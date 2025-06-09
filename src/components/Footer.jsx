import React from 'react'
import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[rgb(var(--color-surface))] border-t border-[rgb(var(--color-border))]">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">The Elegant Lens</h3>
            <p className="text-[rgb(var(--color-text-secondary))] mb-4">
              Capturing moments, creating memories. Professional photography services for all your special occasions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors duration-200"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors duration-200"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors duration-200"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Explore</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/portraits" 
                className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors duration-200"
              >
                Portrait Photography
              </Link>
              <Link 
                to="/events" 
                className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors duration-200"
              >
                Event Photography
              </Link>
              <Link 
                to="/couples" 
                className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors duration-200"
              >
                Couples & Engagements
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-[rgb(var(--color-text-secondary))] mb-2">
              theelegantlenses@gmail.com
            </p>
            <p className="text-[rgb(var(--color-text-secondary))] mb-2">
              +1 (825) 925-6677
            </p>
            <p className="text-[rgb(var(--color-text-secondary))]">
              Canada Edmonton<br />
              
            </p>
          </div>
        </div>
        
        <div className="border-t border-[rgb(var(--color-border))] mt-8 pt-8 text-center text-[rgb(var(--color-text-secondary))]">
          <p>&copy; {currentYear} The Elegant Lens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer