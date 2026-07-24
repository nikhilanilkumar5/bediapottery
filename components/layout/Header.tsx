'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { navigationItems } from '@/constants/data'
import Image from 'next/image'
import { Content } from '../ui'
import SearchPill from '../header/SearchPill'
import { ChevronDown, Menu, X, Instagram, Facebook, Linkedin } from 'lucide-react'

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (href: string) => {
    setOpenDropdown((prev) => (prev === href ? null : href))
  }

  // GUARANTEED BACKGROUND SCROLL LOCK (Cross-browser / iOS compatible)
  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [mobileOpen])

  return (
    <>
      {/* Standard Desktop/Mobile Header Topbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 w-full">
        <nav className="page-wrapper py-[7px] px-[17px] relative bg-white z-50">
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

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center 2xl:gap-[50px] xl:gap-6">
              {navigationItems.map((item) =>
                item.children ? (
                  <div key={item.href} className="relative group">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <Content className="hover:text-primary transition-colors duration-200">
                        {item.label}
                      </Content>
                      <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-primary transition-colors duration-200" />
                    </div>
                    <div className="absolute left-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.children.map((child, i) => (
                        <Link
                          key={i}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary transition-colors duration-150"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link key={item.href} href={item.href} target={item.target}>
                    <Content className="hover:text-primary transition-colors duration-200">
                      {item.label}
                    </Content>
                  </Link>
                )
              )}
              <SearchPill />
            </div>

            {/* Mobile Burger Trigger Button */}
            <div className="flex xl:hidden items-center md:gap-[3rem] gap-5">
              <SearchPill />
              <button
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="p-1 text-gray-700 hover:text-primary transition-colors duration-200"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* FULL-SCREEN RESPONSIVE MOBILE OVERLAY DRAWER */}
      <div 
        className={`fixed inset-0 h-[100dvh] w-screen bg-white text-primary z-[100] xl:hidden flex flex-col justify-between p-6 transition-all duration-300
          ${mobileOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`}
      >
        {/* Fixed Top Header */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image 
              src="/logo.svg" 
              alt="Bedia Pottery Logo" 
              width={290} 
              height={31} 
              className="h-auto w-[180px] md:w-[290px]" 
            />
          </Link>
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="p-2 text-primary hover:opacity-80 transition-opacity"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Scrollable Center Content */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1 overscroll-contain">
          {navigationItems.map((item) =>
            item.children ? (
              <div key={item.href} className="w-full">
                <button
                  onClick={() => toggleDropdown(item.href)}
                  className="flex items-center justify-between w-full py-2 text-base font-medium tracking-wide uppercase text-left"
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary/70 transition-transform duration-200 ${
                      openDropdown === item.href ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openDropdown === item.href && (
                  <div className="pl-4 flex flex-col gap-2 my-2 border-l-2 border-primary/20">
                    {item.children.map((child, i) => (
                      <Link
                        key={i}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 text-base font-medium text-primary/80 hover:text-primary transition-colors"
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
                target={item.target}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-base font-medium tracking-wide uppercase hover:text-primary/80 transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Fixed Footer Icons */}
        <div className="flex items-center gap-6 pt-4 border-t border-gray-100 shrink-0">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-primary hover:opacity-80 transition-opacity">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-primary hover:opacity-80 transition-opacity">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-primary hover:opacity-80 transition-opacity">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </>
  )
}

export default Header