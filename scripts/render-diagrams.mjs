// Render every diagrams/*.mmd to assets/projects/<name>.png using mermaid-cli.
//
//   npm run diagrams
//
// Output PNGs are committed and referenced by the portfolio cards via
// getImageUrl("projects/<name>.png"). Re-run after editing any .mmd source.
import { readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "diagrams");
const outDir = join(root, "assets", "projects");
const config = join(srcDir, "mermaid-theme.json");

// Resolve the locally-installed mermaid-cli binary (mmdc / mmdc.cmd on Windows).
const binName = process.platform === "win32" ? "mmdc.cmd" : "mmdc";
const mmdc = join(root, "node_modules", ".bin", binName);
if (!existsSync(mmdc)) {
  console.error(
    "mermaid-cli not found. Run `npm install` first (it is a devDependency: @mermaid-js/mermaid-cli)."
  );
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const sources = readdirSync(srcDir).filter((f) => f.endsWith(".mmd"));
if (sources.length === 0) {
  console.warn("No .mmd files found in diagrams/.");
  process.exit(0);
}

let failed = 0;
for (const file of sources) {
  const name = basename(file, ".mmd");
  const input = join(srcDir, file);
  const output = join(outDir, `${name}.png`);
  console.log(`Rendering ${file} -> assets/projects/${name}.png`);
  const res = spawnSync(
    mmdc,
    [
      "-i", input,
      "-o", output,
      "-c", config,
      "-b", "transparent",
      "-s", "3", // 3x scale for crisp retina output
    ],
    { stdio: "inherit", shell: process.platform === "win32" }
  );
  if (res.status !== 0) {
    console.error(`  ✗ failed to render ${file}`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n${failed} diagram(s) failed to render.`);
  process.exit(1);
}
console.log(`\n✓ Rendered ${sources.length} diagram(s) to assets/projects/.`);
