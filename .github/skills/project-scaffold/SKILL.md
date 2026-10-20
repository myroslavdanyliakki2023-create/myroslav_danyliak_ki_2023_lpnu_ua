---
name: project-scaffold
description: Створення мінімального TypeScript Hello World-проєкту - структура каталогів, src/hello.ts, src/math.ts, package.json, README, .gitignore. Використовувати на кроці create-project.
---

# Skill: project-scaffold

## Коли застосовувати
Порожній або майже порожній репозиторій, потрібна початкова структура TypeScript-проєкту.

## Вхідні дані
| Параметр | За замовчуванням |
|---|---|
| `language` | `typescript` |
| `project_name` | `hello` |
| `node_version` | `20` |

## Що створити
```
src/math.ts             # export function add(a: number, b: number): number
src/hello.ts            # точка входу, друкує Hello, World!
tests/                  # наповнює build-and-test, поки .gitkeep
docs/architecture.md    # якщо немає - заготовка з заголовками
docs/usage.md           # якщо немає - заготовка з заголовками
package.json            # якщо немає (npm init -y), далі правити поля
README.md               # якщо немає; якщо є - лише секція "## Проєкт"
.gitignore
```

### src/math.ts
```ts
export function add(a: number, b: number): number {
  return a + b;
}
```

### src/hello.ts
```ts
#!/usr/bin/env node
import { add } from './math.js';

export function greet(name = 'World'): string {
  return `Hello, ${name}!`;
}

console.log(greet());
console.log(`2 + 3 = ${add(2, 3)}`);
```

### package.json (поля, які мають бути)
```json
{
  "name": "hello",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "bin": { "hello": "dist/hello.js" },
  "engines": { "node": ">=20" }
}
```
Блок `scripts` і `devDependencies` додає skill `build-and-test`.

### .gitignore (без дублікатів)
```
node_modules/
dist/
coverage/
*.tsbuildinfo
.vitest/
npm-debug.log*
*.log
.env
.env.*
.vscode/*
!.vscode/extensions.json
.idea/
.DS_Store
```

## Перевірка результату
1. Існують `src/hello.ts`, `src/math.ts`, `package.json`.
2. `hello.ts` містить `Hello, ${name}!` і за замовчуванням `World`.
3. `package.json` - валідний JSON (`node -e "JSON.parse(require('fs').readFileSync('package.json','utf8'))"`), `"type": "module"`.
4. README містить команду запуску: `npm start` або `node dist/hello.js`.
5. Кожен рядок `.gitignore` зустрічається рівно один раз.

## Приклад
Вхід: `project_name=hello` → Результат: `src/hello.ts`, `src/math.ts`, `tests/.gitkeep`, `package.json`, `.gitignore`, README із секцією «Проєкт».

## Типова помилка
- **Симптом:** `README.md` перезаписано, зникли ПІП, група, варіант.
- **Причина:** skill створив файл замість оновлення.
- **Дія:** повідомити користувача, відновлення - лише з його дозволу (`git checkout -- README.md`), далі тільки додавати секцію.
