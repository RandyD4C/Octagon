// src/components/common/PageFooter.js
import Link from "next/link"
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"
import styles from "../../styles/PageFooter.module.css"

const footerLinks = [
    { label: "Auto Degating Plastic Injection Mold", href: "/auto-degating-plastic-injection-mold" },
    { label: "Wire Harness", href: "/wire-harness" },
    { label: "Plastic Injection Spare Parts", href: "/plastic-injection-spare-parts" },
    { label: "Mold Components", href: "/mold-components" },
    { label: "Contact Us", href: "/contact" },
]

export default function Footer({ siteConfig }) {
    const year = new Date().getFullYear()
    const name = siteConfig?.company_name ?? "Your Company"

    return (
        <footer className={`${styles.footer} mt-8`}>
            <div className={styles.container}>
                {/* Closing statement */}
                <div className={styles.statementRow}>
                    <p className={styles.statement}>
                        Precision tooling, engineered to{" "}
                        <span className={styles.statementAccent}>±0.002&nbsp;mm</span>.
                    </p>
                    <Link href="/contact" className={styles.statementCta}>
                        Start a project
                        <ArrowUpRight size={18} className={styles.ctaIcon} aria-hidden="true" />
                    </Link>
                </div>

                {/* Meta band */}
                <div className={styles.metaBand}>
                    <div className={styles.brandCol}>
                        <span className={styles.brandName}>
                            OCTAGON<span className={styles.brandDot}>.</span>
                        </span>
                        <p className={styles.brandLine}>
                            Precision molds, auto degating, wire harnesses and automation —
                            machined in Penang, delivered worldwide.
                        </p>
                    </div>

                    <nav className={styles.metaCol} aria-label="Footer navigation">
                        <span className={styles.colLabel}>Solutions</span>
                        {footerLinks.map((link) => (
                            <Link key={link.label} href={link.href} className={styles.navLink}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className={styles.metaCol}>
                        <span className={styles.colLabel}>Contact</span>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=No+2,+Lebuh+Mayang+Pasir,+Bayan+Baru+11950,+Pulau+Pinang,+MALAYSIA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.contactLink} ${styles.addressLink}`}
                        >
                            <MapPin size={15} className={styles.contactIcon} aria-hidden="true" />
                            <span>
                                No 2, Lebuh Mayang Pasir, <br />
                                Bayan Baru 11950, Pulau Pinang, Malaysia
                            </span>
                        </a>
                        <a href="mailto:sales@octagon-mold.com" className={styles.contactLink}>
                            <Mail size={15} className={styles.contactIcon} aria-hidden="true" />
                            <span>sales@octagon-mold.com</span>
                        </a>
                        <a href="tel:+60164205848" className={styles.contactLink}>
                            <Phone size={15} className={styles.contactIcon} aria-hidden="true" />
                            <span>+60 16-420 5848</span>
                        </a>
                    </div>
                </div>

                {/* Bottom rule */}
                <div className={styles.bottomBar}>
                    <span className={styles.copyright}>
                        © {year} {name}. All rights reserved.
                    </span>
                    <span className={styles.metaMono}>
                        Penang · Malaysia · GMT+8 · Mon–Fri 08:30–17:30
                    </span>
                </div>
            </div>
        </footer>
    )
}
