---
name: github-actions
description: Створення .github/workflows/ci.yml з однією matrix-job для ubuntu, windows, macos, яка встановлює Node.js, викликає лише scripts/ci.sh або scripts/ci.bat і зберігає dist/ як artifact. Використовувати на кроці create-actions.
---

# Skill: github-actions

## Коли застосовувати
`scripts/ci.sh` і `scripts/ci.bat` існують і працюють локально, `package-lock.json` закомічено.

## Вхідні дані
| Параметр | За замовчуванням |
|---|---|
| `branches` | `develop`, `master`, `main` |
| `os_list` | `ubuntu-latest`, `windows-latest`, `macos-latest` |
| `node_version` | `20` |
| `artifact_dir` | `dist` |

## Вимоги до ci.yml
1. `name: CI`.
2. Тригери: `push` і `pull_request` на гілки з `branches`, плюс `workflow_dispatch`.
3. `permissions: contents: read`.
4. **Одна** job `build-test` з `strategy.matrix.os = os_list`, `fail-fast: false`, `runs-on: ${{ matrix.os }}`.
5. Кроки:
   - `actions/checkout@v4`
   - `actions/setup-node@v4` з `node-version`, `cache: npm` (лише підготовка середовища)
   - Linux/macOS: `bash scripts/ci.sh` (`if: runner.os != 'Windows'`)
   - Windows: `scripts\ci.bat`, `shell: cmd` (`if: runner.os == 'Windows'`)
   - `actions/upload-artifact@v4`, `name: hello-${{ matrix.os }}`, `path: dist/`, `if-no-files-found: error`
6. **Жодних** `npm`, `npx`, `tsc`, `vitest` безпосередньо в ci.yml - вся логіка збірки лише в скриптах.
7. **Жодних** `secrets.*`, токенів, `pull_request_target`.

## Перевірка результату
- YAML парситься: `npx --yes yaml-lint .github/workflows/ci.yml` (або `python -c "import yaml; yaml.safe_load(open('.github/workflows/ci.yml'))"`, якщо є Python з PyYAML).
- У файлі є всі три ОС.
- `grep -nE "npm |npx |tsc|vitest" .github/workflows/ci.yml` - **нічого не знаходить** (рядок `cache: npm` допустимий).
- Після push: у вкладці Actions три зелені job, у кожній є artifact `hello-<os>`.

## Приклад
Вхід: `branches=[develop, master]` → Результат: `.github/workflows/ci.yml`, одна job × 3 ОС.

## Типові помилки
| Симптом | Причина | Дія |
|---|---|---|
| Workflow не стартує | файл не в `.github/workflows/` або гілки немає в `branches` | перевірити шлях і тригери |
| `Dependencies lock file is not found` у setup-node | не закомічено `package-lock.json` | закомітити lockfile |
| Windows job зелена, але тести не йшли | у `.bat` немає `call` перед npm | виправити скрипт через build-and-test |
| `No files were found with the provided path: dist/` | збірка не створила `dist/` | перевірити `outDir` і крок build у скрипті |
