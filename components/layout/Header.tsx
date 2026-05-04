import React from 'react'
import Link from 'next/link'
import IconButton from '@/components/ui/IconButton'
import { navigationItems } from '@/constants/data'
import Image from 'next/image'
import { Content } from '../ui'
import SearchPill from '../header/SearchPill'

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="page-wrapper py-[7px]">
        <div className="flex items-center justify-between">
          <Link href="/">
           <Image src="/logo.svg" alt="Bedia Pottery Logo" width={290} height={31} className='w-[290px] h-[31px]' />
          </Link>
          
          <div className="flex items-center 2xl:gap-[50px] xl:gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className=""
              >
                  <Content className=" hover:text-primary transition-colors duration-200"> {item.label}</Content>
               
              </Link>
            ))}
            
            {/* <div className="flex items-center gap-2">
              <IconButton
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                ariaLabel="Search"
              />
              <IconButton
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                ariaLabel="Account"
              />
              <IconButton
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                }
                ariaLabel="Menu"
              />
            </div> */}
          <SearchPill />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

