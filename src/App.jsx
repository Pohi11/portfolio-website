import React, { useEffect } from "react";
import styles from "./App.module.css";
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";
import { ScrollNav } from "./components/ScrollNav/ScrollNav";

function App() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    const footer = document.querySelector("footer");
    
    sections.forEach((section) => observer.observe(section));
    if (footer) observer.observe(footer);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      if (footer) observer.unobserve(footer);
    };
  }, []);

  return (
    <div className={styles.App}>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <ScrollNav />
    </div>
  );
}

export default App;
