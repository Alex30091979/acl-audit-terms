// ============================================
// СКРИПТ СБОРКИ ПАКЕТА ДЛЯ РАСШИРЕНИЯ
// ============================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Собирает пакет расширения для Chrome Web Store
 */

const VERSION = '6.5.12';
const PACKAGE_NAME = `ACL-Audit-v${VERSION}-PRODUCTION`;

// Файлы и папки, которые нужно включить в пакет
const INCLUDED_FILES = [
  'manifest.json',
  'background.js',
  'sidepanel.html',
  'sidepanel.js',
  'popup.html',
  'popup.js',
  'settings.html',
  'settings.js',
  'license.html',
  'license.js',
  'license-ui.js',
  'license-wrapper.js',
  'license-integration.js',
  'pricing.html',
  'pricing-ui.js',
  'payment-integration.js',
  'payment-return-handler.js',
  'payment-success.html',
  'snapshots.js',
  'snapshots-ui.js',
  'scheduler.js',
  'analytics.js',
  'audit-log.js',
  'error-collector.js',
  'error-auto-healer.js',
  'error-viewer.js',
  'translations.js',
  'confirm-helper.js',
  'sheet-names-helper.js',
  'auto-install.js',
  'oauth-config.js',
  'assets',
  'icons',
  'docs',
  'LICENSE',
  'AUTHORS',
  'NOTICE',
  'README.md'
];

// Файлы и папки, которые нужно исключить
const EXCLUDED_PATTERNS = [
  /^\.git/,
  /^node_modules/,
  /^ACL-Audit-.*\.zip$/,
  /^.*\.log$/,
  /^package\.json$/,
  /^package-lock\.json$/,
  /^browser-automation-test\.js$/,
  /^README_BROWSER_AUTOMATION\.md$/,
  /^requirements\.txt$/,
  /^\.DS_Store$/,
  /^desktop\.ini$/,
  /^bk-.*\.json$/, // Service account keys
  /^test-.*\.js$/,
  /^test-.*\.gs$/,
  /^test-.*\.html$/,
  /^create-.*\.py$/,
  /^deploy-.*\.py$/,
  /^standalone-.*\.gs$/,
  /^CHANGELOG-.*\.md$/,
  /^CHROME_WEB_STORE.*$/,
  /^DEMO_VIDEO.*$/,
  /^.*\.md$/, // Все markdown файлы кроме OAUTH-SETUP.md
  /^.*\.txt$/,
  /^.*\.gs$/,
  /^.*\.py$/,
  /^FINAL.*$/,
  /^BUGFIX.*$/,
  /^UI_FIX.*$/,
  /^FUNCTION_EXPORT.*$/,
  /^MODULES_EXPORT.*$/,
  /^INTERFACE_AND.*$/,
  /^CONSOLE_ERRORS.*$/,
  /^COMPLETE_VERIFICATION.*$/,
  /^IMPLEMENTATION.*$/,
  /^REALIZATION.*$/,
  /^PRODUCT_NAME.*$/,
  /^AI_NAME.*$/,
  /^ADDITIONAL_INFO.*$/,
  /^ALTERNATIVES.*$/,
  /^APPS_SCRIPT.*$/,
  /^BILLING.*$/,
  /^CODE_PROTECTION.*$/,
  /^GOOGLE_OAUTH.*$/,
  /^OAUTH.*\.md$/,
  /^QUICK.*$/,
  /^SCOPE.*$/,
  /^SCOPES.*$/,
  /^SERVICE_ACCOUNT.*$/,
  /^SCALING.*$/,
  /^STANDALONE_WEB.*$/,
  /^AUTOMATIC.*$/,
  /^RETURN_URL.*$/,
  /^YOO_KASSA.*$/,
  /^MONETIZATION.*$/,
  /^LICENSE-SYSTEM.*$/,
  /^PAYMENT-SYSTEM.*$/,
  /^VERIFICATION.*$/,
  /^АВТОМАТИЧЕСКАЯ.*$/,
  /^ОСОБЕННОСТИ.*$/
];

