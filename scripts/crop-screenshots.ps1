# Crop sections out of the CAGE web-app screenshots into portfolio assets.
#
#   npm run crops          (Windows; calls this script)
#   powershell -ExecutionPolicy Bypass -File scripts/crop-screenshots.ps1
#
# Source full-page screenshots live in temp-images/ (both 2559px wide). Each crop
# below is { x, y, w, h } in source pixels. Tweak the numbers and re-run if a crop
# clips content. Outputs land in assets/projects/ and are referenced by the cards.
# Uses System.Drawing (built into Windows) so there is no extra dependency.

Add-Type -AssemblyName System.Drawing

$root    = Split-Path -Parent $PSScriptRoot
$srcDir  = Join-Path $root "temp-images"
$outDir  = Join-Path $root "assets\projects"

# Source files (matched by the timestamp in their names so renames are tolerated).
$predict   = (Get-ChildItem -Path $srcDir -Filter "*18-04-45*UFC*Predictor*.png" | Select-Object -First 1).FullName
$howItWorks = (Get-ChildItem -Path $srcDir -Filter "*18-05-00*UFC*Predictor*.png" | Select-Object -First 1).FullName

if (-not $predict -or -not $howItWorks) {
  Write-Error "Could not find both source screenshots in temp-images/."
  exit 1
}

# name | source | x | y | w | h
$crops = @(
  # --- Predict page (2559 x 1806) ---
  @{ name = "ufc-predictor";        src = $predict;    x = 620;  y = 240;  w = 1340; h = 640  }  # HERO: matchup + result + confidence bar
  @{ name = "ufc-matchup";          src = $predict;    x = 620;  y = 240;  w = 1340; h = 240  }  # two-fighter selection header
  @{ name = "ufc-webapp-predict";   src = $predict;    x = 620;  y = 560;  w = 1340; h = 1240 }  # result + Top Factors + Factor Breakdown
  @{ name = "ufc-factors";          src = $predict;    x = 620;  y = 890;  w = 1340; h = 910  }  # Top Factors chart + breakdown families
  # --- How It Works page (2559 x 2398) ---
  @{ name = "ufc-howitworks-pipeline"; src = $howItWorks; x = 620; y = 360;  w = 1340; h = 305 }  # 3 phase cards
  @{ name = "ufc-model-learned";       src = $howItWorks; x = 620; y = 1150; w = 1340; h = 210 }  # 59.6% balanced-accuracy callout
  @{ name = "ufc-stats-learned";       src = $howItWorks; x = 620; y = 1500; w = 1340; h = 480 }  # "stats that mattered most"
)

foreach ($c in $crops) {
  $img = [System.Drawing.Image]::FromFile($c.src)
  # Clamp the crop to the image bounds so an over-tall region never throws.
  $w = [Math]::Min($c.w, $img.Width  - $c.x)
  $h = [Math]::Min($c.h, $img.Height - $c.y)
  $rect = New-Object System.Drawing.Rectangle($c.x, $c.y, $w, $h)
  $bmp  = New-Object System.Drawing.Bitmap($w, $h)
  $g    = [System.Drawing.Graphics]::FromImage($bmp)
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
  $out = Join-Path $outDir ("{0}.png" -f $c.name)
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  Write-Host ("cropped {0}  ({1}x{2})  -> assets/projects/{0}.png" -f $c.name, $w, $h)
}

Write-Host "Done. Review the crops; adjust x/y/w/h in this script and re-run if anything clips."
