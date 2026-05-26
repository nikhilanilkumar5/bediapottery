'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { navigationItems } from '@/constants/data'
import Image from 'next/image'
import { Content } from '../ui'
import SearchPill from '../header/SearchPill'
import { ChevronDown, Menu, X } from 'lucide-react'

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (href: string) => {
    setOpenDropdown((prev) => (prev === href ? null : href))
  }

  // Prevent background scrolling when the mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="page-wrapper py-[7px] px-[17px]  relative bg-white z-50">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image 
                src="/logo.svg" 
                alt="Bedia Pottery Logo" 
                width={290} 
                height={31} 
                className="w-[180px] h-auto md:w-[290px] md:h-[31px]" 
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center 2xl:gap-[50px] xl:gap-6">
              {navigationItems.map((item) =>
                item.children ? (
                  <div key={item.href} className="relative group">
                    <div  className="flex items-center gap-1 cursor-pointer">
                      <Content className="hover:text-primary transition-colors duration-200">
                        {item.label}
                      </Content>
                      <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-primary transition-colors duration-200" />
                    </div>
                    <div className="absolute left-0 top-full mt-2 w-44 bg-white border border-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary transition-colors duration-150"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link key={item.href} href={item.href}>
                    <Content className="hover:text-primary transition-colors duration-200">{item.label}</Content>
                  </Link>
                )
              )}
              <SearchPill />
            </div>

            {/* Mobile right side: SearchPill icons + hamburger */}
            <div className="flex lg:hidden items-center gap-3">
              <SearchPill />
              <button
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMobileOpen((prev) => !prev)}
                className="p-1 text-gray-700 hover:text-primary transition-colors duration-200"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu — fixed below header, above overlay */}
      {mobileOpen && (
        <div className="fixed top-[70px] left-0 right-0 bg-white border-t border-gray-100 px-[17px] pb-4 shadow-lg lg:hidden z-50">
          {navigationItems.map((item) =>
            item.children ? (
              <div key={item.href}>
                <button
                  onClick={() => toggleDropdown(item.href)}
                  className="flex items-center justify-between w-full py-3 border-b border-gray-100"
                >
                  <span className="text-sm font-medium text-gray-800">{item.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${openDropdown === item.href ? 'rotate-180' : ''}`}
                  />
                </button>
                {openDropdown === item.href && (
                  <div className="pl-4 pb-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2.5 text-sm text-gray-600 hover:text-primary transition-colors duration-150"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center py-3 border-b border-gray-100 text-sm font-medium text-gray-800 hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}

      {/* Full-screen overlay — behind menu, above page content */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default Header