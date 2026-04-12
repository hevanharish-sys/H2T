import React from 'react'
import { socialLinks } from '../data'

const FloatingSocials = () => {
  return (
    <div className="floating-contact hidden md:flex">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-contact-item"
        >
          <link.icon className="w-5 h-5 text-white" />
          <span>{link.name}</span>
        </a>
      ))}
    </div>
  )
}

export default FloatingSocials
