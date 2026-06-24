import React from "react";
import styles from "./FeaturedProject.module.css";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { featuredProjects } from "./projectsData";

export const FeaturedProject = () => {
  return (
    <section className={styles.container} id="featured">
      <h2 className={styles.title}>Featured Projects</h2>

      <div className={styles.cardStack}>
        {featuredProjects.map((project) => (
          <FeaturedProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};
