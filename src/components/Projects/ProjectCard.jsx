import React from "react";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source, id },
}) => {
  return (
    <div className={styles.container}>
      <img
        src={getImageUrl(imageSrc)}
        alt={`Image of ${title}`}
        className={styles.image}
      />
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
        {id === 1 && ( // Gray out both demo and source for the first project
          <>
            <a
              href={demo}
              className={`${styles.link} ${styles.buttonStyle} ${styles.linkDisabled}`}
            >
              Demo
            </a>
            <a
              href={source}
              className={`${styles.link} ${styles.buttonStyle} ${styles.linkDisabled}`}
            >
              Source
            </a>
          </>
        )}
        {id === 2 && ( // Show both demo and source for the second project
          <>
            <a href={demo} className={`${styles.link} ${styles.buttonStyle}`}>
              Demo
            </a>
            <a href={source} className={`${styles.link} ${styles.buttonStyle}`}>
              Source
            </a>
          </>
        )}
        {id === 3 && ( // Show demo and gray out source for the third project
          <>
            <a href={demo} className={`${styles.link} ${styles.buttonStyle}`}>
              Demo
            </a>
            <a
              href={source}
              className={`${styles.link} ${styles.buttonStyle} ${styles.linkDisabled}`}
            >
              Source
            </a>
          </>
        )}
      </div>
    </div>
  );
};
