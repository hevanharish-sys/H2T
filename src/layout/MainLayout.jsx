import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { navItems } from '../data'
import NavHeader from '../components/ui/nav-header'
import FloatingSocials from '../components/FloatingSocials'
import NoiseOverlay from '../components/NoiseOverlay'
import SmoothScroll from '../components/SmoothScroll'
import HoverFooter from '../components/HoverFooter'

const MainLayout = () => {
  const location = useLocation()
  const pathname = location.pathname
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false)

  // Detect scroll position on home page to switch nav theme
  useEffect(() => {
    if (pathname !== '/') {
      setIsScrolledPastHero(false)
      return
    }

    const handleScroll = () => {
      // Threshold for switching to dark theme (Home Hero height is roughly min-h-screen)
      setIsScrolledPastHero(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const isDarkTheme = ['/digital-solutions', '/project-estimation'].includes(pathname) || isScrolledPastHero

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#FBF6EE] text-black font-sans selection:bg-black selection:text-[#FBF6EE]">
        <NoiseOverlay />
        
        <NavHeader
          items={navItems.map(item => ({ label: item.name, href: item.href }))}
          activeHref={pathname}
          isDark={isDarkTheme}
        />

        <main>
          <Outlet />
        </main>

        <HoverFooter />
      </div>
    </SmoothScroll>
  )
}

export default MainLayout
