#!/usr/bin/env bash
# Crea el repo en GitHub (privado), añade origin y hace push de main.
# Requisitos: GitHub CLI — https://cli.github.com/  (macOS: brew install gh)
# Uso:
#   ./scripts/bootstrap-github-remote.sh
#   GITHUB_REPO_NAME=otro-nombre ./scripts/bootstrap-github-remote.sh

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REPO_NAME="${GITHUB_REPO_NAME:-musky-design-system}"

if git remote get-url origin >/dev/null 2>&1; then
  echo "origin ya existe: $(git remote get-url origin)"
  echo "Haciendo push..."
  git push -u origin main
  exit 0
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "Instala GitHub CLI: https://cli.github.com/ (macOS: brew install gh)"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Inicia sesión en GitHub:"
  gh auth login
fi

USER_LOGIN="$(gh api user -q .login)"

if gh repo view "${USER_LOGIN}/${REPO_NAME}" >/dev/null 2>&1; then
  echo "El repo ${USER_LOGIN}/${REPO_NAME} ya existe. Enlazando origin..."
  git remote add origin "https://github.com/${USER_LOGIN}/${REPO_NAME}.git"
else
  echo "Creando repo privado ${USER_LOGIN}/${REPO_NAME}..."
  gh repo create "${REPO_NAME}" --private --source=. --remote=origin --push
  exit 0
fi

git push -u origin main
echo ""
echo "Siguiente paso: en GitHub → Settings → Secrets → Actions, añade:"
echo "  VERCEL_TOKEN    → https://vercel.com/account/tokens"
echo "  VERCEL_ORG_ID   → Team ID (team_…) en Vercel → ana-duques-projects → Team Settings"
