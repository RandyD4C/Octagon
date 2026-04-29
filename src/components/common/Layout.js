import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router" // 1. Import useRouter
import { Menu, X } from "lucide-react"
import siteConfig from "../../config/siteConfig"
import Footer from "./PageFooter"
import ScrollControls from "./ScrollControls"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const SOLUTIONS_ITEMS = [
  { label: "Auto Degating Plastic Injection Mold", href: "/auto-degating-plastic-injection-mold" },
  { label: "Wire Harness", href: "/wire-harness" },
  { label: "Plastic Injection Spare Parts", href: "/plastic-injection-spare-parts" },
  { label: "Mold Components", href: "/mold-components" },
]

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter() // 2. Initialize router

  // 3. Check if we are on the Home page
  const isHomePage = router.pathname === "/"


  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 w-full" style={{ fontFamily: '"Poppins", sans-serif' }}>

      {/* Navbar */}
      <header className="bg-white text-gray-900 sticky top-0 z-50 shadow-md py-4 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <img
              src="/company-logo.png"
              alt="Octagon Precision Mold"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>

          <nav className="hidden sm:flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base sm:text-md font-bold tracking-wide text-gray-500 hover:text-blue-500 transition-all relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            <div className="relative group py-2">
              <button
                type="button"
                className="flex items-center gap-2 text-base sm:text-md font-bold tracking-wide text-gray-500 hover:text-blue-500 transition-all"
              >
                Solutions
                <span className="text-xs transition-transform duration-200 group-hover:rotate-180">▼</span>
              </button>

              <div className="invisible absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-gray-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {SOLUTIONS_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <button className="sm:hidden p-2 text-gray-800 hover:text-blue-600 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* ✅ MOBILE MENU BLOCK */}
        <div
          className={`sm:hidden absolute top-full left-0 w-full bg-white shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[32rem] opacity-100 py-4 border-t border-gray-100" : "max-h-0 opacity-0 py-0"
            }`}
        >
          <div className="px-6 space-y-4 flex flex-col">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-base font-bold text-gray-700 hover:text-blue-500 transition-colors transform hover:translate-x-2 duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-2">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                Solutions
              </p>
              <div className="space-y-3 border-l-2 border-blue-100 pl-4">
                {SOLUTIONS_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm font-semibold text-gray-700 hover:text-blue-500 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

      </header>

      {/* Main Content */}
      {/* 4. DYNAMIC PADDING: If it's home page, use py-0. Otherwise, use py-6 */}
      <main className={`flex-grow w-full overflow-x-hidden ${isHomePage ? 'py-0' : 'py-6'}`}>
        {children}
      </main>

      <Footer siteConfig={siteConfig} />
      <ScrollControls />
    </div>
  )
}
