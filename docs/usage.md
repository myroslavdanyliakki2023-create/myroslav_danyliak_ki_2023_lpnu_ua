# Використання

## Вимоги
- VS Code + розширення GitHub Copilot / Copilot Chat (студентський план)
- Git, Node.js ≥ 20 (з npm)

## Запуск агента
1. Відкрити папку репозиторію у VS Code.
2. Відкрити Copilot Chat → режим **Agent** → у списку агентів обрати **build-engineer**.
3. Повний сценарій: ввести `/init` (на запит `project_name` - `hello`).
4. Окремі операції: `/git-init`, `/create-project`, `/create-build`, `/create-actions`, `/check`.

## Локальна збірка і тести без агента
```bash
# Linux / macOS
bash scripts/ci.sh

# Windows (cmd)
scripts\ci.bat

# або вручну
npm ci
npm run build
npm test
npm start            # = node dist/hello.js
```

Очікуваний вивід програми:
```
Hello, World!
2 + 3 = 5
```

## Демонстрація зламаної перевірки
1. У `tests/math.test.ts` змінити `toBe(5)` на `toBe(6)`.
2. Запустити `/check` → пункт 8 ❌, `CHECK FAILED`.
3. Повернути `toBe(5)` → `/check` → `CHECK PASSED`.

## Результати запуску
<!-- вставити сюди вивід /check та посилання на успішний запуск GitHub Actions -->
