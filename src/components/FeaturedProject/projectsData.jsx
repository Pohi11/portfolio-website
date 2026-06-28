import React from "react";
import styles from "./FeaturedProject.module.css";
import { getImageUrl } from "../../utils";

/*
 * Featured-project configs consumed by <FeaturedProjectCard />.
 * Each tab's `render` receives { openImage } so diagram/screenshot clicks can
 * open the shared image modal owned by the card.
 *
 * NOTE: the UFC project's demo/source URLs are placeholders — swap the two
 * TODO_* values below once the live web app + public repo URLs are known.
 */

const UFC_DEMO_URL = "https://pohi11-cage-ufc-predictor.hf.space/";
const UFC_SOURCE_URL = "https://github.com/Pohi11/cage";

/* ---------- Hand-built balanced-accuracy bar chart (palette-matched) ---------- */

const ACC_DATA = [
  { label: "Always corner-1", value: 0.5, note: "no skill" },
  { label: "LogReg baseline", value: 0.573 },
  { label: "LightGBM (shipped)", value: 0.596, highlight: true },
  { label: "Betting market", value: 0.606, note: "more data" },
];
const ACC_MIN = 0.45;
const ACC_MAX = 0.62;
const accPct = (v) => ((v - ACC_MIN) / (ACC_MAX - ACC_MIN)) * 100;

const BalancedAccuracyChart = () => (
  <div className={styles.barChart}>
    <div className={styles.barChartTitle}>
      Balanced accuracy on unseen fights (0.50 = no skill)
    </div>
    <div className={styles.barPlot}>
      <div className={styles.noSkillLine} style={{ bottom: `${accPct(0.5)}%` }}>
        <span>0.50 · no skill</span>
      </div>
      {ACC_DATA.map((d) => (
        <div
          key={d.label}
          className={`${styles.barCol} ${d.highlight ? styles.barHighlightLabel : ""}`}
        >
          <span className={styles.barValue}>{d.value.toFixed(3)}</span>
          <div
            className={`${styles.bar} ${d.highlight ? styles.barHighlight : ""}`}
            style={{ height: `${accPct(d.value)}%` }}
          />
        </div>
      ))}
    </div>
    <div className={styles.barLabels}>
      {ACC_DATA.map((d) => (
        <span
          key={d.label}
          className={`${styles.barLabel} ${d.highlight ? styles.barLabelStrong : ""}`}
        >
          {d.label}
          {d.note ? (
            <>
              <br />
              <em style={{ fontStyle: "normal", opacity: 0.7, fontSize: "0.7rem" }}>
                {d.note}
              </em>
            </>
          ) : null}
        </span>
      ))}
    </div>
  </div>
);

/* =========================================================================
 * UFC Fight Outcome Predictor (CAGE) — the ML / MLOps flagship
 * ========================================================================= */

