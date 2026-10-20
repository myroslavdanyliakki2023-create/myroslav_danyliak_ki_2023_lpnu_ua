---
agent: build-engineer
description: Створити початковий TypeScript Hello World-проєкт через skill project-scaffold
---

# Command: create-project

**Параметри:** project_name=`${input:project_name:hello}`

**Передумови:** виконано `git-init` (є `.gitignore`); `node --version` ≥ 20.

**Дії:**
1. Прочитай `.github/skills/project-scaffold/SKILL.md`.
2. Виконай skill з `project_name` і `language=typescript`.
3. Існуючі файли не перезаписуй: README.md - лише секція «## Проєкт»; `package.json` - лише додати відсутні поля; `src/*` - лише якщо файлу немає або він не відповідає еталону.

**Очікувані файли:** `src/hello.ts`, `src/math.ts`, `tests/.gitkeep`, `package.json`, `docs/architecture.md`, `docs/usage.md`, `README.md`.

**Перевірка:** усі файли існують; `package.json` - валідний JSON з `"type": "module"`; README містить команду запуску.

**Помилка:** вивести блок `❌ КРОК: create-project` з назвою відсутнього файлу.

Наприкінці - таблиця: файл | створено / оновлено / без змін.
