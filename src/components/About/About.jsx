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
              <h3>Full-Stack AI Engineering</h3>
              <p className={styles.subtitle}>Building Production AI Systems</p>
              <ul className={styles.skillsList}>
                <li>End-to-end AI applications & scalable SaaS solutions</li>
                <li>Next.js, TypeScript, Python</li>
                <li>LLMs & RAG pipelines (ProductShotAI, Auto-Assist)</li>
              </ul>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>Cloud Architecture</h3>
              <p className={styles.subtitle}>AWS Certified Solutions Architect</p>
              <ul className={styles.skillsList}>
                <li>Secure, cloud-native infrastructure design</li>
                <li>Infrastructure as Code (Terraform)</li>
                <li>Auto-scaling microservices on ECS Fargate</li>
              </ul>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/uiIcon.png")} alt="UI icon" />
            <div className={styles.aboutItemText}>
              <h3>Cybersecurity & Compliance</h3>
              <p className={styles.subtitle}>CompTIA Security+ Certified</p>
              <ul className={styles.skillsList}>
                <li>Security standards for software development</li>
                <li>Mission-critical Government of Canada applications</li>
                <li>Identity management & secure CI/CD pipelines</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