// Исключения - файлы, которые нужно включить несмотря на паттерны
const EXCEPTIONS = [
  'OAUTH-SETUP.md',
  'PRIVACY_POLICY.md',
  'TERMS_OF_SERVICE.md',
  'PROOF_OF_AUTHORSHIP.md',
  'GPG_SETUP_DONE.md'
];

function shouldIncludeFile(fileName) {
  // Проверяем исключения
  if (EXCEPTIONS.includes(fileName)) {
    return true;
  }
  
  // Проверяем явно включенные файлы
  if (INCLUDED_FILES.includes(fileName)) {
    return true;
  }
  
  // Проверяем исключающие паттерны
  for (const pattern of EXCLUDED_PATTERNS) {
    if (pattern.test(fileName)) {
      return false;
    }
  }
  
  // По умолчанию исключаем
  return false;
}

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

function buildPackage() {
  console.log('🚀 Начало сборки пакета...');
  console.log(`📦 Версия: ${VERSION}`);
  console.log(`📁 Имя пакета: ${PACKAGE_NAME}\n`);
  
  const rootDir = __dirname;
  const buildDir = path.join(rootDir, PACKAGE_NAME);
  
  // Удаляем старую папку сборки если есть
  if (fs.existsSync(buildDir)) {
    console.log('🗑️  Удаление старой папки сборки...');
    fs.rmSync(buildDir, { recursive: true, force: true });
  }
  
  // Создаем новую папку сборки
  fs.mkdirSync(buildDir, { recursive: true });
  console.log(`✅ Создана папка сборки: ${PACKAGE_NAME}\n`);
  
  // Копируем файлы
  console.log('📋 Копирование файлов...');
  
  const allFiles = fs.readdirSync(rootDir, { withFileTypes: true });
  let copiedCount = 0;
  let skippedCount = 0;
  
  for (const entry of allFiles) {
    const fileName = entry.name;
    const srcPath = path.join(rootDir, fileName);
    const destPath = path.join(buildDir, fileName);
    
    if (entry.isDirectory()) {
      if (shouldIncludeFile(fileName)) {
        console.log(`  📁 Копирование папки: ${fileName}`);
        copyDirectory(srcPath, destPath);
        copiedCount++;
      } else {
        skippedCount++;
      }
    } else {
      if (shouldIncludeFile(fileName)) {
        console.log(`  📄 Копирование файла: ${fileName}`);
        copyFile(srcPath, destPath);
        copiedCount++;
      } else {
        skippedCount++;
      }
    }
  }
  
  console.log(`\n✅ Скопировано: ${copiedCount} файлов/папок`);
  console.log(`⏭️  Пропущено: ${skippedCount} файлов/папок\n`);
  
  // Создаем ZIP архив
  console.log('📦 Создание ZIP архива...');
  const zipPath = path.join(rootDir, `${PACKAGE_NAME}.zip`);
  
  // Удаляем старый архив если есть
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  
  try {
    // Используем PowerShell для создания ZIP (Windows)
    const zipCommand = `Compress-Archive -Path "${buildDir}\\*" -DestinationPath "${zipPath}" -Force`;
    execSync(`powershell -Command "${zipCommand}"`, { stdio: 'inherit' });
    console.log(`✅ ZIP архив создан: ${PACKAGE_NAME}.zip\n`);
  } catch (error) {
    console.error('❌ Ошибка при создании ZIP архива:', error.message);
    console.log('💡 Создайте ZIP архив вручную из папки:', buildDir);
  }
  
  // Выводим итоговую информацию
  console.log('='.repeat(60));
  console.log('✅ СБОРКА ЗАВЕРШЕНА');
  console.log('='.repeat(60));
  console.log(`📦 Папка сборки: ${buildDir}`);
  console.log(`📦 ZIP архив: ${zipPath}`);
  console.log(`📋 Версия: ${VERSION}`);
  console.log('='.repeat(60));
}

// Запуск сборки
buildPackage();
