---
agent: build-engineer
description: Перевірити Git-репозиторій, створити або оновити .gitignore, показати стан Git
---

# Command: git-init

**Передумови:** відкрита коренева папка проєкту, встановлено `git`.

**Дії:**
1. Виконай `git rev-parse --is-inside-work-tree`. Якщо не репозиторій - `git init -b master`.
2. Покажи поточну гілку (`git branch --show-current`) і список гілок. Гілки не створюй і не перемикай без запиту користувача.
3. Створи `.gitignore` за еталоном зі skill `project-scaffold`; якщо файл є - додай лише відсутні рядки, без дублікатів.
4. Перевір, чи не відстежуються вже `node_modules/`, `dist/`: `git ls-files node_modules dist`. Якщо так - повідом і запропонуй `git rm -r --cached node_modules dist` (не виконуй без дозволу).
5. Виведи `git status --short`.

**Очікувані файли:** `.gitignore`.

**Перевірка:** `git status` працює; `.gitignore` містить `node_modules/` і `dist/` рівно по одному разу.

**Помилка:** якщо `git` не знайдено - `❌ КРОК: git-init / ПРИЧИНА: git не встановлено / ЩО ЗРОБИТИ: встановити Git і перезапустити VS Code`.

Не роби комітів, push, reset, видалень.
