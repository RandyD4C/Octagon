"use client";

import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

export default function Animate({ children }) {
    useEffect(() => {
        AOS.init({
            duration: 400,
            easing: 'ease',
            delay: 100,
            once: false,
            anchorPlacement: 'top-bottom',
        });
    }, []);
    return <>{children}</>;
}
