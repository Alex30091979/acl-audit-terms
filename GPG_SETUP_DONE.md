# GPG-подпись коммитов (п. 4) — сделано

## Что выполнено

1. **Отключён keyboxd** в `~/.gnupg/common.conf` (из-за ошибки под Windows).
2. **Создан GPG-ключ** Ed25519:
   - Key ID: `2058C154F18EA518`
   - Fingerprint: `41BCDE8328443E29C78E0A212058C154F18EA518`
   - UID: `Alex30091979 <163242494+Alex30091979@users.noreply.github.com>`
3. **Настроен Git:**
   - `user.signingkey` = `2058C154F18EA518`
   - `commit.gpgsign` = `true`
   - `gpg.program` = `C:\Program Files\Git\usr\bin\gpg.exe`
4. **Проверена подпись:** создан подписанный коммит `9a0cd49`, `gpg: Good signature`.

## Что нужно сделать вам

### 1. Добавить GPG-ключ в GitHub

1. Откройте [GitHub → SSH and GPG keys](https://github.com/settings/keys).
2. Нажмите **New GPG key**.
3. Вставьте **целиком** содержимое файла `gpg-public-key.asc` (в корне проекта).
4. Сохраните.

### 2. Добавить GPG-ключ в GitLab

1. Откройте [GitLab → GPG Keys](https://gitlab.com/-/user_settings/gpg_keys).
2. Вставьте содержимое `gpg-public-key.asc` в поле **Key**.
3. Нажмите **Add key**.

### 3. Подписанные коммиты на Windows

GPG из Git for Windows работает только при запуске **через Git Bash** (из PowerShell gpg-agent не стартует).

**Вариант А — коммиты из Git Bash:**

```bash
cd "/c/Users/a.ramensky/Мой диск/Google_Scripts/del_access_to_GSheets_by_email/acl-audit-3.0.1 - prod"
git add ...
git commit -m "ваше сообщение"
# подпись ставится автоматически (commit.gpgsign = true)
```

**Вариант Б — скрипт из PowerShell:**

```powershell
& "C:\Program Files\Git\bin\bash.exe" -c "cd '/c/Users/a.ramensky/Мой диск/...' && git add . && git commit -m 'message'"
```

После добавления ключа в GitHub и GitLab подписанные коммиты будут отображаться как **Verified**.

## Файлы

| Файл | Назначение |
|------|------------|
| `gpg-public-key.asc` | Открытый ключ для GitHub/GitLab (не коммитить в репо при необходимости) |
| `git-signed-commit.sh` | Пример скрипта для подписанного коммита через Bash |

## Проверка

```bash
git log -1 --show-signature
# Должно быть: gpg: Good signature from "Alex30091979 <...>" [ultimate]
```

---

**Пункт 4 инструкции (GPG) выполнен.** Осталось добавить ключ в GitHub и GitLab.
