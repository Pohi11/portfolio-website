import React from "react";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

const focusAreas = [
  "AI & Machine Learning",
  "Cybersecurity",
  "Cloud Architecture",
  "Automation",
];

const credentials = [
  {
    label: "Certifications",
    items: [
      { text: "AWS Solutions Architect Associate", logo: "amazonwebservices", mono: "AWS" },
      { text: "CompTIA Security+", logo: "comptia", mono: "S+" },
      { text: "Google Cybersecurity Professional & ISC2 CC", logo: "google", mono: "G" },
    ],
  },
  {
    label: "Prior Experience",
    items: [
      { lead: "CGI:", text: "Developing secure full-stack solutions & integrating AWS cloud services", img: getImageUrl("logos/cgi.png"), mono: "CGI" },
      { lead: "Royal Canadian Mint:", text: "Data automation & Engineering", img: getImageUrl("logos/rcm.png"), mono: "RCM" },
      { lead: "LeagueKingdom:", text: "Founded profitable e-commerce platform", img: getImageUrl("logos/leaguekingdom.png"), mono: "LK" },
    ],
  },
  {
    label: "Personal Life",
    items: [
      { lead: "Top 500 North America", text: "in League of Legends", logo: "leagueoflegends", mono: "LoL" },
      { text: "Training Muay Thai since 2022", mono: "MT" },
      { text: "Driven by a passion for problem-solving and challenging myself" },
    ],
  },
];

// Simple Icons CDN, tinted to the platinum accent so logos match the theme.
const logoSrc = (slug) => `https://cdn.simpleicons.org/${slug}/D4E4E8`;

const ItemTile = ({ item }) => {
  const src = item.img || (item.logo && logoSrc(item.logo));
  if (src) {
    return (
      <span className={styles.tile}>
        <img
          className={styles.tileLogo}
          src={src}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const fallback = e.currentTarget.nextElementSibling;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <span className={styles.tileMono} style={{ display: "none" }}>
          {item.mono || item.text.charAt(0)}
        </span>
      </span>
    );
  }
  if (item.mono) {
    return (
      <span className={styles.tile}>
        <span className={styles.tileMono}>{item.mono}</span>
      </span>
    );
  }
  return (
    <span className={styles.tile}>
      <span className={styles.tileDot} />
    </span>
  );
};

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>

      <div className={styles.lead}>
        <p className={styles.statement}>
          I build <strong>secure, AI-driven software</strong> end to end, from
          training machine learning models to deploying them on the cloud. I
          enjoy working through difficult problems, and I'm always picking up
          something new along the way.
        </p>
        <ul className={styles.focusList}>
          {focusAreas.map((area) => (
            <li key={area} className={styles.focusChip}>
              {area}
            </li>
          ))}
        </ul>
      </div>

      <ul className={styles.aboutItems}>
        {credentials.map((group) => (
          <li key={group.label} className={styles.aboutItem}>
            <h3 className={styles.groupLabel}>{group.label}</h3>
            <ul className={styles.skillsList}>
              {group.items.map((item, i) => (
                <li key={i} className={styles.skillItem}>
                  <ItemTile item={item} />
                  <span className={styles.itemText}>
                    {item.lead && <strong>{item.lead}</strong>}
                    {item.lead ? ` ${item.text}` : item.text}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
