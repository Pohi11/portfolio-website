import React from "react";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, video, source, id },
}) => {
  const isDemoDisabled = [1, 4].includes(id);
  const isSourceDisabled = [1, 3, 4, 7].includes(id);
  const isProductShotAI = id === 8;

  let demoHref = demo;
  let demoProps = {};

  if (id === 3) {
    demoHref = "/splunkPractice.pdf";
    demoProps = { target: "_blank", rel: "noopener noreferrer" };
  }

  if (id === 7 || id === 9) {
    demoProps = { target: "_blank", rel: "noopener noreferrer" };
  }

  if (isProductShotAI) {
    demoProps = { target: "_blank", rel: "noopener noreferrer" };
  }

  const handleLinkClick = (e, disabled) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  const handleVideoClick = (e) => {
    if (!video || video === "#") {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <img
        src={getImageUrl(imageSrc)}
        alt={`Image of ${title}`}
        className={styles.image}
      />
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <ul className={styles.skills}>
          {skills.map((skill, index) => {
            return (
              <li key={index} className={styles.skill}>
                {skill}
              </li>
            );
          })}
        </ul>
        <div className={styles.links}>
          {isProductShotAI ? (
            <>
              <a
                href={demoHref}
                className={`${styles.link} ${styles.buttonStyle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
              <a
                href={video || "#"}
                className={`${styles.link} ${styles.buttonStyle} ${
                  !video || video === "#" ? styles.linkDisabled : ""
                }`}
                onClick={handleVideoClick}
                target={video && video !== "#" ? "_blank" : undefined}
                rel={video && video !== "#" ? "noopener noreferrer" : undefined}
              >
                Video Demo
              </a>
              <a
                href={source}
                className={`${styles.link} ${styles.buttonStyle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </a>
            </>
          ) : (
            <>
              <a
                href={isDemoDisabled ? undefined : demoHref}
                className={`${styles.link} ${styles.buttonStyle} ${
                  isDemoDisabled ? styles.linkDisabled : ""
                }`}
                onClick={(e) => handleLinkClick(e, isDemoDisabled)}
                {...demoProps}
              >
                Demo
              </a>
              <a
                href={isSourceDisabled ? undefined : source}
                className={`${styles.link} ${styles.buttonStyle} ${
                  isSourceDisabled ? styles.linkDisabled : ""
                }`}
                onClick={(e) => handleLinkClick(e, isSourceDisabled)}
              >
                Source
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
