// --- IMPORTS & CORE DEPENDENCIES ---
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import siteConfig from '../config/siteConfig'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
    Settings2,
    Cable,
    Bot,
    Hospital,
    Zap,
    Gavel,
    Component,
    Calendar,
    Globe,
    Handshake,
    Target,
    Award,
    Globe2,
    CheckCircle2,
    Users,
    Mail,
    BookOpen,
    ArrowRight
} from 'lucide-react'


export default function Home() {
    // --- NAVIGATION & STATE MANAGEMENT ---
    const router = useRouter()
    const [scrollY, setScrollY] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeProduct, setActiveProduct] = useState(0)
    const [activeCert, setActiveCert] = useState(0)
    const [activeHero, setActiveHero] = useState(0)
    const [isHoveringHero, setIsHoveringHero] = useState(false)

    //mobile swipe animations for certificates
    const [touchStartX, setTouchStartX] = useState(null)
    const handleTouchStart = (e) => { setTouchStartX(e.touches[0].clientX) }

    const handleTouchEnd = (e) => {
        if (touchStartX === null) return
        const touchEndX = e.changedTouches[0].clientX
        const diff = touchStartX - touchEndX
        if (diff > 50) {
            // swipe left → next card
            setActiveCert((p) => (p + 1) % certificates.length)
        } else if (diff < -50) {
            // swipe right → previous card
            setActiveCert((p) => (p - 1 + certificates.length) % certificates.length)
        }
        setTouchStartX(null)
    }

    //mobile swipe animations for advertisement slides
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setActiveHero((prev) => (prev + 1) % heroSlides.length);
        }

        if (isRightSwipe) {
            setActiveHero((prev) =>
                prev === 0 ? heroSlides.length - 1 : prev - 1
            );
        }
    };


    const heroSlides = [
        { type: 'text' },
        { type: 'image', image: '/home/sheet-metal-fasteners.png' },
        { type: 'image', image: '/home/Standoff.png' },
        { type: 'image', image: '/home/Insert_nuts.png' },
        { type: 'image', image: '/home/threaded insert.png' },
        { type: 'image', image: '/home/Wires.png' }
    ]


    // --- HERO CAROUSEL LOGIC ---
    // Automated timer to cycle through slides unless user is hovering
    useEffect(() => {
        const heroTimer = setInterval(() => {
            if (!isHoveringHero) {
                setActiveHero(prev => (prev + 1) % heroSlides.length)
            }
        }, 15000)
        return () => clearInterval(heroTimer)
    }, [heroSlides.length, isHoveringHero])

    useEffect(() => {
        setIsLoaded(true)
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveCert(prev => (prev + 1) % certificates.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [activeCert])

    // --- STATIC DATA CONFIGURATIONS ---
    const products = [
        {
            title: 'Auto Degating',
            description: 'Automatic degating mold concepts for efficient plastic injection production',
            icon: Gavel,
            color: '#2563EB',
            link: '/auto-degating-plastic-injection-mold'
        },
        {
            title: 'Wire Harness',
            description: 'Custom-engineered wiring for automotive, medical & industrial',
            icon: Cable,
            color: '#7C3AED',
            link: '/wire-harness'
        },
        {
            title: 'Mold Parts',
            description: 'Precision die casting, stamping & plastic mold components',
            icon: Component,
            color: '#DC2626',
            link: '/mold-components'
        },
        {
            title: 'Automation Systems',
            description: 'In-mold cutting and automation solutions',
            icon: Bot,
            color: '#059669',
            link: '/mold-components'
        },
        {
            title: 'Medical Harnesses',
            description: 'Certified medical-grade wiring assemblies',
            icon: Hospital,
            color: '#EA580C',
            link: '/wire-harness'
        },
        {
            title: 'Custom Solutions',
            description: 'OEM & ODM non-standard parts manufacturing',
            icon: Zap,
            color: '#0891B2',
            link: '/contact'
        }
    ]

    const stats = [
        { value: '2008', label: 'SINCE', icon: Calendar },
        { value: '60+', label: 'COUNTRIES', icon: Globe },
        { value: '20,000+', label: 'PARTNERS', icon: Handshake },
        { value: '±0.002mm', label: 'PRECISION', icon: Target },
        { value: '45+', label: 'PATENTS', icon: Award }
    ]

    const advantages = [
        {
            title: 'Global Reach',
            description: 'Serving 60+ countries with 20,000+ trusted customers and localized support worldwide.',
            icon: Globe2,
            color: '#3B82F6'
        },
        {
            title: 'High Precision',
            description: 'Tolerance ±0.002mm, mirror Ra 0.05-0.2, meeting the highest industry standards.',
            icon: Target,
            color: '#8B5CF6'
        },
        {
            title: 'Full-Process QC',
            description: 'Strict quality control from raw materials to delivery, ensuring stable product quality.',
            icon: CheckCircle2,
            color: '#10B981'
        },
        {
            title: 'Expert Team',
            description: 'R&D engineers with 10+ years experience, ISO-compliant production personnel.',
            icon: Users,
            color: '#F59E0B'
        }
    ]

    const industries = [
        { name: 'Medical', image: '/home/medical.png' },
        { name: 'Electronics', image: '/home/electronic.png' },
        { name: 'Mechanical', image: '/home/mechanical.png' },
        { name: 'Aerospace', image: '/home/aerospace.png' }
    ]

    const certificates = [
        '/certificates/honorary-certificate-1.png',
        '/certificates/honorary-certificate-2.png',
        '/certificates/honorary-certificate-3.png',
        '/certificates/honorary-certificate-4.png',
        '/certificates/honorary-certificate-5.png',
        '/certificates/honorary-certificate-6.png',
        '/certificates/honorary-certificate-8.png',
    ]

    return (
        // --- MAIN LAYOUT RENDER ---
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Hero Section Carousel */}
            {/* SECTION 1: HERO CAROUSEL */}
            <section
                onMouseEnter={() => setIsHoveringHero(true)}
                onMouseLeave={() => setIsHoveringHero(false)}
                className="relative h-[calc(100vh-80px)] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden flex items-center justify-center"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >

                {/* SLIDE 0: MAIN BRAND HERO */}
                <div
                    className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-1000 ease-in-out ${activeHero === 0 ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'}`}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/home/Vision.png')",
                            animation: activeHero === 0 ? 'bgZoomFade 1.5s ease-out forwards' : 'none'
                        }}
                    />

                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-slate-900/60" />

                    <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                        <h1
                            className="text-[2.5rem] sm:text-6xl md:text-8xl font-black mb-6 leading-[1.1]"
                            style={{
                                fontFamily: '"Archivo Black", "Impact", sans-serif',
                                animation: activeHero === 0 ? 'slideDown 0.8s ease-out forwards' : 'slideOutUp 0.8s ease-in forwards'
                            }}
                        >
                            <span className="text-white">Your Vision,</span><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#10B981]">Our Precision.</span>
                        </h1>

                        <p
                            className="text-xl md:text-2xl text-blue-100 mb-4 font-bold max-w-3xl mx-auto"
                            style={{
                                fontFamily: '"Poppins", sans-serif',
                                animation: activeHero === 0 ? 'slideUp 0.8s 0.2s ease-out both' : 'slideOutDown 0.8s ease-in forwards'
                            }}
                        >
                            High-Precision Manufacturing Solutions
                        </p>
                        <p
                            className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
                            style={{
                                fontFamily: '"Poppins", sans-serif',
                                animation: activeHero === 0 ? 'slideUp 0.8s 0.35s ease-out both' : 'slideOutDown 0.8s 0.1s ease-in forwards'
                            }}
                        >
                            Auto Degating | Wire Harnesses | Mold Parts | Automation Systems
                        </p>

                        <div className="flex gap-4 justify-center flex-wrap" style={{ animation: activeHero === 0 ? 'slideUp 0.8s 0.5s ease-out both' : 'slideOutDown 0.8s 0.2s ease-in forwards' }}>
                            <button
                                onClick={() => router.push('/contact')}
                                className="px-8 py-4 bg-blue-600 text-white font-black text-base rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 shadow-2xl whitespace-nowrap"
                                style={{ fontFamily: '"Archivo Black", sans-serif' }}
                            >
                                EXPLORE CATALOGUE
                            </button>
                        </div>
                    </div>
                </div>

                {/* SLIDE 1: SHEET METAL FASTENERS ADVERTISEMENT */}
                <div
                    className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between transition-all duration-1000 ease-in-out bg-slate-900 ${activeHero === 1 ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'}`}
                >
                    {/* Left side: Text Content */}
                    <div className="relative z-10 w-full md:w-1/2 p-8 md:pl-16 lg:pl-32 text-left flex flex-col justify-center h-[55%] md:h-full pt-16 md:pt-0">
                        <div className="max-w-2xl">
                            <h2
                                className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 text-white leading-[1.05]"
                                style={{
                                    fontFamily: '"Archivo Black", "Impact", sans-serif',
                                    animation: activeHero === 1 ? 'slideUp 0.8s 0.2s ease-out forwards' : 'slideOutDown 0.8s ease-in forwards',
                                    opacity: 0
                                }}
                            >
                                SHEET METAL <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                    FASTENERS
                                </span>
                            </h2>

                            <p
                                className="text-base md:text-lg lg:text-xl text-slate-300 mb-6 font-medium leading-relaxed max-w-xl"
                                style={{
                                    fontFamily: '"Poppins", sans-serif',
                                    animation: activeHero === 1 ? 'slideUp 0.8s 0.4s ease-out forwards' : 'slideOutDown 0.8s ease-in forwards',
                                    opacity: 0
                                }}
                            >
                                Comprehensive range of high-performance self-clinching nuts, studs, and standoffs. Precision-engineered for aerospace, medical, and high-tech electronics, ensuring exceptional structural integrity in thin sheet metal applications.
                            </p>
                        </div>
                    </div>

                    {/* Separator Accent Line positioned between text and image */}
                    <div
                        className="hidden md:block absolute left-1/2 top-20 bottom-20 w-[6px] bg-gradient-to-b from-transparent via-blue-500 to-transparent rounded-full z-20" style={{
                            animation: activeHero === 1 ? 'slideUp 1.4s ease-out forwards' : 'slideOutDown 1.4s ease-in forwards',
                            opacity: 0
                        }}
                    />

                    {/* Right side: Image Container */}
                    <div className="relative w-full md:w-1/2 h-[45%] md:h-full mt-4 md:pt-0 flex items-center justify-center p-4 md:p-12 pb-20 md:pb-10 overflow-hidden">
                        {/* The Image Overlay/Container - Now the actual interactive box */}
                        <div
                            onClick={() => router.push('/mold-components')}
                            className="group relative z-10 w-full h-full md:h-[80%] rounded-2xl md:rounded-l-3xl overflow-hidden shadow-2xl shadow-blue-900/20 bg-slate-800 border-2 border-blue-900/50 group-hover:border-blue-400 transition-all duration-500 cursor-pointer"
                            style={{
                                animation: activeHero === 1 ? 'slideLeft 0.8s 0.6s ease-out both' : 'slideOutRight 0.8s ease-in both',
                                opacity: 0
                            }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                                style={{
                                    backgroundImage: "url('/home/sheet-metal-fasteners.png')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-blue-900/10 md:bg-blue-900/0 group-hover:bg-blue-900/40 transition-all duration-500 flex items-center justify-center">
                                <div
                                    className="px-6 py-2 bg-white text-blue-900 font-black rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 shadow-2xl flex items-center gap-2 hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 group/btn"
                                    style={{
                                        fontFamily: '"Archivo Black", sans-serif'
                                    }}
                                >
                                    LEARN MORE
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={3} />
                                </div>
                            </div>
                            {/* Inner vignette for the image */}
                            <div className="absolute inset-0 rounded-2xl md:rounded-l-3xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* SLIDE 2: PRECISION STANDOFFS ADVERTISEMENT */}
                <div
                    className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between transition-all duration-1000 ease-in-out bg-slate-900 ${activeHero === 2 ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'}`}
                >
                    {/* Left side: Text Content */}
                    <div className="relative z-10 w-full md:w-1/2 p-8 md:pl-16 lg:pl-32 text-left flex flex-col justify-center h-[55%] md:h-full pt-16 md:pt-0">
                        <div className="max-w-2xl">
                            <h2
                                className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 text-white leading-[1.05]"
                                style={{
                                    fontFamily: '"Archivo Black", "Impact", sans-serif',
                                    animation: activeHero === 2 ? 'slideUp 0.8s 0.2s ease-out forwards' : 'slideOutDown 0.8s ease-in forwards',
                                    opacity: 0
                                }}
                            >
                                PRECISION <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                    STANDOFFS
                                </span>
                            </h2>

                            <p
                                className="text-base md:text-lg lg:text-xl text-slate-300 mb-6 font-medium leading-relaxed max-w-xl"
                                style={{
                                    fontFamily: '"Poppins", sans-serif',
                                    animation: activeHero === 2 ? 'slideUp 0.8s 0.4s ease-out forwards' : 'slideOutDown 0.8s ease-in forwards',
                                    opacity: 0
                                }}
                            >
                                Elite-grade spacers and standoffs available in multiple materials and thread configurations. Designed for critical PCB mounting and chassis assembly, offering superior spacing accuracy for demanding industrial and electronic assemblies.
                            </p>
                        </div>
                    </div>

                    {/* Separator Accent Line */}
                    <div
                        className="hidden md:block absolute left-1/2 top-20 bottom-20 w-[6px] bg-gradient-to-b from-transparent via-blue-500 to-transparent rounded-full z-20"
                        style={{
                            animation: activeHero === 2 ? 'slideUp 1.4s ease-out forwards' : 'slideOutDown 1.4s ease-in forwards',
                            opacity: 0
                        }}
                    />

                    {/* Right side: Image Container */}
                    <div className="relative w-full md:w-1/2 h-[45%] md:h-full mt-4 md:pt-0 flex items-center justify-center p-4 md:p-12 pb-20 md:pb-10 overflow-hidden">
                        <div
                            onClick={() => router.push('/mold-components')}
                            className="group relative z-10 w-full h-full md:h-[80%] rounded-2xl md:rounded-l-3xl overflow-hidden shadow-2xl shadow-blue-900/20 bg-slate-800 border-2 border-blue-900/50 group-hover:border-blue-400 transition-all duration-500 cursor-pointer"
                            style={{
                                animation: activeHero === 2 ? 'slideLeft 0.8s 0.6s ease-out both' : 'slideOutRight 0.8s ease-in both',
                                opacity: 0
                            }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110" style={{
                                    backgroundImage: "url('/home/Standoff.png')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-blue-900/10 md:bg-blue-900/0 group-hover:bg-blue-900/40 transition-all duration-500 flex items-center justify-center">
                                <div
                                    className="px-6 py-2 bg-white text-blue-900 font-black rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 shadow-2xl flex items-center gap-2 hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 group/btn"
                                    style={{
                                        fontFamily: '"Archivo Black", sans-serif'
                                    }}
                                >
                                    LEARN MORE
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={3} />
                                </div>
                            </div>
                            <div className="absolute inset-0 rounded-2xl md:rounded-l-3xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* SLIDE 3: BRASS THREADED INSERTS ADVERTISEMENT */}
                <div
                    className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between transition-all duration-1000 ease-in-out bg-slate-900 ${activeHero === 3 ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'}`}
                >
                    {/* Left side: Text Content */}
                    <div className="relative z-10 w-full md:w-1/2 p-8 md:pl-16 lg:pl-32 text-left flex flex-col justify-center h-[55%] md:h-full pt-16 md:pt-0">
                        <div className="max-w-2xl">
                            <h2
                                className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 text-white leading-[1.05]"
                                style={{
                                    fontFamily: '"Archivo Black", "Impact", sans-serif',
                                    animation: activeHero === 3 ? 'slideUp 0.8s 0.2s ease-out forwards' : 'slideOutDown 0.8s ease-in forwards',
                                    opacity: 0
                                }}
                            >
                                BRASS NUT <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                    INSERTS
                                </span>
                            </h2>

                            <p
                                className="text-base md:text-lg lg:text-xl text-slate-300 mb-6 font-medium leading-relaxed max-w-xl"
                                style={{
                                    fontFamily: '"Poppins", sans-serif',
                                    animation: activeHero === 3 ? 'slideUp 0.8s 0.4s ease-out forwards' : 'slideOutDown 0.8s ease-in forwards',
                                    opacity: 0
                                }}
                            >
                                High-precision threaded inserts engineered for superior pull-out resistance and torque strength. Ideal for plastic molding, 3D printing, and composite assemblies, ensuring reliable mechanical threads in even the most challenging materials.
                            </p>
                        </div>
                    </div>

                    {/* Separator Accent Line */}
                    <div
                        className="hidden md:block absolute left-1/2 top-20 bottom-20 w-[6px] bg-gradient-to-b from-transparent via-blue-500 to-transparent rounded-full z-20"
                        style={{
                            animation: activeHero === 3 ? 'slideUp 1.4s ease-out forwards' : 'slideOutDown 1.4s ease-in forwards',
                            opacity: 0
                        }}
                    />

                    {/* Right side: Image Container */}
                    <div className="relative w-full md:w-1/2 h-[45%] md:h-full mt-4 md:pt-0 flex items-center justify-center p-4 md:p-12 pb-20 md:pb-10 overflow-hidden">
                        <div
                            onClick={() => router.push('/plastic-injection-spare-parts')}
                            className="group relative z-10 w-full h-full md:h-[80%] rounded-2xl md:rounded-l-3xl overflow-hidden shadow-2xl shadow-blue-900/20 bg-slate-800 border-2 border-blue-900/50 group-hover:border-blue-400 transition-all duration-500 cursor-pointer"
                            style={{
                                animation: activeHero === 3 ? 'slideLeft 0.8s 0.6s ease-out both' : 'slideOutRight 0.8s ease-in both',
                                opacity: 0
                            }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110" style={{
                                    backgroundImage: "url('/home/Insert_nuts.png')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-blue-900/10 md:bg-blue-900/0 group-hover:bg-blue-900/40 transition-all duration-500 flex items-center justify-center">
                                <div
                                    className="px-6 py-2 bg-white text-blue-900 font-black rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 shadow-2xl flex items-center gap-2 hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 group/btn"
                                    style={{
                                        fontFamily: '"Archivo Black", sans-serif'
                                    }}
                                >
                                    LEARN MORE
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={3} />
                                </div>
                            </div>
                            <div className="absolute inset-0 rounded-2xl md:rounded-l-3xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* SLIDE 4: OEM QUALITY THREADED INSERTS ADVERTISEMENT */}
                <div
                    className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between transition-all duration-1000 ease-in-out bg-slate-900 ${activeHero === 4 ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'}`}
                >
                    {/* Left side: Text Content */}
                    <div className="relative z-10 w-full md:w-1/2 p-8 md:pl-16 lg:pl-32 text-left flex flex-col justify-center h-[55%] md:h-full pt-16 md:pt-0">
                        <div className="max-w-2xl">
                            <h2
                                className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 text-white leading-[1.05]"
                                style={{
                                    fontFamily: '"Archivo Black", "Impact", sans-serif',
                                    animation: activeHero === 4 ? 'slideUp 0.8s 0.2s ease-out forwards' : 'slideOutDown 0.8s ease-in forwards',
                                    opacity: 0
                                }}
                            >
                                THREADED <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                    INSERTS
                                </span>
                            </h2>

                            <p
                                className="text-base md:text-lg lg:text-xl text-slate-300 mb-6 font-medium leading-relaxed max-w-xl"
                                style={{
                                    fontFamily: '"Poppins", sans-serif',
                                    animation: activeHero === 4 ? 'slideUp 0.8s 0.4s ease-out forwards' : 'slideOutDown 0.8s ease-in forwards',
                                    opacity: 0
                                }}
                            >
                                Built with OEM quality for the most demanding technical assemblies. Our premium threaded inserts provide unparalleled durability and precision, serving as the benchmark for high-performance automotive and industrial applications.
                            </p>
                        </div>
                    </div>

                    {/* Separator Accent Line */}
                    <div
                        className="hidden md:block absolute left-1/2 top-20 bottom-20 w-[6px] bg-gradient-to-b from-transparent via-blue-500 to-transparent rounded-full z-20"
                        style={{
                            animation: activeHero === 4 ? 'slideUp 1.4s ease-out forwards' : 'slideOutDown 1.4s ease-in forwards',
                            opacity: 0
                        }}
                    />

                    {/* Right side: Image Container */}
                    <div className="relative w-full md:w-1/2 h-[45%] md:h-full mt-4 md:pt-0 flex items-center justify-center p-4 md:p-12 pb-20 md:pb-10 overflow-hidden">
                        <div
                            onClick={() => router.push('/plastic-injection-spare-parts')}
                            className="group relative z-10 w-full h-full md:h-[80%] rounded-2xl md:rounded-l-3xl overflow-hidden shadow-2xl shadow-blue-900/20 bg-slate-800 border-2 border-blue-900/50 group-hover:border-blue-400 transition-all duration-500 cursor-pointer"
                            style={{
                                animation: activeHero === 4 ? 'slideLeft 0.8s 0.6s ease-out both' : 'slideOutRight 0.8s ease-in both',
                                opacity: 0
                            }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110" style={{
                                    backgroundImage: "url('/home/threaded insert.png')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-blue-900/10 md:bg-blue-900/0 group-hover:bg-blue-900/40 transition-all duration-500 flex items-center justify-center">
                                <div
                                    className="px-6 py-2 bg-white text-blue-900 font-black rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 shadow-2xl flex items-center gap-2 hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 group/btn"
                                    style={{
                                        fontFamily: '"Archivo Black", sans-serif'
                                    }}
                                >
                                    LEARN MORE
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={3} />
                                </div>
                            </div>
                            <div className="absolute inset-0 rounded-2xl md:rounded-l-3xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* SLIDE 5: WIRE HARNESS ADVERTISEMENT */}
                <div
                    className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between transition-all duration-1000 ease-in-out bg-slate-900 ${activeHero === 5 ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'}`}
                >
                    {/* Left side: Text Content */}
                    <div className="relative z-10 w-full md:w-1/2 p-8 md:pl-16 lg:pl-32 text-left flex flex-col justify-center h-[55%] md:h-full pt-16 md:pt-0">
                        <div className="max-w-2xl">
                            <h2
                                className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 text-white leading-[1.05]"
                                style={{
                                    fontFamily: '"Archivo Black", "Impact", sans-serif',
                                    animation: activeHero === 5 ? 'slideUp 0.8s 0.2s ease-out forwards' : 'slideOutDown 0.8s ease-in forwards',
                                    opacity: 0
                                }}
                            >
                                WIRE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                    HARNESS
                                </span>
                            </h2>

                            <p
                                className="text-base md:text-lg lg:text-xl text-slate-300 mb-6 font-medium leading-relaxed max-w-xl"
                                style={{
                                    fontFamily: '"Poppins", sans-serif',
                                    animation: activeHero === 5 ? 'slideUp 0.8s 0.4s ease-out forwards' : 'slideOutDown 0.8s ease-in forwards',
                                    opacity: 0
                                }}
                            >
                                Custom-engineered wiring for automotive, medical & industrial. High-quality, reliable, and durable wire harness solutions designed for complex systems.
                            </p>
                        </div>
                    </div>

                    {/* Separator Accent Line */}
                    <div
                        className="hidden md:block absolute left-1/2 top-20 bottom-20 w-[6px] bg-gradient-to-b from-transparent via-blue-500 to-transparent rounded-full z-20"
                        style={{
                            animation: activeHero === 5 ? 'slideUp 1.4s ease-out forwards' : 'slideOutDown 1.4s ease-in forwards',
                            opacity: 0
                        }}
                    />

                    {/* Right side: Image Container */}
                    <div className="relative w-full md:w-1/2 h-[45%] md:h-full mt-4 md:pt-0 flex items-center justify-center p-4 md:p-12 pb-20 md:pb-10 overflow-hidden">
                        <div
                            onClick={() => router.push('/wire-harness')}
                            className="group relative z-10 w-full h-full md:h-[80%] rounded-2xl md:rounded-l-3xl overflow-hidden shadow-2xl shadow-blue-900/20 bg-slate-800 border-2 border-blue-900/50 group-hover:border-blue-400 transition-all duration-500 cursor-pointer"
                            style={{
                                animation: activeHero === 5 ? 'slideLeft 0.8s 0.6s ease-out both' : 'slideOutRight 0.8s ease-in both',
                                opacity: 0
                            }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110" style={{
                                    backgroundImage: "url('/home/Wires.png')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-blue-900/10 md:bg-blue-900/0 group-hover:bg-blue-900/40 transition-all duration-500 flex items-center justify-center">
                                <div
                                    className="px-6 py-2 bg-white text-blue-900 font-black rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 shadow-2xl flex items-center gap-2 hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 group/btn"
                                    style={{
                                        fontFamily: '"Archivo Black", sans-serif'
                                    }}
                                >
                                    LEARN MORE
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={3} />
                                </div>
                            </div>
                            <div className="absolute inset-0 rounded-2xl md:rounded-l-3xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* CAROUSEL CONTROLS (NAVIGATION DOTS) */}
                <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center gap-3">
                    {heroSlides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveHero(idx)}
                            className={`transition-all duration-500 rounded-full ${activeHero === idx ? 'w-12 h-3 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'w-3 h-3 bg-white/50 hover:bg-white'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* LEFT ARROW */}
                <button
                    onClick={() => setActiveHero(p => (p - 1 + heroSlides.length) % heroSlides.length)}
                    className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-blue-600 active:bg-blue-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-0" aria-label="Previous slide"
                >
                    <ChevronLeft size={28} strokeWidth={2.5} />
                </button>

                {/* RIGHT ARROW */}
                <button
                    onClick={() => setActiveHero(p => (p + 1) % heroSlides.length)}
                    className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-blue-600 active:bg-blue-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-0" aria-label="Next slide"
                >
                    <ChevronRight size={28} strokeWidth={2.5} />
                </button>

            </section>

            {/* SECTION 2: COMPANY INTRODUCTION & VALUES */}
            <section className="py-20 md:py-30bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 data-aos="fade-down" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-gray-900 px-4" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
                            WE'RE <span className="text-blue-600">TRUSTED</span>
                        </h2>
                        <p data-aos="fade-up" data-aos-delay="150" className="text-md text-gray-600 leading-relaxed" style={{ fontFamily: '"Poppins", sans-serif' }}>
                            Octagon Precision Mold (M) SDN.BHD. is focused on precision manufacturing, headquartered in Malaysia,
                            with production facilities in Malaysia. We specialize in auto degating solutions, custom wire harnesses,
                            mold parts, and in-mold cutting equipment, providing efficient and reliable manufacturing solutions
                            for global customers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: 'QUALITY',
                                text: 'Strict quality control and precision manufacturing with ±0.002mm tolerance.',
                                icon: Settings2
                            },
                            {
                                title: 'INTEGRITY',
                                text: 'Transparent processes and honest partnerships with 20,000+ global customers.',
                                icon: Handshake
                            },
                            {
                                title: 'SERVICE',
                                text: 'Dedicated support across 60+ countries with localized technical assistance.',
                                icon: Globe
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                data-aos={index === 0 ? 'fade-right' : index === 2 ? 'fade-left' : 'fade-up'}
                                data-aos-delay={index * 120}
                                className="group p-8 bg-gradient-to-br from-blue-50 to-slate-50 rounded-3xl hover:shadow-2xl transition-all duration-500 border-4 border-transparent hover:border-blue-400"
                            >
                                <div className="mb-4 group-hover:scale-125 transition-transform duration-300 flex justify-center text-blue-600">
                                    <item.icon size={64} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-3xl font-black mb-4 text-center text-blue-600 group-hover:text-blue-700 transition-colors" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-center" style={{ fontFamily: '"Poppins", sans-serif' }}>
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: FEATURED PRODUCTS GRID */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span data-aos="fade-down" className="text-blue-600 font-semibold text-sm tracking-widest uppercase">Our Expertise</span>
                        <h2 data-aos="fade-up" data-aos-delay="100" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-2 mb-4 text-gray-900 px-4" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
                            FEATURED <span className="text-blue-600">PRODUCTS</span>
                        </h2>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-gray-500 max-w-2xl mx-auto"
                            style={{ fontFamily: '"Poppins", sans-serif' }}
                        >
                            Explore our comprehensive portfolio of high-precision components and advanced automation systems, tailored to meet the rigorous demands of global industries.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                onClick={() => router.push(product.link)}
                                onMouseEnter={() => setActiveProduct(index)}
                                className="group relative cursor-pointer"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div
                                    className="absolute inset-0 rounded-3xl transform transition-all duration-500 group-hover:scale-105"
                                    style={{
                                        background: `linear-gradient(135deg, ${product.color}20, ${product.color}40)`,
                                        border: `4px solid ${product.color}`
                                    }}
                                />
                                <div className="relative h-full p-8 bg-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                                    <div className="mb-4 group-hover:scale-110 transition-all duration-300 flex text-slate-800" style={{ color: product.color }}>
                                        <product.icon size={48} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-black mb-3 group-hover:text-blue-600 transition-colors" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
                                        {product.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4" style={{ fontFamily: '"Poppins", sans-serif' }}>
                                        {product.description}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                                        LEARN MORE
                                        <ArrowRight className="w-5 h-5" strokeWidth={3} />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4: INDUSTRIAL STATISTICS BAR */}
            <section className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
                    }} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center transform hover:scale-110 transition-transform duration-300"
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                            >
                                <div className="mb-2 flex justify-center text-blue-100">
                                    <stat.icon size={48} strokeWidth={1} />
                                </div>
                                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
                                    {stat.value}
                                </div>
                                <div className="text-[10px] sm:text-xs md:text-sm text-blue-100 tracking-widest uppercase font-bold">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5: CORPORATE ADVANTAGES */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span data-aos="fade-down" className="text-blue-600 font-semibold text-sm tracking-widest uppercase">Why Choose Us</span>
                        <h2 data-aos="fade-up" data-aos-delay="100" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-2 mb-4 text-gray-900 px-4" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
                            COMPANY <span className="text-blue-600">ADVANTAGES</span>
                        </h2>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-gray-500 max-w-2xl mx-auto"
                            style={{ fontFamily: '"Poppins", sans-serif' }}
                        >
                            Leveraging over 20 years of brand focus, we provide strategic manufacturing services that empower businesses across 60+ countries with precision and reliability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {advantages.map((advantage, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl hover:shadow-2xl transition-all duration-500 border-4 border-transparent hover:border-blue-400"
                                data-aos="fade-up"
                                data-aos-delay={index * 120}
                            >
                                <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex text-blue-600">
                                    <advantage.icon size={56} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-black mb-3 text-gray-900 group-hover:text-blue-600 transition-colors" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
                                    {advantage.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: '"Poppins", sans-serif' }}>
                                    {advantage.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6: GLOBAL INDUSTRY APPLICATIONS */}
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span data-aos="fade-down" className="text-blue-600 font-semibold text-sm tracking-widest uppercase">Diverse Solutions</span>
                        <h2 data-aos="fade-up" data-aos-delay="100" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-2 mb-4 text-gray-900 px-4" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
                            INDUSTRY <span className="text-blue-600">APPLICATIONS</span>
                        </h2>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-3 lg:gap-3 max-w-[260px] sm:max-w-[540px] lg:max-w-5xl mx-auto">
                        {industries.map((industry, index) => (
                            <div
                                key={index}
                                    onClick={() => router.push('/mold-components')}
                                className="group relative aspect-[4/3] w-full mx-auto rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] border-2 border-blue-300 hover:border-blue-600"
                                data-aos="zoom-in"
                                data-aos-delay={index * 50}
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url(${industry.image})`,
                                    }}
                                />

                                {/* Overlay Fade Effect */}
                                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-blue-900/40 transition-colors duration-500" />

                                {/* Content Overlay (Reveals on hover) */}
                                <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-0 bg-black/40" />

                                    <h3
                                        className="relative z-10 text-lg sm:text-xl font-black text-white drop-shadow-2xl"
                                        style={{ fontFamily: '"Archivo Black", sans-serif' }}
                                    >
                                        {industry.name}
                                    </h3>

                                    <div className="relative z-10 mt-1 w-10 h-1 bg-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 7: HONORARY CERTIFICATES (3D COVERFLOW) */}
            < section className="py-20 overflow-hidden"
                style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)' }}>

                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <span data-aos="fade-down" className="text-blue-600 font-semibold text-sm tracking-widest uppercase">
                            Certified & Trusted
                        </span>
                        <h2
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-2 mb-4 text-gray-900 px-4"
                            style={{ fontFamily: '"Archivo Black", sans-serif' }}
                        >
                            HONORARY <span className="text-blue-600">CERTIFICATE</span>
                        </h2>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-gray-500 max-w-xl mx-auto"
                            style={{ fontFamily: '"Poppins", sans-serif' }}
                        >
                            Our quality management systems and products are internationally certified, reflecting our commitment to global standards.
                        </p>
                    </div>

                    {/* Coverflow */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="150"
                        className="relative z-10 h-[340px] sm:h-[420px] md:h-[600px] flex items-center justify-center w-full max-w-[900px] mx-auto"
                        style={{ perspective: '1200px' }}>

                        {/* left and right arrows */}
                        <button
                            onClick={() => setActiveCert(p => (p - 1 + certificates.length) % certificates.length)}
                            className="hidden sm:flex absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-50 w-10 h-16 rounded-2xl items-center justify-center shadow-xl"
                            style={{ background: 'linear-gradient(135deg, #1d4ed8, #a4c5faff)', color: '#fff', border: 'none' }}
                        >
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>

                        <button
                            onClick={() => setActiveCert(p => (p + 1) % certificates.length)}
                            className="hidden sm:flex absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 w-10 h-16 rounded-2xl items-center justify-center shadow-xl"
                            style={{ background: 'linear-gradient(135deg, #1d4ed8, #a4c5faff)', color: '#fff', border: 'none' }}
                        >
                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>

                        {/* Cards */}
                        <div
                            className="relative w-full h-full flex items-center justify-center"
                            style={{ transformStyle: 'preserve-3d' }}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            {certificates.map((src, i) => {
                                let offset = i - activeCert
                                if (offset > certificates.length / 2) offset -= certificates.length
                                if (offset < -certificates.length / 2) offset += certificates.length
                                const abs = Math.abs(offset)

                                if (abs > 3) return null
                                const isMobile =
                                    typeof window !== "undefined" && window.innerWidth < 640

                                const transition = isMobile
                                    ? "transform 0.4s ease-out" // one-card-at-a-time swipe
                                    : "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)" // desktop coverflow

                                const translateX = offset * (isMobile ? 60 : 90)
                                const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : abs === 2 ? 0.6 : 0.4
                                const rotateY =
                                    abs === 0
                                        ? 0
                                        : offset > 0
                                            ? (isMobile ? -25 : -45)
                                            : (isMobile ? 25 : 45)
                                const translateZ =
                                    abs === 0 ? 0 : abs === 1 ? -150 : abs === 2 ? -300 : -450
                                const opacity = abs === 0 ? 1 : abs === 1 ? 0.8 : abs === 2 ? 0.4 : 0
                                const zIndex = 10 - abs
                                const shadow =
                                    abs === 0
                                        ? "0 30px 60px rgba(0,0,0,0.25)"
                                        : "0 10px 30px rgba(0,0,0,0.15)"

                                return (
                                    <div
                                        key={i}
                                        onClick={() => setActiveCert(i)}
                                        className="absolute cursor-pointer"
                                        style={{
                                            width: "clamp(220px, 60vw, 320px)",
                                            position: "absolute",
                                            left: "50%",
                                            transform: `translateX(calc(-50% + ${translateX}px)) scale(${scale}) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                                            opacity,
                                            zIndex,
                                            transition,
                                            transformStyle: "preserve-3d",
                                            pointerEvents: abs > 2 ? "none" : "auto",
                                        }}
                                    >
                                        <img
                                            src={src}
                                            alt={`Certificate ${i + 1}`}
                                            className="w-full rounded-xl block"
                                            style={{ boxShadow: shadow }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>


                    {/* Dots */}
                    <div className="relativ z-12 flex justify-center items-center flex-wrap gap-3 mt-16">
                        {certificates.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveCert(i)}
                                className="h-2.5 rounded-full border-none cursor-pointer transition-all duration-300"
                                style={{
                                    width: activeCert === i ? '24px' : '10px',
                                    background: activeCert === i ? '#2563eb' : '#cbd5e1',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 8: FINAL CALL TO ACTION (CTA) */}
            < section className="py-30 bg-white" >
                <div className="container mx-auto px-6 md:px-10">
                    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-3xl relative overflow-hidden py-16 sm:py-24">
                        <div className="absolute inset-0">
                        </div>

                        <div className="relative z-10 text-center px-4">
                            <h2
                                className="text-[2rem] sm:text-4xl md:text-5xl font-black text-white mb-4 leading-[1.1]"
                                data-aos="fade-up"
                                style={{
                                    fontFamily: '"Archivo Black", sans-serif'
                                }}
                            >
                                READY TO SHAPE<br />WITH US?
                            </h2>
                            <p
                                className="text-sm sm:text-base text-blue-100 mb-10 font-bold max-w-xl mx-auto italic"
                                data-aos="fade-up"
                                data-aos-delay="200"
                                style={{ fontFamily: '"Poppins", sans-serif' }}
                            >
                                "Precision from concept to creation. Partner with Octagon to bring your ideas to life."
                            </p>
                            <div
                                className="flex gap-4 justify-center flex-wrap"
                                data-aos="fade-up"
                                data-aos-delay="400"
                            >
                                <button
                                    onClick={() => router.push('/contact')}
                                    className="px-8 py-4 bg-white text-blue-600 font-black text-lg rounded-full hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                                    style={{ fontFamily: '"Archivo Black", sans-serif' }}
                                >
                                    CONTACT US <Mail size={20} strokeWidth={2.5} />
                                </button>
                                <button
                                    onClick={() => router.push('/wire-harness')}
                                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-black text-lg rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                                    style={{ fontFamily: '"Archivo Black", sans-serif' }}
                                >
                                    LEARN MORE <BookOpen size={20} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* --- LOCAL COMPONENT STYLES (ANIMATIONS) --- */}
            < style jsx > {`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-40px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes imageReveal {
                    from { opacity: 0; transform: scale(0.95) translateY(20px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes slideOutUp {
                    from { opacity: 1; transform: translateY(0); }
                    to   { opacity: 0; transform: translateY(-40px); }
                }
                @keyframes slideOutDown {
                    from { opacity: 1; transform: translateY(0); }
                    to   { opacity: 0; transform: translateY(40px); }
                }
                @keyframes slideLeft {
                    from { opacity: 0; transform: translateX(60px); pointer-events: none; }
                    99%  { pointer-events: none; }
                    to   { opacity: 1; transform: translateX(0); pointer-events: auto; }
                }
                @keyframes slideOutRight {
                    from { opacity: 1; transform: translateX(0); pointer-events: none; }
                    to   { opacity: 0; transform: translateX(60px); pointer-events: none; }
                }
                @keyframes bgZoomFade {
                    from { opacity: 0; transform: scale(1.1); }
                    to   { opacity: 1; transform: scale(1); }
                }
            `}</style >
        </div >

    )
}