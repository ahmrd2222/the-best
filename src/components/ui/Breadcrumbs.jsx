import React from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span className="text-[rgb(var(--color-text-secondary))]">{item.label}</span>
              ) : (
                <>
                  <Link 
                    to={item.path}
                    className="text-[rgb(var(--color-primary))] hover:underline"
                  >
                    {item.label}
                  </Link>
                  <span className="mx-2 text-[rgb(var(--color-text-secondary))]">
                    <FiChevronRight size={14} />
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs