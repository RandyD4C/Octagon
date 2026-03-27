// src/components/common/PageFooter.js
import Link from "next/link"
import { Mail, Phone, MapPin, Globe, ArrowUpRight } from "lucide-react"
import styles from "../../styles/PageFooter.module.css"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Contact Us", href: "/contact" },
]

const services = [
    { label: "Precision Molds", href: "/catalogue" },
    { label: "Booster Pumps", href: "/catalogue" },
    { label: "Wire Harnesses", href: "/catalogue" },
    { label: "Automation", href: "/catalogue" },
]

export default function Footer({ siteConfig }) {
    const year = new Date().getFullYear()
    const name = siteConfig?.company_name ?? "Your Company"

    return (
        <footer className={`${styles.footer} mt-8`} data-aos="fade-up" data-aos-duration="400">
            {/* Top accent line */}
            <div className={styles.accentLine} />

            <div className={styles.container}>
                <div className={styles.flexLayout}>
                    {/* Brand Section */}
                    <div className={styles.brandSection} data-aos="fade-up" data-aos-duration="800">
                        <span className={styles.brandName}>
                            OCTAGON<span className={styles.brandDot}>.</span>
                        </span>
                        <p className={styles.tagline}>
                            {siteConfig?.tagline ?? "Delivering quality solutions to clients worldwide."}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className={styles.navSection} data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                        <span className={styles.navTitle}>Quick Links</span>
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className={styles.navLink}>
                                {link.label}
                                <ArrowUpRight size={12} className={styles.linkIcon} />
                            </Link>
                        ))}
                    </div>

                    {/* Expertise */}
                    <div className={styles.navSection} data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                        <span className={styles.navTitle}>Our Expertise</span>
                        {services.map((service) => (
                            <Link key={service.label} href={service.href} className={styles.navLink}>
                                {service.label}
                                <ArrowUpRight size={12} className={styles.linkIcon} />
                            </Link>
                        ))}
                    </div>

                    {/* Contact Details */}
                    <div className={`${styles.navSection} ${styles.contactSection}`} data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
                        <span className={styles.navTitle}>Get in Touch</span>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=No+2,+Lebuh+Mayang+Pasir,+Bayan+Baru+11950,+Pulau+Pinang,+MALAYSIA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.contactLink} ${styles.addressLink}`}
                        >
                            <MapPin size={16} className="text-blue-500 shrink-0" />
                            <span className={styles.contactText}>
                                No 2, Lebuh Mayang Pasir, <br />
                                Bayan Baru 11950, Pulau Pinang<br />
                                MALAYSIA
                            </span>
                        </a>
                        <a href="mailto:sales@octagon-mold.com" className={styles.contactLink}>
                            <Mail size={16} className="text-blue-500 shrink-0" />
                            <span className={styles.contactText}>sales@octagon-mold.com</span>
                        </a>
                        <a href="tel:+60164205848" className={styles.contactLink}>
                            <Phone size={16} className="text-blue-500 shrink-0" />
                            <span className={styles.contactText}>+60 16-420 5848</span>
                        </a>
                        <div className={styles.officeHours}>
                            <span className={styles.hoursTitle}>Office Hours:</span>
                            <span className={styles.hoursText}>Mon - Fri: 8:30 AM - 5:30 PM</span>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className={styles.bottomBar}>
                    © {year} {name}. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
