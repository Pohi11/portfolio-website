import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Jonathan</h1>
        <p className={styles.description}>
          I am a fourth year computer science student at Carleton University. I'm interested in Artificial Intelligence, Cybersecurity, Automation, and Cloud
          Architecture. Keep reading to learn more!
        </p>
        <div className={styles.buttonContainer}>
          <a href="#contact" className={styles.contactBtn}>
            Contact Me
          </a>
          <a href="/JonathanDorfman_Resume.pdf" download className={styles.resumeBtn}>
            Download Resume
          </a>
        </div>
      </div>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Photo"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
