# Архітектура AI-агента build-engineer

## Яку проблему вирішує агент
Автоматизує створення, складання, тестування і перевірку кросплатформного TypeScript-проєкту Hello World
та налаштування CI (GitHub Actions) для Windows, Linux і macOS. Замість разового запиту «зроби проєкт»
агент працює за фіксованим, відтворюваним сценарієм із перевірками на кожному кроці.

Варіант 6: TypeScript · npm scripts (tsc) · Vitest.

## Середовище і відповідність файлів
AI-клієнт: **GitHub Copilot Chat у VS Code** (режим Agent).

| Роль (методичка) | Файл | Формат Copilot |
|---|---|---|
| Agent manifest | `.github/agents/build-engineer.agent.md` | custom agent |
| Skill: project-scaffold | `.github/skills/project-scaffold/SKILL.md` | agent skill |
| Skill: build-and-test | `.github/skills/build-and-test/SKILL.md` | agent skill |
| Skill: github-actions | `.github/skills/github-actions/SKILL.md` | agent skill |
| Commands | `.github/prompts/<name>.prompt.md` | prompt file, запуск `/<name>` |
| Orchestrator | `.github/prompts/lab-init.prompt.md` | prompt file, `/lab-init` |
| Система складання | `package.json` (scripts) + `tsconfig.json` | замість `CMakeLists.txt` |
| Скрипти збірки | `scripts/ci.sh`, `scripts/ci.bat` | викликаються з CI |
| CI | `.github/workflows/ci.yml` | GitHub Actions |

## Схема взаємодії
```
 Користувач ─/lab-init─▶ lab-init (orchestrator)
                        │
   ┌────────────────────┼───────────────────────────────────────────┐
   ▼                    ▼                  ▼                 ▼        ▼
 git-init      create-project        create-build      create-actions  check
   │                 │                    │                  │          │
   │          skill: project-     skill: build-and-   skill: github-   (лише читає
   │          scaffold            test                actions          і запускає)
   ▼                 ▼                    ▼                  ▼          ▼
 .gitignore   src/*.ts,          tsconfig, scripts,     ci.yml ──▶ scripts/ci.* ──▶ dist/
              package.json       tests, ci.sh/.bat
```
Усі commands виконуються від імені агента `build-engineer` (поле `agent:` у frontmatter), тому
обмеження manifest діють на кожному кроці.

## Дані між етапами
| Крок | Вхід | Вихід → наступному кроку |
|---|---|---|
| git-init | папка проєкту | репозиторій, `.gitignore` |
| create-project | `project_name` | `src/hello.ts`, `src/math.ts`, `package.json` |
| create-build | файли `src/`, `package.json` | `tsconfig.json`, scripts, `tests/`, `scripts/ci.*`, lockfile |
| create-actions | `scripts/ci.*`, lockfile | `.github/workflows/ci.yml` |
| check | усі файли | таблиця ✅/❌, `CHECK PASSED/FAILED` |

## Обробка помилок оркестратором
- Перед стартом перевіряє передумови (`git`, `node ≥ 20`, `npm`).
- Кожна command має явну перевірку; при невдачі виводить блок `❌ КРОК / ПРИЧИНА / ЩО ЗРОБИТИ`.
- Оркестратор зупиняється на першій помилці і не запускає наступні кроки.
- Успіх фіксується тільки після `check` з `CHECK PASSED`.
- Ідемпотентність: повторний `lab-init` не перезаписує і не дублює файли.

## Обмеження агента
- Залежить від якості LLM: може відхилитися від інструкцій, тому результат завжди перевіряє `check` і людина.
- Не робить коміти, push, PR - це робить студент.
- Не має доступу до секретів і не повинен їх створювати.
- Не бачить результат GitHub Actions - його перевіряє користувач у вкладці Actions.
