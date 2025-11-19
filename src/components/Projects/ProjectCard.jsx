import React from "react";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source, id },
}) => {
  const isDemoDisabled = id === 1;
  const isSourceDisabled = [1, 3, 4, 7].includes(id);

  let demoHref = demo;
  let demoProps = {};

  if (id === 3) {
    demoHref = "/splunkPractice.pdf";
    demoProps = { target: "_blank", rel: "noopener noreferrer" };
  }

  const handleLinkClick = (e, disabled) => {
    if (disabled) {
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
        </div>
      </div>
    </div>
  );
};
