---
agent: build-engineer
description: Створити .github/workflows/ci.yml для Windows, Linux, macOS через skill github-actions
---

# Command: create-actions

**Передумови:** існують `scripts/ci.sh`, `scripts/ci.bat`, `package-lock.json`; локальна збірка (`create-build`) пройшла.

**Дії:**
1. Прочитай `.github/skills/github-actions/SKILL.md`.
2. Створи `.github/workflows/ci.yml`. Якщо файл існує - приведи до вимог skill, не додаючи другу job і не дублюючи кроки.
3. Перевір YAML і відсутність прямих викликів npm/npx/tsc/vitest.

**Очікувані файли:** `.github/workflows/ci.yml`.

**Перевірка:**
- YAML валідний (див. skill);
- є `ubuntu-latest`, `windows-latest`, `macos-latest`;
- немає `npm run`, `npm ci`, `npx`, `tsc`, `vitest`, `secrets.`.

**Помилка:** вивести блок `❌ КРОК: create-actions` з причиною.

Нагадай користувачу: результат CI видно лише після `git push` у вкладці Actions.
