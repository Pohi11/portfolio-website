import React, { useState } from "react";
import styles from "./FeaturedProject.module.css";
import { getImageUrl } from "../../utils";

export const FeaturedProject = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className={styles.container} id="featured">
      <h2 className={styles.title}>Featured Project</h2>
      
      <div 
        className={`${styles.projectCard} ${isExpanded ? styles.expanded : ""}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Collapsed View - Always Visible */}
        <div className={styles.collapsedView}>
          <div className={styles.imageContainer}>
            <img 
              src={getImageUrl("projects/productshotai.png")} 
              alt="ProductShotAI Preview"
              className={styles.projectImage}
            />
            <div className={styles.badge}>
              <span>Production SaaS</span>
            </div>
          </div>
          
          <div className={styles.collapsedContent}>
            <h3 className={styles.projectTitle}>ProductShotAI</h3>
            <p className={styles.subtitle}>AI-Powered Product Photography & Advertisement Generator</p>
            <p className={styles.tagline}>
              Full-Stack | Multimodal AI | Cloud-Native
            </p>
            
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
            {/* Overview */}
            <div className={styles.overview} onClick={(e) => e.stopPropagation()}>
              <p className={styles.description}>
                Single-handedly designed, built, and deployed <strong>ProductShotAI</strong>: a <strong>multimodal AI SaaS platform</strong> that 
                instantly transforms casual product photos into studio-quality photography and complete advertisement 
                creatives using <strong>Google's Gemini 2.5 Flash</strong> (vision + text-to-image).
              </p>
              <div className={styles.highlight}>
                <strong>1 image uploaded → 4–8 professional variations in under 60 seconds</strong>
                <p className={styles.highlightSubtext}>
                  Different angles, lighting, backgrounds, or full ad layouts powered by advanced prompt engineering 
                  and in-painting techniques that preserve perfect subject fidelity.
                </p>
              </div>
            </div>

            {/* Architecture Section */}
            <div className={styles.section} onClick={(e) => e.stopPropagation()}>
              <h4 className={styles.sectionTitle}>Architecture & System Design</h4>
              <div className={styles.architectureGrid}>
                <div className={styles.archItem}>
                  <div className={styles.archHeader}>
                    <span className={styles.archNumber}>01</span>
                    <strong>Microservices Architecture</strong>
                  </div>
                  <p>End-to-end production-grade system: <strong>Next.js + TypeScript</strong> frontend → 
                  <strong> FastAPI</strong> backend → <strong>asynchronous Python workers</strong> on AWS</p>
                </div>
                
                <div className={styles.archItem}>
                  <div className={styles.archHeader}>
                    <span className={styles.archNumber}>02</span>
                    <strong>Event-Driven Scalability</strong>
                  </div>
                  <p><strong>SQS</strong> decoupling for async processing, <strong>DynamoDB</strong> job state tracking, 
                  and horizontally <strong>auto-scaled ECS Fargate</strong> services (scales from 1 → 20+ workers based on queue depth)</p>
                </div>
                
                <div className={styles.archItem}>
                  <div className={styles.archHeader}>
                    <span className={styles.archNumber}>03</span>
                    <strong>Infrastructure-as-Code</strong>
                  </div>
                  <p>Full <strong>Terraform</strong> implementation: multi-AZ VPC, private subnets, 
                  <strong> ALB + CloudFront CDN</strong>, dead-letter queues, <strong>least-privilege IAM</strong>, 
                  24-hour data ephemerality</p>
                </div>
                
                <div className={styles.archItem}>
                  <div className={styles.archHeader}>
                    <span className={styles.archNumber}>04</span>
                    <strong>Production Operations</strong>
                  </div>
                  <p><strong>Zero-downtime deployments</strong> and full observability via <strong>CloudWatch </strong> 
                  for monitoring, logging, and performance tracking</p>
                </div>
              </div>
            </div>

            {/* Security & Cost Optimization */}
            <div className={styles.section} onClick={(e) => e.stopPropagation()}>
              <h4 className={styles.sectionTitle}>Security & Cost Optimization</h4>
              <div className={styles.highlights}>
                <div className={styles.highlightItem}>
                  <div className={styles.icon}>🛡️</div>
                  <div>
                    <strong>Abuse-Resistant Design</strong>
                    <p>Rate limiting, file-size validation, and comprehensive input sanitization</p>
                  </div>
                </div>
                
                <div className={styles.highlightItem}>
                  <div className={styles.icon}>💰</div>
                  <div>
                    <strong>Cost-Aware Architecture</strong>
                    <p>Auto-expiring storage, per-second billing optimization, and efficient resource utilization</p>
                  </div>
                </div>
                
                <div className={styles.highlightItem}>
                  <div className={styles.icon}>🔒</div>
                  <div>
                    <strong>Security Best Practices</strong>
                    <p>Least-privilege IAM policies, private subnets, and secure data handling</p>
                  </div>
                </div>
                
                <div className={styles.highlightItem}>
                  <div className={styles.icon}>⚡</div>
                  <div>
                    <strong>AI Processing</strong>
                    <p>Advanced prompt engineering and in-painting techniques for perfect subject fidelity</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className={styles.section} onClick={(e) => e.stopPropagation()}>
              <h4 className={styles.sectionTitle}>Tech Stack</h4>
              <div className={styles.techStack}>
                <span>Next.js</span>
                <span>TypeScript</span>
                <span>FastAPI</span>
                <span>Python</span>
                <span>Google Gemini Multimodal</span>
                <span>AWS ECS Fargate</span>
                <span>SQS</span>
                <span>DynamoDB</span>
                <span>S3</span>
                <span>CloudFront</span>
                <span>Terraform</span>
                <span>CloudWatch</span>
                <span>Netlify</span>
              </div>
            </div>

            {/* Summary */}
            <div className={styles.summary} onClick={(e) => e.stopPropagation()}>
              <p>
                A complete, <strong>solo-developed, production-ready</strong> generative AI product that demonstrates 
                expertise across <strong>modern full-stack development</strong>, <strong>system design</strong>, 
                <strong> DevOps</strong>, and <strong>large-scale multimodal AI integration</strong>.
              </p>
            </div>

            {/* Links */}
            <div className={styles.links} onClick={(e) => e.stopPropagation()}>
              <a 
                href="https://productshotai.netlify.app/" 
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <span className={styles.linkIcon}>🌐</span>
                Live Demo
              </a>
              <a 
                href="https://www.youtube.com/watch?v=_p8nJ8WEYhE" 
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <span className={styles.linkIcon}>📹</span>
                Video Demo
              </a>
              <a 
                href="https://github.com/Pohi11/ProductShotAI" 
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <span className={styles.linkIcon}>💻</span>
                Source Code
              </a>
            </div>

            <div className={styles.collapsePrompt}>
              <span>Click to collapse ↑</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

