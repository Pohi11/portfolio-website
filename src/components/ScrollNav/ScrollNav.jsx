import React, { useEffect, useState } from "react";
import styles from "./ScrollNav.module.css";

export const ScrollNav = () => {
  // Set to true initially to be visible at the top
  const [isVisible, setIsVisible] = useState(true);

  // Optional: We can keep this if you want to hide it *only* on very specific conditions, 
  // but since the user said "keep visible even at the top", we can just remove the effect 
  // or keep it simple. Let's remove the scroll listener logic that hides it.

  const scrollToSection = (direction) => {
    const sections = document.querySelectorAll("section, footer");
    const offset = 100; 
    const currentScroll = window.scrollY + 10;
    
    let targetTop = 0;

    if (direction === "up") {
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionTop = sections[i].offsetTop - offset; 
        if (sectionTop < currentScroll - 100) { 
          targetTop = sectionTop;
          break;
        }
      }
    } else {
      for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop - offset;
        if (sectionTop > currentScroll + 50) { 
          targetTop = sectionTop;
          break;
        }
      }
      
      const lastSection = sections[sections.length - 1];
      if (currentScroll >= lastSection.offsetTop - offset) {
         // Already at bottom
      }
    }

    if (direction === "up" && window.scrollY < window.innerHeight) {
      targetTop = 0;
    }
    
    if (targetTop < 0) targetTop = 0;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  return (
    // Always use styles.visible class effectively
    <div className={`${styles.navContainer} ${isVisible ? styles.visible : ""}`}>
      <button
        className={styles.navBtn}
        onClick={() => scrollToSection("up")}
        aria-label="Scroll Up"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
      <div className={styles.divider} />
      <button
        className={styles.navBtn}
        onClick={() => scrollToSection("down")}
        aria-label="Scroll Down"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
    </div>
  );
};
