---
agent: build-engineer
description: Перевірити структуру, конфігурацію, складання, тести і YAML workflow. Нічого не змінює.
---

# Command: check

**ВАЖЛИВО:** ця команда **нічого не створює і не змінює** у відстежуваних файлах проєкту (тимчасові `node_modules/`, `dist/` ігноруються Git). Якщо знайдено проблему - лише повідом.

**Перевір і виведи таблицю `№ | Перевірка | Результат (✅/❌) | Деталі`:**

1. Manifest `.github/agents/build-engineer.agent.md` існує, містить розділи «Роль», «Заборонені дії», «Критерії успішного завершення».
2. Кожен `.github/skills/*/SKILL.md` (project-scaffold, build-and-test, github-actions) містить: входи, що створити, перевірку, приклад, типову помилку.
3. Існують усі commands: git-init, create-project, create-build, create-actions, check, lab-init.
4. `lab-init.prompt.md` викликає команди в порядку git-init → create-project → create-build → create-actions → check.
5. Існують `src/hello.ts`, `src/math.ts`, `tests/math.test.ts`, `package.json`, `package-lock.json`, `tsconfig.json`, `scripts/ci.sh`, `scripts/ci.bat`.
6. `package.json` має scripts `build`, `test`, `start`.
7. Запусти `bash scripts/ci.sh` (або `scripts\ci.bat` на Windows) - код виходу 0.
8. Вивід Vitest: 0 failed, присутній `BasicAddition`.
9. `node dist/hello.js` виводить `Hello, World!`.
10. `ci.yml` - валідний YAML, одна job, matrix з трьох ОС, тригери push і pull_request, без прямих `npm`/`npx`/`tsc`/`vitest`/`secrets.`.
11. `git ls-files | grep -E "^(node_modules|dist|coverage)/"` - порожньо.
12. Пошук секретів у коді й конфігурації (файли агента виключено, бо вони містять сам шаблон пошуку):
    `git grep -nIE "(ghp_|github_pat_|npm_[A-Za-z0-9]{20,}|AKIA|BEGIN .*PRIVATE KEY|_authToken)" -- . ":(exclude).github/prompts" ":(exclude).github/skills" ":(exclude).github/agents" ":(exclude)docs"` - порожньо.
13. `.gitignore` без дублікатів рядків.
14. Тести не містять `.skip` / `.only`.

**Підсумок:** `CHECK PASSED`, якщо всі ✅, інакше `CHECK FAILED: N проблем` і для кожної - що виправити та яку command запустити.
