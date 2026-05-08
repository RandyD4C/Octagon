import Head from "next/head"
import { useState, useEffect, useRef } from "react"
import siteConfig from "../config/siteConfig"
import PageHeader from "../components/common/PageHeader"
import Title from "../components/common/Title"
import Animate from "../components/common/AboutScrollAnim"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"


const CLIENT_LOGOS = [
    "/about/knights-engineering-logo.webp",
    "/about/q-plas-logo.webp",
    "/about/class-A-logo.webp",
    "/about/exceptional-mould-logo.webp",
    "/about/hp-logo.webp",
    "/about/meHow-logo.webp",
    "/about/Nationgate-logo.webp",
    "/about/Modernria-logo.webp",
    "/about/Meiban-logo.webp",
    "/about/IMR-logo.webp",
    "/about/Junyu.webp",
    "/about/PDI.webp",
    "/about/silitech logo.webp"
];

const Counter = ({ target, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [isVisible, target, duration]);

    return (
        <span ref={counterRef}>
            {count}{suffix}
        </span>
    );
};


export default function About() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [slideDirection, setSlideDirection] = useState('right');
    const [selectedBranch, setSelectedBranch] = useState(null);
    const mapRef = useRef(null);


    const offices = [
        { id: 'China', name: 'China Head Office', x: '60%', y: '9%', color: '#FF1E1E', address: "Room 205, Building 15, No. 142 Jinghai West Road, Chang'an Town, Dongguan City, Guangdong Province", mapLink: "https://www.google.com/maps/search/No.+142+Jinghai+West+Road,+Chang'an+Town,+Dongguan+City,+Guangdong+Province" },
        { id: 'Taiwan', name: 'Taiwan Head Office', x: '77.5%', y: '12%', color: '#FFBD76', address: 'No.5F, No.31, Ln. 71, Zhengguang 2nd St. Taoyuan Dist. Taoyuan City', mapLink: 'https://www.google.com/maps/search/No.5F,+No.31,+Ln.+71,+Zhengguang+2nd+St.+Taoyuan+Dist.+Taoyuan+City' },
        { id: 'Indonesia', name: 'Indonesia Branch', x: '42.5%', y: '93%', color: '#EEE45A', address: 'No.B27 Ruko CosmoJi, Tangkuban Perahu. Elysium, Lippo Cikarang', mapLink: 'https://www.google.com/maps/search/No.B27+Ruko+CosmoJi,+Tangkuban+Perahu.+Elysium,+Lippo+Cikarang' },
        { id: 'Malaysia', name: 'Malaysia Branch', x: '10%', y: '60%', color: '#27c93a', address: "No.70-3-26, D\u2019PIAZZA MALL, JALAN MAHSURI, 11900, BAYAN LEPAS, PENANG, MALAYSIA", mapLink: 'https://www.google.com/maps/search/?api=1&query=5.326618,100.283582' },
        { id: 'Singapore', name: 'Singapore Branch', x: '18.75%', y: '70%', color: '#B0BDFF', address: 'No.68 Circular Road #02-01. Singapore 049422', mapLink: 'https://www.google.com/maps/search/No.68+Circular+Road+%2302-01.+Singapore+049422' },
    ];

    useEffect(() => {
        if (isHovered || !isAutoPlaying) return; // Pause on hover or after user interaction

        const timer = setInterval(() => {
            nextImage(true);
        }, 4000); // Rotate every 4 seconds
        return () => clearInterval(timer);
    }, [currentIndex, isHovered, isAutoPlaying]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (mapRef.current && !mapRef.current.contains(event.target)) {
                setSelectedBranch(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const nextImage = (fromAuto = false) => {
        if (fromAuto !== true) setIsAutoPlaying(false);
        setSlideDirection('right');
        setCurrentIndex((prev) => (prev + 1) % CLIENT_LOGOS.length);
    };

    const prevImage = () => {
        setIsAutoPlaying(false);
        setSlideDirection('left');
        setCurrentIndex((prev) => (prev - 1 + CLIENT_LOGOS.length) % CLIENT_LOGOS.length);
    };

    const getVisibleLogos = (count) => {
        // Return 'count' logos starting from currentIndex, wrapping around if needed
        return Array.from({ length: count }).map((_, i) => {
            const index = (currentIndex + i) % CLIENT_LOGOS.length;
            return CLIENT_LOGOS[index];
        });
    };

    return (
        <Animate>
            <div className="w-full flex flex-col justify-center items-center flex-1">
                <Head>
                    <title>About Octagon Precision Mold | Precision Manufacturing Company in Malaysia</title>
                    <meta
                        name="description"
                        content="Learn more about Octagon Precision Mold, a Malaysia-based precision manufacturing company supporting global customers with mold-related equipment, custom parts, and industrial solutions."
                        key="description"
                    />
                </Head>
                <PageHeader title="About Us" />
                <div className="relative flex h-[400px] md:h-[500px] lg:h-[650px] w-full overflow-hidden">
                    {/* Background Image Layer */}
                    <div className="absolute inset-0 bg-[url('/about/about-us.webp')] bg-cover bg-center">
                        <div className="absolute inset-0 bg-black/60"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-[#154A9A]/40 to-transparent"></div>
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 flex flex-col justify-center items-center text-center w-full h-full p-4 sm:p-12 md:p-20 lg:p-32">
                        <div
                            className="max-w-4xl space-y-6 sm:space-y-8"
                            data-aos="zoom-out"
                            data-aos-duration="1000"
                            data-aos-once="true"
                        >
                            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight uppercase tracking-tighter">
                                Precision <span className="text-[#96B2DC]">Perfected</span>
                            </h1>
                            <div
                                className="w-24 sm:w-48 h-1.5 bg-[#96B2DC] mx-auto rounded-full"
                                data-aos="stretch-x"
                                data-aos-delay="800"
                                data-aos-duration="800"
                                data-aos-once="true"
                            ></div>
                            <div
                                className="space-y-4 sm:space-y-6 max-w-3xl mx-auto"
                                data-aos="fade-up"
                                data-aos-delay="500"
                                data-aos-duration="1000"
                                data-aos-once="true"
                            >
                                {siteConfig.about.paragraphs.map((para, idx) => (
                                    <p
                                        key={idx}
                                        className={`text-sm sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed ${idx > 0 ? 'hidden md:block' : ''}`}
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <Title title="About Our Company" />
                <div className="w-full bg-[#154A9A]/10 py-12 px-[clamp(20px,5vw,80px)] lg:px-[150px] relative overflow-hidden">

                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">

                        {/* Box 1: Company Profile */}
                        <div data-aos="fade-up" data-aos-duration="800"
                            className="bg-white/70 backdrop-blur-xl border border-[#154A9A]/20 rounded-2xl p-8 transition-all duration-700 group flex flex-col items-center">
                            <div className="w-20 h-1 bg-gradient-to-r from-[#154A9A] to-blue-400 rounded-full mb-10 opacity-40 group-hover:opacity-100 transition-opacity"></div>

                            <div className="mb-10 p-10 bg-gradient-to-tr from-slate-50 to-white rounded-2xl shadow-inner border border-slate-100 transition-transform duration-700">
                                <img src="/about/logo.webp" alt="Logo"
                                    className="w-auto h-[clamp(80px,8vw,120px)] object-contain drop-shadow-sm" />
                            </div>

                            <div className="text-center space-y-4">
                                <h2 className="text-[clamp(18px,1.5vw,22px)] md:text-[24px] lg:text-[28px] font-bold text-[#4877BE] uppercase tracking-tight leading-tight">
                                    Company Name
                                </h2>
                                <p className="text-[clamp(16px,1.2vw,18px)] md:text-[20px] lg:text-[22px] text-[#4877BE] font-semibold leading-tight">
                                    Octagon Precision Mold<br />
                                    <span className="text-slate-500 font-medium">(M) Sdn. Bhd.</span>
                                </p>
                            </div>
                        </div>

                        {/* Box 2: Vital Statistics */}
                        <div className="flex flex-col gap-8">
                            {/* Established Tile */}
                            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200"
                                className="bg-white/70 backdrop-blur-xl border border-[#154A9A]/20 rounded-2xl p-8 transition-all duration-700 group flex flex-col justify-center items-center flex-1">
                                <h2 className="text-[#4877BE] text-[clamp(18px,1.5vw,22px)] md:text-[24px] lg:text-[28px] font-bold uppercase tracking-[0.1em] mb-3">Established</h2>
                                <span className="text-[clamp(40px,5vw,60px)] font-black text-[#4877BE] transition-all duration-500">
                                    <Counter target={2020} />
                                </span>
                            </div>

                            {/* Workforce Tile */}
                            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="300"
                                className="bg-[#154A9A] border border-[#154A9A]/30 rounded-2xl p-8 transition-all duration-500 group flex flex-col justify-center items-center flex-1 relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <h2 className="text-white/60 text-[clamp(18px,1.5vw,22px)] md:text-[24px] lg:text-[28px] font-bold uppercase tracking-[0.1em] mb-3 z-10">Employees</h2>
                                <div className="text-center z-10">
                                    <span className="text-[clamp(40px,5vw,60px)] font-black text-white leading-none">
                                        <Counter target={200} suffix="+" />
                                    </span>
                                    <p className="text-white/90 font-bold text-[clamp(16px,1.2vw,18px)] md:text-[20px] lg:text-[22px] tracking-widest mt-1 uppercase">Employees</p>
                                    <p className="text-[clamp(10px,0.8vw,12px)] md:text-[14px] lg:text-[16px] text-white/50 mt-3 italic font-medium px-4 border-t border-white/10 pt-3">(including 1 outside Company Director)</p>
                                </div>
                            </div>
                        </div>

                        {/* Box 3: Core Excellence (Business Type) */}
                        <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400"
                            className="bg-white/70 backdrop-blur-xl border border-[#154A9A]/20 rounded-2xl transition-all duration-700 group flex flex-col overflow-hidden">
                            <div className="bg-[#154A9A] text-white p-3 text-center">
                                <p className="text-[clamp(16px,1.2vw,18px)] md:text-[24px] lg:text-[28px] font-bold uppercase tracking-tight">Business Type</p>
                            </div>
                            <div className="bg-[#4877BE] text-white p-2 text-center mb-4">
                                <p className="text-[clamp(14px,1vw,16px)] md:text-[20px] lg:text-[24px] font-bold uppercase tracking-widest">Sales</p>
                            </div>

                            <div className="p-8 pt-0 flex-1 space-y-4">
                                {[
                                    "Automation Solution System Within The Mold",
                                    "Air/hydraulic booster equipment",
                                    "Precision metal mold processing and production",
                                    "Die casting mold non-standard parts processing",
                                    "Plastic mold non-standard parts processing"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-sm bg-[#154A9A] rotate-45 shrink-0"></div>
                                        <p className="text-[clamp(12px,1.2vw,14px)] md:text-[16px] lg:text-[20px] font-bold text-slate-600 leading-tight text-left">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>


                <Title title="Our Office World Network" />

                <div className="flex flex-col items-center w-full py-8 overflow-x-hidden">
                    <div ref={mapRef} className="relative max-w-[320px] md:max-w-[500px] lg:max-w-[600px] w-full px-4 overflow-visible rounded-xl shadow-lg bg-white">
                        <svg viewBox="0 0 800 1000" className="w-full h-auto">
                            <image href="/about/image.webp" x="0" y="0" width="800" height="1000" />

                            {/* Glowing Definition */}
                            <defs>
                                <filter id="marker-glow">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {offices.map((office) => {
                                const cx = parseInt(office.x.replace('%', '')) * 8;
                                const cy = parseInt(office.y.replace('%', '')) * 10;
                                const isMalaysia = office.id === 'Malaysia';

                                return (
                                    <g key={office.id}>
                                        {isMalaysia && (
                                            <circle
                                                cx={cx}
                                                cy={cy}
                                                r="15"
                                                fill={office.color}
                                                className="animate-marker-pulse opacity-60"
                                            />
                                        )}
                                        <circle
                                            cx={cx}
                                            cy={cy}
                                            r="15"
                                            fill={office.color}
                                            stroke="white"
                                            strokeWidth="2"
                                            className="md:cursor-pointer transition-opacity duration-300 md:pointer-events-auto pointer-events-none"
                                            filter={selectedBranch === office.id ? 'url(#marker-glow)' : ''}
                                            onClick={() => setSelectedBranch(selectedBranch === office.id ? null : office.id)}
                                        />
                                    </g>
                                );
                            })}
                        </svg>

                        <style jsx>{`
                            @keyframes marker-pulse {
                                0% {
                                    transform: scale(1);
                                    opacity: 2.0;
                                }
                                100% {
                                    transform: scale(2.5);
                                    opacity: 0;
                                }
                            }
                            .animate-marker-pulse {
                                transform-origin: center;
                                transform-box: fill-box;
                                animation: marker-pulse 2s infinite ease-out;
                                pointer-events: none;
                            }
                        `}</style>

                        {/* DESKTOP ONLY: Interactive Tooltips */}
                        <div className="hidden md:block">
                            {offices.map((office) => {
                                const isSidePoint = office.id === 'Singapore' || office.id === 'Malaysia';
                                const isTopPoint = office.id === 'China' || office.id === 'Taiwan';
                                return (
                                    <div
                                        key={`tooltip-${office.id}`}
                                        className={`absolute z-30 transition-all duration-300 ${selectedBranch === office.id ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'}`}
                                        style={{
                                            left: office.x,
                                            top: office.y,
                                            transform: isSidePoint
                                                ? 'translate(20px, -50%)'
                                                : isTopPoint
                                                    ? 'translate(-50%, 20px)'
                                                    : 'translate(-50%, -115%)'
                                        }}
                                    >
                                        <div className="bg-white border border-[#154A9A]/20 rounded-2xl p-3 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] min-w-[220px] md:min-w-[280px] max-w-[260px] md:max-w-[300px] relative transition-all duration-500">
                                            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                                                <div className="p-1.5 md:p-2 rounded-lg" style={{ backgroundColor: `${office.color}20` }}>
                                                    <MapPin fill={office.color} style={{ color: office.color }} size={16} />
                                                </div>
                                                <h3 className="text-sm md:text-lg font-bold text-[#154A9A] leading-tight">{office.name}</h3>
                                            </div>
                                            <a
                                                href={office.mapLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium hover:text-blue-600 transition-colors cursor-pointer block mt-1"
                                            >
                                                {office.address}
                                            </a>

                                            {/* Tooltip Arrow */}
                                            {isSidePoint ? (
                                                <div
                                                    className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-black"
                                                ></div>
                                            ) : isTopPoint ? (
                                                <div
                                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[100%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"
                                                ></div>
                                            ) : (
                                                <div
                                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[100%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-black"
                                                ></div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* MOBILE ONLY: Static List of Branch Info */}
                    <div className="md:hidden w-full px-6 mt-12 space-y-6">
                        {offices.map((office) => (
                            <div
                                key={`list-${office.id}`}
                                className="bg-white/70 backdrop-blur-xl border border-[#154A9A]/20 rounded-2xl p-5 transition-all duration-500 border-l-4"
                                style={{ borderLeftColor: office.color }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${office.color}20` }}>
                                        <MapPin fill={office.color} style={{ color: office.color }} size={18} />
                                    </div>
                                    <h3 className="text-md font-bold text-[#154A9A]">{office.name}</h3>
                                </div>
                                <a
                                    href={office.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-600 leading-relaxed block hover:text-blue-600 transition-colors"
                                >
                                    {office.address}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>


                <Title title="Our Clients & Partners" />
                <div className="relative flex flex-col justify-center items-center w-full h-[200px] md:h-[300px] py-8 bg-[#154A9A] bg-opacity-10 overflow-hidden group">
                    <button
                        onClick={prevImage}
                        className="flex absolute left-2 md:left-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-md text-[#154A9A] transition-all"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="flex absolute right-2 md:right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-md text-[#154A9A] transition-all"
                        aria-label="Next"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Desktop View: Show 5 logos */}
                    <div className="hidden md:flex justify-center items-center w-full h-full relative px-8">
                        {CLIENT_LOGOS.map((logo, i) => {
                            let offset = i - currentIndex;
                            if (offset > Math.floor(CLIENT_LOGOS.length / 2)) offset -= CLIENT_LOGOS.length;
                            if (offset < -Math.floor(CLIENT_LOGOS.length / 2)) offset += CLIENT_LOGOS.length;

                            const absOffset = Math.abs(offset);
                            // Only render 5 logos at a time (-2 to 2)
                            if (absOffset > 2) return null;

                            // Calculate position and styles
                            const translateX = offset * 220; // Distance between logos
                            const isCenter = offset === 0;

                            return (
                                <img
                                    key={`desktop-logo-${i}`}
                                    src={logo}
                                    style={{
                                        transform: `translateX(${translateX}px) scale(${isCenter ? 1.1 : 0.95})`,
                                        zIndex: isCenter ? 10 : 5 - absOffset,
                                    }}
                                    className={`absolute w-[140px] md:w-[200px] h-[140px] md:h-[200px] object-contain bg-white rounded transition-[opacity,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isCenter ? "grayscale-0 opacity-100 shadow-xl border-2 border-blue-400" : "grayscale opacity-50 shadow-md"
                                        }`}
                                />
                            );
                        })}
                    </div>

                    {/* Mobile View: Scrollable logos */}
                    <div className="flex md:hidden justify-center items-center w-full h-full relative px-4 py-4 overflow-hidden">
                        {CLIENT_LOGOS.map((logo, i) => {
                            let offset = i - currentIndex;
                            // Ensure wrapping logic functions correctly for odd lengths
                            const halfLength = Math.floor(CLIENT_LOGOS.length / 2);
                            if (offset > halfLength) offset -= CLIENT_LOGOS.length;
                            if (offset < -halfLength) offset += CLIENT_LOGOS.length;

                            const absOffset = Math.abs(offset);
                            // Render 3 logos (-1 to 1) for mobile
                            if (absOffset > 1) return null;

                            const isCenter = offset === 0;

                            return (
                                <img
                                    key={`mobile-logo-${i}`}
                                    src={logo}
                                    style={{
                                        "--offset": offset,
                                        "--scale": isCenter ? 1.1 : 0.95,
                                        zIndex: isCenter ? 10 : 5 - absOffset,
                                    }}
                                    className={`absolute w-[90px] sm:w-[110px] h-[90px] sm:h-[110px] object-contain bg-white rounded transition-[opacity,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] translate-x-[calc(var(--offset)*110px)] sm:translate-x-[calc(var(--offset)*140px)] scale-[var(--scale)] ${isCenter ? "grayscale-0 opacity-100 shadow-xl border-2 border-blue-400" : "grayscale opacity-50 shadow-md"
                                        }`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </Animate >
    )
}
