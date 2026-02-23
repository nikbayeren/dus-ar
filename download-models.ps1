<#
PowerShell script to download sample GLB/USDZ models into models/ directory.
Run in project root: .\download-models.ps1
#>

$models = @(
    @{ out = "models/standart.glb"; url = "https://modelviewer.dev/shared-assets/models/Astronaut.glb" },
    @{ out = "models/standart.usdz"; url = "https://modelviewer.dev/shared-assets/models/Astronaut.usdz" },
    @{ out = "models/kose.glb"; url = "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb" },
    @{ out = "models/kose.usdz"; url = "https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz" },
    @{ out = "models/rayli.glb"; url = "https://modelviewer.dev/shared-assets/models/Astronaut.glb" },
    @{ out = "models/rayli.usdz"; url = "https://modelviewer.dev/shared-assets/models/Astronaut.usdz" }
)

if (-not (Test-Path "models")) { New-Item -ItemType Directory -Path "models" | Out-Null }

foreach ($m in $models) {
    $out = $m.out
    $url = $m.url
    Write-Host "Downloading $url => $out"
    try {
        Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -ErrorAction Stop
        Write-Host "Saved: $out"
    } catch {
        Write-Warning "Failed to download $url : $_"
    }
}

Write-Host "Done. Add/commit the downloaded files and push to GitHub (note: binary files can be large)."