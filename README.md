# Лабораторна робота №1 — AI-агент для автоматизації розробки та CI/CD

**Виконав:** Даниляк Мирослав, група КІ-407
**Варіант:** 6 — TypeScript · npm scripts · Vitest

## Опис
Репозиторій містить AI-агента `build-engineer` для GitHub Copilot (manifest, 3 skills, 6 commands),
який генерує кросплатформний TypeScript Hello World, налаштовує збірку, юніт-тести і GitHub Actions
для Windows, Linux, macOS.

## Запуск агента
VS Code → Copilot Chat → режим **Agent** → агент **build-engineer** → `/init`.
Детально: [docs/usage.md](docs/usage.md). Архітектура: [docs/architecture.md](docs/architecture.md).
Журнал AI: [docs/ai-log.md](docs/ai-log.md).

## Проєкт
Кросплатформний TypeScript Hello World з TypeScript (`tsc`), Vitest і npm scripts.

```bash
npm ci
npm run build
npm test
npm start
```

На Windows також можна запустити весь локальний CI через `scripts\ci.bat`; на Linux/macOS - `bash scripts/ci.sh`.
