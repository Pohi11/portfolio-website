import React from "react";
import styles from "./About.module.css";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <div className={styles.aboutItemText}>
              <h3>Certifications</h3>
              <ul className={styles.skillsList}>
                <li>AWS Solutions Architect Associate</li>
                <li>CompTIA Security+</li>
                <li>Google Cybersecurity Professional & ISC2 CC</li>
              </ul>
            </div>
          </li>

          <li className={styles.aboutItem}>
            <div className={styles.aboutItemText}>
              <h3>Prior Experience</h3>
              <ul className={styles.skillsList}>
                <li><strong>CGI:</strong> Developing secure full-stack solutions & integrating AWS cloud services</li>
                <li><strong>Royal Canadian Mint:</strong> Data automation & Engineering</li>
                <li><strong>LeagueKingdom:</strong> Founded profitable e-commerce platform</li>
              </ul>
            </div>
          </li>
          
          <li className={styles.aboutItem}>
            <div className={styles.aboutItemText}>
              <h3>Personal Life</h3>
              <ul className={styles.skillsList}>
                <li><strong>Top 500 North America</strong> in League of Legends</li>
                <li>Training Muay Thai since 2022</li>
                <li>Driven by a passion for problem-solving and challenging myself</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
