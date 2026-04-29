## Cloudflare Pages 배포 가이드 (무료)

이 프로젝트는 정적 사이트(HTML/CSS/JS)라 Cloudflare Pages에 바로 올릴 수 있어요.

### 1) 우선 GitHub에 코드 올리기
Cloudflare Pages에서 깃과 연동하려면 저장소가 있어야 해요.

```powershell
cd "G:\내 드라이브\개인자료\web_kzh"
git init
git add .
git commit -m "init blog site"
```

원격 저장소는 GitHub에서 새로 만들고 아래처럼 연결하세요.

```powershell
git remote add origin https://github.com/USER/web_kzh.git
git branch -M main
git push -u origin main
```

### 2) Cloudflare Pages에 프로젝트 연결
- Cloudflare 콘솔 → **Pages**
- `Create application` → **Connect to Git**
- 저장소를 연결하고 프로젝트 이름(예: `web-kzh-blog`) 입력
- Build command: 비워두기(혹은 비워둠)
- Build output directory: `.` (루트)  
- Production branch: `main`
- Deploy

### 3) 배포 완료 주소
배포가 끝나면 `https://<project-name>.pages.dev` 형태의 URL이 생깁니다.

### 4) 자동 배포(선택)
`main` 브랜치에 push할 때마다 자동으로 재배포되도록 구성할 수 있어요.

이 레포에는 GitHub Actions 워크플로우를 넣어두었습니다:
- `.github/workflows/deploy.yml`

워크플로우를 쓰려면 GitHub에 아래 시크릿이 필요합니다.
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_PROJECT_NAME`

설정 방법
1. Cloudflare: API 토큰 생성(`Edit Cloudflare Pages` 권한 권장)
2. GitHub 저장소: `Settings > Secrets and variables > Actions`에 등록
3. `main` 브랜치 push 시 자동 배포됨

### 5) 직접 배포로 테스트하고 싶을 때 (CLI)
```powershell
cd "G:\내 드라이브\개인자료\web_kzh"
npx wrangler@latest pages deploy . --project-name web-kzh-blog
```

처음 한 번 `wrangler login`이 필요할 수 있어요.

### 6) 핫픽스: 바로 배포하는 스크립트
`.\deploy-cloudflare.ps1` 파일에 실행 가능한 예시를 넣어뒀어요.
```powershell
.\deploy-cloudflare.ps1 web-kzh-blog
```

### 7) 기본 보안/운영 팁
- GitHub를 private으로 유지하면 Pages 정책이 달라질 수 있으니, 공개 저장소가 제일 빠르고 간단해요.
- 정적 자산(이미지/동영상)은 `assets` 폴더로 분리하면 나중에 관리가 편합니다.
- 나중에 도메인이 생기면 Cloudflare에서 바로 사용자 도메인을 연결할 수 있어요.
