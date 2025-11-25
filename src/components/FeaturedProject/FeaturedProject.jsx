import React, { useState, useEffect } from "react";
import styles from "./FeaturedProject.module.css";
import { getImageUrl } from "../../utils";

export const FeaturedProject = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullDetails, setIsFullDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("architecture");
  const [expandedImage, setExpandedImage] = useState(null);

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setIsFullDetails(false);
      setActiveTab("architecture"); // Reset tab
    } else {
      setIsExpanded(true);
    }
  };

  const handleReadMore = (e) => {
    e.stopPropagation();
    setIsFullDetails(true);
  };

  const handleImageClick = (e, imageSrc) => {
    e.stopPropagation();
    setExpandedImage(imageSrc);
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && expandedImage) {
        closeExpandedImage();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [expandedImage]);

  const tabs = [
    { id: "architecture", label: "Architecture & Reliability" },
    { id: "cost", label: "Cost Optimization" },
    { id: "challenges", label: "Challenges" },
    { id: "stack", label: "Tech Stack" },
  ];

  return (
    <section className={styles.container} id="featured">
      <h2 className={styles.title}>Featured Project</h2>
      
      <div 
        className={`${styles.projectCard} ${isExpanded ? styles.expanded : ""}`}
        onClick={!isExpanded ? handleToggle : undefined}
      >
        {/* Collapsed View - Always Visible Header */}
        <div className={styles.collapsedView} onClick={isExpanded ? handleToggle : undefined}>
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
            {!isFullDetails ? (
              // Summary View
              <div className={styles.summaryContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.summaryLinks}>
                  <a 
                    href="https://productshotai.netlify.app/" 
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.linkIcon}>🌐</span>
                    Live Demo
                  </a>
                  <a 
                    href="https://www.youtube.com/watch?v=_p8nJ8WEYhE" 
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.linkIcon}>📹</span>
                    Video Demo
                  </a>
                  <a 
                    href="https://github.com/Pohi11/ProductShotAI" 
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.linkIcon}>💻</span>
                    Source Code
                  </a>
                </div>

                <p className={styles.summaryText}>
                  A complete, <strong>solo-developed, production-ready</strong> generative AI product that demonstrates 
                  expertise across <strong>modern full-stack development</strong>, <strong>system design</strong>, 
                  <strong> DevOps</strong>, and <strong>large-scale multimodal AI integration</strong>.
                </p>

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
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className={styles.tabContent}>
                  {activeTab === "architecture" && (
                    <div className={styles.fadeIn}>
                      <div className={styles.diagramBlock}>
                        <h4 className={styles.diagramTitle}>Cloud Native Architecture</h4>
                        <img 
                          src={getImageUrl("projects/productshotai-arch.png")} 
                          alt="Architecture Diagram: Next.js -> FastAPI -> ECS Workers"
                          className={styles.diagramImage}
                          onClick={(e) => handleImageClick(e, getImageUrl("projects/productshotai-arch.png"))}
                          onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}} 
                        />
                        <p style={{display:'none', textAlign:'center', padding:'20px', color:'#94A3B8', border:'1px dashed #333'}}>
                          (Architecture Diagram Placeholder - Please add productshotai-arch.png to assets)
                        </p>
                        
                        <div className={styles.architectureGrid} style={{marginTop: '20px'}}>
                           <div className={styles.archItem}>
                              <strong>Microservices</strong>
                              <p>Decoupled <strong>Next.js</strong> frontend and <strong>FastAPI</strong> backend with async Python workers.</p>
                           </div>
                           <div className={styles.archItem}>
                              <strong>Event-Driven</strong>
                              <p><strong>SQS</strong> for job queuing and <strong>DynamoDB</strong> for state tracking ensures scalability.</p>
                           </div>
                           <div className={styles.archItem}>
                              <strong>Infrastructure as Code</strong>
                              <p>Full <strong>Terraform</strong> setup for VPCs, ALBs, and ECS clusters.</p>
                           </div>
                        </div>
                      </div>

                      <div className={styles.diagramBlock}>
                        <h4 className={styles.diagramTitle}>AI Reliability & Error Handling</h4>
                        <img 
                          src={getImageUrl("projects/productshotai-gemini.png")} 
                          alt="Gemini Failure Handling Flow"
                          className={styles.diagramImage}
                          onClick={(e) => handleImageClick(e, getImageUrl("projects/productshotai-gemini.png"))}
                          onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}}
                        />
                         <p style={{display:'none', textAlign:'center', padding:'20px', color:'#94A3B8', border:'1px dashed #333'}}>
                          (Gemini Flow Diagram Placeholder - Please add productshotai-gemini.png to assets)
                        </p>
                        <p className={styles.description}>
                           Addressed <strong>15–20% Gemini API failure rate</strong> with a robust retry mechanism implementing 
                           exponential backoff and per-image error isolation.
                        </p>
                      </div>

                      <div className={styles.diagramBlock}>
                         <h4 className={styles.diagramTitle}>CI/CD & Deployment</h4>
                          <img 
                          src={getImageUrl("projects/productshotai-deploy.png")} 
                          alt="Deployment Pipeline Diagram"
                          className={styles.diagramImage}
                          onClick={(e) => handleImageClick(e, getImageUrl("projects/productshotai-deploy.png"))}
                          onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}}
                        />
                        <p style={{display:'none', textAlign:'center', padding:'20px', color:'#94A3B8', border:'1px dashed #333'}}>
                          (Deployment Diagram Placeholder - Please add productshotai-deploy.png to assets)
                        </p>
                         <p className={styles.description}>
                           Automated pipeline builds Docker images, pushes to ECR, and forces rolling ECS deployments.
                         </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "cost" && (
                    <div className={styles.fadeIn}>
                      <div className={styles.overview}>
                         <p className={styles.description}>
                           <strong>Analysis:</strong> Initial implementation used ECS Fargate for learning purposes ($64/mo). 
                           A detailed cost analysis revealed a path to <strong>$5–10/mo</strong> using a Serverless-First approach.
                         </p>
                      </div>

                      <div className={styles.costTableContainer}>
                        <table className={styles.costTable}>
                          <thead>
                            <tr>
                              <th>Architecture</th>
                              <th>Monthly Cost</th>
                              <th>Complexity</th>
                              <th>Use Case</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Current (ECS + VPC)</td>
                              <td>$64</td>
                              <td>High</td>
                              <td>Learning / Enterprise</td>
                            </tr>
                            <tr className={styles.highlightRow}>
                              <td>Serverless-First (Lambda)</td>
                              <td>$5 - $10</td>
                              <td>Low</td>
                              <td>Production / Efficiency</td>
                            </tr>
                            <tr>
                              <td>Single Service (ECS)</td>
                              <td>$57</td>
                              <td>Medium</td>
                              <td>Poor UX</td>
                            </tr>
                            <tr>
                              <td>Hybrid (Lambda + ECS)</td>
                              <td>$43</td>
                              <td>High</td>
                              <td>Transition</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className={styles.overview}>
                        <p className={styles.description}>
                          I initially built this with ECS to learn container orchestration, but after analyzing usage patterns, 
                          I identified that a serverless architecture would reduce costs by 90% while maintaining functionality.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "challenges" && (
                    <div className={styles.challengesGrid}>
                       <div className={styles.challengeCard}>
                          <div className={styles.challengeHeader}>
                             <span className={styles.challengeIcon}>🔄</span>
                             <span className={styles.challengeTitle}>The Iterative Pipeline</span>
                          </div>
                          <p className={styles.challengeText}>
                             Standard data pipelines are linear, but creative design is iterative. To allow users to refine their results, I engineered a circular data flow where processed images feed back into the raw input bucket. I secured this cross-bucket cycle with granular IAM policies, ensuring strict access control while enabling a seamless "edit-and-retry" user loop.
                          </p>
                       </div>

                       <div className={styles.challengeCard}>
                          <div className={styles.challengeHeader}>
                             <span className={styles.challengeIcon}>🤖</span>
                             <span className={styles.challengeTitle}>Defensive Engineering</span>
                          </div>
                          <p className={styles.challengeText}>
                             Relying on bleeding-edge AI models meant accepting volatility (a ~20% external API failure rate). I hardened the system by implementing exponential backoff with jitter—a retry strategy that prevents server overload. This turns fatal backend errors into invisible, handled delays, maintaining a smooth experience despite upstream instability.
                          </p>
                       </div>

                       <div className={styles.challengeCard}>
                          <div className={styles.challengeHeader}>
                             <span className={styles.challengeIcon}>💰</span>
                             <span className={styles.challengeTitle}>Serverless Refactoring</span>
                          </div>
                          <p className={styles.challengeText}>
                             I initially deployed a 3-tier ECS architecture to gain experience with different AWS services. However, I realized the $64/mo cost for idle networking (NAT/ALB) was inefficient for this specific workload. I re-architected to a Serverless-First model (Lambda), cutting monthly overhead to under $5 and proving that the "best" architecture fits the usage pattern.
                          </p>
                       </div>

                       <div className={styles.challengeCard}>
                          <div className={styles.challengeHeader}>
                             <span className={styles.challengeIcon}>🔒</span>
                             <span className={styles.challengeTitle}>Zero-Cost Security</span>
                          </div>
                          <p className={styles.challengeText}>
                             I needed production-grade encryption without the recurring cost of a custom domain. By fronting the application with CloudFront, I leveraged its default SSL distribution to enforce HTTPS. This not only resolved mixed-content security warnings but also reduced latency by caching static assets at the edge, globally.
                          </p>
                       </div>
                    </div>
                  )}

                  {activeTab === "stack" && (
                    <div className={styles.techStack} style={{marginTop: '20px'}}>
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
                  )}
                </div>

                <div className={styles.collapsePrompt} onClick={handleToggle}>
                  <span>Click to collapse ↑</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Modal Overlay */}
      {expandedImage && (
        <div className={styles.imageModalOverlay} onClick={closeExpandedImage}>
          <div className={styles.imageModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.imageModalClose} onClick={closeExpandedImage}>×</button>
            <img 
              src={expandedImage} 
              alt="Expanded diagram"
              className={styles.imageModalImage}
            />
          </div>
        </div>
      )}
    </section>
  );
};
