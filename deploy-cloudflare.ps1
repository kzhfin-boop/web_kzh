param(
  [Parameter(Mandatory = $true)]
  [string]$ProjectName,

  [string]$Directory = "."
)

if (-not (Get-Command "npx" -ErrorAction SilentlyContinue)) {
  throw "npx/npm이 설치되어 있지 않습니다. Node.js를 먼저 설치해주세요."
}

Write-Host "Cloudflare Pages 배포를 시작합니다..."
Write-Host "Project: $ProjectName"
Write-Host "Directory: $Directory"

npx wrangler@latest pages deploy $Directory --project-name $ProjectName