export const ufcProject = {
  image: "projects/ufc-predictor.png",
  badge: "MLOps · Trained Model",
  title: "CAGE",
  subtitle: "Combat Analytics & Grading Engine",
  tagline: "UFC Fight Outcome Predictor · Machine Learning · MLOps",
  summaryLinks: [
    {
      href: UFC_DEMO_URL,
      label: "Live Demo (React App)",
      subtext: "Predict a matchup",
    },
    { href: UFC_SOURCE_URL, label: "Source Code" },
  ],
  summaryText: (
    <p className={styles.summaryText}>
      An end-to-end <strong>MLOps</strong> system that predicts the winner of a UFC fight
      from two fighters' historical stats. I built all four phases (data ingestion,
      model training, prediction API, and web app) and{" "}
      <strong>trained and selected my own model</strong> (LightGBM, 59.6% balanced
      accuracy on unseen fights) instead of calling someone else's. It covers{" "}
      <strong>leakage-safe training</strong>, experiment tracking,
      versioned artifacts, explainability, and a production serving API.
    </p>
  ),
  tabs: [
    {
      id: "deepdive",
      label: "Technical Deep Dive",
      render: ({ openImage }) => (
        <div className={styles.fadeIn}>
          <div className={styles.overview}>
            <h3 className={styles.projectTitle} style={{ fontSize: "1.5rem", marginTop: 0 }}>
              Technical Deep Dive: CAGE, the Combat Analytics &amp; Grading Engine
            </h3>
            <p className={styles.description} style={{ marginTop: "10px" }}>
              An end-to-end <strong>MLOps</strong> system that predicts the winner of a UFC
              fight from the two fighters' historical statistics. It learned patterns from{" "}
              <strong>~8,548 historical fights</strong> and reaches{" "}
              <strong>59.6% balanced accuracy</strong> on fights it never saw, genuine
              skill above the 50% coin-flip and within ~1 point of the professional betting
              market. I built it as <strong>four independent phases</strong> that communicate
              only through well-defined, <strong>versioned contracts</strong>.
            </p>
            <div className={styles.techStack} style={{ marginTop: "10px", marginBottom: "20px" }}>
              <span>Python 3.11</span>
              <span>pandas</span>
              <span>scikit-learn</span>
              <span>LightGBM</span>
              <span>MLflow</span>
              <span>FastAPI</span>
              <span>Docker</span>
              <span>React + Vite + TS</span>
            </div>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>1. The Four-Phase Contract Pipeline</h4>
            <p className={styles.description}>
              I built the system as four strict modules. Each arrow between them is a{" "}
              <strong>contract, not a code dependency</strong>: phase 002 only reads 001's
              published files; 003 only reads 002's published artifact. Any phase can be
              rebuilt independently as long as it honors the contract.
            </p>
            <img
              src={getImageUrl("projects/ufc-pipeline.png")}
              alt="Four-phase contract pipeline: data ingestion -> training -> API -> web app"
              className={styles.diagramImage}
              onClick={() => openImage(getImageUrl("projects/ufc-pipeline.png"))}
            />
            <ul style={{ color: "var(--color-text-light)", paddingLeft: "20px", lineHeight: "1.6" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>001 Data Ingestion:</strong> joins two raw parquet sources, cleans
                dirty labels, drops draws, and <em>fits nothing by design</em> (no
                imputation, encoders, or split) so it can never introduce data leakage. Owns
                the data contract: an 8,548 × 806 training table + a 2,686-fighter index.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>002 Model Training:</strong> splits by time, fits leakage-safe
                preprocessing on the train fold only, trains a 3-model matrix, selects the
                best, and writes a versioned model artifact + MLflow run.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>003 Prediction API:</strong> a FastAPI service that reconstructs the
                head-to-head feature vector at request time and returns winner + confidence +
                explanation.
              </li>
              <li>
                <strong>004 Web App:</strong> a React + Vite + TypeScript app with a Predict page
                and a "How It Works" explainer; a pure HTTP consumer of the API.
              </li>
            </ul>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>2. The Product, In the Browser</h4>
            <p className={styles.description}>
              The app's own "How It Works" page explains the same three-phase handoff to a
              non-technical visitor.
            </p>
            <img
              src={getImageUrl("projects/ufc-howitworks-pipeline.png")}
              alt="In-app explainer: Preparing the data -> Training the model -> Serving predictions"
              className={styles.diagramImage}
              onClick={() => openImage(getImageUrl("projects/ufc-howitworks-pipeline.png"))}
            />
          </div>
        </div>
      ),
    },
    {
      id: "training",
      label: "Training the Model",
      render: ({ openImage }) => (
        <div className={styles.fadeIn}>
          <div className={styles.overview}>
            <h3 className={styles.projectTitle} style={{ fontSize: "1.5rem", marginTop: 0 }}>
              Training &amp; Selecting My Own Model
            </h3>
            <p className={styles.description} style={{ marginTop: "10px" }}>
              The goal: from ~800 statistical <strong>differences</strong> between two
              fighters, predict the probability that corner 1 wins, a binary classification
              problem. It's hard: outcomes are noisy (upsets are common), the
              classes are <strong>imbalanced (corner 1 wins 64%)</strong>, and a lot of
              fighter data is missing by nature (debutants have no history). The model has to
              handle all three.
            </p>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>1. Leakage-Safe Temporal Split</h4>
            <p className={styles.description}>
              I split the 8,548 fights <strong>chronologically</strong>, not at random.
              Predicting fights means predicting the <em>future</em>. A random split would
              let the model train on fights that happened <em>after</em> the ones it's tested
              on ("look-ahead leakage" that fakes good scores). Time-ordering guarantees every
              training fight precedes every test fight. It also exposed real drift: the
              corner-1 win rate falls 67% → 55% over time, which makes the test honest and
              harder.
            </p>
            <img
              src={getImageUrl("projects/ufc-split.png")}
              alt="Temporal train/validation/test split"
              className={styles.diagramImage}
              onClick={() => openImage(getImageUrl("projects/ufc-split.png"))}
            />
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>2. The 3-Model Matrix &amp; Selection</h4>
            <p className={styles.description}>
              I trained <strong>three imbalance-aware models</strong> and let the data pick
              the winner. The LightGBM models use early stopping on the validation fold; the
              shipped model stopped after <strong>9 trees</strong>, finding the signal
              fast and quitting before overfitting.
            </p>
            <div className={styles.costTableContainer}>
              <table className={styles.costTable}>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Algorithm</th>
                    <th>Imbalance handling</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>form_only_baseline</td>
                    <td>LogisticRegression</td>
                    <td>class_weight="balanced"</td>
                    <td>reference</td>
                  </tr>
                  <tr className={styles.highlightRow}>
                    <td>form_only_candidate</td>
                    <td>LightGBM</td>
                    <td>scale_pos_weight=0.4835</td>
                    <td>shipped ✅</td>
                  </tr>
                  <tr>
                    <td>with_odds_candidate</td>
                    <td>LightGBM</td>
                    <td>scale_pos_weight=0.4835</td>
                    <td>benchmark only</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={styles.description} style={{ marginTop: "12px" }}>
              Among the two form-only models I selected the higher <strong>validation</strong>{" "}
              balanced accuracy: LightGBM (0.6015) over LogisticRegression (0.5554). The
              with-odds model is a <strong>benchmark, not a product</strong>: live betting
              odds aren't available for hypothetical future matchups, so a servable model can't
              depend on them; it exists only to measure how much odds <em>would</em> help.
            </p>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>3. Results &amp; Why Balanced Accuracy</h4>
            <p className={styles.description}>
              Because corner 1 wins 64% of fights, a model that always guessed
              "corner 1" scores 64% raw accuracy with <strong>zero skill</strong>. So the
              headline is <strong>balanced accuracy</strong> (average of per-class recall),
              which can't be gamed by the imbalance: <strong>0.50 = no skill, 1.0 = perfect</strong>.
            </p>
            <BalancedAccuracyChart />
            <p className={styles.description} style={{ marginTop: "12px" }}>
              <strong>Why not 90%?</strong> Fighting is unpredictable. Even the
              betting market (with far more information) only reaches 0.606, and my form-only
              model trails it by <strong>0.0099</strong>, meaning it captures almost all
              the predictable signal that exists from fighter stats alone.
            </p>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>4. What the Model Actually Learned</h4>
            <p className={styles.description}>
              Out of 1,521 preprocessed columns, the 9-tree model only ever split on{" "}
              <strong>168</strong>, ignoring most features. The surprise:{" "}
              <strong>age gap, win record, and physical attributes outranked raw striking
              volume</strong>, and two of its top four features were{" "}
              <em>missing-indicators</em>: the fact that a fighter's age or reach was
              unknown (often a debutant) was itself predictive. The model found that in the
              data; I didn't tell it to.
            </p>
            <img
              src={getImageUrl("projects/ufc-stats-learned.png")}
              alt="Stats that mattered most: age, reach, recent wins, weight, striking-rate gaps"
              className={styles.diagramImage}
              onClick={() => openImage(getImageUrl("projects/ufc-stats-learned.png"))}
            />
          </div>
        </div>
      ),
    },
    {
      id: "mlops",
      label: "MLOps & Rigor",
      render: () => (
        <div className={styles.fadeIn}>
          <div className={styles.overview}>
            <p className={styles.description}>
              A one-off script wouldn't cut it. This is built to MLOps standards: a ratified
              project constitution of five non-negotiable principles that every phase satisfies.
            </p>
          </div>
          <div className={styles.challengesGrid}>
            <div className={styles.challengeCard}>
              <div className={styles.challengeHeader}>
                <span className={styles.challengeIcon}>🔁</span>
                <span className={styles.challengeTitle}>Reproducible by Default</span>
              </div>
              <p className={styles.challengeText}>
                Every randomness source is seeded; LightGBM runs <code>deterministic=True</code>,
                single-threaded. Same data + seed → <strong>bit-identical</strong> metrics,
                proven by an integration test.
              </p>
            </div>
            <div className={styles.challengeCard}>
              <div className={styles.challengeHeader}>
                <span className={styles.challengeIcon}>📦</span>
                <span className={styles.challengeTitle}>Versioned Artifacts</span>
              </div>
              <p className={styles.challengeText}>
                Each training run gets a unique version (its MLflow run id) in its own
                directory; prior versions are never clobbered. Every param, metric, and seed
                is logged to <strong>MLflow</strong>.
              </p>
            </div>
            <div className={styles.challengeCard}>
              <div className={styles.challengeHeader}>
                <span className={styles.challengeIcon}>🧪</span>
                <span className={styles.challengeTitle}>Test-Driven · 212 Tests</span>
              </div>
              <p className={styles.challengeText}>
                Unit + contract + integration tiers, written <em>before</em> implementation. A{" "}
                <strong>served-vs-trained parity test</strong> rebuilds a known training row
                through the serving path and asserts the vector matches.
              </p>
            </div>
            <div className={styles.challengeCard}>
              <div className={styles.challengeHeader}>
                <span className={styles.challengeIcon}>🚧</span>
                <span className={styles.challengeTitle}>Strict Modular Contracts</span>
              </div>
              <p className={styles.challengeText}>
                Four phases that touch each other <em>only</em> through published, versioned
                contracts, never internals. Shared config + IO live in one{" "}
                <code>common/</code> package, never duplicated.
              </p>
            </div>
            <div className={styles.challengeCard}>
              <div className={styles.challengeHeader}>
                <span className={styles.challengeIcon}>✅</span>
                <span className={styles.challengeTitle}>Quality Gates in CI</span>
              </div>
              <p className={styles.challengeText}>
                <code>ruff</code> (lint+format), <code>mypy</code> (strict typing), and{" "}
                <code>pydocstyle</code> run clean over every phase, plus <code>gitleaks</code>{" "}
                for secret scanning.
              </p>
            </div>
            <div className={styles.challengeCard}>
              <div className={styles.challengeHeader}>
                <span className={styles.challengeIcon}>📐</span>
                <span className={styles.challengeTitle}>Spec-Driven Development</span>
              </div>
              <p className={styles.challengeText}>
                Each phase developed with Spec Kit: <code>spec.md</code> →{" "}
                <code>plan.md</code> → <code>research.md</code> → <code>contracts/</code> →{" "}
                <code>tasks.md</code> → implementation.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "serving",
      label: "Serving & Explainability",
      render: ({ openImage }) => (
        <div className={styles.fadeIn}>
          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>1. The Serving Challenge (Feature Parity)</h4>
            <p className={styles.description}>
              The model trains on <strong>differences</strong> between two fighters, but a
              user names <strong>two fighters</strong>. So at request time the API looks
              up each fighter's latest stats and <strong>reconstructs the exact{" "}
              <code>diff = A − B</code> feature vector</strong> the model was trained on. It
              must rebuild that vector the <em>same</em> way training did, or the model gets
              garbage. A contract test pins that parity guarantee.
            </p>
            <img
              src={getImageUrl("projects/ufc-request-path.png")}
              alt="Serving request path: lookup -> reconstruct diffs -> predict both ways -> explain"
              className={styles.diagramImage}
              onClick={() => openImage(getImageUrl("projects/ufc-request-path.png"))}
            />
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>2. Removing the Corner Bias</h4>
            <p className={styles.description}>
              In the data, the red-corner fighter wins ~64% of the time, so the model learns a
              corner prior: the same matchup scores differently depending on which fighter you
              call "fighter A" (65.7% vs 56.3%). For a hypothetical matchup there's
              no real red corner, so I <strong>symmetrize</strong>: score both corner
              assignments and average them in log-odds space, which cancels the prior. Result:{" "}
              <code>predict(A,B)</code> and <code>predict(B,A)</code> give the{" "}
              <strong>identical</strong> answer.
            </p>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>3. Per-Prediction Explainability</h4>
            <p className={styles.description}>
              Every prediction returns <em>why</em>: using <strong>TreeSHAP</strong>, each
              feature gets a signed contribution toward the winner, grouped into human-readable
              families (Physical, Striking, Grappling, Record). The web app surfaces this as a
              factor breakdown you can drill into, so you see why the model picked a winner.
            </p>
            <img
              src={getImageUrl("projects/ufc-webapp-predict.png")}
              alt="Predict result with confidence bar, Top Factors chart, and Factor Breakdown families"
              className={styles.diagramImage}
              onClick={() => openImage(getImageUrl("projects/ufc-webapp-predict.png"))}
            />
          </div>
        </div>
      ),
    },
    {
      id: "decisions",
      label: "Key Decisions",
      render: () => (
        <div className={styles.challengesGrid}>
          <div className={styles.challengeCard}>
            <div className={styles.challengeHeader}>
              <span className={styles.challengeIcon}>🧩</span>
              <span className={styles.challengeTitle}>Preserve NaNs, Don't Impute Early</span>
            </div>
            <p className={styles.challengeText}>
              Imputation must be learned from data; learning it from the whole dataset leaks
              the future into the past. So I keep missing values as <code>NaN</code> and
              impute on the <strong>train fold only</strong>, downstream. Missingness itself
              turned out to be signal.
            </p>
          </div>
          <div className={styles.challengeCard}>
            <div className={styles.challengeHeader}>
              <span className={styles.challengeIcon}>⏳</span>
              <span className={styles.challengeTitle}>Temporal Split, Not Random</span>
            </div>
            <p className={styles.challengeText}>
              A random split inflates scores via look-ahead leakage. A chronological split
              keeps the test honest (and harder), which matches how the model will be used in
              production: predicting fights that haven't happened yet.
            </p>
          </div>
          <div className={styles.challengeCard}>
            <div className={styles.challengeHeader}>
              <span className={styles.challengeIcon}>⚖️</span>
              <span className={styles.challengeTitle}>Class-Weighting, Not Resampling</span>
            </div>
            <p className={styles.challengeText}>
              Handled the 64/36 imbalance with <code>scale_pos_weight</code> /{" "}
              <code>class_weight</code> instead of over/under-sampling, keeping the real data
              distribution intact rather than fabricating or discarding fights.
            </p>
          </div>
          <div className={styles.challengeCard}>
            <div className={styles.challengeHeader}>
              <span className={styles.challengeIcon}>🎯</span>
              <span className={styles.challengeTitle}>Form-Only, Not With-Odds</span>
            </div>
            <p className={styles.challengeText}>
              The odds model scores higher but can never be served (no live odds for
              hypothetical fights). I shipped the form-only model and kept odds as a
              benchmark to quantify the gap (+0.0099).
            </p>
          </div>
          <div className={styles.challengeCard}>
            <div className={styles.challengeHeader}>
              <span className={styles.challengeIcon}>🔍</span>
              <span className={styles.challengeTitle}>The 6 Irregular Features</span>
            </div>
            <p className={styles.challengeText}>
              793/799 diff features map to their absolute columns by a regular pattern, but 6
              (weight, reach, height, age, fight-order, ranking) use irregular names. A naive
              "strip the prefix" would break them at serve time, so I used an
              explicit, contract-tested mapping.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "stack",
      label: "Tech Stack",
      render: () => (
        <div className={styles.techStack} style={{ marginTop: "20px" }}>
          <span>Python 3.11</span>
          <span>uv</span>
          <span>pandas</span>
          <span>pyarrow</span>
          <span>scikit-learn</span>
          <span>LightGBM</span>
          <span>joblib</span>
          <span>MLflow</span>
          <span>pydantic-settings</span>
          <span>FastAPI</span>
          <span>Pydantic v2</span>
          <span>Uvicorn</span>
          <span>Docker</span>
          <span>AWS (ECR/ECS)</span>
          <span>React 18</span>
          <span>Vite 5</span>
          <span>TypeScript</span>
          <span>Tailwind</span>
          <span>shadcn/ui</span>
          <span>Recharts</span>
          <span>pytest</span>
          <span>Vitest</span>
          <span>Playwright</span>
          <span>ruff</span>
          <span>mypy</span>
        </div>
      ),
    },
  ],
};

/* =========================================================================
 * ProductShotAI — ported verbatim from the original single-card component
 * ========================================================================= */

export const productShotAIProject = {
  image: "projects/productshotai.png",
  badge: "Production SaaS",
  title: "ProductShotAI",
  subtitle: "AI-Powered Product Photography & Advertisement Generator",
  tagline: "Full-Stack | Multimodal AI | Cloud-Native",
  summaryLinks: [
    {
      href: "https://productshotai-seven.vercel.app/",
      label: "Live Demo (Next.js)",
      subtext: "Bring your own key",
    },
    { href: "https://www.youtube.com/watch?v=_p8nJ8WEYhE", label: "Video Demo" },
    { href: "https://github.com/Pohi11/ProductShotAI", label: "Source Code" },
  ],
  summaryText: (
    <p className={styles.summaryText}>
      A generative AI app that turns a product photo into studio-grade ad images in under a
      minute, built on <strong>AWS microservices</strong> with <strong>Gemini</strong> and{" "}
      <strong>Terraform-managed infrastructure</strong>.
    </p>
  ),
  tabs: [
    {
      id: "deepdive",
      label: "Technical Deep Dive",
      render: ({ openImage }) => (
        <div className={styles.fadeIn}>
          <div className={styles.overview}>
            <h3 className={styles.projectTitle} style={{ fontSize: "1.5rem", marginTop: 0 }}>
              Technical Deep Dive: ProductShotAI
            </h3>
            <p className={styles.description} style={{ marginTop: "10px" }}>
              <strong>ProductShotAI</strong> is a cloud-native SaaS that lets anyone generate
              studio-grade product shots. A decoupled microservices backend sends each upload to
              Google's Gemini AI and returns finished marketing assets in under 60 seconds.
            </p>
            <div className={styles.techStack} style={{ marginTop: "10px", marginBottom: "20px" }}>
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
              The system utilizes a 3-tier microservices architecture running entirely on AWS.
              I moved away from a monolithic design to separate concerns: the API handles
              high-concurrency requests, while background workers handle CPU-intensive AI
              processing.
            </p>

            <img
              src={getImageUrl("projects/productshotai-arch.png")}
              alt="Cloud Native Architecture"
              className={styles.diagramImage}
              onClick={() => openImage(getImageUrl("projects/productshotai-arch.png"))}
            />

            <h5 className={styles.diagramTitle} style={{ fontSize: "1rem", marginTop: "15px" }}>
              Key Components:
            </h5>
            <ul style={{ color: "var(--color-text-light)", paddingLeft: "20px", lineHeight: "1.6" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Frontend (Next.js):</strong> Hosted on Netlify with CloudFront; provides
                real-time status polling and a drag-and-drop upload interface.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>API Service (FastAPI):</strong> Validates inputs and offloads processing
                to the queue, keeping response time under 200ms.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Async Workers (Python):</strong> Decoupled consumers that poll SQS,
                process images via Gemini, and isolate per-image failures with retries.
              </li>
              <li>
                <strong>State Management:</strong> DynamoDB tracks job status (millisecond
                latency) while S3 stores heavy media assets (99.99% durability).
              </li>
            </ul>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>2. The Asynchronous Event Loop</h4>
            <p className={styles.description}>
              The core engineering challenge was handling long-running AI tasks (30–90 seconds)
              without blocking the user interface or timing out HTTP requests. I implemented an
              Event-Driven Pipeline:
            </p>
            <ul style={{ color: "var(--color-text-light)", paddingLeft: "20px", lineHeight: "1.6", marginBottom: "15px", marginTop: "10px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Ingestion:</strong> The API accepts an image, generates a UUID, pushes a
                message to SQS, and immediately returns 202 Accepted to the client.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Processing:</strong> A Python worker pulls the message, retrieves the
                image from S3, and initiates the multi-step generation process with Gemini.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Completion:</strong> Results are uploaded to a processed S3 bucket, and
                the DynamoDB status is updated to COMPLETED.
              </li>
              <li>
                <strong>Delivery:</strong> The frontend polls the status endpoint every 3
                seconds, displaying results immediately upon completion.
              </li>
            </ul>
            <p className={styles.description}>
              <strong>Why SQS?</strong> This decoupling prevents data loss. If a worker crashes,
              the SQS visibility timeout ensures the message becomes visible to another worker
              instance automatically after 120 seconds.
            </p>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>3. Network Isolation & Security</h4>
            <p className={styles.description}>
              Security was architected at the network level using a VPC with tiered subnets.
            </p>
            <ul style={{ color: "var(--color-text-light)", paddingLeft: "20px", lineHeight: "1.6", marginBottom: "15px", marginTop: "10px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Public Subnets:</strong> Host only the Application Load Balancer (ALB)
                and NAT Gateway.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Private Subnets:</strong> Host the ECS Containers (API and Workers).
                These have zero direct ingress from the internet. They can only receive traffic
                via the ALB or talk outbound via the NAT Gateway.
              </li>
              <li>
                <strong>Defense in Depth:</strong> This ensures that even if a container
                vulnerability exists, attackers cannot directly address the backend services.
              </li>
            </ul>
            <p className={styles.description}>
              <strong>Infrastructure as Code (IaC):</strong> The entire environment (VPC,
              Subnets, Security Groups, and IAM roles) is defined in Terraform. This allows for
              exact replication of the production environment in staging with a single command
              (<code>terraform apply</code>).
            </p>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>4. Reliability & CI/CD</h4>
            <p className={styles.description}>
              To ensure stability for a production-grade application, I automated the deployment
              pipeline and hardened the error handling.
            </p>

            <img
              src={getImageUrl("projects/productshotai-deploy.png")}
              alt="Reliability & CI/CD"
              className={styles.diagramImage}
              onClick={() => openImage(getImageUrl("projects/productshotai-deploy.png"))}
            />

            <ul style={{ color: "var(--color-text-light)", paddingLeft: "20px", lineHeight: "1.6", marginTop: "15px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Automated Deployment:</strong> A push to main triggers a pipeline that
                builds Docker images, pushes them to AWS ECR, and forces a rolling update on ECS
                Fargate without downtime.
              </li>
              <li>
                <strong>Resilience:</strong> The Gemini API has a roughly 15-20% failure rate. I
                implemented an exponential backoff strategy. The worker retries failed
                generations with increasing delays (1s, 2s, 4s) before marking a job as failed,
                ensuring transient errors don't impact the user.
              </li>
            </ul>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>5. Architectural Decisions & Trade-offs</h4>
            <p className={styles.description} style={{ marginBottom: "15px" }}>
              Every engineering choice required balancing cost, performance, and complexity.
            </p>

            <div className={styles.challengeCard} style={{ marginBottom: "15px" }}>
              <div className={styles.challengeHeader}>
                <span className={styles.challengeTitle}>Decision: DynamoDB vs. RDS (Postgres)</span>
              </div>
              <p className={styles.challengeText}>
                <strong>Choice:</strong> DynamoDB.
                <br />
                <strong>Reasoning:</strong> The data model is simple (Key-Value lookups by
                job_id). DynamoDB offers single-digit millisecond reads and serverless scaling.
                Managing connections for a relational database would have added unnecessary
                overhead for this specific schema.
              </p>
            </div>

            <div className={styles.challengeCard} style={{ marginBottom: "15px" }}>
              <div className={styles.challengeHeader}>
                <span className={styles.challengeTitle}>Decision: ECS Fargate vs. AWS Lambda</span>
              </div>
              <p className={styles.challengeText}>
                <strong>Choice:</strong> ECS Fargate (Containers).
                <br />
                <strong>Reasoning:</strong> While Lambda is cheaper for sporadic traffic, AI
                image generation takes 30–90 seconds. Lambda's cold starts and strict timeout
                limits posed risks for long-tail processing. Fargate provides a stable,
                persistent environment for the workers to maintain long-polling connections to
                SQS.
              </p>
            </div>

            <div className={styles.challengeCard}>
              <div className={styles.challengeHeader}>
                <span className={styles.challengeTitle}>Decision: S3 Lifecycle Policies</span>
              </div>
              <p className={styles.challengeText}>
                <strong>Choice:</strong> 24-hour Retention Policy.
                <br />
                <strong>Reasoning:</strong> To optimize costs and respect user privacy, raw and
                processed images are automatically deleted by S3 lifecycle rules after 24 hours.
                This prevents storage costs from growing linearly with usage.
              </p>
            </div>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>6. Future Roadmap</h4>
            <ul style={{ color: "var(--color-text-light)", paddingLeft: "20px", lineHeight: "1.6", marginTop: "10px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong>Cost Optimization:</strong> Migrating the API layer to Lambda
                (Serverless) to eliminate idle container costs, while keeping Workers on Fargate.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong>Global Scaling:</strong> Implementing Multi-Region deployment with
                Route53 latency-based routing.
              </li>
              <li>
                <strong>Observability:</strong> Adding AWS X-Ray for distributed tracing across
                the microservices.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "freearch",
      label: "Free Architecture Solution",
      render: () => (
        <div className={styles.fadeIn}>
          <div className={styles.overview}>
            <h3 className={styles.projectTitle} style={{ fontSize: "1.5rem", marginTop: 0 }}>
              From Cloud-Native to Zero-Cost Edge
            </h3>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>The Constraint</h4>
            <p className={styles.description}>
              The original AWS architecture worked but cost ~$64/mo. I needed a way to let anyone
              try the app without me paying for their GPU usage.
            </p>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>The Solution: "Bring Your Own Key" (BYOK)</h4>
            <p className={styles.description}>
              I refactored the application from a{" "}
              <strong>stateful, containerized backend (ECS)</strong> to a{" "}
              <strong>stateless, serverless architecture (Next.js Serverless)</strong>. By
              allowing users to input their own free-tier Google Gemini API keys, I shifted the
              "cost of compute" from my infrastructure to the user, dropping operating costs to{" "}
              <strong>$0</strong>.
            </p>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>Key Engineering Decisions</h4>
            <div className={styles.challengesGrid} style={{ marginTop: "15px" }}>
              <div className={styles.challengeCard}>
                <div className={styles.challengeHeader}>
                  <span className={styles.challengeIcon}>🔐</span>
                  <span className={styles.challengeTitle}>Ephemeral Security</span>
                </div>
                <p className={styles.challengeText}>
                  To protect user data, API keys are stored exclusively in{" "}
                  <strong>React state</strong> and sent directly to Google via proxy. They never
                  touch a persistent database.
                </p>
              </div>

              <div className={styles.challengeCard}>
                <div className={styles.challengeHeader}>
                  <span className={styles.challengeIcon}>⚡</span>
                  <span className={styles.challengeTitle}>Sync vs. Async</span>
                </div>
                <p className={styles.challengeText}>
                  I replaced the complex <strong>SQS/polling pipeline</strong> with a
                  synchronous request-response model using the faster{" "}
                  <strong>Gemini 2.5 Flash</strong> model. This reduced latency from{" "}
                  <strong>~45s to ~10s</strong>.
                </p>
              </div>

              <div className={styles.challengeCard}>
                <div className={styles.challengeHeader}>
                  <span className={styles.challengeIcon}>📦</span>
                  <span className={styles.challengeTitle}>Payload Management</span>
                </div>
                <p className={styles.challengeText}>
                  Serverless functions have strict payload limits (~4MB). I implemented{" "}
                  <strong>client-side image resizing (HTML5 Canvas)</strong> to ensure uploads
                  never hit function timeouts or size caps.
                </p>
              </div>

              <div className={styles.challengeCard}>
                <div className={styles.challengeHeader}>
                  <span className={styles.challengeIcon}>💾</span>
                  <span className={styles.challengeTitle}>Base64 over S3</span>
                </div>
                <p className={styles.challengeText}>
                  To remove storage costs, I removed S3 entirely. Generated images are returned
                  as <strong>Base64 data URIs</strong>, rendering directly in the browser memory.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>The Stack Shift</h4>
            <div className={styles.costTableContainer}>
              <table className={styles.costTable}>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Before (Cloud-Native)</th>
                    <th>After (Serverless)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Compute</strong>
                    </td>
                    <td>AWS Fargate (Containers)</td>
                    <td>Next.js API Routes (Node.js)</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Pattern</strong>
                    </td>
                    <td>Async Polling (SQS)</td>
                    <td>Synchronous await</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Storage</strong>
                    </td>
                    <td>S3 Buckets</td>
                    <td>Ephemeral Base64</td>
                  </tr>
                  <tr className={styles.highlightRow}>
                    <td>
                      <strong>Cost</strong>
                    </td>
                    <td>~$64/month</td>
                    <td>$0/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "architecture",
      label: "Architecture & Reliability",
      render: ({ openImage }) => (
        <div className={styles.fadeIn}>
          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>Cloud Native Architecture</h4>
            <img
              src={getImageUrl("projects/productshotai-arch.png")}
              alt="Architecture Diagram: Next.js -> FastAPI -> ECS Workers"
              className={styles.diagramImage}
              onClick={() => openImage(getImageUrl("projects/productshotai-arch.png"))}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <p style={{ display: "none", textAlign: "center", padding: "20px", color: "#94A3B8", border: "1px dashed #333" }}>
              (Architecture Diagram Placeholder - Please add productshotai-arch.png to assets)
            </p>

            <div className={styles.architectureGrid} style={{ marginTop: "20px" }}>
              <div className={styles.archItem}>
                <strong>Microservices</strong>
                <p>
                  Decoupled <strong>Next.js</strong> frontend and <strong>FastAPI</strong>{" "}
                  backend with async Python workers.
                </p>
              </div>
              <div className={styles.archItem}>
                <strong>Event-Driven</strong>
                <p>
                  <strong>SQS</strong> for job queuing and <strong>DynamoDB</strong> for state
                  tracking, so the system scales with load.
                </p>
              </div>
              <div className={styles.archItem}>
                <strong>Infrastructure as Code</strong>
                <p>
                  Full <strong>Terraform</strong> setup for VPCs, ALBs, and ECS clusters.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>AI Reliability & Error Handling</h4>
            <img
              src={getImageUrl("projects/productshotai-gemini.png")}
              alt="Gemini Failure Handling Flow"
              className={styles.diagramImage}
              onClick={() => openImage(getImageUrl("projects/productshotai-gemini.png"))}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <p style={{ display: "none", textAlign: "center", padding: "20px", color: "#94A3B8", border: "1px dashed #333" }}>
              (Gemini Flow Diagram Placeholder - Please add productshotai-gemini.png to assets)
            </p>
            <p className={styles.description}>
              Addressed the <strong>15–20% Gemini API failure rate</strong> with exponential
              backoff and per-image error isolation.
            </p>
          </div>

          <div className={styles.diagramBlock}>
            <h4 className={styles.diagramTitle}>CI/CD & Deployment</h4>
            <img
              src={getImageUrl("projects/productshotai-deploy.png")}
              alt="Deployment Pipeline Diagram"
              className={styles.diagramImage}
              onClick={() => openImage(getImageUrl("projects/productshotai-deploy.png"))}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <p style={{ display: "none", textAlign: "center", padding: "20px", color: "#94A3B8", border: "1px dashed #333" }}>
              (Deployment Diagram Placeholder - Please add productshotai-deploy.png to assets)
            </p>
            <p className={styles.description}>
              Automated pipeline builds Docker images, pushes to ECR, and forces rolling ECS
              deployments.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "cost",
      label: "Cost Optimization",
      render: () => (
        <div className={styles.fadeIn}>
          <div className={styles.overview}>
            <p className={styles.description}>
              <strong>Analysis:</strong> Initial implementation used ECS Fargate for learning
              purposes ($64/mo). A detailed cost analysis revealed a path to{" "}
              <strong>$5–10/mo</strong> using a Serverless-First approach.
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

          <h4 className={styles.diagramTitle} style={{ marginTop: "30px" }}>
            Detailed Cost Breakdown
          </h4>
          <div className={styles.challengesGrid}>
            <div className={styles.challengeCard}>
              <div className={styles.challengeHeader}>
                <span className={styles.challengeIcon}>📉</span>
                <span className={styles.challengeTitle}>Current: ECS + VPC (~$64/mo)</span>
              </div>
              <p className={styles.challengeText}>
                <strong>Biggest Cost Drivers:</strong>
              </p>
              <ul style={{ color: "var(--color-text-light)", paddingLeft: "20px", marginTop: "5px", lineHeight: "1.6" }}>
                <li>
                  <strong>NAT Gateway:</strong> $32/mo (50% of total) - Required for private
                  subnet internet access.
                </li>
                <li>
                  <strong>ALB:</strong> $16/mo (25% of total) - Load balancing for ECS services.
                </li>
                <li>
                  <strong>ECS Fargate:</strong> $15/mo (23% of total) - Container compute costs.
                </li>
              </ul>
              <p className={styles.challengeText} style={{ marginTop: "10px", fontSize: "0.9rem", fontStyle: "italic" }}>
                High base cost due to always-on networking infrastructure.
              </p>
            </div>

            <div className={styles.challengeCard} style={{ borderLeftColor: "var(--color-primary)", background: "rgba(212, 228, 232, 0.05)" }}>
              <div className={styles.challengeHeader}>
                <span className={styles.challengeIcon}>🚀</span>
                <span className={styles.challengeTitle}>Recommended: Serverless (~$5-10/mo)</span>
              </div>
              <p className={styles.challengeText}>
                <strong>Cost Breakdown:</strong>
              </p>
              <ul style={{ color: "var(--color-text-light)", paddingLeft: "20px", marginTop: "5px", lineHeight: "1.6" }}>
                <li>
                  <strong>API Gateway:</strong> ~$1-2/mo (Pay per request)
                </li>
                <li>
                  <strong>Lambda (API):</strong> ~$0.50/mo (Free tier eligible)
                </li>
                <li>
                  <strong>Lambda (Worker):</strong> ~$2-3/mo (Sporadic usage)
                </li>
                <li>
                  <strong>CloudFront:</strong> $0 (Free tier)
                </li>
              </ul>
              <p className={styles.challengeText} style={{ marginTop: "10px", color: "var(--color-primary)", fontWeight: "600" }}>
                ~90% Cost Reduction by removing idle resources.
              </p>
            </div>
          </div>

          <div className={styles.diagramBlock} style={{ marginTop: "20px" }}>
            <h4 className={styles.diagramTitle}>Why Serverless-First?</h4>
            <p className={styles.description}>
              This architecture is better suited for sporadic, event-driven workloads like image
              generation. By replacing always-on containers with <strong>AWS Lambda</strong> and
              removing the <strong>NAT Gateway/ALB</strong> requirement, we eliminate paying for
              idle time while maintaining scalability.
            </p>
            <div className={styles.techStack} style={{ marginTop: "10px" }}>
              <span>Scales to Zero</span>
              <span>No VPC Management</span>
              <span>Event-Driven</span>
            </div>
          </div>

          <div className={styles.overview}>
            <p className={styles.description} style={{ textAlign: "center" }}>
              I initially built this with ECS to learn container orchestration, but after
              analyzing usage patterns, I identified that a serverless architecture would reduce
              costs by 90% while maintaining functionality.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "challenges",
      label: "Challenges",
      render: () => (
        <div className={styles.challengesGrid}>
          <div className={styles.challengeCard}>
            <div className={styles.challengeHeader}>
              <span className={styles.challengeIcon}>🔄</span>
              <span className={styles.challengeTitle}>The Iterative Pipeline</span>
            </div>
            <p className={styles.challengeText}>
              Users need to refine results, not just generate once. I built a circular data flow
              where processed images feed back into the raw input bucket, so a user can edit and
              re-run a generated image. Granular IAM policies scope access to each bucket in the
              cycle.
            </p>
          </div>

          <div className={styles.challengeCard}>
            <div className={styles.challengeHeader}>
              <span className={styles.challengeIcon}>🤖</span>
              <span className={styles.challengeTitle}>Defensive Engineering</span>
            </div>
            <p className={styles.challengeText}>
              The Gemini API fails on ~20% of calls. The worker retries with exponential backoff
              and jitter, which spreads retries out instead of hammering the API in sync. A
              transient failure costs the user a few extra seconds rather than a broken request.
            </p>
          </div>

          <div className={styles.challengeCard}>
            <div className={styles.challengeHeader}>
              <span className={styles.challengeIcon}>💰</span>
              <span className={styles.challengeTitle}>Serverless Refactoring</span>
            </div>
            <p className={styles.challengeText}>
              I first deployed a 3-tier ECS architecture to get experience with different AWS
              services. The $64/mo cost for idle networking (NAT/ALB) didn't fit a sporadic,
              event-driven workload, so I re-architected to a Serverless-First model (Lambda) and
              cut monthly overhead to under $5.
            </p>
          </div>

          <div className={styles.challengeCard}>
            <div className={styles.challengeHeader}>
              <span className={styles.challengeIcon}>🔒</span>
              <span className={styles.challengeTitle}>Zero-Cost Security</span>
            </div>
            <p className={styles.challengeText}>
              I needed HTTPS without paying for a custom domain. Fronting the app with CloudFront
              uses its default SSL certificate to enforce HTTPS, which resolved the mixed-content
              warnings and cut latency by caching static assets at edge locations.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "stack",
      label: "Tech Stack",
      render: () => (
        <div className={styles.techStack} style={{ marginTop: "20px" }}>
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
      ),
    },
  ],
};

export const featuredProjects = [ufcProject, productShotAIProject];
