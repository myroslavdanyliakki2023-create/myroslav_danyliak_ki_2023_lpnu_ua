---
agent: build-engineer
description: Оркестратор - послідовно запускає git-init, create-project, create-build, create-actions, check
---

# Command: lab-init (orchestrator)

> Назва команди - `lab-init`, а не `init`, щоб не конфліктувати з вбудованою командою `/init` у VS Code Copilot,
> яка генерує `copilot-instructions.md`.

**Параметри:** project_name=`${input:project_name:hello}`

## Передумови (перевір до старту)
- Цей файл виконується як команда `/lab-init`.
- `git --version`, `node --version` (≥ 20), `npm --version` доступні.
- Якщо чогось немає - зупинись з `❌ КРОК: lab-init/передумови`.

## Сценарій
Виконуй кроки **строго по черзі**. Для кожного кроку прочитай відповідний файл у `.github/prompts/` і виконай його повністю.

| № | Command | Файл | Передає далі |
|---|---|---|---|
| 1 | git-init | `git-init.prompt.md` | стан репозиторію, `.gitignore` |
| 2 | create-project | `create-project.prompt.md` | `project_name`, `src/`, `package.json` |
| 3 | create-build | `create-build.prompt.md` | скрипти `scripts/ci.*`, `dist/` |
| 4 | create-actions | `create-actions.prompt.md` | шлях `ci.yml` |
| 5 | check | `check.prompt.md` | фінальна таблиця |

Після кожного кроку виведи: `✅ Крок N/5: <назва> - <що створено/оновлено>`.

## Обробка помилок
- Якщо крок завершився з `❌` - **припини** сценарій, не запускай наступні кроки, виведи причину й пропозицію.
- Не приховуй помилку і не обходь її ручною правкою результату чи зміною тесту.

## Повторний запуск
Повторний `lab-init` на готовому проєкті не повинен нічого ламати чи дублювати: кроки 1-4 мають завершитися статусом «без змін», крок 5 - `CHECK PASSED`.

## Фінальний звіт
1. Таблиця всіх файлів: створено / оновлено / без змін.
2. Результат `check`.
3. Наступні дії для користувача (не виконуй їх сам):
   ```
   git add .
   git commit -m "..."
   git push -u origin <гілка>
   ```
