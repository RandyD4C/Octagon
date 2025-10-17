// src/components/common/Layout.js
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import siteConfig from "../../config/siteConfig"

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navbar */}
      <header className="bg-brand text-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Company Name */}
            <Link href="/">
                <h1 className="text-2xl font-bold">{siteConfig.company_name}</h1>
            </Link>
          
          {/* Hamburger for mobile */}
          <button
            className="sm:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex space-x-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/catalogue" className="hover:underline">
              Catalogue
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile Dropdown Nav */}
        {menuOpen && (
          <nav className="sm:hidden flex flex-col bg-brand text-white text-center space-y-2 py-3">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/catalogue" onClick={() => setMenuOpen(false)}>
              Catalogue
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </nav>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} {siteConfig.company_name}. All rights reserved.
      </footer>
    </div>
  )
}
