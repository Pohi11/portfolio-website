import React from "react";
import styles from "./Experience.module.css";
import certifications from "../../data/certifications.json";
import history from "../../data/history.json";
import { getImageUrl } from "../../utils";

export const Experience = () => {
  return (
    <section className={styles.container} id="experience">
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Experience</h2>
        <h2 className={styles.certificationTitle}>Certifications</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.historyContainer}>
          <ul className={styles.history}>
            {history.map((historyItem, id) => (
              <li key={id} className={styles.historyItem}>
                <img
                  src={getImageUrl(historyItem.imageSrc)}
                  alt={`${historyItem.organisation} Logo`}
                />
                <div className={styles.historyItemDetails}>
                  <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                  <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                  <ul>
                    {historyItem.experiences.map((experience, idx) => (
                      <li key={idx}>{experience}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.certificationContainer}>
          <ul className={styles.certification}>
            {certifications.map((certification, id) => (
              <li key={id} className={styles.certificationItem}>
                <img
                  src={getImageUrl(certification.imageSrc)}
                  alt={`${certification.organisation} Logo`}
                />
                <div className={styles.certificationItemDetails}>
                  <h3>
                    {`${certification.role}, ${certification.organisation}`}
                  </h3>
                  <p>{`${certification.startDate}  ${certification.endDate}`}</p>
                  <div style={{ marginTop: "14px" }}>
                    {certification.experiences && (
                      <div>
                        <p style={{ fontSize: "25px", fontWeight: "300" }}>
                          Skills Covered:
                        </p>
                        <ul>
                          {certification.experiences.map((exp, idx) => (
                            <li key={idx}>{exp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
