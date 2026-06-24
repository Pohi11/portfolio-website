import React, { useState, useEffect } from "react";
import styles from "./FeaturedProject.module.css";
import { getImageUrl } from "../../utils";

const isPlaceholderHref = (href) => !href || href.startsWith("TODO");

export const FeaturedProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullDetails, setIsFullDetails] = useState(false);
  const [activeTab, setActiveTab] = useState(project.tabs[0].id);
  const [expandedImage, setExpandedImage] = useState(null);

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setIsFullDetails(false);
      setActiveTab(project.tabs[0].id); // Reset tab
    } else {
      setIsExpanded(true);
    }
  };

  const handleReadMore = (e) => {
    e.stopPropagation();
    setIsFullDetails(true);
  };

  const openImage = (imageSrc) => setExpandedImage(imageSrc);
  const closeExpandedImage = () => setExpandedImage(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && expandedImage) {
        closeExpandedImage();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [expandedImage]);

  const activeTabObj = project.tabs.find((t) => t.id === activeTab) || project.tabs[0];

  return (
    <div
      className={`${styles.projectCard} ${isExpanded ? styles.expanded : ""}`}
      onClick={!isExpanded ? handleToggle : undefined}
    >
      {/* Collapsed View - Always Visible Header */}
      <div className={styles.collapsedView} onClick={isExpanded ? handleToggle : undefined}>
        <div className={styles.imageContainer}>
          <img
            src={getImageUrl(project.image)}
            alt={`${project.title} Preview`}
            className={styles.projectImage}
          />
          <div className={styles.badge}>
            <span>{project.badge}</span>
          </div>
        </div>

        <div className={styles.collapsedContent}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.subtitle}>{project.subtitle}</p>
          <p className={styles.tagline}>{project.tagline}</p>

          {!isExpanded && (
            <div className={styles.expandPrompt}>
              <span>Click to explore →</span>
            </div>
          )}
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className={styles.expandedView}>
          {!isFullDetails ? (
            // Summary View
            <div className={styles.summaryContainer} onClick={(e) => e.stopPropagation()}>
              <div className={styles.summaryLinks}>
                {project.summaryLinks.map((link) => {
                  const placeholder = isPlaceholderHref(link.href);
                  return (
                    <a
                      key={link.label}
                      href={placeholder ? undefined : link.href}
                      className={styles.link}
                      target={placeholder ? undefined : "_blank"}
                      rel={placeholder ? undefined : "noopener noreferrer"}
                      onClick={placeholder ? (e) => e.preventDefault() : undefined}
                      aria-disabled={placeholder || undefined}
                      style={placeholder ? { opacity: 0.55, cursor: "not-allowed" } : undefined}
                      title={placeholder ? "Link coming soon" : undefined}
                    >
                      {link.subtext || placeholder ? (
                        <span className={styles.linkContent}>
                          <span>{link.label}</span>
                          <span className={styles.linkSubtext}>
                            {placeholder ? "Coming soon" : link.subtext}
                          </span>
                        </span>
                      ) : (
                        link.label
                      )}
                    </a>
                  );
                })}
              </div>

              {project.summaryText}

              <button className={styles.readMoreButton} onClick={handleReadMore}>
                Read Full Case Study ↓
              </button>

              <div className={styles.collapsePrompt} onClick={handleToggle}>
                <span>Click to collapse ↑</span>
              </div>
            </div>
          ) : (
            // Full Details View (Case Study)
            <div className={styles.caseStudyContainer} onClick={(e) => e.stopPropagation()}>
              <div className={styles.tabs}>
                {project.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className={styles.tabContent}>{activeTabObj.render({ openImage })}</div>

              <div className={styles.collapsePrompt} onClick={handleToggle}>
                <span>Click to collapse ↑</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image Modal Overlay */}
      {expandedImage && (
        <div className={styles.imageModalOverlay} onClick={closeExpandedImage}>
          <div className={styles.imageModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.imageModalClose} onClick={closeExpandedImage}>
              ×
            </button>
            <img src={expandedImage} alt="Expanded diagram" className={styles.imageModalImage} />
          </div>
        </div>
      )}
    </div>
  );
};
