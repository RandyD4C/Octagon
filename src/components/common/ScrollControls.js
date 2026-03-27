// src/components/common/ScrollControls.js
import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import styles from '../../styles/ScrollControls.module.css'

export default function ScrollControls() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <div className={`${styles.container} ${isVisible ? styles.visible : styles.hidden}`}>
            <button
                onClick={scrollToTop}
                className={styles.button}
                aria-label="Scroll to top"
            >
                <ChevronUp size={24} />
            </button>
        </div>
    )
}
