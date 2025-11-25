import React, { useState } from "react";
import styles from "./FeaturedProject.module.css";
import { getImageUrl } from "../../utils";

export const FeaturedProject = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullDetails, setIsFullDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("architecture");

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
                        <h4 className={styles.diagramTitle}>☁️ Cloud Native Architecture</h4>
                        <img 
                          src={getImageUrl("projects/productshotai-arch.png")} 
                          alt="Architecture Diagram: Next.js -> FastAPI -> ECS Workers"
                          className={styles.diagramImage}
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
                        <h4 className={styles.diagramTitle}>🔄 AI Reliability & Error Handling</h4>
                        <img 
                          src={getImageUrl("projects/productshotai-gemini.png")} 
                          alt="Gemini Failure Handling Flow"
                          className={styles.diagramImage}
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
                         <h4 className={styles.diagramTitle}>🚀 CI/CD & Deployment</h4>
                          <img 
                          src={getImageUrl("projects/productshotai-deploy.png")} 
                          alt="Deployment Pipeline Diagram"
                          className={styles.diagramImage}
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

                      <div className={styles.quoteBox}>
                        "I initially built this with ECS to learn container orchestration, but after analyzing usage patterns, 
                        I identified that a serverless architecture would reduce costs by 90% while maintaining functionality."
                      </div>
                    </div>
                  )}

                  {activeTab === "challenges" && (
                    <div className={styles.challengesGrid}>
                       <div className={styles.challengeCard}>
                          <div className={styles.challengeHeader}>
                             <span className={styles.challengeIcon}>🔄</span>
                             <span className={styles.challengeTitle}>Image Refinement</span>
                          </div>
                          <p className={styles.challengeText}>
                             <strong>Challenge:</strong> Moving processed images back to raw buckets for iteration.<br/>
                             <strong>Solution:</strong> Configured precise IAM policies and S3 event triggers to handle cross-bucket operations securely.
                          </p>
                       </div>

                       <div className={styles.challengeCard}>
                          <div className={styles.challengeHeader}>
                             <span className={styles.challengeIcon}>🤖</span>
                             <span className={styles.challengeTitle}>AI Reliability</span>
                          </div>
                          <p className={styles.challengeText}>
                             <strong>Challenge:</strong> Gemini API instability (15-20% fail rate).<br/>
                             <strong>Solution:</strong> Implemented comprehensive error handling, retry logic with exponential backoff, and detailed logging.
                          </p>
                       </div>

                       <div className={styles.challengeCard}>
                          <div className={styles.challengeHeader}>
                             <span className={styles.challengeIcon}>💰</span>
                             <span className={styles.challengeTitle}>Cost Optimization</span>
                          </div>
                          <p className={styles.challengeText}>
                             <strong>Challenge:</strong> High fixed costs of NAT Gateways and ALBs.<br/>
                             <strong>Solution:</strong> Architected a serverless migration plan reducing costs from $95/mo to projected $5/mo.
                          </p>
                       </div>

                       <div className={styles.challengeCard}>
                          <div className={styles.challengeHeader}>
                             <span className={styles.challengeIcon}>🔒</span>
                             <span className={styles.challengeTitle}>HTTPS Without Domain</span>
                          </div>
                          <p className={styles.challengeText}>
                             <strong>Challenge:</strong> Secure delivery without buying a domain.<br/>
                             <strong>Solution:</strong> Leveraged CloudFront's default certificate and distribution domain for free SSL/TLS.
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
    </section>
  );
};
