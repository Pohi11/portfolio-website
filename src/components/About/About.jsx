import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/aboutImage.png")}
          alt="About Image"
          className={`${styles.aboutImg}`}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Cursor icon" />
            <div className={styles.aboutItemText}>
              <h3>Life Long Student</h3>
              <p>
                As a fourth-year computer science student specializing in
                cybersecurity at Carleton University, I'm passionate about
                continuously learning and taking on new projects that challenge
                me to grow.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>Certified Cloud Enthusiast</h3>
              <p>
                I am currently working towards Microsoft's AZ-900 certification
                with hands-on experience deploying and securing applications on
                Azure virtual machines.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/uiIcon.png")} alt="UI icon" />
            <div className={styles.aboutItemText}>
              <h3>Verified Cybersecurity skills</h3>
              <p>
                I have demonstrated my ability by obtaining various
                certifications from CompTIA, ISC2, Google, and more.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
