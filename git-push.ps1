<#
Simple PowerShell helper to add, commit and push changes.
Usage:
  .\git-push.ps1 -Message "commit message" -Branch main
If -Message is omitted you'll be prompted to enter one.
#>

param(
    [string]$Message,
    [string]$Branch = 'main'
)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "git is not installed or not in PATH. Install git first."
    exit 1
}

if (-not $Message) {
    $Message = Read-Host "Commit mesajını girin"
}

Write-Host "Staging changes..."
git add -A

Write-Host "Committing: $Message"
git commit -m "$Message"

if ($LASTEXITCODE -ne 0) {
    Write-Warning "Commit başarısız veya yapılacak değişiklik bulunamadı."
} else {
    Write-Host "Pushing to origin/$Branch..."
    git push origin $Branch
}
