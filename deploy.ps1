# Auto-deploy script
# Usage: .\deploy.ps1

Write-Host "Deploying to Vercel production..." -ForegroundColor Cyan

# Commit and push
git add .
$changes = git status --porcelain
if ($changes) {
    $msg = Read-Host "Commit message"
    git commit -m $msg
    git push
    Write-Host "Pushed to GitHub" -ForegroundColor Green
} else {
    Write-Host "No changes to commit" -ForegroundColor Yellow
}

# Deploy to production
vercel --prod --yes --scope zahidshersial
Write-Host "Done!" -ForegroundColor Green
