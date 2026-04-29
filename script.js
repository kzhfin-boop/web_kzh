const posts = [
  {
    id: 1,
    title: "첫 글: 이 프로젝트를 시작한 이유",
    date: "2026-04-29",
    category: "일상",
    excerpt: "한 번에 정리되는 블로그 구조와 향후 확장 방향을 정리해봤다.",
    summary: "블로그를 시작한 동기와 앞으로 기록하고 싶은 주제를 적어두는 첫 글입니다.",
    content:
      "이 사이트는 GitHub처럼 코드 중심으로 관리하는 블로그입니다.\n\n목록에서 글 제목을 클릭하면 본문을 볼 수 있고, 검색창에서 빠르게 글을 찾을 수 있습니다.\n\n다음 단계로는 글쓰기 기능, 마크다운 변환, 댓글 기능 등을 추가할 수 있습니다.",
  },
  {
    id: 2,
    title: "개발 기록: 정적 사이트에서 라우팅 구조 잡기",
    date: "2026-04-20",
    category: "개발",
    excerpt: "싱글페이지에서 목록과 상세보기를 전환하는 방식 정리.",
    summary: "추가 라이브러리 없이 순수 JS로 글 상세 전환을 구현한다.",
    content:
      "해시 라우팅(#post-2)이나 클릭 이벤트를 이용해 목록과 상세를 전환할 수 있다.\n\n지금은 간단한 in-memory 데이터로 먼저 만들고, 나중에 Markdown 파일이나 API로 바꿀 수 있다.\n\n핵심은 사용자 흐름이 끊기지 않도록 뒤로가기 동작을 고려하는 것이다.",
  },
  {
    id: 3,
    title: "운영 노트: 배포 전 체크리스트",
    date: "2026-04-12",
    category: "기록",
    excerpt: "공개 전에 확인하면 좋은 항목을 간단히 정리했다.",
    summary: "배포 품질을 높이는 최소 체크리스트를 정리한 글.",
    content:
      "1. 모바일 반응형 확인\n2. 다크/라이트 가독성 테스트\n3. 검색 필터 및 카테고리 동작 점검\n4. 첫 화면의 가독성, 제목 계층, 여백 균형 확인\n5. 파일을 static hosting에 올린 뒤 캐시 정책 점검",
  },
];

const postsById = new Map(posts.map((post) => [post.id, post]));
const categoryList = document.getElementById("categoryList");
const postList = document.getElementById("postList");
const postDetail = document.getElementById("postDetail");
const detailArticle = document.getElementById("detailArticle");
const searchInput = document.getElementById("searchInput");
const allPostsButton = document.getElementById("allPostsButton");
const backToListButton = document.getElementById("backToList");
const postCardTemplate = document.getElementById("postCardTemplate");
const detailTemplate = document.getElementById("detailTemplate");

const state = {
  activeCategory: null,
  query: "",
};

const categories = [...new Set(posts.map((post) => post.category))].sort();

function renderCategories() {
  categoryList.innerHTML = "";
  const allButton = createCategoryButton("전체", null, !state.activeCategory);
  categoryList.appendChild(allButton);

  categories.forEach((category) => {
    const isPressed = state.activeCategory === category;
    categoryList.appendChild(createCategoryButton(category, category, isPressed));
  });
}

function createCategoryButton(label, value, isPressed) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.className = "category";
  button.setAttribute("aria-pressed", String(!!isPressed));
  button.addEventListener("click", () => {
    state.activeCategory = value;
    renderPosts();
    renderCategories();
  });
  return button;
}

function filteredPosts() {
  const q = state.query.trim().toLowerCase();
  return posts.filter((post) => {
    const inCategory =
      !state.activeCategory || post.category === state.activeCategory;
    const inQuery =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q);
    return inCategory && inQuery;
  });
}

function renderPosts() {
  postDetail.classList.add("hidden");
  postList.classList.remove("hidden");
  postList.innerHTML = "";

  const visiblePosts = filteredPosts();
  if (!visiblePosts.length) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = "조건에 맞는 글이 없습니다. 검색어 또는 카테고리를 바꿔보세요.";
    postList.appendChild(emptyState);
    return;
  }

  for (const post of visiblePosts) {
    const cardNode = postCardTemplate.content.cloneNode(true);
    cardNode.querySelector(".post-meta").textContent = `${post.date} · ${post.category}`;
    cardNode.querySelector("h3").textContent = post.title;
    cardNode.querySelector(".post-excerpt").textContent = post.excerpt;

    const card = cardNode.querySelector(".post-card");
    card.addEventListener("click", () => showPost(post.id));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showPost(post.id);
      }
    });
    postList.appendChild(cardNode);
  }
}

function renderPostDetail(post) {
  postList.classList.add("hidden");
  postDetail.classList.remove("hidden");

  detailArticle.innerHTML = "";
  const detailNode = detailTemplate.content.cloneNode(true);
  detailNode.querySelector(".post-meta").textContent = `${post.date} · ${post.category}`;
  detailNode.querySelector("h2").textContent = post.title;
  detailNode.querySelector(".post-summary").textContent = post.summary;
  detailNode.querySelector(".post-body").textContent = post.content;
  detailArticle.appendChild(detailNode);
}

function showPost(postId) {
  const post = postsById.get(postId);
  if (!post) return;
  window.location.hash = `post-${postId}`;
  renderPostDetail(post);
}

function parseHash() {
  const match = window.location.hash.match(/^#post-(\d+)$/);
  if (!match) return null;
  return Number(match[1]);
}

function openHashIfValid() {
  const id = parseHash();
  const found = id && postsById.get(id);
  if (found) {
    renderPostDetail(found);
    return;
  }
  renderPosts();
}

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderPosts();
});

allPostsButton.addEventListener("click", () => {
  state.activeCategory = null;
  state.query = "";
  searchInput.value = "";
  renderPosts();
  renderCategories();
});

backToListButton.addEventListener("click", () => {
  window.location.hash = "";
  renderPosts();
});

window.addEventListener("hashchange", openHashIfValid);

renderCategories();
renderPosts();
openHashIfValid();
