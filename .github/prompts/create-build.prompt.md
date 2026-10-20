---
agent: build-engineer
description: Налаштувати tsc, npm scripts, тести Vitest і скрипти scripts/ci.sh, scripts/ci.bat через skill build-and-test
---

# Command: create-build

**Передумови:** існують `src/hello.ts`, `src/math.ts`, `package.json`. Якщо ні - зупинись: «спочатку виконайте create-project».

**Дії:**
1. Прочитай `.github/skills/build-and-test/SKILL.md`.
2. Якщо в `devDependencies` немає `typescript`, `vitest`, `@types/node` - виконай `npm install -D typescript vitest @types/node`. Якщо є - не перевстановлюй.
3. Створи або мінімально онови `tsconfig.json`, блок `scripts` у `package.json`, `tests/math.test.ts`, `scripts/ci.sh`, `scripts/ci.bat`. Не дублюй ключі й тести.
4. Біт виконання: `git update-index --chmod=+x scripts/ci.sh` (якщо файл під Git) або `chmod +x scripts/ci.sh`.
5. Запусти локальну збірку скриптом для поточної ОС.

**Очікувані файли:** `tsconfig.json`, `package.json`, `package-lock.json`, `tests/math.test.ts`, `scripts/ci.sh`, `scripts/ci.bat`; після запуску - `dist/hello.js`.

**Перевірка:** скрипт завершився з кодом 0; у виводі Vitest усі тести passed і є `BasicAddition`; є `Hello, World!`.

**Помилка:** вивести блок `❌ КРОК: create-build` з першими рядками помилки tsc/Vitest. Не змінюй очікувані значення в тестах і не додавай `.skip`.
