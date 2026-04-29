## GitHub Pages 배포 가이드 (무료)

이 레포는 정적 사이트(HTML/CSS/JS)라 GitHub Pages로 바로 배포됩니다.

### 1) GitHub Pages 설정 (한 번만)
1. 브라우저에서 `https://github.com/kzhfin-boop/web_kzh/settings/pages` 접속  
2. **Source**를 `GitHub Actions`로 변경  
3. 저장소 상단으로 돌아가면 배포된 URL이 보입니다.

### 2) 지금 상태에서 바로 배포되는 방식
`main` 브랜치에 push하면 아래 워크플로가 실행돼요.
- `.github/workflows/github-pages.yml`

### 3) 수동으로 바로 배포 (선택)
로컬에서 파일 수정 후 바로 배포하고 싶다면 push만 하면 됩니다.

```powershell
git add .
git commit -m "Update site"
git push
```

### 4) 기본 URL
- 기본 주소: `https://kzhfin-boop.github.io/web_kzh`
- 추후 커스텀 도메인을 쓰면 GitHub Pages 설정에서 Domain을 등록하면 됩니다.
