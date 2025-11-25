import React, { useState, useEffect } from "react";
import styles from "./FeaturedProject.module.css";
import { getImageUrl } from "../../utils";

export const FeaturedProject = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullDetails, setIsFullDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("deepdive");
  const [expandedImage, setExpandedImage] = useState(null);

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setIsFullDetails(false);
      setActiveTab("deepdive"); // Reset tab
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
    { id: "deepdive", label: "Technical Deep Dive" },
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
                  {activeTab === "deepdive" && (
                    <div className={styles.fadeIn}>
                      <div className={styles.overview}>
                        <h3 className={styles.projectTitle} style={{ fontSize: '1.5rem', marginTop: 0 }}>Technical Deep Dive: PhotogenAI</h3>
                        <p className={styles.description} style={{ marginTop: '10px' }}>
                          <strong>PhotogenAI</strong> is a cloud-native SaaS that democratizes professional product photography. By orchestrating Google’s Gemini AI via a decoupled microservices architecture, it transforms raw user uploads into studio-grade marketing assets in under 60 seconds.
                        </p>
                        <div className={styles.techStack} style={{ marginTop: '10px', marginBottom: '20px' }}>
                          <span>Next.js (Frontend)</span>
                          <span>FastAPI (API)</span>
                          <span>Python (Worker)</span>
                          <span>AWS ECS Fargate</span>
                          <span>DynamoDB</span>
                          <span>SQS</span>
                          <span>S3</span>
                          <span>Terraform</span>
                        </div>
                      </div>

                      <div className={styles.diagramBlock}>
                        <h4 className={styles.diagramTitle}>1. Cloud-Native Architecture</h4>
                        <p className={styles.description}>
                          The system utilizes a 3-tier microservices architecture running entirely on AWS. I moved away from a monolithic design to separate concerns: the API handles high-concurrency requests, while background workers handle CPU-intensive AI processing.
                        </p>
                        
                        <img 
                          src={getImageUrl("projects/productshotai-arch.png")} 
                          alt="Cloud Native Architecture"
                          className={styles.diagramImage}
                          onClick={(e) => handleImageClick(e, getImageUrl("projects/productshotai-arch.png"))}
                        />

                        <h5 className={styles.diagramTitle} style={{ fontSize: '1rem', marginTop: '15px' }}>Key Components:</h5>
                        <ul style={{ color: 'var(--color-text-light)', paddingLeft: '20px', lineHeight: '1.6' }}>
                          <li style={{ marginBottom: '8px' }}><strong>Frontend (Next.js):</strong> Hosted on Netlify with CloudFront; provides real-time status polling and intuitive drag-and-drop interfaces.</li>
                          <li style={{ marginBottom: '8px' }}><strong>API Service (FastAPI):</strong> A high-performance gateway that validates inputs and offloads processing immediately. Response time is kept under 200ms by delegating work.</li>
                          <li style={{ marginBottom: '8px' }}><strong>Async Workers (Python):</strong> Decoupled consumers that poll SQS, process images via Gemini, and handle failures gracefully.</li>
                          <li><strong>State Management:</strong> DynamoDB tracks job status (millisecond latency) while S3 stores heavy media assets (99.99% durability).</li>
                        </ul>
                      </div>

                      <div className={styles.diagramBlock}>
                        <h4 className={styles.diagramTitle}>2. The Asynchronous Event Loop</h4>
                        <p className={styles.description}>
                          The core engineering challenge was handling long-running AI tasks (30–90 seconds) without blocking the user interface or timing out HTTP requests. I implemented an Event-Driven Pipeline:
                        </p>
                        <ul style={{ color: 'var(--color-text-light)', paddingLeft: '20px', lineHeight: '1.6', marginBottom: '15px', marginTop: '10px' }}>
                            <li style={{ marginBottom: '8px' }}><strong>Ingestion:</strong> The API accepts an image, generates a UUID, pushes a message to SQS, and immediately returns 202 Accepted to the client.</li>
                            <li style={{ marginBottom: '8px' }}><strong>Processing:</strong> A Python worker pulls the message, retrieves the image from S3, and initiates the multi-step generation process with Gemini.</li>
                            <li style={{ marginBottom: '8px' }}><strong>Completion:</strong> Results are uploaded to a processed S3 bucket, and the DynamoDB status is updated to COMPLETED.</li>
                            <li><strong>Delivery:</strong> The frontend polls the status endpoint every 3 seconds, displaying results immediately upon completion.</li>
                        </ul>
                        <p className={styles.description}>
                          <strong>Why SQS?</strong> This decoupling prevents data loss. If a worker crashes, the SQS visibility timeout ensures the message becomes visible to another worker instance automatically after 120 seconds.
                        </p>
                      </div>

                      <div className={styles.diagramBlock}>
                        <h4 className={styles.diagramTitle}>3. Network Isolation & Security</h4>
                        <p className={styles.description}>
                          Security was architected at the network level using a VPC with tiered subnets.
                        </p>
                        <ul style={{ color: 'var(--color-text-light)', paddingLeft: '20px', lineHeight: '1.6', marginBottom: '15px', marginTop: '10px' }}>
                          <li style={{ marginBottom: '8px' }}><strong>Public Subnets:</strong> Host only the Application Load Balancer (ALB) and NAT Gateway.</li>
                          <li style={{ marginBottom: '8px' }}><strong>Private Subnets:</strong> Host the ECS Containers (API and Workers). These have zero direct ingress from the internet. They can only receive traffic via the ALB or talk outbound via the NAT Gateway.</li>
                          <li><strong>Defense in Depth:</strong> This ensures that even if a container vulnerability exists, attackers cannot directly address the backend services.</li>
                        </ul>
                        <p className={styles.description}>
                          <strong>Infrastructure as Code (IaC):</strong> The entire environment—VPC, Subnets, Security Groups, and IAM roles—is defined in Terraform. This allows for exact replication of the production environment in staging with a single command (<code>terraform apply</code>).
                        </p>
                      </div>

                      <div className={styles.diagramBlock}>
                        <h4 className={styles.diagramTitle}>4. Reliability & CI/CD</h4>
                        <p className={styles.description}>
                          To ensure stability for a production-grade application, I automated the deployment pipeline and hardened the error handling.
                        </p>
                        
                        <img 
                          src={getImageUrl("projects/productshotai-deploy.png")} 
                          alt="Reliability & CI/CD"
                          className={styles.diagramImage}
                          onClick={(e) => handleImageClick(e, getImageUrl("projects/productshotai-deploy.png"))}
                        />

                        <ul style={{ color: 'var(--color-text-light)', paddingLeft: '20px', lineHeight: '1.6', marginTop: '15px' }}>
                          <li style={{ marginBottom: '8px' }}><strong>Automated Deployment:</strong> A push to main triggers a pipeline that builds Docker images, pushes them to AWS ECR, and forces a rolling update on ECS Fargate without downtime.</li>
                          <li><strong>Resilience:</strong> The Gemini API has a roughly 15-20% failure rate. I implemented an exponential backoff strategy. The worker retries failed generations with increasing delays (1s, 2s, 4s) before marking a job as failed, ensuring transient errors don't impact the user.</li>
                        </ul>
                      </div>

                      <div className={styles.diagramBlock}>
                        <h4 className={styles.diagramTitle}>5. Architectural Decisions & Trade-offs</h4>
                        <p className={styles.description} style={{ marginBottom: '15px' }}>
                            Every engineering choice required balancing cost, performance, and complexity.
                        </p>
                        
                        <div className={styles.challengeCard} style={{ marginBottom: '15px' }}>
                            <div className={styles.challengeHeader}>
                                <span className={styles.challengeTitle}>Decision: DynamoDB vs. RDS (Postgres)</span>
                            </div>
                            <p className={styles.challengeText}>
                                <strong>Choice:</strong> DynamoDB.<br/>
                                <strong>Reasoning:</strong> The data model is simple (Key-Value lookups by job_id). DynamoDB offers single-digit millisecond reads and serverless scaling. Managing connections for a relational database would have added unnecessary overhead for this specific schema.
                            </p>
                        </div>

                        <div className={styles.challengeCard} style={{ marginBottom: '15px' }}>
                            <div className={styles.challengeHeader}>
                                <span className={styles.challengeTitle}>Decision: ECS Fargate vs. AWS Lambda</span>
                            </div>
                            <p className={styles.challengeText}>
                                <strong>Choice:</strong> ECS Fargate (Containers).<br/>
                                <strong>Reasoning:</strong> While Lambda is cheaper for sporadic traffic, AI image generation takes 30–90 seconds. Lambda's cold starts and strict timeout limits posed risks for long-tail processing. Fargate provides a stable, persistent environment for the workers to maintain long-polling connections to SQS.
                            </p>
                        </div>

                        <div className={styles.challengeCard}>
                            <div className={styles.challengeHeader}>
                                <span className={styles.challengeTitle}>Decision: S3 Lifecycle Policies</span>
                            </div>
                            <p className={styles.challengeText}>
                                <strong>Choice:</strong> 24-hour Retention Policy.<br/>
                                <strong>Reasoning:</strong> To optimize costs and respect user privacy, raw and processed images are automatically deleted by S3 lifecycle rules after 24 hours. This prevents storage costs from growing linearly with usage.
                            </p>
                        </div>
                      </div>

                      <div className={styles.diagramBlock}>
                        <h4 className={styles.diagramTitle}>6. Future Roadmap</h4>
                        <ul style={{ color: 'var(--color-text-light)', paddingLeft: '20px', lineHeight: '1.6', marginTop: '10px' }}>
                            <li style={{ marginBottom: '8px' }}><strong>Cost Optimization:</strong> Migrating the API layer to Lambda (Serverless) to eliminate idle container costs, while keeping Workers on Fargate.</li>
                            <li style={{ marginBottom: '8px' }}><strong>Global Scaling:</strong> Implementing Multi-Region deployment with Route53 latency-based routing.</li>
                            <li><strong>Observability:</strong> Adding AWS X-Ray for distributed tracing across the microservices.</li>
                        </ul>
                      </div>
                    </div>
                  )}

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
