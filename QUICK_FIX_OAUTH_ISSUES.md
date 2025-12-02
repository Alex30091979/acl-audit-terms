# ⚡ Быстрое исправление предупреждений OAuth

## 🎯 Приоритетные действия (15 минут)

### 1. Привязать Billing Account (ОБЯЗАТЕЛЬНО для публикации)

**Ссылка:** https://console.cloud.google.com/billing?project=bk-del-access2g-sheets

**Действия:**
1. Откройте ссылку выше
2. Если нет billing account → "Create account" (требуется карта)
3. Используйте Google Cloud Free Tier ($300 на 90 дней)
4. Привяжите к проекту `bk-del-access2g-sheets`

**Результат:** ✅ Предупреждение "Billing account verification" исчезнет

---

### 2. Проверить OAuth Client настройки

**Ссылка:** https://console.cloud.google.com/apis/credentials?project=bk-del-access2g-sheets

**Проверьте:**
- ✅ Type: **Web application**
- ✅ Authorized redirect URIs: `https://ffdnnkjifbbiipnjbfjblijneddeilpg.chromiumapp.org/`
- ⚠️ Cross-Account Protection: включите, если опция доступна

**Результат:** ✅ Улучшит безопасность

---

### 3. Проверить OAuth Consent Screen

**Ссылка:** https://console.cloud.google.com/apis/credentials/consent?project=bk-del-access2g-sheets

**Проверьте, что указаны:**
- ✅ Terms of Service URL: `https://alex30091979.github.io/acl-audit-terms/terms-of-service.html`
- ✅ Privacy Policy URL: `https://alex30091979.github.io/acl-audit-terms/privacy-policy.html`

---

## 📊 Статус кода

### ✅ Уже правильно настроено в коде:

1. **Secure OAuth Flow:**
   - ✅ Используется `chrome.identity.launchWebAuthFlow` (безопасно)
   - ✅ НЕ используются WebViews (безопасно)

2. **Incremental Authorization:**
   - ✅ `include_granted_scopes: 'true'` (строка 382 в background.js)

3. **Token Security:**
   - ✅ Токены передаются через secure redirect URI
   - ✅ Токены хранятся локально в chrome.storage

---

## ⚠️ Предупреждения, которые могут остаться

Эти предупреждения **нормальны** и исчезнут после верификации:

1. **"Use secure flows"** - исчезнет после верификации приложения
2. **"Incremental authorization"** - исчезнет после тестирования с реальными пользователями
3. **"Cross-Account Protection"** - может быть недоступно для Chrome Extensions (не критично)

---

## ✅ Чеклист (5 минут)

- [ ] Billing account привязан
- [ ] OAuth Client проверен (Type, Redirect URI)
- [ ] OAuth Consent Screen проверен (Terms, Privacy Policy)
- [ ] Страница OAuth Overview обновлена
- [ ] Проверены оставшиеся предупреждения

---

## 🔗 Все ссылки в одном месте

- **OAuth Overview:** https://console.cloud.google.com/auth/overview?project=bk-del-access2g-sheets
- **Billing:** https://console.cloud.google.com/billing?project=bk-del-access2g-sheets
- **OAuth Client:** https://console.cloud.google.com/apis/credentials?project=bk-del-access2g-sheets
- **OAuth Consent Screen:** https://console.cloud.google.com/apis/credentials/consent?project=bk-del-access2g-sheets

---

**Следующий шаг:** Привяжите billing account и проверьте настройки OAuth Client!

