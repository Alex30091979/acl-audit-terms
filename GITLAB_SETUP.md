# 🔧 Настройка GitLab репозитория

## Шаг 1: Создание Personal Access Token

1. Перейдите на https://gitlab.com/-/user_settings/personal_access_tokens
2. Создайте новый токен с правами:
   - ✅ `api` - Полный доступ к API
   - ✅ `write_repository` - Запись в репозиторий
3. Скопируйте токен (он начинается с `glpat-`)

## Шаг 2: Создание репозитория через скрипт

Запустите скрипт с вашими данными:

```bash
node setup-gitlab.js <GITLAB_TOKEN> <GITLAB_URL> <USERNAME> <REPO_NAME> <VISIBILITY>
```

**Пример:**
```bash
node setup-gitlab.js glpat-xxxxxxxxxxxxx gitlab.com alex30091979 acl-audit private
```

**Параметры:**
- `GITLAB_TOKEN` - ваш Personal Access Token
- `GITLAB_URL` - URL GitLab (обычно `gitlab.com`)
- `USERNAME` - ваш GitLab username
- `REPO_NAME` - имя репозитория (например, `acl-audit`)
- `VISIBILITY` - видимость: `private`, `internal` или `public`

## Шаг 3: Добавление GitLab remote

После создания репозитория скрипт выведет команды для добавления remote:

```bash
git remote add gitlab https://gitlab.com/<username>/<repo-name>.git
```

## Шаг 4: Push в GitLab

```bash
git push gitlab main
# или
git push gitlab master
```

## Альтернативный способ: Создание через веб-интерфейс

1. Перейдите на https://gitlab.com/projects/new
2. Заполните форму:
   - **Project name**: `acl-audit`
   - **Visibility Level**: выберите нужный уровень
3. Нажмите "Create project"
4. Добавьте remote:
   ```bash
   git remote add gitlab https://gitlab.com/<username>/acl-audit.git
   ```

## Настройка синхронизации GitHub ↔ GitLab

После настройки обоих репозиториев можно настроить автоматическую синхронизацию через GitHub Actions или GitLab CI.

---

**После настройки GitLab репозитория сообщите мне, и я помогу настроить синхронизацию!**
