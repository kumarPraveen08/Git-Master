# Git Master

Interactive Git and GitHub course. Each lesson explains a concept, then asks you to type the real command in a terminal. Progress stays in the browser, finished modules collapse in the sidebar, and the last lesson opens a certificate you can download.

Live site: [kumarpraveen08.github.io/Git-Master](https://kumarpraveen08.github.io/Git-Master/)

## Lessons

1. Git Setup & Configuration
2. Repository Basics
3. Staging & Commits
4. Inspecting Changes & History
5. Branching
6. Merging & Conflicts
7. Remote Repositories
8. Undoing Changes
9. Recovery with Reflog
10. Stashing Work
11. Rebase & Cherry-Pick
12. Git Tags
13. GitHub CLI Setup & Authentication
14. GitHub Repository Management
15. GitHub Pull Requests
16. GitHub Issues
17. GitHub Actions
18. GitHub Secrets & Variables
19. GitHub Releases
20. GitHub Search
21. GitHub API with gh
22. Real-World Collaboration Workflow

## Run locally

Requires Node.js 22 and pnpm 11.

```bash
pnpm install
pnpm dev
```

Other scripts:

```bash
pnpm build
pnpm preview
pnpm lint
```

## Deploy

Pushes to `main` build the site and deploy it with GitHub Pages. In the repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

The production build uses `VITE_BASE=/Git-Master/` so assets load from the project site path. Local dev leaves the base as `/`.
