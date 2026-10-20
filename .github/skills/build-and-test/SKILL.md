---
name: build-and-test
description: Налаштування складання TypeScript через npm scripts (tsc), юніт-тестів Vitest і кросплатформних скриптів scripts/ci.sh та scripts/ci.bat. Використовувати на кроці create-build.
---

# Skill: build-and-test

## Коли застосовувати
Є `src/` і `package.json` (після project-scaffold), потрібно налаштувати збірку, тести і скрипти збірки.

## Вхідні дані
| Параметр | За замовчуванням |
|---|---|
| `src_dir` | `src` |
| `out_dir` | `dist` |
| `test_dir` | `tests` |

## Що створити

### 1. Залежності (лише через npm)
```
npm install -D typescript vitest @types/node
```
Це створить/оновить `package-lock.json` - він **комітиться**.

### 2. tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```
Тести не входять у `include` - їх виконує Vitest напряму з `.ts`.

### 3. Блок scripts у package.json (додати/оновити, не дублювати)
```json
"scripts": {
  "build": "tsc -p tsconfig.json",
  "test": "vitest run --reporter=verbose",
  "start": "node dist/hello.js",
  "ci": "npm run build && npm test && npm start"
}
```

### 4. tests/math.test.ts
```ts
import { describe, test, expect } from 'vitest';
import { add } from '../src/math';
import { greet } from '../src/hello';

describe('math', () => {
  test('BasicAddition', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('NegativeNumbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });
});

describe('hello', () => {
  test('Greeting', () => {
    expect(greet()).toBe('Hello, World!');
  });
});
```
Імпорт з `src/hello` також друкує текст у консоль - це нормально.

### 5. scripts/ci.sh (Linux/macOS, LF, `set -euo pipefail`)
1. `node --version && npm --version`
2. `npm ci`
3. `npm run build`
4. `npm test`
5. `node dist/hello.js | tee /dev/stderr | grep -q "Hello, World!"` - smoke-тест

### 6. scripts/ci.bat (Windows, CRLF)
Ті самі кроки. **Кожен виклик npm - через `call`** (`call npm ci`), інакше .bat завершиться після першої npm-команди.
Після кожного кроку - `if errorlevel 1 exit /b 1`.
Smoke-тест: `node dist\hello.js | findstr /C:"Hello, World!"` + `if errorlevel 1 exit /b 1`.

Обидва скрипти повертають ненульовий код при будь-якій помилці.

## Перевірка результату
```
bash scripts/ci.sh          # Windows: scripts\ci.bat
```
Очікувано: `tsc` без помилок; Vitest: `Tests  3 passed`, у verbose-виводі є `BasicAddition`; існує `dist/hello.js`; вивід містить `Hello, World!`.

## Приклад
Вхід: стандартні параметри → Результат: `tsconfig.json`, оновлений `package.json`, `package-lock.json`, `tests/math.test.ts`, `scripts/ci.sh`, `scripts/ci.bat`; після запуску - `dist/hello.js`, `dist/math.js`.

## Типові помилки
| Симптом | Причина | Дія |
|---|---|---|
| `ERR_MODULE_NOT_FOUND ... dist/math` | у `hello.ts` імпорт без `.js` при `NodeNext` | писати `./math.js` |
| `npm ci` - lockfile відсутній/не синхронізований | не закомічено `package-lock.json` або ручні правки | `npm install`, закомітити lockfile |
| `.bat` завершується після `npm ci`, тести не йдуть | npm викликано без `call` | `call npm ...` |
| `tsc` компілює тести в `dist/` | `tests` потрапив у `include` | `"include": ["src"]` |
| `Permission denied: scripts/ci.sh` | немає біта виконання | запускати як `bash scripts/ci.sh` або `git update-index --chmod=+x` |
