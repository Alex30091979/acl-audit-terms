// Скрипт для создания GitLab репозитория через API
const https = require('https');
const http = require('http');

/**
 * Создает GitLab репозиторий через API
 * 
 * Использование:
 * node setup-gitlab.js <GITLAB_TOKEN> <GITLAB_URL> <USERNAME> <REPO_NAME> <VISIBILITY>
 * 
 * Пример:
 * node setup-gitlab.js glpat-xxxxx gitlab.com username acl-audit private
 */

const args = process.argv.slice(2);

if (args.length < 5) {
  console.error('❌ Недостаточно аргументов');
  console.log('\nИспользование:');
  console.log('  node setup-gitlab.js <GITLAB_TOKEN> <GITLAB_URL> <USERNAME> <REPO_NAME> <VISIBILITY>');
  console.log('\nПример:');
  console.log('  node setup-gitlab.js glpat-xxxxx gitlab.com username acl-audit private');
  console.log('\nVISIBILITY: private, internal, public');
  process.exit(1);
}

const [token, gitlabUrl, username, repoName, visibility] = args;

const isHttps = gitlabUrl.includes('https://') || !gitlabUrl.includes('http://');
const baseUrl = isHttps 
  ? (gitlabUrl.startsWith('https://') ? gitlabUrl : `https://${gitlabUrl}`)
  : (gitlabUrl.startsWith('http://') ? gitlabUrl : `http://${gitlabUrl}`);
const apiUrl = `${baseUrl}/api/v4/projects`;

const postData = JSON.stringify({
  name: repoName,
  path: repoName,
  visibility: visibility,
  description: 'ACL Audit — Drive Permissions - Chrome Extension для аудита прав Google Drive',
  default_branch: 'main',
  initialize_with_readme: false
});

const url = new URL(apiUrl);
const options = {
  hostname: url.hostname,
  port: url.port || (isHttps ? 443 : 80),
  path: url.pathname,
  method: 'POST',
  headers: {
    'PRIVATE-TOKEN': token,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const client = isHttps ? https : http;

console.log('🚀 Создание GitLab репозитория...');
console.log(`📦 Имя: ${repoName}`);
console.log(`👤 Пользователь: ${username}`);
console.log(`🔒 Видимость: ${visibility}`);
console.log(`🌐 URL: ${baseUrl}\n`);

const req = client.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 201) {
      const project = JSON.parse(data);
      console.log('✅ Репозиторий успешно создан!');
      console.log(`\n📋 Детали:`);
      console.log(`   ID: ${project.id}`);
      console.log(`   URL: ${project.web_url}`);
      console.log(`   SSH: ${project.ssh_url_to_repo}`);
      console.log(`   HTTPS: ${project.http_url_to_repo}`);
      console.log(`\n🔗 Добавьте remote:`);
      console.log(`   git remote add gitlab ${project.http_url_to_repo}`);
      console.log(`\n📤 Push в GitLab:`);
      console.log(`   git push gitlab main`);
    } else {
      console.error(`❌ Ошибка: ${res.statusCode}`);
      try {
        const error = JSON.parse(data);
        console.error(`   Сообщение: ${error.message || JSON.stringify(error)}`);
      } catch (e) {
        console.error(`   Ответ: ${data}`);
      }
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Ошибка запроса:', error.message);
  process.exit(1);
});

req.write(postData);
req.end();
