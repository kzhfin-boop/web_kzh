param(
  [Parameter(Mandatory = $true)]
  [string]$GitHubUser,

  [Parameter(Mandatory = $true)]
  [string]$RepositoryName,

  [string]$Branch = "main"
)

$remoteUrl = "https://github.com/$GitHubUser/$RepositoryName.git"
$commitMessage = "chore: initialize blog site"

if (-not (Test-Path .git)) {
  throw "이 폴더는 아직 Git 저장소가 아닙니다. git init을 먼저 해주세요."
}

if (git status --short) {
  Write-Host "변경 사항이 있어요. 먼저 git add/commit 하세요."
  throw "Working tree가 깨끗하지 않습니다."
}

git switch $Branch
git remote remove origin 2>$null
git remote add origin $remoteUrl

Write-Host "원격 등록: $remoteUrl"
Write-Host "현재 커밋: $commitMessage (c87b648)"

git remote -v
git branch

try {
  git ls-remote --exit-code $remoteUrl 2>$null | Out-Null
}
catch {
  Write-Host "리포지토리가 존재하지 않거나 접근할 수 없습니다."
  Write-Host "먼저 GitHub에서 https://github.com/$GitHubUser/$RepositoryName 레포를 만드세요."
  throw $_
}

git push -u origin $Branch
